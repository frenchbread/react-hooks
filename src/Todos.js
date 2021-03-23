import React, { useState, useRef, useEffect } from 'react'

import './Todos.css'

function Todos () {
  const [todos, setTodos] = useState([])
  const [took, setTook] = useState(0)
  const [stats, setStat] = useState([])
  const inputElem = useRef(null)
  const goAgainBtn = useRef(null)

  function addTodo (e) {
    e.preventDefault()

    const { value } = e.target.input_num

    setTodos(todos.concat({ text: value, created_at: Date.now(), has_mistake: hasMistake(todos.length, value) }))

    inputElem.current.value = ''
  }

  function goAgain () {
    setStat(stats.concat({
      created_at: Date.now(),
      took,
      mistakes: todos.filter(todo => todo.has_mistake).length,
      symbols: todos.map(todo => todo.text).join(' ').length,
      speed: todos.map(todo => todo.text).join(' ').length / took
    }))

    setTodos([])
    setTook(0)
  }

  function hasMistake (index, text) {
    text = text.toLowerCase()

    if (index === 0 && text !== 'one') return true
    if (index === 1 && text !== 'two') return true
    if (index === 2 && text !== 'three') return true
    if (index === 3 && text !== 'four') return true
    if (index === 4 && text !== 'five') return true
    if (index === 5 && text !== 'six') return true
    if (index === 6 && text !== 'seven') return true
    if (index === 7 && text !== 'eight') return true
    if (index === 8 && text !== 'nine') return true
    if (index === 9 && text !== 'ten') return true

    return false
  }

  function calculatePoints (stat) {
    return stat.symbols * stat.speed / ((stat.mistakes + 1) * stat.took)
  }

  useEffect(() => {
    if (inputElem.current) inputElem.current.focus()
    if (goAgainBtn.current) goAgainBtn.current.focus()

    if (todos.length === 10) {
      setTook((todos[todos.length - 1].created_at - todos[0].created_at) / 1000)
    }
  }, [todos])

  return (
    <div className="todos">
      <h3>numbers</h3>

      <p>- type numbers in letters in the text box one to ten (e.g. "one", enter, "two", enter, etc.) until "ten" to get stats for your typing</p>

      <div className="flex-container">

        <div className="run-section">
          {
            todos.length < 10
            ?
            (
              <form onSubmit={addTodo}>
                <p>{todos.length + 1 + ' in letters'}: <input id="input_num" ref={inputElem} type="text" /></p>
              </form>
            )
            :
            (
              <p>
                <b>{took}</b> seconds & <b>{todos.filter(todo => todo.has_mistake).length}</b> mistakes
                <br />
                <b>{todos.map(todo => todo.text).join(' ').length}</b> symbols (with enter key)
                <br />
                <b>{todos.map(todo => todo.text).join(' ').length / took }</b> symbol(s) / sec
                <br />
                <button ref={goAgainBtn} onClick={goAgain}>go again</button>
              </p>
            )
          }


          <ul>
            {todos.map(todo => (<li key={todo.created_at} className={todo.has_mistake ? 'mistake' : ''}>{todo.text}</li>))}
          </ul>
        </div>

        <div className="stats-section">
          <h3>stats</h3>

          <table>
            <thead>
              <tr>
                <th>took (seconds)</th>
                <th>mistakes</th>
                <th>symbols</th>
                <th>speed (sybols / sec)</th>
                <th>points</th>
              </tr>
            </thead>
            <tbody>
              {Array.prototype.sort.call(stats, (a, b) => calculatePoints(b) - calculatePoints(a)).map(stat => (
                <tr key={stat.created_at}>
                  <td>{stat.took}</td>
                  <td>{stat.mistakes}</td>
                  <td>{stat.symbols}</td>
                  <td>{stat.speed}</td>
                  <td>{calculatePoints(stat)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  )

}

export default Todos
