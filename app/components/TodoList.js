import { DOMElement, StateManager } from "../../framework/src/index.js";
import { TodoItem } from "./TodoItem.js";

export const stateManager = StateManager({
  todos: [],
  filter: "all", // Default filter is 'all'
});
export class TodoList extends DOMElement {
  constructor() {
    super("ul", { class: "todo-list" });
    this.render();
  }

  render() {
    this.element.innerHTML = "";
    const { todos, filter } = stateManager.getState();
    todos.forEach((todo) => {
      if (
        filter === "all" ||
        (filter === "active" && !todo.completed) ||
        (filter === "completed" && todo.completed)
      ) {
        const todoItem = new TodoItem(todo);
        todoItem.render();
        this.element.appendChild(todoItem.element);
      }
    });
  }
}
export default { stateManager, TodoList };
