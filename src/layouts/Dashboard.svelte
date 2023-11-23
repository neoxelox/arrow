<script lang="ts">
  import type { SvelteComponent } from "svelte";
  import { location, push } from "svelte-spa-router";
  import ToastList from "../components/ToastList.svelte";
  import DeviceIcon from "../components/icons/Device.svelte";
  import RoleIcon from "../components/icons/Role.svelte";
  import TriggerIcon from "../components/icons/Trigger.svelte";
  import UserIcon from "../components/icons/User.svelte";
  import WiFiIcon from "../components/icons/WiFi.svelte";
  import { network, time, user } from "../stores";
  import { networkStrength } from "../utils";

  // const MOBILE_WIDTH_BREAKPOINT: number = 600;

  export let page: typeof SvelteComponent;

  // let innerWidth: number;
  // $: isMobile = innerWidth <= MOBILE_WIDTH_BREAKPOINT;
</script>

<!-- <svelte:window bind:innerWidth /> -->

<ToastList />

<div class="h-full w-full overflow-hidden p-4 flex flex-col gap-4 bg-background bg-pattern">
  <div class="h-full w-full overflow-hidden">
    <svelte:component
      this={page}
      {...$$restProps}
      class="h-full w-full bg-transparent overflow-y-scroll no-scrollbar"
    />
  </div>

  <div class="h-12 w-full px-4 overflow-hidden flex flex-row rounded-xl bg-foreground shadow-sm">
    <div class="h-full w-1/3 flex flex-row flex-wrap justify-start content-center align-middle gap-2">
      <button
        class="inline-flex gap-2 rounded-md text-lg font-bold text-content hover:text-primary transition-colors select-none"
        on:click={() => console.log("TODO")}
      >
        <span class="text-2xl leading-none">{$user.emoji}</span>
        {$user.name}
      </button>
    </div>

    <!-- eslint-disable a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <nav class="h-full w-1/3 flex flex-row flex-wrap justify-center content-center align-middle gap-3">
      <button
        class={`inline-flex flex-col justify-center align-middle gap-1 rounded-md ${
          $location === "/devices" ? "text-primary" : "text-content hover:text-primary hover:-translate-y-1 transition"
        }`}
        on:click={() => {
          $location !== "/devices" && push("/devices");
        }}
      >
        <DeviceIcon class="h-6 w-6" />
        {#if $location === "/devices"}
          <hr class="h-auto w-full border-2 border-primary rounded-xl" />
        {/if}
      </button>
      <button
        class={`inline-flex flex-col justify-center align-middle gap-1 rounded-md ${
          $location === "/triggers" ? "text-primary" : "text-content hover:text-primary hover:-translate-y-1 transition"
        }`}
        on:click={() => {
          $location !== "/triggers" && push("/triggers");
        }}
      >
        <TriggerIcon class="h-6 w-6" />
        {#if $location === "/triggers"}
          <hr class="h-auto w-full border-2 border-primary rounded-xl" />
        {/if}
      </button>
      <button
        class={`inline-flex flex-col justify-center align-middle gap-1 rounded-md ${
          $location === "/users" ? "text-primary" : "text-content hover:text-primary hover:-translate-y-1 transition"
        }`}
        on:click={() => {
          $location !== "/users" && push("/users");
        }}
      >
        <UserIcon class="h-6 w-6" />
        {#if $location === "/users"}
          <hr class="h-auto w-full border-2 border-primary rounded-xl" />
        {/if}
      </button>
      <button
        class={`inline-flex flex-col justify-center align-middle gap-1 rounded-md ${
          $location === "/roles" ? "text-primary" : "text-content hover:text-primary hover:-translate-y-1 transition"
        }`}
        on:click={() => {
          $location !== "/roles" && push("/roles");
        }}
      >
        <RoleIcon class="h-6 w-6" />
        {#if $location === "/roles"}
          <hr class="h-auto w-full border-2 border-primary rounded-xl" />
        {/if}
      </button>
    </nav>

    <div class="h-full w-1/3 flex flex-row flex-wrap justify-end content-center align-middle gap-2">
      <button
        class="inline-flex rounded-md mt-[0.15rem] text-content hover:text-primary transition-colors"
        on:click={() => console.log("TODO")}
      >
        <WiFiIcon class="h-6 w-6" strength={networkStrength($network.strength)} />
      </button>
      <button
        class="inline-flex rounded-md text-lg font-bold text-content hover:text-primary transition-colors select-none"
        on:click={() => console.log("TODO")}
      >
        {$time.toLocaleTimeString(undefined, { timeStyle: "short" })}
      </button>
    </div>
  </div>
</div>

<style lang="scss">
</style>
