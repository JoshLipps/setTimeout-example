import React, { useCallback, useEffect, useRef, useState } from 'react';
import logo from './logo.svg';
import './App.css';
let i = 0;
const  App = () => {
  const [img, setImg] = useState(logo);
  const timeoutIDRef = useRef<ReturnType<typeof setTimeout>  | null>(null);
  const canceled = useRef<boolean>(false);

  const updateImg = useCallback(async()=>{
    const iteration = i;
    i += 1;
    if(timeoutIDRef.current !== null){
      console.log('Clearing previous',iteration, timeoutIDRef.current);
      clearTimeout(timeoutIDRef.current);
      timeoutIDRef.current = null;
    }
    console.log('UpdatingImage (Long wait)', iteration);
    setImg(`${logo}?v=${Date.now()}`);
    //Fake the download
    await wait(5000);


    //Start next one in the chain
    if(!canceled.current){
      console.log('Starting next timeout', iteration);
      timeoutIDRef.current = setTimeout(updateImg, 1000);
    }
  },[]);

  useEffect(()=>{

    updateImg();

    return () => {
      console.log('canceled');
      canceled.current = true;
      if(timeoutIDRef.current !== null){
        console.log('clearing final', timeoutIDRef.current);
        clearTimeout(timeoutIDRef.current);
        timeoutIDRef.current = null;
      }
    }
  },[updateImg])

  return (
    <div>
      <img src={img} className="App-logo" alt="logo" />
    </div>
  );
}

export default App;


const wait = async (time: number) => await (new Promise(resolve => setTimeout(resolve,time)));