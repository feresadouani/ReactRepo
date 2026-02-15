import { useState } from "react";

export default function Note({ initialNotes = [] }) {
    const [notes, setNotes] = useState(initialNotes);
    const [newNote, setNewNote] = useState("");

    const addNote = () => {
        const noteNumber = Number(newNote);

        if (noteNumber >= 0 && noteNumber <= 20) {
            setNotes([...notes, noteNumber]);
            setNewNote("");
        } else {
            alert("La note doit être entre 0 et 20");
        }
    };

    const deleteNote = (index) => {
        setNotes(notes.filter((_, i) => i !== index));
    };

    const average =
        notes.length > 0
            ? (notes.reduce((a, b) => a + b, 0) / notes.length).toFixed(2)
            : 0;

    return (
        <div>
            <h2>Gestion des Notes</h2>

            <input
                type="number"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Entrer une note"
            />

            <button onClick={addNote}>Ajouter</button>

            <ul>
                {notes.map((note, index) => (
                    <li key={index}>
                        {note}
                        <button onClick={() => deleteNote(index)}>Supprimer</button>
                    </li>
                ))}
            </ul>

            <h3>Moyenne : {average}</h3>
        </div>
    );
}
