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
      rpcUrls: ['https://rpc.ankr.com/eth'],
      blockExplorerUrls: ['https://etherscan.io/'],
    },
    multicallAddress: '0x5Eb3fa2DFECdDe21C950813C665E9364fa609bD2',
    contractAddress: '0x4Ba7b3a95959b4BA085B8D4A84379e3AC63deDd4',
  },

  8080: {
    symbol: 'SHM',
    name: 'Shardeum',
    networkName: 'Ethereum',
    type: 'testnet',
    explorer: {
      name: 'Shardeum explorer',
      url: 'https://explorer-liberty10.shardeum.org/',
    },
    chainId: 1,
    rpcSettings: {
      chainId: `0x${parseInt(8080, 10).toString(16)}`,
      chainName: 'Shardeum Testnet',
      nativeCurrency: {
        name: 'Shardeum testnet',
        symbol: 'SHM',
        decimals: 18,
      },
      rpcUrls: ['https://liberty10.shardeum.org'],
      blockExplorerUrls: ['https://explorer-liberty10.shardeum.org/'],
    },
    multicallAddress: '0x828aDfa412CeD3C32D818A376a2B6ecE32C3de5c',
    contractAddress: '0x5e44068ad64849D6e03E8EFF7c4B98F711208d35',
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
      rpcUrls: ['https://bsc-dataseed.binance.org'],
      blockExplorerUrls: ['https://bscscan.com/'],
    },
    contractAddress: '0x5b7df34c9Ae0D587A7802779733ABD3769B88b54',
    multicallAddress: '0xB94858b0bB5437498F5453A16039337e5Fdc269C',
  },

  // 0xE3840856a94bB12Bde4951aeF796B56C4Cd915D9

  1666600000: {
    symbol: 'ONE',
    name: 'HARMONY',
    networkName: 'HARMONY',
    type: 'mainnet',
    explorer: {
      name: 'harmony-explorer',
      url: 'https://explorer.harmony.one',
    },
    chainId: 1666600000,
    rpcSettings: {
      chainId: `0x${parseInt(1666600000, 10).toString(16)}`,
      chainName: 'Harmony Mainnet',
      nativeCurrency: {
        name: 'Harmony coin',
        symbol: 'ONE',
        decimals: 18,
      },
      rpcUrls: ['https://api.harmony.one'],
      blockExplorerUrls: ['https://explorer.harmony.one/'],
    },
    contractAddress: '0x62C3506c089c8291f6d432d7F380bD59cdc2AAA5',
    multicallAddress: '0xE3840856a94bB12Bde4951aeF796B56C4Cd915D9',
  },
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
  4: {
    symbol: 'ETH',
    name: 'Rinkeby ETH',
    networkName: 'Rinkeby ETH',
    type: 'testnet',
    explorer: {
      name: 'etherscan',
      url: 'https://rinkeby.etherscan.io',
    },
    chainId: 4,
    rpcSettings: {
      chainId: `0x${parseInt(4, 10).toString(16)}`,
      chainName: 'Rinkeby Test Network',
      nativeCurrency: {
        name: 'Rinkeby Test Network',
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrls: ['https://main-light.eth.linkpool.io/'],
      blockExplorerUrls: ['https://rinkeby.etherscan.io/'],
    },
    multicallAddress: '0x31305e122b01EB35F695Ce3F6fFB15F0138a17cD',
    contractAddress: '0xcE044d06b439f6fEBe8c97B80f045eA8867cf3B0',
  },
  3: {
    symbol: 'ETH',
    name: 'Ropsten ETH',
    networkName: 'Ropsten ETH',
    type: 'testnet',
    explorer: {
      name: 'etherscan',
      url: 'https://ropsten.etherscan.io/',
    },
    chainId: 3,
    rpcSettings: {
      chainId: `0x${parseInt(3, 10).toString(16)}`,
      chainName: 'Ropsten Test Network',
      nativeCurrency: {
        name: 'Ropsten Test Network',
        symbol: 'ETH',
        decimals: 18,
      },
      rpcUrls: ['https://rinkeby-light.eth.linkpool.io'],
      blockExplorerUrls: ['https://ropsten.etherscan.io/'],
    },
    multicallAddress: '0x116b6Fff19f7Cf4D3A183a705C42434fb0e496d3',
    contractAddress: '0xE3840856a94bB12Bde4951aeF796B56C4Cd915D9',
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
      rpcUrls: ['https://rpc-mumbai.matic.today'],
      blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
    },
    multicallAddress: '0x116b6Fff19f7Cf4D3A183a705C42434fb0e496d3',
    contractAddress: '0xE3840856a94bB12Bde4951aeF796B56C4Cd915D9',
  },
};

export default networks;
