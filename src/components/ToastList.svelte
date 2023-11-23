<script lang="ts">
  import { notifier } from "../services/notifier";
  import { toasts } from "../stores";
  import Toast from "./Toast.svelte";
</script>

<div class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
  <div class="w-full flex flex-col items-center space-y-4 sm:items-end">
    {#each $toasts as toast (toast.id)}
      <Toast {toast} on:dismiss={() => notifier.dismiss(toast.id)} />
    {/each}
  </div>
</div>

<style lang="scss">
</style>
