# Safe Apps Starter

Check directory `examples/wallet-adapter-snowflake` for examples on how to use libraries to integrate with Snowflake Safe.

## Using Wallet Adapter Snowflake
[![npm](https://img.shields.io/npm/v/@snowflake-so/wallet-adapter-snowflake)](https://www.npmjs.com/package/@snowflake-so/wallet-adapter-snowflake)

**Note**: The implemented application only works inner Snowflake Safe app.

It is very simple, you just have to add Snowflake Wallet Adapter to the `wallets` list attributes of the `WalletProvider` and it will work normally.

### Installation
```
npm install @snowflake-so/wallet-adapter-snowflake
```
or
```
yarn add @snowflake-so/wallet-adapter-snowflake
```
### Adding `SnowflakeSafeWalletAdapter` to `WalletProvider`
```tsx
import React, { FC, useMemo } from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { SnowflakeSafeWalletAdapter } from '@snowflake-so/wallet-adapter-snowflake';
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

export const Wallet: FC = () => {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(() => [new SnowflakeSafeWalletAdapter()], []);

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <WalletMultiButton />
          <WalletDisconnectButton />
          {/* Your app's components go here, nested within the context providers. */}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
```
### Sending transactions
```typescript
const wallet = useWallet();

const txId = await wallet.sendTransactions(
  transaction,
  null as any,
  {
    signers: [], // List of signers
    name: 'Mock proposal',
  } as any
);
```
or
```typescript
const wallet = useWallet();

wallet.setProposalName("Mock proposal");
wallet.setSigners(signers); // List of signers

const txId = await wallet.sendTransactions(
  transaction,
  connection
);
```
### Sign a transaction
```typescript
const wallet = useWallet();

wallet.setProposalName("Mock proposal");
wallet.setSigners(signers); // List of signers

const transaction : Transaction = await wallet.signTransaction(
  transaction,
);
```
### Sign a message
```typescript
const wallet = useWallet();

const message : Uint8Array = await wallet.signMessage(
  message,
);
```
### Sign all transactions
```typescript
const wallet = useWallet();

wallet.setProposalName("Mock proposal");
wallet.setSigners(signers); // List of signers

const transactions : Transaction[] = await wallet.signAllTransactions(
  transactions,
);
```
## Testing your app
The wallet adapter is designed to work only for apps integrating with Snowflake Safe. To test your app, please go to [Snowflake Safe Mainnet](https://safe.snowflake.so) or [Snowflake Safe Devnet](https:://safe-devnet.snowflake.so), select your safe and go to `Apps` tab and click on `Add custom app` to add your app locally to Snowflake Safe for testing.
## Deploy your app
For now, we don't have any official approach to deploy the app on Snowflake Safe. If you want to list your app on Snowflake, please go to our discord and contact for integration.

## Support

### Struggle with the SDK integration?

If you have any problem with using the SDK in your system, drop a question our Snowflake Discord #sdk to receive a support from our engineers.

### Find a bug or want to contribute to Snowflake?

If you find a bug or have any problem and idea while using the SDK, you can create an issue on SDK Github.
