# Safe Apps Starter

Check directory `examples` for examples on how to use libraries to integrate with Snowflake Safe.

## Quick start guides
### 1. Connect your app to Snowflake Safe
Pick a library which is suitable with your current app. This library allows Snowflake Safe to connect to your app as a wallet. You can visit these directory in `examples` to see how to implement using a specific library
- Use `safe-adapter-react`: [example/safe-adapter-react](https://github.com/snowflake-so/safe-apps-starter/tree/master/examples/safe-apps-example/src/example/safe-adapter-react)
- Use `safe-saber-walletkit`: [example/safe-saber-walletkit](https://github.com/snowflake-so/safe-apps-starter/tree/master/examples/safe-apps-example/src/example/safe-saber-walletkit)
- Use `safe-apps-provider`: [example/https://github.com/snowflake-so/safe-apps-starter/tree/master/examples/safe-apps-example/src/example/safe-apps-provider]
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
  
  return <>{JSON.stringify(returnData, null, 4)}</>
}
```

## Supported libraries

Browse the list below to see the suitable package:
| Component | Description | NPM Package | Status |
| --------------------------- | ------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------- |-----|
| React Provider | Provides React provider and context API to retrieve the data of the Safe from the child app | [@snowflake-so/safe-apps-provider](https://www.npmjs.com/package/@snowflake-so/safe-apps-provider) |[![npm](https://img.shields.io/npm/v/@snowflake-so/safe-apps-provider)](https://www.npmjs.com/package/@snowflake-so/safe-apps-provider)|
| Safe Saber Walletkit | Forked version of [@saberhq/use-solana](https://github.com/saber-hq/saber-common/tree/master/packages/use-solana) to provide Safe specialized hooks | [@snowflake-so/safe-saber-walletkit](https://www.npmjs.com/package/@snowflake-so/safe-saber-walletkit) |[![npm](https://img.shields.io/npm/v/@snowflake-so/safe-saber-walletkit)](https://www.npmjs.com/package/@snowflake-so/safe-saber-walletkit)|
| Safe Adapter React | Snowflake Safe integrated [Solana Wallet Adapter React](https://github.com/solana-labs/wallet-adapter)| [@snowflake-so/safe-adapter-react](https://www.npmjs.com/package/@snowflake-so/safe-adapter-react) |[![npm](https://img.shields.io/npm/v/@snowflake-so/safe-adapter-react)](https://www.npmjs.com/package/@snowflake-so/safe-adapter-react)|
| Safe Adapter React UI | Snowflake Safe integrated UI for [Solana Wallet Adapter React](https://github.com/solana-labs/wallet-adapter)| [@snowflake-so/safe-adapter-react-ui](https://www.npmjs.com/package/@snowflake-so/safe-adapter-react-ui) |[![npm](https://img.shields.io/npm/v/@snowflake-so/safe-adapter-react-ui)](https://www.npmjs.com/package/@snowflake-so/safe-adapter-react-ui)|

## Support

### Struggle with the SDK integration?

If you have any problem with using the SDK in your system, drop a question our Snowflake Discord #sdk to receive a support from our engineers.

### Find a bug or want to contribute to Snowflake?

If you find a bug or have any problem and idea while using the SDK, you can create an issue on SDK Github.
