import { DOMElement } from "../../framework/src/index.js";
import Footer from "./Footer.js";
import Header from "./Header.js";
import Main from "./Main.js";

export default class App extends DOMElement {
  constructor() {
    super("section", { class: "todoapp", id: "root" });
    const header = new Header();
    const main = new Main();
    const footer = new Footer();
    this.element.appendChild(header.element);
    this.element.appendChild(main.element);
    this.element.appendChild(footer.element);
  }
}
