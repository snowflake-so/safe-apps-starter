import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Button } from 'antd';
import { PublicKey, Transaction } from '@solana/web3.js';

type Props = {};

export const instructions = [
  {
    programId: new PublicKey('ETwBdF9X2eABzmKmpT3ZFYyUtmve7UWWgzbERAyd4gAC'),
    data: Buffer.from('74b89fceb3e0b22a', 'hex'),
    keys: [
      {
        pubkey: new PublicKey('5jo4Lh2Z9FGQ87sDhUBwZjNZdL15MwdeT5WUXKfwFSZY'),
        isSigner: false,
        isWritable: false,
      },
    ],
  },
];

const BodyContent = (props: Props) => {
  const wallet = useWallet();
  const handleCreateProposal = () => {
    const transaction = new Transaction();
    transaction.instructions = instructions;
    wallet.sendTransaction(
      transaction,
      null as any,
      {
        name: 'Mock proposal',
      } as any
    );
  };
  return (
    <div className="App">
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <WalletMultiButton />
        <div style={{ margin: '20px 0px' }}>Wallet public key: {wallet?.publicKey?.toString()}</div>
        <div>
          <Button type="primary" size="large" onClick={handleCreateProposal}>
            Create a mock proposal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BodyContent;
