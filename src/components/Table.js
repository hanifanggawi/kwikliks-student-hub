import TableRow from './TableRow'
import AddCourse from './forms/AddCourse'
import {useState} from 'react'
import { FaPlus } from 'react-icons/fa'
import Alert from './Alert'


const Table = () => {
    const [courses, setCourses] = useState([])
    const [courseCounter, setCourseCounter] = useState(1)
    const [showAddCourse, setShowAddCourse] = useState(false)
    const [showAlert, setShowAlert] = useState(true)

    const generateId = () => {
        setCourseCounter(courseCounter+1)
        return courseCounter
    }

    const addCourse = async (title, description, url) => {
        const newCourse = {id : generateId(), title : title, description : description, url: url}
        setCourses([...courses, newCourse])
        return newCourse
    }

    const updateCourse = async (newCourse) => {
        setCourses(courses.map((course) => (course.id === newCourse.id) ? newCourse : course))
        return newCourse
    }

    const deleteCourse = async (id) => {
        setCourses(courses.filter((course) => course.id !== id))
    }
    if (!courses.length) {
        return (
            <>
                <div className="button-container">
                    <button className="button-fill course-add" title="New Course" onClick={() => setShowAddCourse(true)}>
                        <FaPlus className="course-add-icon" />
                        Add a Course
                    </button>
                    {showAddCourse && <AddCourse closeForm={() => setShowAddCourse(false)} addCourse={addCourse} />}
                </div>
                {showAlert && <Alert closeAlert={() => setShowAlert(false)} />}
            </>
        )
    }


    return (
        <div className="table-wrapper">
            <table className="table">
                <thead>
                    <tr className="table-header">
                        <th>Courses</th>
                        <th>Material Links</th>
                        <th>Assignment Links</th>
                        <th>
                            <div className="table-task">
                                <span>Tasks</span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody className="table-body">
                    {courses.map((course) => (
                        <TableRow
                            key={course.id} 
                            course={course}
                            deleteCourse={deleteCourse}
                            updateCourse={updateCourse}
                        />
                    ))}
                </tbody>
            </table>
            <FaPlus className="course-add-button" title="New Course" onClick={() => setShowAddCourse(true)}/>
            {showAddCourse && <AddCourse closeForm={() => setShowAddCourse(false)} addCourse={addCourse}/>}
        </div>
    )
}

export default Table
