import { MdEdit, MdDelete } from 'react-icons/md'
import { useState } from 'react'

const Task = ({ task, course_id, deleteTask , getCookie}) => {
    const [checked, setChecked] = useState(task.completed);

    const style = { color: "#217DE7", cursor: "pointer"}

    const updateTask = async (id) => {
        const updatedTask = {...task, completed : !task.completed}
        const csrftoken = getCookie('csrftoken')
        setChecked(!checked)
        await fetch(`http://localhost:8050/api/task-update/${id}/`, {
            method: 'PUT',
            headers: {
              'Content-type': 'application/json',
              'X-CSRFToken':csrftoken,
            },
            body: JSON.stringify(updatedTask),
          })
    }

    
    return (
        <div className="task" 
            onMouseOver={() => {
                document.getElementById(`task-button-${course_id}-${task.id}`).style.visibility = "visible"
            }} 
            onMouseLeave={() => {
                document.getElementById(`task-button-${course_id}-${task.id}`).style.visibility = "hidden"
            }}
            > 
                <span className="checkbox-wrapper">
                    <input type="checkbox"
                        className="checkbox"
                        id={`check-${course_id}-${task.id}`}
                        defaultChecked={checked}
                        onChange={() => updateTask(task.id)}
                    />
                    <label htmlFor={`check-${course_id}-${task.id}`} className="checkbox-label">
                        {task.title}
                    </label>

                </span>
                <span id={`task-button-${course_id}-${task.id}`} className="task-buttons" style={{ visibility: "hidden" }}>
                    <MdEdit style={style} />
                    <MdDelete style={style} onClick={() => deleteTask(task.id)}/>
                </span>

        </div>
    )
}

export default Task
