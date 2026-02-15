import { useState } from 'react'
import './App.css'


export default function Counter({ step }) {
    const [count, setCount] = useState(0)

    const increment = () => {
        setCount(count + step)
    }
    const decrement = () => {
        setCount(count - step)
    }
    const reset = () => {
        setCount(0)
    }

    return (
        <>
            <div >Compteur</div>
            <button className='up' onClick={increment}> + </button>
            <button className='down' onClick={decrement}> - </button>
            <button className='reset' onClick={reset}> Reset </button>
            <div className='count'>{count}</div>

        </>
    )
}

