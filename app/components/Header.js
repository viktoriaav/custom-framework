import { DOMElement } from "../../framework/src/index.js";
import { stateManager } from "./TodoList.js";

export default class Header extends DOMElement {
  constructor() {
    super("header", { class: "header" });

    this.input = new DOMElement("input", {
      class: "new-todo",
      type: "text",
      placeholder: "What needs to be done?",
    });
    this.h1 = new DOMElement("h1", {}, ["todos"]);

    this.element.appendChild(this.input.element);
    this.element.appendChild(this.h1.element); // Fixed the typo here

    this.input.element.addEventListener("keyup", (event) => {
      if (event.key === "Enter" && event.target.value.trim() !== "") {
        // Handle adding new todo item
        stateManager.setState({
          todos: [
            ...stateManager.getState().todos,
            { text: event.target.value.trim(), completed: false },
          ],
          filter: stateManager.getState().filter,
        });
        event.target.value = ""; // Clear input after adding
      }
    });
  }
}
