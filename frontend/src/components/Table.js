import TableRow from './TableRow'
import AddCourse from './forms/AddCourse'
import getCookie from '../util/getCookie'
import {useState, useEffect} from 'react'
import { FaPlus } from 'react-icons/fa'


const Table = () => {
    const [courses, setCourses] = useState([])
    const [showAddCourse, setShowAddCourse] = useState(false)

    useEffect(() => {
        const getCourses = async () => {
            const coursesFromServer = await fetchCourses()
            setCourses(coursesFromServer)
          }
        getCourses()
    }, [])

    const fetchCourses = async () => {
        const res = await fetch(`http://localhost:8050/api/course-list/`)
        const data = await res.json()
        return data
    }

    const addCourse = async (title, description, url) => {
        const newCourse = {title : title, description : description, url: url}
        const csrftoken = getCookie('csrftoken')
        const res = await fetch('http://localhost:8050/api/course-create/',{
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
              'X-CSRFToken':csrftoken,
            },
            body: JSON.stringify(newCourse),
          })
        const data = await res.json()
        setCourses([...courses, data])
        return data
    }

    const updateCourse = async (newCourse) => {
        const csrftoken = getCookie('csrftoken')
        console.log(newCourse)
        const res = await fetch(`http://localhost:8050/api/course-update/${newCourse.id}/`,{
            method: 'PUT',
            headers: {
              'Content-type': 'application/json',
              'X-CSRFToken':csrftoken,
            },
            body: JSON.stringify(newCourse),
          })
        setCourses(courses.map((course) => (course.id === newCourse.id) ? newCourse : course))
        const data = await res.json()
        return data
    }

    const deleteCourse = async (id) => {
        const csrftoken = getCookie('csrftoken')
        await fetch(`http://localhost:8050/api/course-delete/${id}/`, { 
            method: 'DELETE',
            headers: {'X-CSRFToken':csrftoken}
        })
        setCourses(courses.filter((course) => course.id !== id))
    }


    return (
        <div className="table-wrapper">
            <table className="table">
                <thead>
                    <tr className="table-header">
                        <th>Courses</th>
                        <th>Materi Related</th>
                        <th>Assignment Related</th>
                        <th>
                            <div className="table-task">
                                <span>Tasks</span>
                                <span>Deadline</span>
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
