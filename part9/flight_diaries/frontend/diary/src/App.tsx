import { useState, useEffect } from "react";
import { Diary, NewDiary } from "./type"; 
import Diaries from "./componenet/Diaries";
import AddDiary from "./componenet/AddDiary";
import diaryService from "./services/diaryService";

function App() {

  const [ diary, setDairy ] = useState<Diary[]>([])

  useEffect(() => {
    diaryService
      .getAllDiary()
      .then(data => setDairy(data))
  },[]);

  const createDiary = (newObject : NewDiary): void => {
    diaryService
      .addDiary(newObject)
      .then(data => {
        const newDairy = {
          id: data.id,
          date: data.date,
          visibility: data.visibility,
          weather: data.weather,
          commnet: data.comment,
        };
        setDairy(diary.concat(newDairy))
      })
  }
    
  return (
    <div>
      <h1>Diary entries</h1>
      <AddDiary createDiary={createDiary} />
      <Diaries diaries={diary} />
    </div>
  );
}

export default App;
