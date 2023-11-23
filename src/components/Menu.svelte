<script lang="ts">
  import classes from "svelte-transition-classes";

  export let opened: boolean;
</script>

<!-- eslint-disable a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
{#if opened}
  <div
    class="h-auto w-auto fixed inset-0 z-10 bg-transparent cursor-default"
    on:click={(event) => {
      event.stopPropagation();
      opened = false;
    }}
  ></div>
  <div
    class={`h-auto w-auto p-4 fixed z-20 pointer-events-auto cursor-default overflow-hidden flex flex-col justify-start content-center align-middle gap-3 rounded-xl bg-foreground shadow-sm ${
      $$props.class || ""
    }`}
    in:classes={{
      duration: 350,
      base: "transform ease-out duration-300 transition",
      from: "opacity-0 translate-x-0 translate-y-2",
      to: "opacity-100 translate-y-0",
    }}
    out:classes={{
      duration: 350,
      base: "transform ease-in duration-300 transition",
      from: "opacity-100 translate-y-0",
      to: "opacity-0 translate-x-0 translate-y-2",
    }}
    on:click={(event) => event.stopPropagation()}
  >
    <slot />
  </div>
{/if}

<style lang="scss">
</style>
