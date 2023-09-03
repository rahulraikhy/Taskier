import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import sendRequest from '../../utilities/send-request';
import InputField from './InputField';
import SelectField from './SelectField';
import TextAreaField from './TextAreaField';
import ErrorMessage from './ErrorMessage';

export default function NewTaskForm() {
    const navigate = useNavigate();
    const [newTask, setNewTask] = useState({
        task: '',
        status: '',
        urgency: '',
        description: ''
    });
    const [error, setError] = useState('');

    const { task, status, urgency, description } = newTask; // Destructuring state

    function handleChange(evt) {
        setNewTask(prevTask => ({ ...prevTask, [evt.target.name]: evt.target.value }));
        setError('');
    }

    async function handleSubmit(evt) {
        evt.preventDefault();

        try {
            const response = await sendRequest('/api/tasks', 'POST', newTask);
            console.log('New task added:', response);

            // Clear form inputs
            setNewTask({
                task: '',
                status: '',
                urgency: '',
                description: ''
            });

            navigate('/tasks');
        } catch (error) {
            setError('Error adding task. Please try again.');
            console.error('Error adding task:', error);
        }
    }

    return (
        <div className="container">
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <h3>New Task</h3>
                    <InputField label="Task" name="task" value={task} onChange={handleChange} />
                    <SelectField
                        label="Status"
                        name="status"
                        value={status}
                        onChange={handleChange}
                        options={[
                            { value: 'not started', label: 'Not Started' },
                            { value: 'In Progress', label: 'In Progress' },
                            { value: 'completed', label: 'Completed' },
                        ]}
                    />
                    <SelectField
                        label="Urgency"
                        name="urgency"
                        value={urgency}
                        onChange={handleChange}
                        options={[
                            { value: '1', label: '1' },
                            { value: '2', label: '2' },
                            { value: '3', label: '3' },
                            { value: '4', label: '4' },
                            { value: '5', label: '5' },
                        ]}
                    />
                    <TextAreaField label="Description" name="description" value={description} onChange={handleChange} />
                    <div className="form-group">
                        <button type="submit">Add Task</button>
                    </div>
                </form>
                <ErrorMessage message={error} />
            </div>
        </div>
    );
}