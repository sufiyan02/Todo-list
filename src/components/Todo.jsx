import React, { useState, useEffect } from 'react';
import './todo.css';

const Todo = () => {
    const [value, setValue] = useState('');
    const [arr, setArr] = useState([]);
    const [editIndex, setEditIndex] = useState(null);
    const [editValue, setEditValue] = useState('');

    // 📌 Load tasks from localStorage
    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        setArr(savedTasks);
    }, []);

    // 📌 Save tasks to localStorage whenever the list changes
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(arr));
    }, [arr]);

    // 📌 Auto-reset at midnight
    useEffect(() => {
        const now = new Date();
        const mid = new Date();
        mid.setHours(23, 59, 59, 999);

        const timeoutId = setTimeout(() => {
            localStorage.removeItem('tasks');
            setArr([]);
        }, mid - now);

        return () => clearTimeout(timeoutId);
    }, []);

    // ✅ Add a new task
    const dataset = (e) => {
        e.preventDefault();
        if (arr.includes(value)) {
            alert('Already exists');
            setValue('');
            return;
        } else if (value.trim() === '') {
            alert('Enter a value');
            return;
        } else {
            setArr([...arr, value]);
            setValue('');
        }
    };

    // ❌ Delete a task
    const delbtn = (task) => {
        setArr(arr.filter((item) => item !== task));
    };

    // ✏️ Start editing
    const startEdit = (index, task) => {
        setEditIndex(index);
        setEditValue(task);
    };

    // 💾 Save edited task
    const saveEdit = (index) => {
        if (editValue.trim() === '') {
            alert('Task cannot be empty!');
            return;
        }
        const updatedTasks = [...arr];
        updatedTasks[index] = editValue;
        setArr(updatedTasks);
        setEditIndex(null);
        setEditValue('');
    };

    return (
        <>
            <section className='container'>
                <header>
                    <h1>Todo List</h1>
                </header>
                <main>
                    <form onSubmit={dataset}>
                        <input
                            type="text"
                            name="task"
                            autoComplete="off"
                            placeholder="Enter a task"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                        <button type="submit">Add Task</button>
                    </form>

                    <ul>
                        {arr.map((data, index) => (
                            <li className='list-item' key={index}>
                                {editIndex === index ? (
                                    <>
                                        <input
                                            type="text"
                                            value={editValue}
                                            onChange={(e) => setEditValue(e.target.value)}
                                        />
                                        <button className='save-btn' onClick={() => saveEdit(index)}>💾 Save</button>
                                    </>
                                ) : (
                                    <>
                                        <span className='data'>{data}</span>
                                        <button className='edit-btn' onClick={() => startEdit(index, data)}>✏️</button>
                                        <button className='list-btn' onClick={() => delbtn(data)}>❌</button>
                                    </>
                                )}
                            </li>
                        ))}
                    </ul>
                </main>
            </section>
        </>
    );
};

export default Todo;
