import Task from './Task'
import {useState} from 'react'
import {FaSearch} from 'react-icons/fa'

const Tasks = ({ tasks, onDelete, onToggle }) => {

    const [q1, setQ1] = useState("")
    const [q2, setQ2] = useState("")
    const searchTask = (records) => {
        return records.filter(
            (record) => 
            record.text.indexOf(q1) > -1 &&
            record.day.indexOf(q2) > -1
        )
        
    }
    return (
        <>
            <div>
                <input value={q1} onChange={(e)=>setQ1(e.target.value)} placeholder="search task"></input>
                <input value={q2} onChange={(e)=>setQ2(e.target.value)} placeholder="search day"></input>
                <FaSearch className='searchIcon'/>
            </div>
            {searchTask(tasks).map((task) => (
                <Task key={task.id} task={task} 
                onDelete={onDelete} onToggle={onToggle}
                 />
            ))}
        </>
    )
}

export default Tasks
