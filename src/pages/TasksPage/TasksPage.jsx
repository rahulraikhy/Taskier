import React from 'react';
import { useState, useEffect } from 'react';
import sendRequest from '../../utilities/send-request';
import './TasksPage.css';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function TasksPage() {
    const [tasks, setTasks] = useState([]);
    const [editTask, setEditTask] = useState(null);

    // const handleDragEnd = (result) => {
    //     if (!result.destination) return;

    //     const reorderedTasks = Array.from(tasks);
    //     const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    //     reorderedTasks.splice(result.destination.index, 0, movedTask);

    //     setTasks(reorderedTasks);
    // };

    useEffect(() => {
        async function fetchTasks() {
            try {
                const response = await sendRequest('/api/tasks', 'GET');
                setTasks(response.tasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        }
        fetchTasks();
    }, []);

    async function handleEditSubmit() {
        try {
            const response = await sendRequest(
                `/api/tasks/${editTask._id}`,
                'PUT',
                editTask
            );
            console.log('Task updated:', response.task);


            const updatedTasks = tasks.map((task) =>
                task._id === editTask._id ? response.task : task
            );
            setTasks(updatedTasks);
            setEditTask(null);
        } catch (error) {
            console.error('Error updating task:', error);
        }
    }

    async function handleDeleteTask(taskId) {
        try {
            const response = await sendRequest(`/api/tasks/${taskId}`, 'DELETE');
            console.log('Task deleted:', response);


            const updatedTasks = tasks.filter((task) => task._id !== taskId);
            setTasks(updatedTasks);
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    }


    return (
        <div className="tasks-page">
            <h1 className='title'>All Tasks</h1>

            <div className='task-cards-container'>
                {tasks.sort((a, b) => b.urgency - a.urgency).map((task) => (
                    <div
                        key={task._id}
                        className={`task-card urgency-${task.urgency} ${task.status === 'completed' ? 'completed-task-card' : ''}`}
                    >
                        <h3>{task.task}</h3>
                        <p><strong>Status:</strong> {task.status}</p>
                        <p><strong>Urgency:</strong> {task.urgency}</p>
                        <p><strong>Description:</strong> {task.description}</p>
                        <div className="card-actions">
                            <button className="edit-button" onClick={() => setEditTask(task)}>Edit</button>
                            <button className="remove-button" onClick={() => handleDeleteTask(task._id)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>


            {editTask && (
                <div className="edit-task-form">
                    <h2>Edit Task</h2>
                    <input
                        className='form-input'
                        type="text"
                        value={editTask.task}
                        onChange={(e) => setEditTask({ ...editTask, task: e.target.value })}
                    />
                    <select
                        value={editTask.status}
                        onChange={(e) => setEditTask({ ...editTask, status: e.target.value })}
                    >
                        <option value="not started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="completed">Completed</option>
                    </select>

                    <select
                        value={editTask.urgency}
                        onChange={(e) => setEditTask({ ...editTask, urgency: e.target.value })}
                    >
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <textarea
                        className='form-input'
                        value={editTask.description || ''}
                        onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                    ></textarea>
                    <button onClick={handleEditSubmit}>Save</button>
                </div>
            )}
        </div>
    );
}