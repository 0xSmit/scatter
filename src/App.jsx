import Web3 from 'web3';
import Networks from 'constants/networks';
import BN from 'bignumber.js';
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import ConnectionStatus from './components/ConnectionStatus';
import TokenSelector from './components/TokenSelector';
import TokenLoader from './components/TokenLoader';
import AmountForm from './components/AmountForm';
import ConfirmAmounts from './components/ConfirmAmounts';
import ScatterAbi from 'constants/abi/scatter';
import Footer from './components/Footer';

function App() {
  const [state, setState] = useState({
    isInjected: false,
    connected: false,
    address: 0,
    web3: null,
    networkId: 0,
    mainBalance: 0,
    tokenBalance: 0,
    fee: 0,
    addressBox: '',
    tokenBox: 0,
    allowance: 0,
    hash: null,
    transactionStatus: null,
    addressAmounts: [],
    selectedToken: null,
    token: {
      address: '',
      balance: 0,
      symbol: '',
      name: '',
      decimals: 0,
      allowance: 0,
    },
    expandBox: false,
  });

  useLayoutEffect(() => {
    if (window.ethereum) {
      setState((prevState) => ({
        ...prevState,
        isInjected: true,
      }));
      connectWallet(window.ethereum);
    }
  }, []);

  useEffect(() => {
    document.documentElement.addEventListener('dragenter', dragEnter);
    document.documentElement.addEventListener('dragleave', dragLeave);
  }, []);

  const dragEnter = (e) => {
    e.preventDefault();
    console.log('In Enter', e);
    if (state.expandBox == false) {
      setState((prevState) => ({ ...prevState, expandBox: true }));
    }
  };

  const dragLeave = (e) => {
    e.preventDefault();
    console.log(e);
    if (e.screenX == 0 && e.screenY == 0) {
      setState((prevState) => ({ ...prevState, expandBox: false }));
    }
  };

  useEffect(() => {
    let arr = state.addressBox.split('\n');
    const addrAmts = [];

    console.log('in first effect');

    for (let item of arr) {
      const temp = item.split(/[\s,=]/);
      if (temp.length === 2 && state.web3.utils.isAddress(temp[0]) && parseFloat(temp[1])) {
        addrAmts.push([temp[0], temp[1]]);
      }
    }

    setState((prevState) => ({ ...prevState, addressAmounts: addrAmts }));
  }, [state.addressBox]);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      addressAmounts: [],
      addressBox: '',
      token: { address: '', balance: 0, symbol: '', name: '', decimals: 0, allowance: 0 },
    }));
  }, [state.selectedToken]);

  useEffect(() => {
    setState((prevState) => ({ ...prevState, addressBox: '' }));
  }, [state.selectedToken]);

  async function connectWallet(provider) {
    try {
      const web3 = new Web3(provider);
      //Extend method to convert chainId from Hex to number
      web3.eth.extend({
        methods: [
          { name: 'chainId', call: 'eth_chainId', outputFormatter: web3.utils.hexToNumber },
        ],
      });

      function subscribeEvents() {
        // provider.on('disconnect', async () => {
        //   console.log('in disconnected');
        //   setState((prevState) => ({
        //     ...prevState,
        //     connected: false,
        //   }));
        // });
        // provider.on('connect', async () => {
        //   console.log('in connected');
        //   setState((prevState) => ({
        //     ...prevState,
        //     connected: true,
        //   }));
        // });
        provider.on('accountsChanged', async (accounts) => {
          console.log('in accounts change');
          if (accounts[0]) {
            setState((prevState) => ({
              ...prevState,
              connected: true,
              address: accounts[0],
            }));
            window.location.reload();
          } else {
            setState((prevState) => ({
              ...prevState,
              connected: false,
              address: 0,
            }));
          }
        });

        provider.on('chainChanged', async (chainId) => {
          console.log('in chain change');
          window.location.reload();
          // chainId = web3.utils.isHex(chainId) ? web3.utils.hexToNumber(chainId) : chainId;
          // setState((prevState) => ({
          //   ...prevState,
          //   networkId: Networks[chainId] ? chainId : 0,
          // }));
        });
      }

      subscribeEvents();

      const accounts = await web3.eth.requestAccounts();
      const address = accounts[0];
      let networkId = await web3.eth.getChainId();
      let mainBalance = await web3.eth.getBalance(address);
      mainBalance = BN(mainBalance).div(BN(10).pow(18)).toString();
      networkId = Networks[networkId] ? networkId : 0;
      if (networkId == 0)
        return setState((prevState) => ({
          ...prevState,
          connected: true,
          networkId,
          address,
          web3,
          mainBalance,
        }));
      const network = Networks[networkId];
      const Scatter = new web3.eth.Contract(ScatterAbi, network.contractAddress);
      let fee = await Scatter.methods.fee().call();
      fee = BN(fee).div(BN(10).pow(18)).toString();
      setState((prevState) => ({
        ...prevState,
        connected: true,
        networkId,
        address,
        web3,
        mainBalance,
        fee,
      }));
    } catch (err) {
      toast.error(err.message);
      console.log('error while connecting');
    }
  }

  const { connected, networkId } = state;

  return (
    <div className='main'>
      <div className='container'>
        <ToastContainer pauseOnFocusLoss={false} />
        <Header state={state} />
        <ConnectionStatus state={state} setState={setState} connectWallet={connectWallet} />
        {!!(connected == true && networkId) && (
          <>
            <TokenSelector state={state} setState={setState} />
            <TokenLoader state={state} setState={setState} />
            <AmountForm state={state} setState={setState} />
            <ConfirmAmounts state={state} setState={setState} />
          </>
        )}
      </div>
      <Footer className='footer' />
    </div>
  );
}

export default App;
