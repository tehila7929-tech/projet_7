import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useResource } from '../../hooks/useResource';
import DataViewer from '../../components/DataViewer/DataViewer';
import './Todos.css';

export default function Todos() {
    const { id } = useParams();
    
    const { data: todos, add, remove, update, error, loading } = useResource('todos', { userId: id });

    const [addTodoInput, setAddTodoInput] = useState(false);
    const [newTodoTitle, setNewTodoTitle] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newTodoTitle) return;
        await add({ title: newTodoTitle, completed: false });
        setNewTodoTitle("");
        setAddTodoInput(false);
    };

    const handleSaveEdit = async (todoId) => {
        await update(todoId, { title: editTitle });
        setEditingId(null);
        setEditTitle("");
    };

    return (
        <div className="todos-container">
            <div className="todos-header">
                <button 
                    className={`add-todo-btn ${addTodoInput ? 'cancel' : ''}`}
                    onClick={() => setAddTodoInput(!addTodoInput)}
                >
                    {addTodoInput ? 'Cancel' : 'Add New Todo'}
                </button>

                {addTodoInput && (
                    <form className="add-todo-form" onSubmit={handleAdd}>
                        <input
                            type="text"
                            placeholder="Enter todo title..."
                            value={newTodoTitle}
                            onChange={(e) => setNewTodoTitle(e.target.value)}
                        />
                        <button type="submit">Save</button>
                    </form>
                )}
            </div>

            <DataViewer loading={loading} error={error} data={todos}>
                <div className="todos-list">
                    {todos.map(todo => (
                        <div key={todo.id} className="todo-item">
                            <span className="todo-id">#{todo.id}</span>
                            <input
                                type="checkbox"
                                className="todo-checkbox"
                                checked={todo.completed}
                                onChange={() => update(todo.id, { completed: !todo.completed })}
                            />
                            
                            {editingId === todo.id ? (
                                <>
                                    <input 
                                        className="todo-edit-input"
                                        type="text" 
                                        value={editTitle} 
                                        onChange={(e) => setEditTitle(e.target.value)} 
                                    />
                                    <div className="todo-actions">
                                        <button className="todo-btn save" onClick={() => handleSaveEdit(todo.id)}>Save</button>
                                        <button className="todo-btn cancel" onClick={() => setEditingId(null)}>Cancel</button>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <span className={`todo-content ${todo.completed ? 'completed' : ''}`}>{todo.title}</span>
                                    <div className="todo-actions">
                                        <button className="todo-btn edit" onClick={() => { setEditingId(todo.id); setEditTitle(todo.title); }}>Edit</button>
                                        <button className="todo-btn delete" onClick={() => remove(todo.id)}>Delete</button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </DataViewer>
        </div>
    );
}