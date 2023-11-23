<script lang="ts">
  import Widget from "./Widget.svelte";

  let widgets = [1, 2];
</script>

<div class="h-full w-full flex flex-row flex-wrap gap-4">
  {#each widgets as widget (widget)}
    <Widget />
  {/each}
</div>

<style lang="scss">
</style>
