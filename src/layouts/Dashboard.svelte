<script lang="ts">
  import type { SvelteComponentTyped } from "svelte"

  export let page: SvelteComponentTyped
</script>

<div>
  <svelte:component this={page} {...$$restProps} />
</div>

<style lang="scss">
</style>
