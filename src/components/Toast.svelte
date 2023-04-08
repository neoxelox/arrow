<script lang="ts">
  import { createEventDispatcher } from "svelte"
  import classes from "svelte-transition-classes"
  import { ToastType } from "../stores/toast"
  import XMark from "./icons/20/solid/XMark.svelte"
  import CheckCircle from "./icons/24/outline/CheckCircle.svelte"
  import ExclamationCircle from "./icons/24/outline/ExclamationCircle.svelte"
  import InformationCircle from "./icons/24/outline/InformationCircle.svelte"
  import QuestionMarkCircle from "./icons/24/outline/QuestionMarkCircle.svelte"

  export let type: ToastType
  export let message: string
  export let dismissible: boolean

  const dispatch = createEventDispatcher()
</script>

<div
  class="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-light shadow-lg ring-1 ring-dark-900 ring-opacity-5 border"
  class:border-success-400={type === ToastType.SUCCESS}
  class:border-info-400={type === ToastType.INFO}
  class:border-warning-500={type === ToastType.WARNING}
  class:border-danger-400={type === ToastType.ERROR}
  in:classes={{
    duration: 350,
    base: "transform ease-out duration-300 transition",
    from: "translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2",
    to: "translate-y-0 opacity-100 sm:translate-x-0",
  }}
  out:classes={{
    duration: 350,
    base: "transform ease-out duration-300 transition",
    from: "translate-y-0 opacity-100 sm:translate-x-0",
    to: "translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2",
  }}
>
  <div class="p-4">
    <div class="flex items-start">
      <div class="flex-shrink-0">
        {#if type === ToastType.SUCCESS}
          <CheckCircle class="h-6 w-6 text-success-400" />
        {:else if type === ToastType.INFO}
          <InformationCircle class="h-6 w-6 text-info-400" />
        {:else if type === ToastType.WARNING}
          <QuestionMarkCircle class="h-6 w-6 text-warning-500" />
        {:else if type === ToastType.ERROR}
          <ExclamationCircle class="h-6 w-6 text-danger-400" />
        {/if}
      </div>
      <div class="ml-3 w-0 flex-1 pt-0.5">
        {#if type === ToastType.SUCCESS}
          <p class="text-sm font-medium text-dark-900">Action successful!</p>
          <p class="mt-1 text-sm text-dark-500">{message}</p>
        {:else if type === ToastType.INFO}
          <p class="text-sm font-medium text-dark-900">{message}</p>
        {:else if type === ToastType.WARNING}
          <p class="text-sm font-medium text-dark-900">{message}</p>
        {:else if type === ToastType.ERROR}
          <p class="text-sm font-medium text-dark-900">An error has ocurred!</p>
          <p class="mt-1 text-sm text-dark-500">{message}</p>
        {/if}
      </div>

      {#if dismissible}
        <div class="ml-4 flex flex-shrink-0">
          <button
            type="button"
            class="inline-flex rounded-md bg-light text-dark-400 hover:text-dark-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            on:click={() => dispatch("dismiss")}
          >
            <span class="sr-only">Dismiss</span>
            <XMark class="h-5 w-5" />
          </button>
        </div>
      {/if}
    </div>
  </div>
</div>
