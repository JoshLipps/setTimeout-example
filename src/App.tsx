import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import usePoll from './hooks/usePoll';

const  App = () => {
  const [img, setImg] = useState(logo);

  usePoll(async()=>{
    console.log('UpdatingImage (Long wait)');
    setImg(`${logo}?v=${Date.now()}`);
    //Fake the download
    await wait(5000);
  }, 1000);


  return (
    <div>
      <img src={img} className="App-logo" alt="logo" />
    </div>
  );
}

export default App;


const wait = async (time: number) => await (new Promise(resolve => setTimeout(resolve,time)));