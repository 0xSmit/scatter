import React from 'react';
import Networks from 'constants/networks';

const TokenSelector = ({ state: { selectedToken, networkId, mainBalance }, setState }) => {
  const handleChange = (e) => {
    setState((prevState) => ({
      ...prevState,
      selectedToken: e.target.value == selectedToken ? null : e.target.value,
    }));
  };

  const network = Networks[networkId];

  return (
    <module>
      <div className='token-selector'>
        <div className='chooser' onChange={handleChange}>
          <label>send</label>
          <input
            type='radio'
            value='ether'
            name='token-selector'
            id='ether'
            checked={selectedToken == 'ether' ? true : false}
            onClick={handleChange}
            readOnly
          />
          <label htmlFor='ether'>{network.symbol}</label> <label>or</label>
          <input
            type='radio'
            value='token'
            name='token-selector'
            id='token'
            checked={selectedToken == 'token' ? true : false}
            onClick={handleChange}
            readOnly
          />
          <label htmlFor='token'>token</label>
        </div>
        {!!(selectedToken == 'ether') && (
          <p>
            you have
            <amount symbol='USDC' decimals='6'>
              <span> {mainBalance} </span>
              <span className='sc'>{network.symbol}</span>
            </amount>
          </p>
        )}
      </div>
    </module>
  );
};

export default TokenSelector;
