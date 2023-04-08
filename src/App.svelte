<script lang="ts">
  import Router, { replace } from "svelte-spa-router"
  import routes from "./routes"
</script>

<main class="h-screen w-screen">
  <Router {routes} on:conditionsFailed={() => replace("/authentication")} />
</main>

<style lang="scss">
</style>
