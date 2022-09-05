import { useSafe } from '@snowflake-so/safe-apps-provider';
import { Button, Divider } from 'antd';
import React, { useState } from 'react';

type Props = {};

const BodyContent = (props: Props) => {
  const { safe, sdk } = useSafe();
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
      <h2 style={{ color: 'white', fontWeight: 'bold' }}>Safe Info</h2>
      <h3>{JSON.stringify(safe.safeInfo, null, 4)}</h3>
      <Divider />
      <div>Success Response: {JSON.stringify(returnData, null, 4)}</div>
      <div>Error Response: {JSON.stringify(returnError, null, 4)}</div>
      <Divider />
      <div>
        <Button type="primary" size="large" onClick={handleCreateProposal}>
          Create a mock proposal
        </Button>
      </div>
    </div>
  );
};

export default BodyContent;
