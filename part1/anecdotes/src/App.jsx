import { useState } from 'react'

const App = () => {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [voteDictionary, setVote] = useState({})
  const [voteArray, setVoteArr] = useState(new Uint8Array(anecdotes.length))

  const voteAnecdoteArr = () => {
    const voteCopyArr = [...voteArray]
    voteCopyArr[selected] += 1
    setVoteArr(voteCopyArr)
  }

  const changeSelect = () => {
    let selectedLocal = Math.floor((Math.random() * anecdotes.length))
    //console.log(selectedLocal)
    setSelected(selectedLocal)
  }

  const voteAnecdote = () => {
    const voteCopy = { ...voteDictionary}
    if (voteCopy[selected] === undefined) {
      voteCopy[selected] = 1
    } else (
      voteCopy[selected] = voteCopy[selected] + 1
    )
    setVote(voteCopy);
  }

  const displayVote = () => {
    if(voteDictionary[selected] === undefined){
      return 0
    } else {
      return voteDictionary[selected]
    }
  }

  const displayMostVoted = () => {
    //const voteCopyDict = {...voteDictionary}
    let mostVotedKey = 0
    let mostVotes = 0
    for(const [key, value] of Object.entries(voteDictionary)) {
      if (value > mostVotes) {
        mostVotedKey = key
        mostVotes = value
      }
    }
    if(mostVotes == 0) {
      return (
        <>
        <div>There's no "most voted" anecdote yet</div>
        </>
      )
    }
    return (
      <>
        <div>{anecdotes[mostVotedKey]}</div>
        <div>Votes: {mostVotes}</div>
      </>
    )
  }

  const displayMostVotedArr = () => {
    let mostVotedIndex = -1
    let mostVotes = -1
    voteArray.forEach((votes, index) => {
      if (votes > mostVotes) {
        mostVotedIndex = index
        mostVotes = votes
      }
    })
    if(mostVotes == 0) {
      return (
        <>
        <div>There's no "most voted" anecdote yet</div>
        </>
      )
    }
    return (
      <>
        <div>{anecdotes[mostVotedIndex]}</div>
        <div>Votes: {mostVotes}</div>
      </>
    )
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <button onClick={voteAnecdote}>Vote (Dict)</button>
      <button onClick={voteAnecdoteArr}>Vote (Arr)</button>
      <button onClick={changeSelect}>Random anecdote</button>
      <br />
      <div>Votes (Dict): <span>{displayVote()}</span></div>
      <div>Votes (Array): <span>{voteArray[selected]}</span></div>
      {anecdotes[selected]}
      <hr />
      <h1>Anecdote with most votes (Dict)</h1>
      <div>{displayMostVoted()}</div>
      <hr />
      <h1>Anecdote with most votes (Array)</h1>
      <div>{displayMostVotedArr()}</div>
    </div>
  )
}

export default App
