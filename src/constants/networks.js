let networks = {
  1: {
    symbol: 'ETH',
    name: 'Ethereum',
    networkName: 'Ethereum',
    type: 'mainnet',
    explorer: {
      name: 'etherscan',
      url: 'https://etherscan.io/',
    },
    chainId: 1,
    rpcSettings: {
      chainId: `0x${parseInt(1, 10).toString(16)}`,
      chainName: 'Ethereum Mainnet',
      nativeCurrency: {
        name: 'Ethereum Mainnet',
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrls: ['https://eth.llamarpc.com'],
      blockExplorerUrls: ['https://etherscan.io/'],
    },
    multicallAddress: '0x5Eb3fa2DFECdDe21C950813C665E9364fa609bD2',
    contractAddress: '0x4Ba7b3a95959b4BA085B8D4A84379e3AC63deDd4',
  },
  10001: {
    symbol: 'ETHW',
    name: 'Ethereum POW',
    networkName: 'Ethereum POW',
    type: 'mainnet',
    explorer: {
      name: 'ethwscan',
      url: 'https://mainnet.ethwscan.com/',
    },
    chainId: 10001,
    rpcSettings: {
      chainId: `0x${parseInt(10001, 10).toString(16)}`,
      chainName: 'Ethereum POW',
      nativeCurrency: {
        name: 'Ethereum Mainnet',
        symbol: 'ETHW',
        decimals: 18,
      },
      rpcUrls: ['https://mainnet.ethereumpow.org'],
      blockExplorerUrls: ['https://mainnet.ethwscan.com/'],
    },
    multicallAddress: '0x5Eb3fa2DFECdDe21C950813C665E9364fa609bD2',
    contractAddress: '0x4Ba7b3a95959b4BA085B8D4A84379e3AC63deDd4',
  },
  137: {
    symbol: 'MATIC',
    name: 'MATIC',
    networkName: 'POLYGON',
    type: 'mainnet',
    explorer: {
      name: 'polygonscan',
      url: 'https://polygonscan.com',
    },
    chainId: 137,
    contractAddress: '0x0E3e12112Be56625C36EDF62aF0ff8Fc221d9D60',
    multicallAddress: '0xC3821F0b56FA4F4794d5d760f94B812DE261361B',
    rpcSettings: {
      chainId: `0x${parseInt(137, 10).toString(16)}`,
      chainName: 'Polygon Mainnet',
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
      },
      rpcUrls: ['https://polygon.llamarpc.com/'],
      blockExplorerUrls: ['https://polygonscan.com/'],
    },
  },
  56: {
    symbol: 'BNB',
    name: 'BSC',
    networkName: 'BSC',
    type: 'mainnet',
    explorer: {
      name: 'bscscan',
      url: 'https://bscscan.com',
    },
    chainId: 56,
    rpcSettings: {
      chainId: `0x${parseInt(56, 10).toString(16)}`,
      chainName: 'BSC Mainnet',
      nativeCurrency: {
        name: 'Binance Coin',
        symbol: 'BNB',
        decimals: 18,
      },
      rpcUrls: ['https://binance.llamarpc.com'],
      blockExplorerUrls: ['https://bscscan.com/'],
    },
    contractAddress: '0x5b7df34c9Ae0D587A7802779733ABD3769B88b54',
    multicallAddress: '0xB94858b0bB5437498F5453A16039337e5Fdc269C',
  },

  // 0xE3840856a94bB12Bde4951aeF796B56C4Cd915D9
  97: {
    symbol: 'BNB',
    name: 'BSC',
    networkName: 'BSC testnet',
    type: 'testnet',
    explorer: {
      name: 'bscscan',
      url: 'https://testnet.bscscan.com/',
    },
    chainId: 97,
    rpcSettings: {
      chainId: `0x${parseInt(97, 10).toString(16)}`,
      chainName: 'BSC testnet',
      nativeCurrency: {
        name: 'BSC Testnet',
        symbol: 'BSC',
        decimals: 18,
      },
      rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
      blockExplorerUrls: ['https://testnet.bscscan.com/'],
    },
    multicallAddress: '0xd22cc9d6DB74c23d083a32Ec0b4D23Da25D95Db8',
    contractAddress: '0xEFDcC78F733ac025F3b9eFBa186c315bAe2Bb3eF',
  },

  80001: {
    symbol: 'MATIC',
    name: 'Matic Mumbai',
    networkName: 'Matic Mumbai',
    type: 'testnet',
    explorer: {
      name: 'etherscan',
      url: 'https://mumbai.polygonscan.com/',
    },
    chainId: 80001,
    rpcSettings: {
      chainId: `0x${parseInt(3, 10).toString(16)}`,
      chainName: 'Matic Mumbai Test Network',
      nativeCurrency: {
        name: 'Matic Mumbai',
        symbol: 'MATIC',
        decimals: 18,
      },
      rpcUrls: ['https://rpc.ankr.com/polygon_mumbai'],
      blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
    },
    multicallAddress: '0x116b6Fff19f7Cf4D3A183a705C42434fb0e496d3',
    contractAddress: '0xE3840856a94bB12Bde4951aeF796B56C4Cd915D9',
  },
};

export default networks;
