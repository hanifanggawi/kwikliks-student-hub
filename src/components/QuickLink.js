import { useState } from 'react'
import { MdEdit, MdDelete} from 'react-icons/md'
import EditLink from './forms/EditLink'

const QuickLink = ({link, editingMode, deleteLink, updateLink}) => {
    const [showForm, setShowForm] = useState(false)

    return (
        <div className="link">
            <a 
                className={(editingMode) ? "link-a" : "link-a"} 
                href={`${(editingMode) ? null : link.url}`}
                target="_blank" 
                rel="noopener noreferrer"
            >
                    {link.title}
            </a>
            {editingMode &&
                <div className="task-buttons">
                    <MdEdit onClick={() => setShowForm(true)}/>
                    <MdDelete onClick={() => deleteLink(link.id)}/>
                </div>                           
            }
            {showForm && 
                <EditLink
                    link={link}
                    updateLink={updateLink} 
                    closeForm={() => setShowForm(false)}
                />
            }
        </div>
    )
}

export default QuickLink
