import React from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Button } from 'antd';
import { Connection, PublicKey, Transaction, TransactionInstruction } from '@solana/web3.js';

type Props = {};

const makeTxn = async (
  instructions: TransactionInstruction[],
  feePayer: PublicKey
): Promise<Transaction> => {
  const connection = new Connection('https://api.mainnet-beta.solana.com');
  let transaction = new Transaction();
  instructions.forEach(instruction => transaction.add(instruction));
  const latestBlockhash = await connection.getLatestBlockhash('finalized');
  transaction.recentBlockhash = latestBlockhash.blockhash;
  transaction.lastValidBlockHeight = latestBlockhash.lastValidBlockHeight;
  transaction.feePayer = feePayer;

  return transaction;
};

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
  const handleCreateProposal = async () => {
    const _transaction = await makeTxn(instructions, wallet.publicKey as any);
    const txId = await wallet.sendTransaction(
      _transaction,
      null as any,
      {
        name: 'Mock proposal',
      } as any
    );

    console.log(txId);
  };

  const handleSignTransaction = async () => {
    const _transaction = await makeTxn(instructions, wallet.publicKey as any);
    if (wallet.signTransaction) {
      const transaction = await wallet.signTransaction(_transaction);
      console.log(transaction);
    }
  };

  const handleSignMessage = async () => {
    if (wallet.signMessage) {
      const message = await wallet.signMessage(Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]));
      console.log(message);
    }
  };

  const handleSignAllTransactions = async () => {
    const _transaction = await makeTxn(instructions, wallet.publicKey as any);
    if (wallet.signAllTransactions) {
      const transaction = await wallet.signAllTransactions([
        _transaction,
        _transaction,
        _transaction,
      ]);
      console.log(transaction);
    }
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
          <Button type="primary" size="large" onClick={handleSignTransaction}>
            Sign a transaction
          </Button>
          <Button type="primary" size="large" onClick={handleSignMessage}>
            Sign a message
          </Button>
          <Button type="primary" size="large" onClick={handleSignAllTransactions}>
            Sign all transactions
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BodyContent;
