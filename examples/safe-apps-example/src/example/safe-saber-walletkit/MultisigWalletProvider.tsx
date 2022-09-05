import { WalletKitProvider } from '@gokiprotocol/walletkit';
import { SafeProvider } from '@snowflake-so/safe-apps-provider';
import { SolanaProvider } from '@snowflake-so/safe-saber-walletkit';

const MultisigWalletProvider: React.FC = ({ children }: any) => {
  return (
    <WalletKitProvider
      defaultNetwork="devnet"
      app={{
        name: 'My App',
        icon: <img src="https://goki.so/assets/android-chrome-256x256.png" alt="icon" />,
      }}
      debugMode={true} // you may want to set this in REACT_APP_DEBUG_MODE
    >
      <SolanaProvider>
        <SafeProvider>{children}</SafeProvider>
      </SolanaProvider>
    </WalletKitProvider>
  );
};

export default MultisigWalletProvider;
