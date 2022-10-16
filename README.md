# Safe Apps Starter

Check directory `examples` for examples on how to use libraries to integrate with Snowflake Safe.

## Approach 1: Using Wallet Adapter Snowflake

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

wallet.sendTransactions(
  transaction,
  null as any,
  {
    name: 'Mock proposal',
  } as any
);
```
### Sign a transaction
```typescript
const wallet = useWallet();

const transaction : Transaction = wallet.signTransaction(
  transaction,
);
```
### Sign a message
```typescript
const wallet = useWallet();

const message : Uint8Array = wallet.signMessage(
  message,
);
```
### Sign all transactions
```typescript
const wallet = useWallet();

const transactions : Transaction[] = wallet.signAllTransactions(
  transactions,
);
```

## Approach 2: Using overridden packages

### 1. Connect your app to Snowflake Safe

Pick a library which is suitable with your current app. This library allows Snowflake Safe to connect to your app as a wallet. You can visit these directory in `examples` to see how to implement using a specific library

#### `safe-adapter-react`

Commonly, most projects will connect to Solana wallets using a library provided by Solana Labs `@solana/safe-adapter-react`. If your project also use the library to connect to wallet, please use `@snowflake-safe/safe-adapter-react` library to connect to your wallet

- View example: [example/safe-adapter-react](https://github.com/snowflake-so/safe-apps-starter/tree/master/examples/safe-apps-example/src/example/safe-adapter-react)

#### `safe-saber-walletkit`

This is an overidden version of this library from Saber team (@saberhq/use-solana)[https://github.com/saber-hq/saber-common/tree/master/packages/use-solana]. If your project also use the library to connect to wallet, please use `@snowflake-safe/safe-saber-walletkit` library to connect to your wallet

- View example: [example/safe-saber-walletkit](https://github.com/snowflake-so/safe-apps-starter/tree/master/examples/safe-apps-example/src/example/safe-saber-walletkit)

#### `safe-apps-provider`

In case your app does not use any package above, you can use a Safe Apps Provider library, which is just a simple package uses React Context API

- View example: [example/safe-apps-provider](https://github.com/snowflake-so/safe-apps-starter/tree/master/examples/safe-apps-example/src/example/safe-apps-provider)

### 2. Create a proposal

Use a SDK from `@snowflake-so/safe-apps-provider` to create a multisig proposal

```typescript
import { useSafe } from '@snowflake-so/safe-apps-provider';

const ExampleComponent = () => {
  const walletCtx = useSafeWallet();
  const { sdk } = useSafe();
  const [returnData, setReturnData] = useState<any>({});
  const [returnError, setReturnError] = useState<any>({});

  const handleCreateProposal = async () => {
    try {
      const returnData = await sdk?.txs.createProposal({
        display: {
          proposalName: 'Safe Apps SDK Example',
        },
        executeInstructions: [],
        setupInstructions: [],
        signers: [],
      });
      setReturnData(returnData);
    } catch (error: any) {
      setReturnError(error);
    }
  };

  return <>{JSON.stringify(returnData, null, 4)}</>;
};
```

## Supported libraries

Browse the list below to see the suitable package:
| Component | Description | NPM Package | Status |
| --------------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |-----|
| Wallet Adapter Snowflake | Snowflake Safe Wallet Adapter for [Solana Wallet Adapter](https://github.com/solana-labs/wallet-adapter)| [@snowflake-so/wallet-adapter-snowflake](https://www.npmjs.com/package/@snowflake-so/wallet-adapter-snowflake) |[![npm](https://img.shields.io/npm/v/@snowflake-so/wallet-adapter-snowflake)](https://www.npmjs.com/package/@snowflake-so/wallet-adapter-snowflake)|
| React Provider | Provides React provider and context API to retrieve the data of the Safe from the child app | [@snowflake-so/safe-apps-provider](https://www.npmjs.com/package/@snowflake-so/safe-apps-provider) |[![npm](https://img.shields.io/npm/v/@snowflake-so/safe-apps-provider)](https://www.npmjs.com/package/@snowflake-so/safe-apps-provider)|
| Safe Saber Walletkit | Forked version of [@saberhq/use-solana](https://github.com/saber-hq/saber-common/tree/master/packages/use-solana) to provide Safe specialized hooks | [@snowflake-so/safe-saber-walletkit](https://www.npmjs.com/package/@snowflake-so/safe-saber-walletkit) |[![npm](https://img.shields.io/npm/v/@snowflake-so/safe-saber-walletkit)](https://www.npmjs.com/package/@snowflake-so/safe-saber-walletkit)|
| Safe Adapter React | Snowflake Safe integrated [Solana Wallet Adapter React](https://github.com/solana-labs/wallet-adapter)| [@snowflake-so/safe-adapter-react](https://www.npmjs.com/package/@snowflake-so/safe-adapter-react) |[![npm](https://img.shields.io/npm/v/@snowflake-so/safe-adapter-react)](https://www.npmjs.com/package/@snowflake-so/safe-adapter-react)|
| Safe Adapter React UI | Snowflake Safe integrated UI for [Solana Wallet Adapter React](https://github.com/solana-labs/wallet-adapter)| [@snowflake-so/safe-adapter-react-ui](https://www.npmjs.com/package/@snowflake-so/safe-adapter-react-ui) |[![npm](https://img.shields.io/npm/v/@snowflake-so/safe-adapter-react-ui)](https://www.npmjs.com/package/@snowflake-so/safe-adapter-react-ui)|

## Support

### Struggle with the SDK integration?

If you have any problem with using the SDK in your system, drop a question our Snowflake Discord #sdk to receive a support from our engineers.

### Find a bug or want to contribute to Snowflake?

If you find a bug or have any problem and idea while using the SDK, you can create an issue on SDK Github.
