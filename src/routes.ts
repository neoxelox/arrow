import { SvelteComponent } from "svelte";
import { type WrappedComponent } from "svelte-spa-router";
import { wrap } from "svelte-spa-router/wrap";
import Dashboard from "./layouts/Dashboard.svelte";
import Standalone from "./layouts/Standalone.svelte";
import Authentication from "./pages/Authentication.svelte";
import Devices from "./pages/Devices.svelte";
import Home from "./pages/Home.svelte";
import NotFound from "./pages/NotFound.svelte";
import Onboarding from "./pages/Onboarding.svelte";
import Triggers from "./pages/Triggers.svelte";
import Users from "./pages/Users.svelte";

export default {
  "/": page(Home, Standalone),
  "/devices": page(Devices, Dashboard),
  "/triggers": page(Triggers, Dashboard),
  "/users": page(Users, Dashboard),
  "/roles": page(Users, Dashboard),
  "/authentication": page(Authentication, Standalone),
  "/onboarding": page(Onboarding, Standalone),
  /* The 404 page must be the last route */
  "*": page(NotFound, Standalone),
};

function page(component: typeof SvelteComponent, layout: typeof SvelteComponent): WrappedComponent {
  return wrap({
    component: layout,
    props: {
      page: component,
    },
  });
}
