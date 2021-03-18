import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const  App = () => {


  useEffect(()=>{
    let i = 0;
    setInterval(async ()=>{
      const j = i;
      i += 1;
      console.log('starting', j);
      await wait(5000);
      console.log('finished', j);
    }, 1000);
  },[])

  return (
    <div>
      <img src={logo} className="App-logo" alt="logo" />
    </div>
  );
}

export default App;


const wait = async (time: number) => await (new Promise(resolve => setTimeout(resolve,time)));