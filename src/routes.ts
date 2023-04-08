import { wrap } from "svelte-spa-router/wrap"
import Dashboard from "./layouts/Dashboard.svelte"
import Standalone from "./layouts/Standalone.svelte"
import Authentication from "./pages/Authentication.svelte"
import NotFound from "./pages/NotFound.svelte"
import Onboarding from "./pages/Onboarding.svelte"
import Home from "./pages/dashboard/Home.svelte"
import { token } from "./stores/token"

export default {
  "/": wrap({
    component: Dashboard,
    props: {
      page: Home,
    },
    conditions: isAuthenticated,
  }),
  "/authentication": wrap({
    component: Standalone,
    props: {
      page: Authentication,
    },
  }),
  "/onboarding": wrap({
    component: Standalone,
    props: {
      page: Onboarding,
    },
  }),
  "*": wrap({
    component: Standalone,
    props: {
      page: NotFound,
    },
  }),
}

function isAuthenticated(): boolean {
  return token.get() !== ""
}
