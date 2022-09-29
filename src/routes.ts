import { wrap } from "svelte-spa-router/wrap"
import { get } from "svelte/store"
import Dashboard from "./layouts/Dashboard.svelte"
import Standalone from "./layouts/Standalone.svelte"
import Authentication from "./pages/Authentication.svelte"
import Home from "./pages/dashboard/Home.svelte"
import NotFound from "./pages/NotFound.svelte"
import Onboarding from "./pages/Onboarding.svelte"
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
  return get(token) !== null
}
