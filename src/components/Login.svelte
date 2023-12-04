<script>
  import { onMount } from 'svelte';
  import { login, uiConsole } from '../lib/web3auth';

  let loggedIn = false;

  onMount(async () => {
    try {
      const web3authProvider = await login();
      if (web3authProvider) {
        loggedIn = true;
      }
    } catch (error) {
      uiConsole(error);
    }
  });

  function handleLogin() {
    login().then((web3authProvider) => {
      if (web3authProvider) {
        loggedIn = true;
      }
    }).catch((error) => {
      uiConsole(error);
    });
  }
</script>

{#if loggedIn}
  <p>You are logged in.</p>
{:else}
  <button on:click={handleLogin}>Log In</button>
{/if}
