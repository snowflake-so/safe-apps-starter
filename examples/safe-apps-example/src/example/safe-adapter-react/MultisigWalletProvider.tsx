import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { ConnectionProvider } from '@solana/wallet-adapter-react';
import {
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from '@solana/web3.js';
import { FC, ReactNode, useMemo } from 'react';
import { SafeWalletProvider } from '@snowflake-so/safe-adapter-react';
import { WalletModalProvider } from '@snowflake-so/safe-adapter-react-ui';

export const MultisigWalletProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const network = WalletAdapterNetwork.Devnet;

  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new GlowWalletAdapter(),
      new SlopeWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new TorusWalletAdapter(),
    ],
    [network]
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SafeWalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children as any}</WalletModalProvider>
      </SafeWalletProvider>
    </ConnectionProvider>
  );
};
