import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'

const AddLink = ({setShowLinkForm, link_type, addLink}) => {
    const [title, setTitle] = useState()
    const [url, setUrl] = useState()

    const onSubmit = (e) => {
        e.preventDefault()
        addLink(title, ((!!url) ? url : '#'), link_type)
        setShowLinkForm(false)
    }

    return (
        <div className="modal">
            <div className="modal-box">
                <form className="link-form" onSubmit={onSubmit}>
                    <div className="form-header">
                        <h2 className="form-title">New Link</h2>
                        <FaTimes className="close-button" onClick={() => setShowLinkForm(false)}/>
                    </div>
                    <div className="form-field">
                        <div className="form-label">Link Title</div>
                        <input className="form-input" type="text" placeholder="Link Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className="form-field">
                        <div className="form-label">Link URL</div>
                        <input className="form-input" type="url" placeholder="Link URL" value={url} onChange={(e) => setUrl(e.target.value)}/>
                    </div>
                    <button className="button-fill">Save</button>
                </form>
            </div>
        </div>
    )
}

export default AddLink
