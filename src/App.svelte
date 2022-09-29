<script lang="ts">
  import Router, { replace } from "svelte-spa-router"
  import routes from "./routes"
</script>

<main>
  <Router {routes} on:conditionsFailed={() => replace("/authentication")} />
</main>

<style lang="scss">
</style>
