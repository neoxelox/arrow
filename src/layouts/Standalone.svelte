<script lang="ts">
  import type { SvelteComponent } from "svelte";
  import ToastList from "../components/ToastList.svelte";
  import DianaIcon from "../components/icons/Diana.svelte";

  export let page: typeof SvelteComponent;
</script>

<ToastList />

<div
  class="h-full w-full overflow-hidden p-4 flex flex-col justify-center content-center align-middle gap-6 bg-background bg-pattern"
>
  <DianaIcon class="h-12 w-12 text-primary self-center" />
  <div class="h-auto w-full overflow-hidden">
    <svelte:component
      this={page}
      {...$$restProps}
      class="h-full w-full bg-transparent overflow-y-scroll no-scrollbar"
    />
  </div>
</div>

<style lang="scss">
</style>
