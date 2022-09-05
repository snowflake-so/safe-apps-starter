import { SafeProvider } from '@snowflake-so/safe-apps-provider';
import React from 'react';
import BodyContent from './BodyContent';

type Props = {};

const ExampleSafeAppsProvider = (props: Props) => {
  return (
    <SafeProvider>
      <BodyContent />
    </SafeProvider>
  );
};

export default ExampleSafeAppsProvider;
