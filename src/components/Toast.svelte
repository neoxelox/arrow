<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import classes from "svelte-transition-classes";
  import { ToastType, type Toast } from "../types";
  import DismissIcon from "./icons/Dismiss.svelte";
  import ErrorIcon from "./icons/Error.svelte";
  import InfoIcon from "./icons/Info.svelte";
  import SuccessIcon from "./icons/Success.svelte";
  import WarningIcon from "./icons/Warning.svelte";

  export let toast: Toast;

  const dispatch = createEventDispatcher();
</script>

<div
  class="w-full max-w-sm pointer-events-auto overflow-hidden rounded-xl bg-foreground shadow-sm"
  in:classes={{
    duration: 350,
    base: "transform ease-out duration-300 transition",
    from: "translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2",
    to: "translate-y-0 opacity-100 sm:translate-x-0",
  }}
  out:classes={{
    duration: 350,
    base: "transform ease-in duration-300 transition",
    from: "translate-y-0 opacity-100 sm:translate-x-0",
    to: "translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2",
  }}
>
  <div class="p-4">
    <div class="flex items-start">
      <div class="flex-shrink-0">
        {#if toast.type === ToastType.SUCCESS}
          <SuccessIcon class="h-6 w-6 text-success" />
        {:else if toast.type === ToastType.INFO}
          <InfoIcon class="h-6 w-6 text-info" />
        {:else if toast.type === ToastType.WARNING}
          <WarningIcon class="h-6 w-6 text-warning" />
        {:else if toast.type === ToastType.ERROR}
          <ErrorIcon class="h-6 w-6 text-danger" />
        {/if}
      </div>

      <div class="ml-3 w-0 flex-1 pt-0.5">
        {#if toast.type === ToastType.SUCCESS}
          <p class="text-sm font-medium text-content">Action successful!</p>
          <p class="mt-1 text-sm text-content/60">{toast.message}</p>
        {:else if toast.type === ToastType.INFO}
          <p class="text-sm font-medium text-content">{toast.message}</p>
        {:else if toast.type === ToastType.WARNING}
          <p class="text-sm font-medium text-content">{toast.message}</p>
        {:else if toast.type === ToastType.ERROR}
          <p class="text-sm font-medium text-content">Something went wrong!</p>
          <p class="mt-1 text-sm text-content/60">{toast.message}</p>
        {/if}
      </div>

      {#if toast.dismissible}
        <div class="ml-4 flex flex-shrink-0">
          <button
            class="inline-flex rounded-md text-content/50 hover:text-content transition-colors"
            on:click={() => dispatch("dismiss")}
          >
            <DismissIcon class="h-5 w-5" />
          </button>
        </div>
      {/if}
    </div>
  </div>
</div>

<style lang="scss">
</style>
