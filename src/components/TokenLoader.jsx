import React, { useState, useEffect } from 'react';
import Networks from 'constants/networks';
import BN from 'bignumber.js';

import { MultiCall } from 'eth-multicall';

import erc20Abi from 'constants/abi/erc20';

const TokenLoader = ({ state: { selectedToken, token, web3, address, networkId }, setState }) => {
  const { address: tokenAddress, balance, symbol, name } = token;

  const network = Networks[networkId];
  const [loadMessage, setLoadMessage] = useState({
    message: '',
    type: '',
  });

  useEffect(() => {
    setLoadMessage({
      message: '',
      type: '',
    });
  }, [selectedToken]);

  const handleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      token: {
        ...token,
        address: e.target.value,
      },
    }));
  };

  useEffect(async () => {
    try {
      if (loadMessage.type == 'pending') {
        const multicall = new MultiCall(web3, network.multicallAddress);
        const Token = new web3.eth.Contract(erc20Abi, tokenAddress);
        let calls = [
          {
            tokenBalance: Token.methods.balanceOf(address),
            symbol: Token.methods.symbol(),
            name: Token.methods.name(),
            decimals: Token.methods.decimals(),
            allowance: Token.methods.allowance(address, Networks[networkId].contractAddress),
          },
        ];

        const [results] = await multicall.all([calls]);
        let { tokenBalance, symbol, name, decimals, allowance } = results[0];
        allowance = BN(allowance).div(BN(10).pow(decimals)).toString();
        tokenBalance = BN(tokenBalance).div(BN(10).pow(decimals)).toString();

        setState((prevState) => ({
          ...prevState,
          token: {
            ...token,
            balance: tokenBalance,
            allowance,
            symbol,
            name,
            decimals,
          },
        }));
        setLoadMessage({ message: '', type: 'loaded' });
      }
    } catch (error) {
      console.log(error);
      setLoadMessage({ message: 'unsupported token', type: 'error' });
    }
  }, [loadMessage.type]);

  const loadToken = async () => {
    setLoadMessage({ message: 'loading token info...', type: 'pending' });
  };

  const { message, type } = loadMessage;
  return (
    !!(selectedToken == 'token') && (
      <module>
        <div className='token-loader'>
          <h2>token address</h2>
          <div className='flex'>
            <input
              type='text'
              placeholder='0x89d24A6b4CcB1B6fAA2625fE562bDD9a23260359'
              value={token.address}
              onChange={handleChange}
            />
            <input type='submit' value='load' onClick={loadToken} />
          </div>
          <p className={type}>{message}</p>
          {!!(type == 'loaded') && (
            <p>
              you have
              <amount symbol='USDC' decimals='6'>
                <span> {balance} </span>
                <span className='sc'>{symbol}</span>
              </amount>
              <span> ( {name} )</span>{' '}
            </p>
          )}
        </div>
      </module>
    )
  );
};

export default TokenLoader;
