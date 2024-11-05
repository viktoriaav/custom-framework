import { Router } from "../framework/src/index.js";
import App from "./components/App.js";

const router = new Router();

// Initial navigation
router.navigateTo(window.location.hash);
console.log(window.location.pathname);

// Initialize app
const app = new App();
app.mount("#body", true);

// Set up routes
router.addRoute("/", () => {
  app.element.style.display = "block";
});
router.addRoute("/all", () => {
  console.log("All route activated");
});
router.addRoute("/active", () => {
  console.log("Active route activated");
});
router.addRoute("/completed", () => {
  console.log("Completed route activated");
});
