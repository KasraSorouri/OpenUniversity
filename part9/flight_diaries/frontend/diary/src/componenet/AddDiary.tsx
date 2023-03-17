import { useState } from "react"
import { NewDiary } from "../type";

const AddDiary = ({ createDiary }: {createDiary(object:NewDiary):void}) => {
  const [ date, setDate ] = useState('');
  const [ weather, setWeather ] = useState('');
  const [ visibility, setVisibility ] = useState('');
  const [ comment, setComment ] = useState('');

  const addDiary = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const object = {
      date : date,
      weather: weather,
      visibility: visibility,
      comment: comment
    };
    createDiary(object);
    setComment('');
    setDate('');
    setVisibility('');
    setWeather('');
  }

  return(
    <div>
      <form onSubmit={addDiary} >
        Date:
        <input 
          id='date'
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <br />Weather:
        <input 
          id='weather'
          value={weather}
          onChange={(event) => setWeather(event.target.value)}
        />
        <br />visibility:
        <input 
          id='visibility'
          value={visibility}
          onChange={(event) => setVisibility(event.target.value)}
        />
        <br />Comment:
        <input 
          id='comment'
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <br />
        <button type="submit">Add diary</button>
      </form>
    </div>
  );
};

export default AddDiary;