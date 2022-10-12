import React from 'react';
import { AppContext } from './AppContext';
import BodyContent from './BodyContent';

type Props = {};

const ExampleWalletAdapterSnowflake = (props: Props) => {
  return (
    <AppContext>
      <BodyContent />
    </AppContext>
  );
};

export default ExampleWalletAdapterSnowflake;
