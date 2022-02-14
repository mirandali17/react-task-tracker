import { useState, useEffect } from 'react'
import { useParams, Navigate, useNavigate, useLocation } from 'react-router-dom'
import Button from './Button'


const TaskDetails = () => {
    const [loading, setLoading] = useState(true)
    const [task, setTask] = useState({})
    const [error, setError] = useState(null)
    const params = useParams()
    const navigate = useNavigate()
    const {pathname} = useLocation()
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    // useEffect(() => {
    //     const fetchTask = async () => {
    //         const res = await fetch(`http://localhost:5000/tasks/${params.id}`)
    //         const data = await res.json()
    //         if(res.status===404) {
    //             navigate('/')
    //         }
    //         // setTask(data)
    //         setText(data.text)
    //         console.log(text)
    //         setLoading(false)
    //     }
    //     fetchTask()
    // })

    useEffect(() => {
        fetchTask();
    }, [])
    function fetchTask() {
        fetch(`http://localhost:5000/tasks/${params.id}`).then((res) => {
            res.json().then((data) => {
                setTask(data)
                setText(data.text)
                setDay(data.day)
                setReminder(data.reminder)
                console.log(data)
                setLoading(false)
            })
        })
    }
    
    function resetTask() {
        setText(task.text)
        setDay(task.day)
        setReminder(task.reminder)
    }
    
    const updateTask = async () => {
        
        
        const taskToUpdate = {...task, text: text, day: day, reminder: reminder}
        console.log(taskToUpdate)
        const res = await fetch(`http://localhost:5000/tasks/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(taskToUpdate)
        })
        alert('The task has been updated!')

    }
    
    
  return loading ? (
      <h3>Loading...</h3>
  ): (
      <div>
          <p>{pathname}</p>
         <div className="form-control">
          <label>Task</label>
          <input type="text" placeholder='edit task'
            value={text} onChange={(e) => setText(e.target.value)}
          />
          </div>
          <div className="form-control">
          <label>Day & Time</label>
          <input type="text" placeholder='edit day'
            value={day} onChange={(e) => setDay(e.target.value)}
          />
          </div>
           <div className="form-control form-control-check">
           <label>Set Reminder</label>
            <input type="checkbox" 
            checked={reminder}
            value={reminder}
            onChange={(e) => setReminder(e.currentTarget.checked)}/>
            </div>
            <div>
          <Button onClick={() => {
              navigate(-1)
          }} text='Go Back' />
          <Button onClick={updateTask} text='Update' />
          <Button onClick={resetTask} text='Reset' />
          </div>
      </div>
  )
};

export default TaskDetails;
