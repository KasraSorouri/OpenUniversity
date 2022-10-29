import {useState} from 'react'

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
   <div>
    <h1>give feedback</h1>
    <Button clickHandler={()=> setGood(good + 1)} text="good" />
    <Button clickHandler={()=> setNeutral(neutral + 1)} text="neutral" />
    <Button clickHandler={()=> setBad(bad + 1)} text="bad" />
    <Statistics good={good} neutral={neutral} bad={bad} />
   </div>
   
  );
}

export default App;

const Statistics = (props) => {
  const {good, neutral, bad} = props;
  let all = good+neutral+bad;

  if (all === 0) {
    return(
      <div>
       <h1>statistics</h1>
       <p>No feedback given</p>
      </div>
    )
  }

  return(
    <div>
    <h1 >statistics</h1>
    <table>
      <tbody>
      <StatisticLine text="Good" value={good} />
      <StatisticLine text="Neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="All" value={all} />
      <StatisticLine text="Average" value={(good * 1 + neutral * 0 + bad * -1)/all} />
      <StatisticLine text="Positive" value={good/all * 100 + "%"} />
      </tbody>
    </table>
    </div>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td><td>{value}</td>
    </tr>
  )
}

const Button = ({text, clickHandler}) => {
  return(
    <button onClick={clickHandler}>
      {text}
    </button>
  )
}