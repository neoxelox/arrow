<script lang="ts">
  import { nft } from "../services/nft"
  import { toasts } from "../stores/toast"
  import Toast from "./Toast.svelte"
</script>

<div aria-live="assertive" class="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6">
  <div class="flex w-full flex-col items-center space-y-4 sm:items-end">
    {#each $toasts as toast (toast.id)}
      <Toast
        type={toast.type}
        message={toast.message}
        dismissible={toast.dismissible}
        on:dismiss={() => nft.dismiss(toast.id)}
      />
    {/each}
  </div>
</div>
