import { useState } from "react"
import { NewDiary } from "../type";

const AddDiary = ({ createDiary }: {createDiary(object:NewDiary):void}) => {
  const [ date, setDate ] = useState('');
  const [ weather, setWeather ] = useState('sunny');
  const [ visibility, setVisibility ] = useState('great');
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
    setVisibility('great');
    setWeather('sunny');
  }

  return(
    <div>
      <h1>Add new entry</h1>
      <form onSubmit={addDiary} >
        Date:
        <input 
          type='date'
          id='date'
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
        <br />Weather:
        <input 
          type='radio'
          id='sunny'
          name='weather'
          value='sunny'
          onChange={(event)=> setWeather(event.target.value)}
        />
        <label htmlFor="sunny">sunny</label>
        <input 
          type='radio'
          id='rainy'
          name='weather'
          value='rainy'
          onChange={(event)=> setWeather(event.target.value)}
        />
        <label htmlFor="rainy">rainy</label>
        <input 
          type='radio'
          id='cloudy'
          name='weather'
          value='cloudy'
          onChange={(event)=> setWeather(event.target.value)}
        />
        <label htmlFor="cloudy">cloudy</label>
        <input 
          type='radio'
          id='stormy'
          name='weather'
          value='stormy'
          onChange={(event)=> setWeather(event.target.value)}
        />
        <label htmlFor="stormy">stormy</label>
        <input 
          type='radio'
          id='windy'
          name='weather'
          value='windy'
          onChange={(event)=> setWeather(event.target.value)}
        />
        <label htmlFor="windy">windy</label>
        <br />visibility:
        <input 
          type='radio'
          id='great'
          name='visibility'
          value='great'
          onChange={(event)=> setVisibility(event.target.value)}
        />
        <label htmlFor="great">great</label>
        <input 
          type='radio'
          id='good'
          name='visibility'
          value='good'
          onChange={(event)=> setVisibility(event.target.value)}
        />
        <label htmlFor="good">good</label>
        <input 
          type='radio'
          id='ok'
          name='visibility'
          value='ok'
          onChange={(event)=> setVisibility(event.target.value)}
        />
        <label htmlFor="ok">ok</label>
        <input 
          type='radio'
          id='poor'
          name='visibility'
          value='poor'
          onChange={(event)=> setVisibility(event.target.value)}
        />
        <label htmlFor="poor">poor</label>
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