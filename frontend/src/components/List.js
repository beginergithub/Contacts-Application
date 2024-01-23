import { useState } from "react";
import Phone from './Phone';
import './List.css';

function Task(props) {
    {
        const [isEditing, setIsEditing] = useState(false);

        function handleEditing() {
            setIsEditing(!isEditing);
        }

        function onClick() {
            fetch(`http://localhost/api/contacts/${props.id}`, {
                method: 'DELETE'
            })
                .then(() => {
                    props.setTasks(tasks => tasks.filter(task => task.id !== props.id));
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }

        return (
            <li>
                <div className="task-item" onClick={handleEditing}> {props.name}
                    <button className="delete-button" type="button" onClick={onClick}> Delete </button> </div>
                {isEditing && <Phone id={props.id}
                />}
            </li>
        );
    }
};

function List(props) {
    const [newTask, setNewTask] = useState("");

    function onChange(event) {
        setNewTask(event.target.value);
    }

    function onClick() {
        fetch('http://localhost/api/contacts', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ name: newTask })
        })
            .then(response => response.json())
            .then(data =>
                props.setTasks(tasks => [...tasks, data])
            )
            .catch((error) => {
                console.error('Error:', error);
            });
        setNewTask("");
    }

    return (
        <div className="list-container">
            <div className="form">
                <h1>Contactor</h1>
                <h2>Contacts</h2>
                <div className="input-container">
                    <input type="text" value={newTask} placeholder="Enter contact name" onChange={onChange}></input>
                    <button className="create-button" type="button" onClick={onClick}> Create contact</button>
                </div>


                <div className="contact-list">
                    {props.tasks.map(task =>
                        <Task
                            key={task.id}
                            setTasks={props.setTasks}
                            id={task.id}
                            name={task.name} />)}
                </div>
            </div>
        </div>

    );
}
export default List;


