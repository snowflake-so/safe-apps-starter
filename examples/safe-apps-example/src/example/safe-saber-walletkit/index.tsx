import React from 'react';
import { BodyContent } from './BodyContent';
import MultisigWalletProvider from './MultisigWalletProvider';

type Props = {};

const ExampleSafeSaberWalletKit = (props: Props) => {
  return (
    <MultisigWalletProvider>
      <BodyContent />
    </MultisigWalletProvider>
  );
};

export default ExampleSafeSaberWalletKit;
