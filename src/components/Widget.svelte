<script lang="ts">
  import SettingsIcon from "../components/icons/Settings.svelte";
  import { notifier } from "../services/notifier";
</script>

<div
  class="h-auto w-auto p-4 overflow-hidden flex flex-col justify-between content-center align-middle gap-5 rounded-xl bg-foreground shadow-sm"
>
  <div class="flex justify-between gap-3 select-none text-lg font-bold text-content tracking-tight">
    <slot name="header" />
    <button
      class="inline-flex rounded-md mt-1 ml-6 text-content/50 hover:text-primary transition-colors"
      on:click={() => notifier.info("Under construction.")}
    >
      <SettingsIcon class="h-5 w-5" />
    </button>
  </div>
  <div
    class="flex flex-col justify-center content-center align-middle gap-3 text-center select-none text-9xl font-bold text-content tracking-tight"
  >
    <slot name="body" />
  </div>
  {#if $$slots.footer}
    <div class="flex justify-start gap-3 select-none text-sm font-bold text-content tracking-tight">
      <slot name="footer" />
    </div>
  {/if}
</div>

<style lang="scss">
</style>
