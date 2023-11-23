<script lang="ts">
  import { querystring, replace } from "svelte-spa-router";
  import LoadingIcon from "../components/icons/Loading.svelte";
  import { api } from "../services/api";
  import { token, user } from "../stores";
  import { type PostLoginRequest, type PostLoginResponse } from "../types";

  $: location = new URLSearchParams($querystring).get("location");

  let request = {
    endpoint: "/login",
    body: <PostLoginRequest>{
      name: "",
      password: "",
    },
  };
  let response: Promise<PostLoginResponse>;
</script>

<main class={`${$$props.class || ""} flex flex-col justify-start content-center align-middle gap-10`}>
  <h1 class="text-center text-3xl font-bold text-content tracking-tight">Sign in to your account</h1>

  <div
    class="h-auto w-full sm:max-w-[480px] sm:mx-auto px-6 sm:px-12 py-12 overflow-hidden flex flex-col rounded-xl bg-foreground shadow-sm"
  >
    <form class="space-y-6">
      <div>
        <label for="username" class="block text-md font-bold leading-6 text-content">Username</label>
        <div class="mt-2">
          <input
            id="username"
            name="username"
            type="text"
            autocomplete="username"
            required
            class="block w-full rounded-md border-0 bg-background px-4 py-2.5 text-md font-medium leading-6 text-content focus:ring-0"
            bind:value={request.body.name}
          />
        </div>
      </div>

      <div>
        <label for="password" class="block text-md font-bold leading-6 text-content">Password</label>
        <div class="mt-2">
          <input
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required
            class="block w-full rounded-md border-0 bg-background px-4 py-2.5 text-md font-medium leading-6 text-content focus:ring-0"
            bind:value={request.body.password}
          />
        </div>
      </div>

      <div class="flex items-center justify-between">
        <div class="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            class="h-4 w-4 rounded border-0 bg-background text-content focus:ring-0 focus:ring-offset-0 cursor-pointer"
          />
          <label for="remember-me" class="ml-3 block text-sm font-medium leading-6 text-content">Remember me</label>
        </div>

        <button
          class="inline-flex rounded-md text-sm font-semibold leading-6 text-content hover:text-primary transition-colors select-none"
          on:click={(event) => {
            event.preventDefault();
            console.log("TODO");
          }}
        >
          Don't have an account?
        </button>
      </div>

      <div>
        <button
          type="submit"
          class="flex w-full justify-center rounded-md bg-primary px-4 py-2.5 text-md font-bold leading-6 text-foreground ring-4 hover:ring-8 ring-primary/25 transition"
          on:click={async (event) => {
            event.preventDefault();

            response = api.post(request.endpoint, request.body, false);
            response.then((response) => {
              token.set(`${response.name}:${response.token}`);
              user.set({
                name: response.name,
                role: response.role,
                emoji: response.emoji,
                created_at: new Date(response.created_at * 1000),
              });

              replace(location || "/");
            });
          }}
        >
          {#await response}
            <LoadingIcon class="h-6 w-6 text-primary fill-foreground" />
          {:then}
            Sign In
          {:catch}
            Sign In
          {/await}
        </button>
      </div>
    </form>
  </div>
</main>

<style lang="scss">
</style>
