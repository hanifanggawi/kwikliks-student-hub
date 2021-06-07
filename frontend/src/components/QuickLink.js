import { MdEdit, MdDelete} from 'react-icons/md'
// import {Link} from 'react-router-dom'

const QuickLink = ({link, editingMode}) => {
    return (
        <div key={link.id} className="link">
        {/* <Link to={(editingMode) ? null : link.url}>{link.title} </Link> */}
            <a className={(editingMode) ? "link-a" : "link-a"} href={(editingMode) ? null : link.url}>{link.title}</a>
            {editingMode &&
                <div className="task-buttons">
                    <MdEdit />
                    <MdDelete/>
                </div>                           
            }
        </div>
    )
}

export default QuickLink
