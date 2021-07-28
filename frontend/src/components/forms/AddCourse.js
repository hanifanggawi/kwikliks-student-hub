import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'

const AddCourse = ({closeForm, addCourse}) => {
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [url, setUrl] = useState()

    const onSubmit = (e) => {
        e.preventDefault()
        addCourse(title, description, (!!url) ? url : '#')
        closeForm()
    }
    
    return (
        <div className="modal">
            <div className="modal-box">
                <form className="link-form" onSubmit={onSubmit}>
                    <div className="form-header">
                        <h2 className="form-title">New Course</h2>
                        <FaTimes className="close-button" onClick={closeForm}/>
                    </div>
                    <div className="form-field">
                        <div className="form-label">Course Title</div>
                        <input className="form-input" type="text" required placeholder="Course Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className="form-field">
                        <div className="form-label">Course Description</div>
                        <input className="form-input" type="text" required placeholder="Course Description" value={description} onChange={(e) => setDescription(e.target.value)}/>
                    </div>
                    <div className="form-field">
                        <div className="form-label">Course URL (Optional)</div>
                        <input className="form-input" type="url" placeholder="Course URL" value={url} onChange={(e) => setUrl(e.target.value)}/>
                    </div>
                    <button className="button-fill">Save</button>
                </form>
            </div>
        </div>
    )
}

export default AddCourse
