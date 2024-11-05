import { DOMElement } from "../../framework/src/index.js";
import { stateManager } from "./TodoList.js";

export default class Footer extends DOMElement {
  constructor() {
    super("footer", { class: "footer", style: "display: none;" }); // Initially hide the footer
    this.counter = new DOMElement("span", { class: "todo-count" }, [
      "0 items left!",
    ]);
    this.filterContainer = new DOMElement("ul", { class: "filters" });
    this.filterItems = {
      all: new DOMElement("li", {}, [
        new DOMElement("a", { href: "#/all", class: "selected" }, ["All"]),
      ]),
      active: new DOMElement("li", {}, [
        new DOMElement("a", { href: "#/active" }, ["Active"]),
      ]),
      completed: new DOMElement("li", {}, [
        new DOMElement("a", { href: "#/completed" }, ["Completed"]),
      ]),
    };
    this.clearCompletedButton = new DOMElement(
      "button",
      { class: "clear-completed" },
      ["Clear completed"]
    );

    this.element.appendChild(this.counter.element);
    this.element.appendChild(this.filterContainer.element);
    Object.values(this.filterItems).forEach((item) => {
      this.filterContainer.element.appendChild(item.element);
      item.element.addEventListener("click", () => {
        // Remove 'selected' class from all items
        Object.values(this.filterItems).forEach((i) =>
          i.element.firstChild.classList.remove("selected")
        );
        // Add 'selected' class to the clicked item
        item.element.firstChild.classList.add("selected");

        // Extract the filter from href attribute
        const filter = item.element.firstChild.getAttribute("href").slice(2);

        stateManager.setState({
          ...stateManager.getState(),
          filter: filter,
        });
      });
    });
    this.element.appendChild(this.clearCompletedButton.element);

    this.clearCompletedButton.element.addEventListener("click", () => {
      stateManager.setState({
        todos: stateManager.getState().todos.filter((todo) => !todo.completed),
        filter: stateManager.getState().filter,
      });
    });
    stateManager.subscribe(() => {
      const { todos, filter } = stateManager.getState();
      const remaining = todos.filter((todo) => !todo.completed).length;
      this.counter.element.textContent = `${remaining} item${
        remaining !== 1 ? "s" : ""
      } left!`;

      // Update 'selected' class based on filter
      Object.values(this.filterItems).forEach((item) => {
        const itemFilter = item.element.firstChild
          .getAttribute("href")
          .slice(2);
        if (itemFilter === filter) {
          item.element.firstChild.classList.add("selected");
        } else {
          item.element.firstChild.classList.remove("selected");
        }
      });

      // Update footer display based on remaining active items
      const numActiveItems = todos.length;
      if (numActiveItems > 0) {
        this.element.style.display = "block"; // Show the footer
      } else {
        this.element.style.display = "none"; // Hide the footer
      }
    });
  }
}
