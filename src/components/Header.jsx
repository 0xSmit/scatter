import React from 'react';
import Networks from 'constants/networks';

import { ReactComponent as LogoImg } from '../logo.svg';

const Header = ({ state: { networkId } }) => {
  const network = Networks[networkId] || null;
  return (
    <module>
      <div className='header'>
        <logo>
          <LogoImg />
        </logo>
        <h1>
          scatter <sup>{network ? network.name + ' ' + network.type : '🤔'}</sup>
        </h1>
        <div className='expand' />
        <div>
          {network ? (
            <a target='_blank' href={network.explorer.url}>
              {network.explorer.name}
            </a>
          ) : null}
          {/* <a href='https://telegram.me/coincrunchin' target='_blank'>
            telegram
          </a> */}
        </div>
      </div>
    </module>
  );
};

export default Header;
