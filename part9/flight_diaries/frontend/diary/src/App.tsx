import { useState, useEffect } from "react";
import { Diary } from "./type"; 
import axios from "axios";
import Diaries from "./componenet/Diaries";

function App() {

  const [ diary, setDairy ] = useState<Diary[]>([])

  useEffect(() => {
    axios.get('http://localhost:3002/api/diaries').then(response => {
    setDairy(response.data as Diary[])
    })
  },[]);
    console.log(diary);
    
  return (
    <div>
      <h1>Diary entries</h1>
      <Diaries diaries={diary} />
    </div>
  );
}

export default App;
