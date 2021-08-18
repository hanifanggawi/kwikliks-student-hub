import { useState } from 'react'
import { FaTimes } from 'react-icons/fa'

const EditLink = ({link, updateLink, closeForm}) => {
    const [title, setTitle] = useState(link.title)
    const [url, setUrl] = useState(link.url === '#' ? '' : link.url)

    const onSubmit = (e) => {
        e.preventDefault()
        const newLink = {...link, title : title, url :(!!url) ? url : '#'}
        updateLink(newLink)
        closeForm()
    }

    return (
        <div className="modal">
            <div className="modal-box">
                <form className="link-form" onSubmit={onSubmit}>
                    <div className="form-header">
                        <h2 className="form-title">Update Link</h2>
                        <FaTimes className="close-button" onClick={closeForm}/>
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

export default EditLink
