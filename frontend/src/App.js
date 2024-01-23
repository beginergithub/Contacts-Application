import { useState, useEffect } from 'react';
import List from './components/List';
import './App.css';


function App() {

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        fetch('http://localhost/api/contacts')
            .then(response => response.json())
            .then(data => setTasks(data))
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    return (

        <div className='page'>
            <List tasks={tasks} setTasks={setTasks} />
        </div>
    )
}
export default App;
