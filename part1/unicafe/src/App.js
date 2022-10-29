import {useState} from 'react'

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  let all = good+neutral+bad

  return (
   <div>
    <h1>give feedback</h1>
    <button onClick={()=> setGood(good + 1)}>good</button>
    <button onClick={()=> setNeutral(neutral + 1)}>neutral</button>
    <button onClick={()=> setBad(bad + 1)}>Bad</button>
    <h1>statistics</h1>
    <p>Good {good}</p>
    <p>Neutral {neutral}</p>
    <p>Bad {bad}</p>
    <p>All {all}</p>
    <p>Avrage {(good * 1 + neutral * 0 + bad * -1)/all}</p>
    <p>Positive {good/all * 100} %</p>
   </div>
   
  );
}

export default App;
