import { FaTimes } from 'react-icons/fa'

const Alert = ({closeAlert}) => {
    return (
        <div className="alert-box">
            This is a demo, no changes will be saved
            <FaTimes className="alert-close" onClick={closeAlert}/>
        </div>
    )
}

export default Alert
