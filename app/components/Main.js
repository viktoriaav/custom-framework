import { DOMElement } from "../../framework/src/index.js";
import { TodoList, stateManager } from "./TodoList.js";

export default class Main extends DOMElement {
  constructor() {
    super("main", { class: "main" });

    this.list = new TodoList(); // Create TodoList instance
    this.element.appendChild(this.list.element);

    // Create toggle all container
    this.toggleAllContainer = new DOMElement("div", {
      class: "toggle-all-container",
    });

    // Create toggle all checkbox
    this.toggleAllCheckbox = new DOMElement("input", {
      class: "toggle-all",
      type: "checkbox",
    });

    // Create toggle all label
    this.toggleAllLabel = new DOMElement("label", {
      class: "toggle-all-label",
      textContent: "Toggle All",
    });

    // Append toggle all checkbox and label to toggle all container
    this.toggleAllContainer.element.appendChild(this.toggleAllCheckbox.element);
    this.toggleAllContainer.element.appendChild(this.toggleAllLabel.element);

    // Listen for changes in stateManager and update TodoList
    stateManager.subscribe(() => {
      this.list.render();

      const { todos } = stateManager.getState();
      const numTodos = todos.length;

      if (numTodos > 0) {
        // If there are more than 0 items, show the toggle all container
        this.element.appendChild(this.toggleAllContainer.element);
      } else {
        // If there are no items, remove the toggle all container
        if (this.toggleAllContainer.element.parentNode) {
          this.toggleAllContainer.element.parentNode.removeChild(
            this.toggleAllContainer.element
          );
        }
      }
    });

    // Add event listener to toggle all checkbox
    this.toggleAllCheckbox.element.addEventListener("change", () => {
      const { todos } = stateManager.getState();
      const allChecked = todos.filter((todo) => todo.completed === true);

      if (allChecked.length === todos.length) {
        stateManager.setState({
          ...stateManager.getState(),
          todos: todos.map((todo) => ({ ...todo, completed: false })),
        });
      } else {
        const isChecked = this.toggleAllCheckbox.element.checked;
        stateManager.setState({
          ...stateManager.getState(),
          todos: todos.map((todo) => ({ ...todo, completed: isChecked })),
        });
      }
    });
  }
}
