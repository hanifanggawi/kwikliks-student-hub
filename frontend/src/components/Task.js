import { MdEdit, MdDelete } from 'react-icons/md'
import { FaCalendar } from 'react-icons/fa'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import EditTask from './forms/EditTask'
import "react-datepicker/dist/react-datepicker.css";

const Task = ({ task, course_id, updateTask, deleteTask}) => {
    const [checked, setChecked] = useState(task.completed);
    const [dueDate, setDueDate] = useState(task.duedate && new Date(Date.parse(task.duedate)))
    const [calenderOpened, setCalenderOpened] = useState(false)
    const [showButtons, setShowButtons] = useState(false)
    const [editingMode, setEditingMode] = useState(false)

    const checkTask = (task) => {
        const checkedTask = {...task, completed : !task.completed}
        setChecked(!checked)
        updateTask(checkedTask)
    }

    const updateDueDate = (date) => {
        const updatedTask = {...task, duedate: date.toJSON()}
        setDueDate(date)
        updateTask(updatedTask)
    }

    const dateFormat = (date) => {
        const dateValues = date.toDateString().split(" ")
        const dayStr = dateValues[0]
        const month = dateValues[1]
        const day = dateValues[2]
        return dayStr + ", " + month + " " + day
    }

    
    return (
        <>
        {editingMode ?  
            <EditTask task={task} updateTask={updateTask} closeEdit={() => setEditingMode(false)}/> 
            :
        <div className="task" 
            onMouseOver={() => { setShowButtons(true) }} 
            onMouseLeave={() => { setShowButtons(calenderOpened) }}
            > 
                <span className="task-group">
                    <span className="checkbox-wrapper">
                        <input type="checkbox"
                            className="checkbox"
                            id={`check-${course_id}-${task.id}`}
                            defaultChecked={checked}
                            onChange={() => checkTask(task)}
                        />
                        <label htmlFor={`check-${course_id}-${task.id}`} className="checkbox-label">
                            {task.title}
                        </label>

                    </span>
                    <span id={`task-button-${course_id}-${task.id}`} className="task-buttons" style={{ visibility: (showButtons) ? 'visible' : 'hidden' }}>
                        <MdEdit onClick={(() => setEditingMode(true))}/>
                        <MdDelete onClick={() => deleteTask(task.id)}/>
                        
                        <DatePicker 
                            selected={dueDate} 
                            onChange={date => updateDueDate(date)} 
                            customInput={<FaCalendar size= {12}/>}
                            onCalendarOpen={() => setCalenderOpened(true)}
                            onCalendarClose={() => {setCalenderOpened(false); setShowButtons(false)}}
                        />
                    </span>
                </span>
                
                <span className="task-duedate">
                    {dueDate && dateFormat(dueDate)}
                </span>
        </div>
        }
        </>
    )
}

export default Task
