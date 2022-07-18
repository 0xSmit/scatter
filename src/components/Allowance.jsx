import React, { useState } from 'react';
import BN from 'bignumber.js';
import Networks from 'constants/networks';
import erc20Abi from 'constants/abi/erc20';

const Allowance = ({ token, networkId, total, state, setState }) => {
  const [allowanceData, setAllowanceData] = useState({
    hash: '',
    status: '',
    type: '',
  });

  function renderAllowanceButton() {
    if (state.selectedToken == 'token' && BN(token.allowance).gte(BN(total))) {
      return (
        <>
          <h2>allowance</h2>
          <p class='small-caps'>the Smart Contract has permission to send these tokens from your wallet. You can revoke it anytime by pressing the revoke button.</p>
          <div className='transaction'>
            <input type='submit' value='revoke' className='secondary' onClick={() => changeAllowance('0')} />
            <div className='status'>
              <div style={{ display: 'none' }}></div>
              <div className={allowanceData.type}>{allowanceData.status}</div>
              <a className='hash' target='_blank' href={Networks[networkId].explorer.url + '/tx/' + allowanceData.hash}>
                {allowanceData.hash}
              </a>
            </div>
          </div>
        </>
      );
    } else if (state.selectedToken == 'token') {
      return (
        <>
          <h2>allowance</h2>
          <p>allow smart contract to transfer tokens on your behalf.</p>
          <div className='transaction'>
            <input type='submit' value='approve' onClick={() => changeAllowance('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')} />
            <div className='status'>
              <div style={{ display: 'none' }}></div>
              <div className={allowanceData.type}>{allowanceData.status}</div>
              <a className='hash' target='_blank' href={Networks[networkId].explorer.url + '/tx/' + allowanceData.hash}>
                {allowanceData.hash}
              </a>
            </div>
          </div>
        </>
      );
    }
  }

  const changeAllowance = async (amt) => {
    const Token = new state.web3.eth.Contract(erc20Abi, token.address);
    const tx = Token.methods.approve(Networks[networkId].contractAddress, amt).send({ from: state.address });
    setAllowanceData((prevState) => ({
      ...prevState,
      status: 'sign transaction on metamask',
      hash: '',
      type: 'pending',
    }));
    tx.once('error', (err) => {
      setAllowanceData((prevState) => ({
        ...prevState,
        status: 'transaction rejected',
        type: 'error',
      }));
    })
      .once('transactionHash', (hash) => {
        setAllowanceData((prevState) => ({
          ...prevState,
          status: 'transaction pending',
          type: 'pending',
          hash,
        }));
      })
      // .once('receipt', (receipt) => console.log(receipt));
      .then(async (tx) => {
        if (tx.status && tx.status == true) {
          let allowance = await Token.methods.allowance(state.address, Networks[networkId].contractAddress).call();
          allowance = BN(allowance).div(BN(10).pow(token.decimals)).toString();

          setState((prevState) => ({
            ...prevState,
            token: {
              ...token,
              allowance,
            },
          }));

          setAllowanceData((prevState) => ({
            ...prevState,
            status: 'transaction success',
            type: 'success',
          }));
        }
      });
  };

  return <>{renderAllowanceButton()}</>;
};

export default Allowance;
