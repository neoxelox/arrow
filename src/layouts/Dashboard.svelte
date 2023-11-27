<script lang="ts">
  import { onDestroy, type SvelteComponent } from "svelte";
  import { location, push, replace } from "svelte-spa-router";
  import DeviceIcon from "../components/icons/Device.svelte";
  import FactoryResetIcon from "../components/icons/FactoryReset.svelte";
  import NoWiFiIcon from "../components/icons/NoWiFi.svelte";
  import RoleIcon from "../components/icons/Role.svelte";
  import SignOutIcon from "../components/icons/SignOut.svelte";
  import SystemInfoIcon from "../components/icons/SystemInfo.svelte";
  import TriggerIcon from "../components/icons/Trigger.svelte";
  import UserIcon from "../components/icons/User.svelte";
  import WiFiIcon from "../components/icons/WiFi.svelte";
  import Menu from "../components/Menu.svelte";
  import ToastList from "../components/ToastList.svelte";
  import { api } from "../services/api";
  import { notifier } from "../services/notifier";
  import { network, time, token, user } from "../stores";
  import { type GetSystemTimeResponse, type GetSystemWiFiResponse, type Network } from "../types";
  import { networkStrength, setIntervalNow } from "../utils";

  // const MOBILE_WIDTH_BREAKPOINT: number = 600;
  const GET_SYSTEM_TIME_PERIOD: number = 1 * 60;
  const GET_SYSTEM_WIFI_PERIOD: number = 5 * 60;

  export let page: typeof SvelteComponent;

  let openSystemMenu: boolean = false;
  let openWiFiMenu: boolean = false;
  let openTimeMenu: boolean = false;
  let availableNetworks: Network[] = [];

  // let innerWidth: number;
  // $: isMobile = innerWidth <= MOBILE_WIDTH_BREAKPOINT;

  let get_system_time_interval = setIntervalNow(async () => {
    const response = await api.get<GetSystemTimeResponse>("/system/time");
    time.set(new Date(response.time * 1000));
  }, GET_SYSTEM_TIME_PERIOD * 1000);

  let get_system_wifi_interval = setIntervalNow(async () => {
    const response = await api.get<GetSystemWiFiResponse>("/system/wifi");
    network.set(
      response.current
        ? {
            name: response.current.name,
            strength: response.current.strength,
            security: response.current.security,
            ip: {
              address: response.current.ip.address,
              netmask: response.current.ip.netmask,
              gateway: response.current.ip.gateway,
            },
            mac: response.current.mac,
            dns: { main: response.current.dns.main, backup: response.current.dns.backup },
          }
        : null,
    );
    availableNetworks = response.available
      .filter(
        (net_1, index, self) =>
          self.findIndex((net_2) => net_2.name === net_1.name) === index && net_1.name !== $network?.name,
      )
      .map<Network>((network) => {
        return { name: network.name, strength: network.strength, security: network.security };
      });
  }, GET_SYSTEM_WIFI_PERIOD * 1000);

  onDestroy(() => {
    clearInterval(get_system_time_interval);
    clearInterval(get_system_wifi_interval);
  });
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
        on:click={() => (openSystemMenu = true)}
      >
        <span class="text-2xl leading-none">{$user.emoji}</span>
        {$user.name}
        <Menu class="bottom-20 left-4" bind:opened={openSystemMenu}>
          <button
            class="inline-flex rounded-md text-lg font-bold tracking-tight text-content hover:text-primary transition-colors select-none"
            on:click={() => notifier.info("Under construction.")}
          >
            <SystemInfoIcon class="h-6 w-6 mt-[0.1rem] mr-2" />
            System Information
          </button>
          <hr class="h-auto w-full border-2 border-background rounded-xl" />
          <button
            class="inline-flex rounded-md text-lg font-bold tracking-tight text-content hover:text-primary transition-colors select-none"
            on:click={async () => {
              await api.post("/logout");
              token.set("");
              replace(`/authentication?location=${$location}`);
            }}
          >
            <SignOutIcon class="h-6 w-6 mt-[0.1rem] mr-2" />
            Sign Out
          </button>
          <hr class="h-auto w-full border-2 border-background rounded-xl" />
          <button
            class="inline-flex rounded-md text-lg font-bold tracking-tight text-danger hover:text-primary transition-colors select-none"
            on:click={() => notifier.info("Under construction.")}
          >
            <FactoryResetIcon class="h-6 w-6 mt-[0.1rem] mr-2" />
            Factory Reset
          </button>
        </Menu>
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
        class="inline-flex rounded-md mt-[0.15rem] hover:text-primary transition-colors"
        class:text-content={$network}
        class:text-warning={!$network}
        on:click={() => (openWiFiMenu = true)}
      >
        {#if $network}
          <WiFiIcon class="h-6 w-6" strength={networkStrength($network.strength)} />
        {:else}
          <NoWiFiIcon class="h-6 w-6" />
        {/if}
        <Menu class="bottom-20 right-4 max-h-72" bind:opened={openWiFiMenu}>
          {#if $network}
            <span class="inline-flex flex-col">
              <span class="inline-flex justify-between gap-6 text-content">
                <WiFiIcon class="h-6 w-6 mt-[0.1rem]" strength={networkStrength($network.strength)} />
                <span class="text-lg font-bold tracking-tight text-right select-none">{$network.name}</span>
              </span>
              <span class="text-sm font-bold tracking-tight text-content/60 text-right select-none"
                ><span class="text-xs">{$network.ip?.address}</span>
                {$network.security}</span
              >
            </span>
            <hr class="h-auto w-full border-2 border-background rounded-xl" />
          {/if}
          <div class="flex flex-col gap-2 overflow-y-scroll no-scrollbar">
            {#each availableNetworks as network (network.name)}
              <button
                class="inline-flex justify-between gap-6 rounded-md group"
                on:click={() => notifier.info("Under construction.")}
              >
                <WiFiIcon
                  class="h-6 w-6 mt-[0.1rem] text-content group-hover:text-primary transition-colors"
                  strength={networkStrength(network.strength)}
                />
                <span class="inline-flex flex-col select-none text-right font-bold tracking-tight">
                  <span class="text-lg text-content group-hover:text-primary transition-colors">{network.name}</span>
                  <span class="text-sm text-content/60 group-hover:text-primary transition-colors"
                    >{network.security}</span
                  >
                </span>
              </button>
            {/each}
          </div>
        </Menu>
      </button>
      <button
        class="inline-flex rounded-md text-lg font-bold text-content hover:text-primary transition-colors select-none"
        on:click={() => (openTimeMenu = true)}
      >
        {$time.toLocaleTimeString(undefined, { timeStyle: "short" })}
        <Menu class="bottom-20 right-4" bind:opened={openTimeMenu}>
          <span class="text-lg font-bold tracking-tight text-content select-none">
            {$time.toLocaleString(undefined, { dateStyle: "full", timeStyle: "long" })}
          </span>
        </Menu>
      </button>
    </div>
  </div>
</div>

<style lang="scss">
</style>
