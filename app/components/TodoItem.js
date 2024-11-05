import { DOMElement } from "../../framework/src/index.js";
import { stateManager } from "./TodoList.js";

// Define components
export class TodoItem extends DOMElement {
  constructor(todo) {
    super("li", { class: todo.completed ? "completed" : "" });
    this.todo = todo;

    // Create checkbox, label, and deleteButton
    this.checkbox = new DOMElement("input", {
      type: "checkbox",
      class: "toggle",
    });
    this.label = new DOMElement("label", {}, [todo.text]);
    this.deleteButton = new DOMElement("button", { class: "destroy" });

    // Append components to the li element
    this.element.appendChild(this.checkbox.element);
    this.element.appendChild(this.label.element);
    this.element.appendChild(this.deleteButton.element);

    // Render the component
    this.render();

    // Add event listeners
    this.checkbox.element.addEventListener("change", () => {
      todo.completed = this.checkbox.element.checked;
      stateManager.setState({ ...stateManager.getState() }); // Trigger state update
    });

    // Double-click event for label
    this.label.element.addEventListener("dblclick", () => {
      this.checkbox.element.style.display = "none"; // Hide checkbox
      this.label.element.contentEditable = true; // Allow editing
      this.label.element.focus(); // Focus on the label for editing
    });

    // Blur event for label (when editing is done)
    this.label.element.addEventListener("blur", () => {
      this.checkbox.element.style.display = "inline-block"; // Show checkbox
      this.label.element.contentEditable = false; // Disable editing
      const newText = this.label.element.textContent.trim();
      todo.text = newText;
      stateManager.setState({ ...stateManager.getState() }); // Trigger state update
    });

    // Remove focus when Enter key is pressed
    this.label.element.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        this.label.element.blur(); // Remove focus
      }
    });

    this.deleteButton.element.addEventListener("click", () => {
      stateManager.setState({
        todos: stateManager
          .getState()
          .todos.filter((item) => item !== this.todo),
        filter: stateManager.getState().filter,
      });
    });
  }

  render() {
    this.checkbox.element.checked = this.todo.completed;
  }
}

export default { TodoItem };
