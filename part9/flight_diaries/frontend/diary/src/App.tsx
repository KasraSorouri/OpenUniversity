import { useState, useEffect } from "react";
import { Diary, NewDiary } from "./type"; 
import Diaries from "./componenet/Diaries";
import AddDiary from "./componenet/AddDiary";
import diaryService from "./services/diaryService";
import Message from "./componenet/Message";
import { AxiosError } from "axios";

function App() {

  const [ diary, setDairy ] = useState<Diary[]>([])
  const [ message, setMessage ] = useState('')

  useEffect(() => {
    diaryService
      .getAllDiary()
      .then(data => setDairy(data))
  },[]);

  const createDiary = async(newObject : NewDiary) => {
    try{
      const data = await diaryService.addDiary(newObject)
      setDairy(diary.concat(data))
    } catch (e){
      const error = e as AxiosError;
      setMessage(error.response?.data as string);
      setTimeout(() => setMessage(''),5000);
    }
  }
    
  return (
    <div>
      <Message message={message} />
      <AddDiary createDiary={createDiary} />
      <Diaries diaries={diary} />
    </div>
  );
}

export default App;
