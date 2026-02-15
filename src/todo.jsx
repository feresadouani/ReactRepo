import { useState } from "react";

export default function Todo({ initialTodos = [] }) {
    const [todos, setTodos] = useState(initialTodos);
    const [taskName, setTaskName] = useState("");
    const [priority, setPriority] = useState("Moyenne");
    const [search, setSearch] = useState("");

    const addTask = () => {
        if (taskName.trim() === "") return;

        const newTask = {
            name: taskName,
            priority: priority,
            done: false,
        };

        setTodos([...todos, newTask]);
        setTaskName("");
    };

    const toggleDone = (index) => {
        const updated = [...todos];
        updated[index].done = !updated[index].done;
        setTodos(updated);
    };

    const deleteTask = (index) => {
        setTodos(todos.filter((_, i) => i !== index));
    };

    const filteredTodos = todos.filter((t) =>
        t.name.toLowerCase().includes(search.toLowerCase())
    );

    const completedCount = todos.filter((t) => t.done).length;

    return (
        <div>
            <h2>Todo List</h2>

            <input
                placeholder="Nom de la tâche"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
            />

            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option>Haute</option>
                <option>Moyenne</option>
                <option>Basse</option>
            </select>

            <button onClick={addTask}>Ajouter Tâche</button>

            <br /><br />

            <input
                placeholder="Rechercher..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <h3>Total: {todos.length}</h3>
            <h3>Terminées: {completedCount}</h3>

            <ul>
                {filteredTodos.map((task, index) => (
                    <li key={index}>
                        <span
                            style={{
                                textDecoration: task.done ? "line-through" : "none",
                            }}
                        >
                            {task.name} — {task.priority}
                        </span>

                        <button onClick={() => toggleDone(index)}>
                            {task.done ? "Annuler" : "Terminer"}
                        </button>

                        <button onClick={() => deleteTask(index)}>Supprimer</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
