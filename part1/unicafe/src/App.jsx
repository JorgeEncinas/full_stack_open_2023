import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const DisplayStat = ({stat}) => {
  //console.log(stat)
  return (
    <>
    <h3>{stat.name}: <span>{stat.count}</span></h3>
    </>
  )
}

const DisplayStats = ({stats, stateChanged}) => {
  if (stateChanged) {
    return (
      <div>
        <DisplayStat stat={stats.good}/>
        <DisplayStat stat={stats.neutral}/>
        <DisplayStat stat={stats.bad}/>
        <DisplayStat stat={stats.total} />
        <DisplayStat stat={stats.average} />
        <DisplayStat stat={stats.positivePercentage} />
      </div>
    )
  } else {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [stateChanged, setStateChanged] = useState(false)

  const setStatistic = (caseString) => () => {
    switch(caseString) {
      case "good":
        setGood(good+1)
        break;
      case "neutral":
        setNeutral(neutral+1)
        break;
      case "bad":
        setBad(bad+1)
        break;
      default:
        console.log("nothing was done.")
        break;
    }
    setStateChanged(true)
    setTotal(total+1);
    calculateAverage()
    calculatePositivePercentage()
  }

  const calculateAverage = () => {
    return (good - bad) / Math.max(1, total)
  }

  const calculatePositivePercentage = () => {
    return (good * 100) / Math.max(1, total);
  }

  let stats = {
    good: {
      name:"good",
      count: good
    },
    neutral: {
      name:"neutral",
      count: neutral
    },
    bad: {
      name:"bad",
      count: bad
    },
    total: {
      name:"all",
      count: total
    },
    average: {
      name:"average",
      count:calculateAverage()
    },
    positivePercentage: {
      name:"positivepercentage",
      count:calculatePositivePercentage()
    }
  }

  //console.log("stats", stats)

  return (
    <>
    <h1>give feedback</h1> <br />
    <Button handleClick={setStatistic("good")} text="good" />
    <Button handleClick={setStatistic("neutral")} text="neutral" />
    <Button handleClick={setStatistic("bad")} text="bad" />
    <hr />
    <h1>Statistics</h1>
    <DisplayStats stats={stats} stateChanged={stateChanged} />
    </>
  )
}

export default App
