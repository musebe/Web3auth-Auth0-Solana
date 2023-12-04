<script>
  import { onMount } from 'svelte';
  import { initializeWeb3Auth, loginWithBitbucket, logout } from '../lib/web3auth';

  onMount(async () => {
    try {
      console.log('Initializing Web3 Auth...');
      await initializeWeb3Auth();
      console.log('Web3 Auth initialized successfully.');
    } catch (error) {
      console.error('Web3 Auth initialization failed:', error);
    }
  });

  async function handleLogin() {
    try {
      console.log('Logging in with Bitbucket...');
      await loginWithBitbucket();
      console.log('Login successful.');
      // Handle login success
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login failure
    }
  }
</script>

<button on:click={handleLogin}>Login with Bitbucket</button> 

