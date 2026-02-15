import { useState } from 'react'
export default function ListManager({ initailitems = [] }) {
    const [items, setitems] = useState(initailitems);
    const handleDelete = (index) => {
        setitems(items.filter((_, i) => i !== index))
    }
    const [newItem, setNewItem] = useState("");
    const handleAdd = () => {
        setitems([...items, newItem])
        setNewItem("")
    }

    return (
        <>
            <h1>Liste Manager</h1>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item} <button onClick={() => handleDelete(index)}>Supprimer</button> </li>
                ))}
            </ul>
            <input type="text" onChange={(e) => setNewItem(e.target.value)} />
            <button onClick={handleAdd}>Ajouter</button>
        </>
    )
}
