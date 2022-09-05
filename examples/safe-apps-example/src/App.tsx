import React, { FC } from 'react';
import { Layout, Menu, Table, Tag } from 'antd';
import ExampleSafeAdapterReact from './example/safe-adapter-react';
import ExampleSafeSaberWalletKit from './example/safe-saber-walletkit';
import ExampleSafeAppsProvider from './example/safe-apps-provider';

const { Sider, Content } = Layout;

require('./App.css');
require('@solana/wallet-adapter-react-ui/styles.css');

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: string) => {
      let href: any = {
        'Safe Adapter React': 'https://www.npmjs.com/package/@snowflake-so/safe-adapter-react',
        'Safe Adapter React UI':
          'https://www.npmjs.com/package/@snowflake-so/safe-adapter-react-ui',
        'Safe Saber WalletKit': 'https://www.npmjs.com/package/@snowflake-so/safe-saber-walletkit',
        'Safe Apps Provider': 'https://www.npmjs.com/package/@snowflake-so/safe-apps-provider',
      }[text];
      return <a href={href}>{text}</a>;
    },
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (_: any, { tags }: any) => (
      <>
        {tags.map((tag: any) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag}
            </Tag>
          );
        })}
      </>
    ),
  },
];

const data: any[] = [
  {
    key: '0',
    name: 'Safe Apps Provider',
    description: 'React Provider and Context API for retrieving connected safe on Snowflake',
    tags: ['React', 'Context API'],
  },
  {
    key: '1',
    name: 'Safe Adapter React',
    description: 'Set of hooks to use with the library @solana/wallet-adapter-react',
    tags: ['React', '@solana/wallet-adapter-react'],
  },
  {
    key: '2',
    name: 'Safe Apps React UI',
    description: 'React UI component to connect with wallets using Safe Adapter React',
    tags: ['React', 'UI Component'],
  },
  {
    key: '3',
    name: 'Safe Saber WalletKit',
    description: 'Set of hooks to use with the library @saber/use-solana',
    tags: ['React', '@saber/use-solana'],
  },
];

const Landing = () => {
  return (
    <div>
      <h2 style={{ fontWeight: 'bold' }}>Safe Apps SDK Example</h2>
      <p>
        This contains examples of how to use the Safe Apps SDK for each specific supported
        libraries. <br /> Visit the SDK Github to find more information{' '}
        <a href={'https://github.com/snowflake-so/safe-apps-toolkit'}>Github</a>
      </p>
      <Table pagination={false} columns={columns} dataSource={data} />
    </div>
  );
};

const App: FC = () => {
  const [route, setRoutes] = React.useState('safe-adapter-react');
  return (
    <Layout>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            mode="inline"
            defaultSelectedKeys={[route]}
            items={[
              {
                key: 'landing',
                label: 'Home',
                onClick: () => setRoutes('landing'),
              },
              {
                key: 'safe-apps-provider',
                label: 'Safe Apps Provider',
                onClick: () => {
                  setRoutes('safe-apps-provider');
                },
              },
              {
                key: 'safe-adapter-react',
                label: 'Safe Adapter React',
                onClick: () => {
                  setRoutes('safe-adapter-react');
                },
              },
              {
                key: 'safe-saber-walletkit',
                label: 'Safe Saber WalletKit',
                onClick: () => {
                  setRoutes('safe-saber-walletkit');
                },
              },
            ]}
          />
        </Sider>
        <Layout>
          <Content>
            <div className="App">
              {route === 'landing' && <Landing />}
              {route === 'safe-apps-provider' && <ExampleSafeAppsProvider />}
              {route === 'safe-adapter-react' && <ExampleSafeAdapterReact />}
              {route === 'safe-saber-walletkit' && <ExampleSafeSaberWalletKit />}
            </div>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};
export default App;
