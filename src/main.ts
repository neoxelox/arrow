import Router from "svelte-spa-router";
import "./main.scss";
import routes from "./routes";

const app = new Router({
  target: document.getElementById("app") as HTMLElement,
  props: { routes },
});

export default app;
