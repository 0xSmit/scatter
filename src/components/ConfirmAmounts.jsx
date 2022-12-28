import React, { useState, useEffect } from 'react';
import BN from 'bignumber.js';
import Allowance from './Allowance';
import Networks from 'constants/networks';
import { toast } from 'react-toastify';

import ScatterAbi from 'constants/abi/scatter';

const ConfirmAmounts = ({ state, setState }) => {
  let { addressAmounts, mainBalance, token, selectedToken, networkId, fee } = state;
  const balance = selectedToken == 'ether' ? mainBalance : token.balance;

  const network = Networks[networkId] || null;

  console.log(`AddressAmounts: ${JSON.stringify(addressAmounts)}`);
  let total = addressAmounts.reduce(function (acc, curr) {
    return acc.plus(BN(curr[1].replaceAll(',', '')));
  }, BN(0));

  if (selectedToken == 'ether') {
    total = total.plus(fee);
  }
  total = total.toString();

  const [sendData, setSendData] = useState({
    hash: '',
    status: '',
    type: '',
  });

  const [revertOnFail, setRevertOnFail] = useState(null);

  useEffect(() => {
    setSendData((prevState) => ({
      hash: '',
      status: '',
      type: '',
    }));
  }, [state.addressAmounts]);

  const handleChange = (e) => {
    switch (e.target.value) {
      case `yes`:
        setRevertOnFail(true);
        break;
      case `no`:
        setRevertOnFail(false);
        break;
    }
  };

  const remaining = BN(balance).minus(BN(total)).toString();

  const symbol = selectedToken == 'token' ? token.symbol : network.symbol;
  const feeSymbol = network.symbol;

  return (
    !!addressAmounts.length &&
    selectedToken != null && (
      <>
        <module>
          <div className='confirm-amounts'>
            <h2>confirm</h2>
            <div className='addresses'>
              <ul>
                <li className='accent'>
                  <div className='flex'>
                    <div>address</div>
                    <div className='expand' />
                    <div>amount</div>
                  </div>
                </li>
                {addressAmounts.map((el, ind) => (
                  <li key={ind}>
                    <div className='flex'>
                      <div>{el[0]}</div>
                      <div className='expand bar' />
                      <amount symbol='MATIC' decimals='18'>
                        <span>{el[1]} </span>
                        <span className='sc'>{symbol}</span>
                      </amount>
                    </div>
                  </li>
                ))}
                {fee > 0 && (
                  <li className='fees'>
                    <div className='flex'>
                      <div>scatter fees</div>
                      <div className='expand bar' />
                      <amount symbol='MATIC' decimals='18'>
                        <span>{fee}</span>
                        <span className='sc'>{' ' + feeSymbol}</span>
                      </amount>
                    </div>
                  </li>
                )}
              </ul>
              <ul>
                <li className='accent'>
                  <div className='flex'>
                    <div>total</div>
                    <div className='expand' />
                    <amount>
                      <span>{total} </span>
                      <span className='sc'>{symbol}</span>
                      {selectedToken != 'ether' && fee > 0 && (
                        <>
                          <span> + {fee} </span>
                          <span className='sc'>{feeSymbol}</span>
                        </>
                      )}
                    </amount>
                  </div>
                </li>
                <li className='accent'>
                  <div className='flex'>
                    <div>your balance</div>
                    <div className='expand' />
                    <amount>
                      <span>{balance} </span>
                      <span className='sc'>{symbol}</span>
                    </amount>
                  </div>
                </li>
                <li className='accent'>
                  <div className={remaining < 0 ? 'flex negative' : 'flex'}>
                    <div>remaining</div>
                    <div className='expand' />
                    <amount>
                      <span>{remaining} </span>
                      <span className='sc'>{symbol}</span>
                    </amount>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </module>
        <module className='revertonfail'>
          <div className='token-selector' onChange={handleChange}>
            <h2>in case of errors</h2>
            <p>Do you want to cancel the whole transaction if there are errors</p>
            <div className='chooser'>
              <input
                type='radio'
                id='yes'
                value='yes'
                name='revertOnfail'
                checked={revertOnFail === true ? true : false}
                onClick={handleChange}
                readOnly
              />
              <label htmlFor='yes'>Yes</label> <label>or</label>
              <input
                type='radio'
                id='no'
                value='no'
                name='revertOnfail'
                checked={revertOnFail === false ? true : false}
                onClick={handleChange}
                readOnly
              />
              <label htmlFor='no'>No</label>
            </div>
            <p className='label'>
              {revertOnFail == true &&
                `If any of the addresses are invalid or any transaction fails, the whole transaction will be cancelled.`}
            </p>
            <p className='label'>{revertOnFail == false && `All valid transactions will go through.`}</p>
          </div>
        </module>
        <div>
          <Allowance total={total} token={token} networkId={networkId} state={state} setState={setState} />
          {renderSendButton()}
        </div>
      </>
    )
  );

  async function send() {
    try {
      if (selectedToken == 'token') {
        const addresses = addressAmounts.map((el) => el[0]);
        const amounts = addressAmounts.map((el) => BN(el[1]).times(BN(10).pow(token.decimals)).toFixed());

        const Scatter = new state.web3.eth.Contract(ScatterAbi, network.contractAddress);
        await Scatter.methods
          .scatterEther(addresses, amounts, false)
          .estimateGas()
          .catch((err) => {
            if (err.message.includes('gas required exceeds allowance')) {
              throw new Error(
                `Amount of Gas required to send this transaction exceeds the "Block Gas limit" on the ${network.networkName} chain, try again with a lesser number of addresses.`
              );
            }
          });

        const tx = Scatter.methods
          .scatterTokenSimple(token.address, addresses, amounts, revertOnFail)
          .send({ from: state.address, value: state.web3.utils.toWei(fee, 'ether') });

        setSendData((prevState) => ({
          ...prevState,
          status: 'sign transaction on metamask',
          hash: '',
          type: 'pending',
        }));

        tx.once('error', (err) => {
          setSendData((prevState) => ({
            ...prevState,
            status: 'transaction rejected',
            type: 'error',
          }));
          toast.error(err.message);
        })
          .once('transactionHash', (hash) => {
            setSendData((prevState) => ({
              ...prevState,
              status: 'transaction pending',
              type: 'pending',
              hash,
            }));
            toast.warning('Transaction broadcasted to the blockchain');
          })
          // .once('receipt', (receipt) => console.log(receipt));
          .then(async (tx) => {
            if (tx.status && tx.status == true) {
              // setState((prevState) => ({
              //   ...prevState,
              //   token: {
              //     ...token,
              //     mainBalance,
              //   },
              // }));

              setSendData((prevState) => ({
                ...prevState,
                status: 'transaction success',
                type: 'success',
              }));
              toast.success('Transaction Successful');
            }
          });
      } else if (selectedToken == 'ether') {
        total = BN(total).times(BN(10).pow(18)).toString();
        const addresses = addressAmounts.map((el) => el[0]);
        const amounts = addressAmounts.map((el) => BN(el[1]).times(BN(10).pow(18)).toString());

        const Scatter = new state.web3.eth.Contract(ScatterAbi, network.contractAddress);

        const tx = Scatter.methods
          .scatterEther(addresses, amounts, revertOnFail)
          .send({ from: state.address, value: total });

        setSendData((prevState) => ({
          ...prevState,
          status: 'sign transaction on metamask',
          hash: '',
          type: 'pending',
        }));

        tx.once('error', (err) => {
          setSendData((prevState) => ({
            ...prevState,
            status: 'transaction rejected',
            type: 'error',
          }));
          toast.error(err.message);
        })
          .once('transactionHash', (hash) => {
            setSendData((prevState) => ({
              ...prevState,
              status: 'transaction pending',
              type: 'pending',
              hash,
            }));
            toast.warning('Transaction broadcasted to the blockchain');
          })
          // .once('receipt', (receipt) => console.log(receipt));
          .then(async (tx) => {
            if (tx.status && tx.status == true) {
              let mainBalance = await state.web3.eth.getBalance(state.address);
              setState((prevState) => ({
                ...prevState,
                token: {
                  ...token,
                  mainBalance,
                },
              }));
              setSendData((prevState) => ({
                ...prevState,
                status: 'transaction success',
                type: 'success',
              }));
              toast.success('Transaction Successful');
            }
            if (tx.status && tx.status == false) {
              setSendData((prevState) => ({
                ...prevState,
                status: 'transaction error',
                type: 'error',
              }));
            }
          });
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  function renderSendButton() {
    const isAllowed = BN(token.allowance).gte(BN(total));
    const hasBalance = remaining >= 0;
    const hasFeeBalance = mainBalance - fee >= 0;
    const allowed = isAllowed && hasBalance && hasFeeBalance && revertOnFail != null;

    if (state.selectedToken == 'token') {
      return (
        <>
          <div className='transaction'>
            <input type='submit' value='send' disabled={!allowed} onClick={send} />
            <div className='status'>
              <div style={{ display: 'none' }}></div>
              <div className={!allowed ? 'error' : sendData.type}>
                {!isAllowed
                  ? 'needs allowance'
                  : !hasFeeBalance
                  ? `not enough ${network.symbol.toLowerCase()} for fees`
                  : revertOnFail == null
                  ? `select one of the above`
                  : hasBalance
                  ? sendData.status
                  : 'not enough balance'}
              </div>
              <a className='hash' target='_blank' href={network.explorer.url + '/tx/' + sendData.hash}>
                {!isAllowed ? '' : sendData.hash}
              </a>
            </div>
          </div>
        </>
      );
    } else {
      // const canSend = hasBalance && send
      console.log(revertOnFail);
      return (
        <>
          {' '}
          <div className='transaction'>
            <input type='submit' value='send' disabled={!hasBalance || !(revertOnFail != null)} onClick={send} />
            <div className='status'>
              <div style={{ display: 'none' }}></div>
              <div className={hasBalance ? sendData.type : 'error'}>
                {hasBalance ? sendData.status : 'not enough balance'}
              </div>
              <a className='hash' target='_blank' href={network.explorer.url + '/tx/' + sendData.hash}>
                {hasBalance ? sendData.hash : sendData.hash}
              </a>
            </div>
            {/* <div className='status'>
              <div style={{ display: 'none' }}></div>
              <div className='pending'>transaction rejected</div>
              <a
                className='hash'
                target='_blank'
                href='https://explorer.matic.network/tx/0x1c402dd390d839d67a5629c25782afcdc51de81b9402d4d3715f803454554362'
              >
                0x1c402dd390d839d67a5629c25782afcdc51de81b9402d4d3715f803454554362
              </a>
            </div> */}
          </div>
        </>
      );
    }
  }
};

export default ConfirmAmounts;
