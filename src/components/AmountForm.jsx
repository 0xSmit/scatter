import React from 'react';
import Networks from 'constants/networks';
import DragAndDrop from 'components/DragAndDrop';

const AmountForm = ({ state, setState }) => {
  const { selectedToken, token, addressBox, networkId } = state;
  const network = Networks[networkId] || null;

  const handleChange = (e) => {
    setState((prevState) => ({ ...prevState, addressBox: e.target.value }));
  };
  return (
    (selectedToken == 'ether' || (selectedToken == 'token' && token.decimals > 0)) && (
      <>
        <module>
          <div className='amount-form'>
            <h2>recipients and amounts</h2>
            <p>
              enter one address and amount in{' '}
              {selectedToken == 'token' ? token.symbol : network.symbol} on each line. supports any
              format.
            </p>
            <div className='shadow'>
              <textarea
                useRef='addresses'
                spellCheck='false'
                placeholder='0xC3821F0b56FA4F4794d5d760f94B812DE261361B   1.6180
                          0x271bffabd0f79b8bd4d7a1c245b7ec5b576ea98a,6.0221515
                          0x141ca95b6177615fb1417cf70e930e102bf8f584=3.141592'
                onChange={handleChange}
                name='addressForm'
                value={addressBox}
              />
            </div>
          </div>
        </module>

        <DragAndDrop state={state} setState={setState} />
      </>
    )
  );
};

export default AmountForm;
