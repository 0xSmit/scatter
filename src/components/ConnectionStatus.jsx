import React from 'react';
import Networks from 'constants/networks';

const ConnectionStatus = (props) => {
  const { address, isInjected, connected, networkId } = props.state;

  const network = Networks[networkId];
  const supportedNetworks = Object.keys(Networks).map((el) => Networks[el]);
  // .filter(Boolean);

  const render = () => {
    switch (true) {
      case isInjected == false:
        return (
          <>
            <h2>Metamask Required</h2>
            <p>non-ethereum browser, consider installing metamask.</p>
          </>
        );
      case connected == false:
        return (
          <>
            <h2>Please connect Metamask - </h2>
            <p>
              <input type='submit' value='connect' onClick={() => props.connectWallet(window.ethereum)} />
            </p>
          </>
        );
      case connected == true && networkId != 0:
        return (
          <>
            <h2>connected</h2>
            <p>logged in as {address}</p>
          </>
        );
      case connected == true && networkId == 0:
        return (
          <>
            <h2>unsupported network</h2>
            <p className='small-caps'>
              scatter currently supports{' '}
              {supportedNetworks.map((el, ind) => {
                return (
                  <span key={ind}>
                    <span className='network-name' onClick={() => switchNetwork(el.chainId)}>
                      {el.networkName}
                    </span>
                    ,{' '}
                  </span>
                );
              })}{' '}
              networks
            </p>
          </>
        );
      default:
        return <h1>Yo</h1>;
    }
  };
  const switchNetwork = async (chainId) => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: Networks[chainId].rpcSettings.chainId }],
      });
    } catch (error) {
      if (error.code === 4902) {
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [Networks[chainId].rpcSettings],
        });
      }
    }
  };
  return (
    <module>
      <div className='connection'>{render()}</div>
    </module>
  );
};

export default ConnectionStatus;
