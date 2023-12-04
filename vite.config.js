// Importing necessary modules from SvelteKit and Vitest
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

// Importing nodePolyfills plugin to provide Node.js polyfills in Vite
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// Define and export the configuration for the project
export default defineConfig({
  // Configuration for plugins
  plugins: [
    // Node.js polyfills to support specific global variables and modules
    nodePolyfills({
      // Exclude certain modules like 'fs' from the polyfills
      exclude: ['fs'],
      // Define global variables to be polyfilled
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      // Enable support for protocol-based imports
      protocolImports: true,
    }),
    // SvelteKit integration with Vite
    sveltekit(),
  ],
  // Configuration for optimizing dependencies
  optimizeDeps: {
    // Specify dependencies to include during optimization
    include: [
      'dayjs/plugin/relativeTime.js', // For handling relative time formats
      'dayjs', // Main Day.js library
      '@web3auth/ethereum-provider', // Ethereum provider for Web3Auth
    ],
  },
  // Configuration for testing with Vitest
  test: {
    // Include test files from the 'src' directory
    include: ['src/**/*.{test,spec}.{js,ts}'],
  },
});
