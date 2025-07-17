import { useWatchAsset } from 'wagmi'

function App() {
  const { watchAsset } = useWatchAsset()

  return (
    <button
      onClick={() => watchAsset({
        type: 'ERC20',
        options: {
          address: '0xa9a6A3626993D487d2Dbda3173cf58cA1a9D9e9f',
          symbol: 'WAGMI',
          decimals: 18,
        },
      })}
