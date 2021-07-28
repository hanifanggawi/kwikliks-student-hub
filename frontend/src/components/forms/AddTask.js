import { useState } from 'react'
import { FaCheck, FaTimes } from 'react-icons/fa'


const AddTask = ({toggle, addTask, course_id}) => {
    const [text, setText] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        addTask(text)
        toggle()
    }

    const style = { color: "#217DE7", cursor: "pointer" }

    return (
        <div>
            <form className="task-form" onSubmit={onSubmit}>
                <input type="checkbox" className="checkbox"/>
                <input 
                    id = {`add-${course_id}`}
                    autoFocus="autofocus"
                    className="task-input"
                    type="text"
                    placeholder="New Task"
                    value={text} onChange={(e) => setText(e.target.value)}
                />
                <FaCheck onClick={onSubmit} style={style} />
                <FaTimes style={style} onClick={toggle} />
            </form>
        </div>
    )
}

export default AddTask
