import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Counter from './Counter.jsx'
import ListManager from './ListManager.jsx'
import Couleur from './Couleur.jsx'
import Note from './note.jsx'
import Todo from './todo.jsx'

function Button() {
  return (
    <button>Click Here</button>
  )
}

function App() {
  const [count, setCount] = useState(0)
  const [step, setStep] = useState(1)

  const name = "Feres";
  const colors = ["#FF0000", "#00FF00", "#0000FF", "#FFFF00", "#FF00FF"];

  return (
    <>
      {/*   <input type='number' onChange={(e) => setStep(Number(e.target.value))} value={step} />

      <Counter step={step} />
      <ListManager initailitems={["react", "angular", "java"]} />
      <h1>{name}</h1>
      <Button />
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat atque minima quia excepturi saepe rem cumque! Blanditiis accusamus, facilis, ullam amet quidem tempora dolores tempore sequi neque voluptas dignissimos aperiam!</p>
      */}
      <Couleur initialColor={colors[0]} colorOptions={colors} />
      <Note />
      <Todo
        initialTodos={[
          { name: "React révision", priority: "Haute", done: false },
          { name: "TP Angular", priority: "Moyenne", done: true },
        ]}
      />
    </>
  )
}

export default App
