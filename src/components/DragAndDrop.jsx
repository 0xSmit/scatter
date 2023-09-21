import React from 'react';
import XLSX from 'xlsx';

import { toast } from 'react-toastify';

const validtypes = ['text/csv', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

const DragAndDrop = ({ state, setState }) => {
  const { web3 } = state;
  const fileDrop = (e) => {
    e.preventDefault();
    setState((prevState) => ({ ...prevState, expandBox: false }));
    try {
      const file = e?.dataTransfer?.files[0] || e?.target?.files[0];
      if (file) {
        if (!validtypes.includes(file.type))
          return toast.error('Invalid file type, please upload a valid CSV or Excel file');
        const reader = new FileReader();
        reader.onload = (evt) => {
          try {
            const binaryData = evt.target.result;
            const wb = XLSX.read(binaryData, { type: 'binary' });
            console.log('here');
            let data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]], {
              raw: false,
              header: 1,
            });
            handleSheet(data);
          } catch (error) {
            toast.error(error.message);
          }
        };
        reader.readAsBinaryString(file);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleSheet = (data) => {
    const addressAmounts = [];
    if (!data.length) return toast.error('No data in the file');
    for (let item of data) {
      if (web3.utils.isAddress(item[0]) && parseFloat(item[1])) {
        addressAmounts.push([item[0], item[1].replaceAll(',', '')]);
      }
    }
    if (!addressAmounts.length) return toast.error('No data in the file');
    console.log(addressAmounts);

    setState((prevState) => ({ ...prevState, addressBox: '', addressAmounts }));
  };

  return (
    <module>
      <p className='small-caps'>
        Please use two columns only. Column one for addresses, column two for amounts to send. No other format will
        work.
      </p>
      {state.expandBox && (
        <div onDrop={fileDrop} className='drop-box'>
          {/* <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='upload-icon'>
            <path
              d='m14.7928932 11.5-3.1464466-3.14644661c-.1952621-.19526215-.1952621-.51184463 0-.70710678.1952622-.19526215.5118446-.19526215.7071068 0l4 3.99999999c.1952621.1952622.1952621.5118446 0 .7071068l-4 4c-.1952622.1952621-.5118446.1952621-.7071068 0-.1952621-.1952622-.1952621-.5118446 0-.7071068l3.1464466-3.1464466h-10.7928932c-.27614237 0-.5-.2238576-.5-.5s.22385763-.5.5-.5zm1.2071068-7c-.2761424 0-.5-.22385763-.5-.5s.2238576-.5.5-.5h3c1.3807119 0 2.5 1.11928813 2.5 2.5v12c0 1.3807119-1.1192881 2.5-2.5 2.5h-3c-.2761424 0-.5-.2238576-.5-.5s.2238576-.5.5-.5h3c.8284271 0 1.5-.6715729 1.5-1.5v-12c0-.82842712-.6715729-1.5-1.5-1.5z'
              transform='matrix(0 1 -1 0 24.5 -.5)'
            />
          </svg> */}
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 75 75' className='upload-icon'>
            <path d='M37,47.6a1,1,0,0,1-1-1v-1a1,1,0,1,1,2,0v1A1,1,0,0,1,37,47.6Z'></path>
            <path d='M28,63H25.9a1,1,0,0,1,0-2H28a1,1,0,0,1,0,2Zm-8.2,0H17.7a1,1,0,0,1,0-2h2.1a1,1,0,0,1,0,2Zm-8.3,0h-2a1,1,0,0,1,0-2h2a1,1,0,0,1,0,2Zm22.6-.2a1,1,0,0,1-.9-.7,1,1,0,0,1,.6-1.3,5.7,5.7,0,0,0,1.3-.8,1,1,0,0,1,1.5,1.3,5.5,5.5,0,0,1-2.1,1.4ZM3.4,62.6H3a6.4,6.4,0,0,1-2-1.6,1.1,1.1,0,0,1,.2-1.4.9.9,0,0,1,1.4.2,5.8,5.8,0,0,0,1.2,1A1,1,0,0,1,4.3,62,1.1,1.1,0,0,1,3.4,62.6ZM37,55.8a1,1,0,0,1-1-1V52.7a1,1,0,0,1,2,0v2.1A1,1,0,0,1,37,55.8ZM1,55.3a1,1,0,0,1-1-1V52.2a1,1,0,0,1,2,0v2.1A1,1,0,0,1,1,55.3Zm0-8.2a1,1,0,0,1-1-1V44a.9.9,0,0,1,1-1,.9.9,0,0,1,1,1v2.1A1,1,0,0,1,1,47.1Zm0-8.3a.9.9,0,0,1-1-1v-2a.9.9,0,0,1,1-1,.9.9,0,0,1,1,1v2A.9.9,0,0,1,1,38.8Zm0-8.2a.9.9,0,0,1-1-1v-2a.9.9,0,0,1,1-1,.9.9,0,0,1,1,1v2A.9.9,0,0,1,1,30.6Zm.1-8.2H.9a1,1,0,0,1-.8-1.2,7,7,0,0,1,1.1-2.3,1,1,0,0,1,1.4-.1,1,1,0,0,1,.1,1.4,3.5,3.5,0,0,0-.6,1.4A1,1,0,0,1,1.1,22.4ZM9.7,19h-2a1,1,0,1,1,0-2h2a1,1,0,0,1,0,2Z'></path>
            <path d='M16.9,19h-1a1,1,0,1,1,0-2h1a1,1,0,0,1,0,2Z'></path>
            <path d='M46.9,54.6h-.5a2.1,2.1,0,0,1-1.5-1.4L38.1,32.3a2.9,2.9,0,0,1,0-1.3,2.1,2.1,0,0,1,2.7-1.4h0l21.7,6.5a1.9,1.9,0,0,1,1.4,1.5,2.1,2.1,0,0,1-.6,2.1l-4,3.8L62.8,47a2.2,2.2,0,0,1,0,3l-3.7,3.7a2.2,2.2,0,0,1-3,0l-3.6-3.6L48.4,54A2,2,0,0,1,46.9,54.6ZM40.1,31.5a.1.1,0,0,0-.1.1l6.8,20.9a.1.1,0,0,0,.1.1c.1,0,.1,0,.1-.1l5.5-5.2,5,5h.2l3.7-3.7h0l-4.9-5L62,38.2h0a.1.1,0,0,0-.1-.1L40.2,31.5Z'></path>
            <path d='M53.8,11.3,43.6,1.2A3.6,3.6,0,0,0,40.8,0H21a4,4,0,0,0-4,4V42a4,4,0,0,0,4,4H42.6l-.7-2H21a2,2,0,0,1-2-2V4a2,2,0,0,1,2-2H40.2v9a4,4,0,0,0,4,4H53V33.2l2,.6V14.2A4,4,0,0,0,53.8,11.3ZM42.2,11V2.6h0L52.4,12.7l.2.3H44.2A2,2,0,0,1,42.2,11Z'></path>
          </svg>
          <h2>drag csv file here or click here to upload</h2>
        </div>
      )}
      <div onDrop={fileDrop} className={state.expandBox == true ? 'drop-box expand-box' : 'drop-box'}>
        <input type='file' value='' onChange={fileDrop} />

        {state.expandBox == true ? (
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' className='upload-icon'>
            <path
              d='m14.7928932 11.5-3.1464466-3.14644661c-.1952621-.19526215-.1952621-.51184463 0-.70710678.1952622-.19526215.5118446-.19526215.7071068 0l4 3.99999999c.1952621.1952622.1952621.5118446 0 .7071068l-4 4c-.1952622.1952621-.5118446.1952621-.7071068 0-.1952621-.1952622-.1952621-.5118446 0-.7071068l3.1464466-3.1464466h-10.7928932c-.27614237 0-.5-.2238576-.5-.5s.22385763-.5.5-.5zm1.2071068-7c-.2761424 0-.5-.22385763-.5-.5s.2238576-.5.5-.5h3c1.3807119 0 2.5 1.11928813 2.5 2.5v12c0 1.3807119-1.1192881 2.5-2.5 2.5h-3c-.2761424 0-.5-.2238576-.5-.5s.2238576-.5.5-.5h3c.8284271 0 1.5-.6715729 1.5-1.5v-12c0-.82842712-.6715729-1.5-1.5-1.5z'
              transform='matrix(0 1 -1 0 24.5 -.5)'
            />
          </svg>
        ) : (
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 75 75' className='upload-icon'>
            <path d='M37,47.6a1,1,0,0,1-1-1v-1a1,1,0,1,1,2,0v1A1,1,0,0,1,37,47.6Z'></path>
            <path d='M28,63H25.9a1,1,0,0,1,0-2H28a1,1,0,0,1,0,2Zm-8.2,0H17.7a1,1,0,0,1,0-2h2.1a1,1,0,0,1,0,2Zm-8.3,0h-2a1,1,0,0,1,0-2h2a1,1,0,0,1,0,2Zm22.6-.2a1,1,0,0,1-.9-.7,1,1,0,0,1,.6-1.3,5.7,5.7,0,0,0,1.3-.8,1,1,0,0,1,1.5,1.3,5.5,5.5,0,0,1-2.1,1.4ZM3.4,62.6H3a6.4,6.4,0,0,1-2-1.6,1.1,1.1,0,0,1,.2-1.4.9.9,0,0,1,1.4.2,5.8,5.8,0,0,0,1.2,1A1,1,0,0,1,4.3,62,1.1,1.1,0,0,1,3.4,62.6ZM37,55.8a1,1,0,0,1-1-1V52.7a1,1,0,0,1,2,0v2.1A1,1,0,0,1,37,55.8ZM1,55.3a1,1,0,0,1-1-1V52.2a1,1,0,0,1,2,0v2.1A1,1,0,0,1,1,55.3Zm0-8.2a1,1,0,0,1-1-1V44a.9.9,0,0,1,1-1,.9.9,0,0,1,1,1v2.1A1,1,0,0,1,1,47.1Zm0-8.3a.9.9,0,0,1-1-1v-2a.9.9,0,0,1,1-1,.9.9,0,0,1,1,1v2A.9.9,0,0,1,1,38.8Zm0-8.2a.9.9,0,0,1-1-1v-2a.9.9,0,0,1,1-1,.9.9,0,0,1,1,1v2A.9.9,0,0,1,1,30.6Zm.1-8.2H.9a1,1,0,0,1-.8-1.2,7,7,0,0,1,1.1-2.3,1,1,0,0,1,1.4-.1,1,1,0,0,1,.1,1.4,3.5,3.5,0,0,0-.6,1.4A1,1,0,0,1,1.1,22.4ZM9.7,19h-2a1,1,0,1,1,0-2h2a1,1,0,0,1,0,2Z'></path>
            <path d='M16.9,19h-1a1,1,0,1,1,0-2h1a1,1,0,0,1,0,2Z'></path>
            <path d='M46.9,54.6h-.5a2.1,2.1,0,0,1-1.5-1.4L38.1,32.3a2.9,2.9,0,0,1,0-1.3,2.1,2.1,0,0,1,2.7-1.4h0l21.7,6.5a1.9,1.9,0,0,1,1.4,1.5,2.1,2.1,0,0,1-.6,2.1l-4,3.8L62.8,47a2.2,2.2,0,0,1,0,3l-3.7,3.7a2.2,2.2,0,0,1-3,0l-3.6-3.6L48.4,54A2,2,0,0,1,46.9,54.6ZM40.1,31.5a.1.1,0,0,0-.1.1l6.8,20.9a.1.1,0,0,0,.1.1c.1,0,.1,0,.1-.1l5.5-5.2,5,5h.2l3.7-3.7h0l-4.9-5L62,38.2h0a.1.1,0,0,0-.1-.1L40.2,31.5Z'></path>
            <path d='M53.8,11.3,43.6,1.2A3.6,3.6,0,0,0,40.8,0H21a4,4,0,0,0-4,4V42a4,4,0,0,0,4,4H42.6l-.7-2H21a2,2,0,0,1-2-2V4a2,2,0,0,1,2-2H40.2v9a4,4,0,0,0,4,4H53V33.2l2,.6V14.2A4,4,0,0,0,53.8,11.3ZM42.2,11V2.6h0L52.4,12.7l.2.3H44.2A2,2,0,0,1,42.2,11Z'></path>
          </svg>
        )}

        <h2>{state.expandBox == true ? 'drop here' : 'drag csv file here or click here to upload'}</h2>
      </div>
    </module>
  );
};

export default DragAndDrop;
