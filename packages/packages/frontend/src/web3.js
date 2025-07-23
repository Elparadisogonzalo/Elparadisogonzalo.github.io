import { InjectedConnector } from '@web3-react/injected-connector';

export const injected = new InjectedConnector({
  supportedChainIds: [1, 56, 137, 80001], // Ethereum, BSC, Polygon, Mumbai
});
