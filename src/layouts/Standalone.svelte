<script lang="ts">
  import type { SvelteComponent } from "svelte"

  export let page: typeof SvelteComponent
</script>

<div>
  <svelte:component this={page} {...$$restProps} />
</div>

<style lang="scss">
</style>
