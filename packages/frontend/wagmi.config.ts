// wagmi.config.ts
import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import abi from './src/contracts/YourContract.json'

export default defineConfig({
  out: 'src/hooks/generated',
  plugins: [
    react({
      contracts: [
        {
          abi,
          name: 'YourContract',
          address: {
            1: '0xYourMainnetAddress',
            11155111: '0xYourSepoliaAddress',
          },
        },
      ],
    }),
  ],
})
