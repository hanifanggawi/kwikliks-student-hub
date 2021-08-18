import { useState } from 'react'
import { FaCheck, FaTimes } from 'react-icons/fa'


const EditTask = ({task, updateTask, closeEdit}) => {
    const [text, setText] = useState(task.title)

    const onSubmit = (e) => {
        e.preventDefault()
        const editedTask = {...task, title : text}
        updateTask(editedTask)
        closeEdit()
    }

    const style = { color: "#217DE7", cursor: "pointer" }

    return (
        <div>
            <form className="task-form" onSubmit={onSubmit}>
                <input type="checkbox" className="checkbox"/>
                <input 
                    id = {`add-${task.course_id}`}
                    autoFocus="autofocus"
                    className="task-input"
                    type="text"
                    placeholder="New Task"
                    value={text} onChange={(e) => setText(e.target.value)}
                />
                <FaCheck style={style} onClick={onSubmit} />
                <FaTimes style={style} onClick={closeEdit} />
            </form>
        </div>
    )
}

export default EditTask
