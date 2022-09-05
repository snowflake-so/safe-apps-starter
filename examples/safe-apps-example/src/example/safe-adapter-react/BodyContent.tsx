import { useSafe } from '@snowflake-so/safe-apps-provider';
import { useSafeWallet } from '@snowflake-so/safe-adapter-react';
import { Button, Divider } from 'antd';
import React, { FC, useState } from 'react';
import { WalletDisconnectButton, WalletMultiButton } from '@snowflake-so/safe-adapter-react-ui';

export const BodyContent: FC = () => {
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

  return (
    <div
      style={{
        display: 'flex',
        textAlign: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
      }}>
      {walletCtx.connected ? (
        <React.Fragment>
          <h2 style={{ color: 'white', fontWeight: 'bold' }}>Connected wallet</h2>
          <p>{walletCtx.publicKey?.toString()}</p>
          <WalletDisconnectButton />
          <Divider />
          {walletCtx.isSafeApp && (
            <React.Fragment>
              <div>Success Response: {JSON.stringify(returnData, null, 4)}</div>
              <div>Error Response: {JSON.stringify(returnError, null, 4)}</div>
              <Divider />
              <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                <Button type="primary" size="large" onClick={handleCreateProposal}>
                  Create a mock proposal
                </Button>
              </div>
            </React.Fragment>
          )}
        </React.Fragment>
      ) : (
        <>
          <div>Wallet is not connected</div>
          <WalletMultiButton />
        </>
      )}
    </div>
  );
};
