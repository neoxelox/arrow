<script lang="ts">
  import { onDestroy } from "svelte";
  import Widget from "../components/Widget.svelte";
  import WidgetGrid from "../components/WidgetGrid.svelte";
  import LoadingIcon from "../components/icons/Loading.svelte";
  import { api } from "../services/api";
  import { DeviceSubtype, DeviceType, type Device, type GetDevicesResponse } from "../types";
  import { setIntervalNow } from "../utils";

  // TODO: Fix all linting errors and quick hacks

  const GET_DEVICES_PERIOD: number = 5;

  let response: Promise<GetDevicesResponse>;
  let devices: Device[] = [];

  let get_devices_interval = setIntervalNow(async () => {
    response = api.get<GetDevicesResponse>("/devices");
    response.then((response) => {
      devices = response.devices;
    });
  }, GET_DEVICES_PERIOD * 1000);

  onDestroy(() => {
    clearInterval(get_devices_interval);
  });
</script>

<main class={`${$$props.class || ""}`}>
  {#await response}
    <div class="h-full w-full flex flex-col flex-wrap justify-center content-center align-middle">
      <LoadingIcon class="h-32 w-32 self-center text-transparent fill-primary" />
    </div>
  {:then}
    <WidgetGrid>
      {#each devices as device (device.name)}
        <Widget>
          <svelte:fragment slot="header">
            <span class="flex justify-between gap-3">
              <span>{device.emoji}</span><span>{device.name}</span>
            </span>
          </svelte:fragment>
          <svelte:fragment slot="body">
            {#if device.subtype === DeviceSubtype.BUTTON}
              {#await device.response}
                <LoadingIcon class="h-32 w-32 self-center text-transparent fill-primary" />
              {:then}
                <button
                  class="rounded-md"
                  on:click={async () => {
                    if (device.type === DeviceType.ACTUATOR) {
                      device.response = api.post(`/devices/actuate/${device.name}`);
                    }
                  }}
                >
                  {device.context.emoji}
                </button>
              {:catch}
                <button
                  class="rounded-md"
                  on:click={async () => {
                    if (device.type === DeviceType.ACTUATOR) {
                      device.response = api.post(`/devices/actuate/${device.name}`);
                    }
                  }}
                >
                  {device.context.emoji}
                </button>
              {/await}
            {:else if device.subtype === DeviceSubtype.BISTATE}
              {#if device.context.state === 1}
                {device.context.emoji1}
              {:else if device.context.state === 2}
                {device.context.emoji2}
              {:else}
                <LoadingIcon class="h-32 w-32 self-center text-transparent fill-primary" />
              {/if}
            {/if}
          </svelte:fragment>
        </Widget>
      {/each}
    </WidgetGrid>
  {/await}
</main>

<style lang="scss">
</style>
