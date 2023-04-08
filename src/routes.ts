import { SvelteComponent } from "svelte"
import { type WrappedComponent } from "svelte-spa-router/Router"
import { wrap } from "svelte-spa-router/wrap"
import Dashboard from "./layouts/Dashboard.svelte"
import Standalone from "./layouts/Standalone.svelte"
import Authentication from "./pages/Authentication.svelte"
import NotFound from "./pages/NotFound.svelte"
import Onboarding from "./pages/Onboarding.svelte"
import Home from "./pages/dashboard/Home.svelte"
import { token } from "./stores/token"

export default {
  "/": page(Home, Dashboard),
  "/authentication": page(Authentication),
  "/onboarding": page(Onboarding),
  "*": page(NotFound),
}

function page(component: typeof SvelteComponent, layout: typeof SvelteComponent = Standalone): WrappedComponent {
  return wrap({
    component: layout,
    props: {
      page: component,
    },
    conditions: layout === Dashboard ? () => token.get() !== "" : undefined,
  })
}
