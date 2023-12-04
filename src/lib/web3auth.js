// web3auth.js
import { Web3AuthNoModal } from '@web3auth/no-modal';
import { OpenloginAdapter } from '@web3auth/openlogin-adapter';
import { SolanaPrivateKeyProvider } from '@web3auth/solana-provider';
import { CHAIN_NAMESPACES } from '@web3auth/base';

console.log('Starting Web3Auth setup...');

const clientId =
  'BAxMb2KhVmD4HMcZFa_lir3rFiMZlSuEVMZ0jeE0WYJIfNPGnxT0ZOxyo3ZhSc-JpEz5InPziaaJXgbIGU8EUz0'; // Replace with your actual client ID
// console.log('Client ID:', clientId);

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.SOLANA,
  chainId: '0x3', // Replace with the correct chain ID
  rpcTarget: 'https://rpc.ankr.com/solana', // Replace with the correct RPC target
  displayName: 'Sapphire Devnet',
  blockExplorer: 'https://explorer.solana.com',
  ticker: 'SOL',
  tickerName: 'Solana',
};

let web3auth;
try {
  web3auth = new Web3AuthNoModal({
    clientId,
    chainConfig,
    web3AuthNetwork: 'sapphire_devnet',
  });
  console.log('Web3Auth instance created successfully');
} catch (error) {
  console.error('Error creating Web3Auth instance:', error);
}

const privateKeyProvider = new SolanaPrivateKeyProvider({
  config: { chainConfig },
});

// console.log('Private Key Provider set up');

const openloginAdapter = new OpenloginAdapter({
  adapterSettings: {
    uxMode: 'redirect',
    clientId:
      'BAxMb2KhVmD4HMcZFa_lir3rFiMZlSuEVMZ0jeE0WYJIfNPGnxT0ZOxyo3ZhSc-JpEz5InPziaaJXgbIGU8EUz0',
    loginConfig: {
      jwt: {
        verifier: 'svelte-solana',
        typeOfLogin: 'jwt',
        clientId: 'tAxzHQhxFyOMYHkoauwt0L9CfrY7okUe',
      },
    },
  },
  privateKeyProvider,
});

console.log('Openlogin Adapter configured');

web3auth.configureAdapter(openloginAdapter);

export async function initializeWeb3Auth() {
  console.log('Initializing Web3Auth...');
  try {
    await web3auth.init();
    console.log('Web3Auth initialized successfully');
  } catch (error) {
    console.error('Error initializing Web3Auth:', error);
  }
}

export async function loginWithBitbucket() {
  console.log('Attempting to login with Bitbucket...');
  try {
    await web3auth.connectTo('openlogin', {
      loginProvider: 'jwt',
      extraLoginOptions: {
        domain: 'https://dev-i8bj6jw3t2bw168f.us.auth0.com',
        verifierIdField: 'sub',
        connection: 'bitbucket',
      },
    });

    const user = await web3auth.getUserInfo();
    console.log('User info', user);
    console.log('Login with Bitbucket successful');
  } catch (error) {
    console.error('Error logging in with Bitbucket:', error);
  }
}

// Add a new logout function
export async function logout() {
  console.log('Attempting to logout...');
  try {
    await web3auth.logout();
    console.log('Logout successful');
  } catch (error) {
    console.error('Error during logout:', error);
  }
}


export default web3auth;
