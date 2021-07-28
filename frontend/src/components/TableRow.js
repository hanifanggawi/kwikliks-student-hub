import Task from './Task'
import QuickLink from './QuickLink'
import AddTask from './forms/AddTask'
import AddLink from './forms/AddLink'
import EditCourse from './forms/EditCourse'
import getCookie from '../util/getCookie'
import {useState, useEffect} from 'react'
import { MdEdit, MdDelete} from 'react-icons/md'
import { FaPlus } from 'react-icons/fa'

const TableRow = ({course, deleteCourse, updateCourse}) => {
    const [tasks, setTasks] = useState([])
    const [links, setLinks] = useState([])
    const [showAddTask, setShowAddTask] = useState(true)
    const [showEdit, setShowEdit] = useState(false)
    const [editingMode, setEditingMode] = useState(false)
    const [showLinkForm, setShowLinkForm] = useState(false)
    const [selectedLinkType, setSelectedLinkType] = useState()
    const [showCourseForm, setShowCourseForm] = useState(false)
    
    const linkTypes = ['M', 'A']

    useEffect(() => {

        const getTasks = async (course_id) => {
          const tasksFromServer = await fetchTasks(course_id)
          setTasks(tasksFromServer)
        }

        const getLinks = async (course_id) => {
            const linksFromServer = await fetchLinks(course_id)
            setLinks(linksFromServer)
          }
        getTasks(course.id)
        getLinks(course.id)
      }, [course])

    const fetchTasks = async (course_id) => {
        const res = await fetch(`http://localhost:8050/api/task-list/${course_id}`)
        const data = await res.json()
        return data
    }

    const fetchLinks = async (course_id) => {
        const res = await fetch(`http://localhost:8050/api/link-list/${course_id}`)
        const data = await res.json()
        return data
    }

    const addTask = async (text) => {
        const newtask = {title: text, course: course.id}
        setTasks([...tasks, newtask])
        const csrftoken = getCookie('csrftoken')
        const res = await fetch('http://localhost:8050/api/task-create/',{
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
              'X-CSRFToken':csrftoken,
            },
            body: JSON.stringify(newtask),
          })
        const data = await res.json()
        return data
    }

    const updateTask = async (updatedTask) => {
        const csrftoken = getCookie('csrftoken')
        await fetch(`http://localhost:8050/api/task-update/${updatedTask.id}/`, {
            method: 'PUT',
            headers: {
              'Content-type': 'application/json',
              'X-CSRFToken':csrftoken,
            },
            body: JSON.stringify(updatedTask),
          })
        setTasks(tasks.map((task) => (task.id === updatedTask.id) ? updatedTask : task))
    }

    const deleteTask = async (id) => {
        const csrftoken = getCookie('csrftoken')
        await fetch(`http://localhost:8050/api/task-delete/${id}/`, { 
            method: 'DELETE',
            headers: {'X-CSRFToken':csrftoken}
        })
        setTasks(tasks.filter((task) => task.id !== id))
    }

    const addLink = async (title, url, link_type) => {
        const newLink = {title : title, url : url, course_id : course.id, link_type : link_type}
        const csrftoken = getCookie('csrftoken')
        const res = await fetch('http://localhost:8050/api/link-create/',{
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
              'X-CSRFToken':csrftoken,
            },
            body: JSON.stringify(newLink),
          })
        const data = await res.json()
        setLinks([...links, data])
        setEditingMode(false)
        return data
    }

    const updateLink = async (newLink) => {
        const csrftoken = getCookie('csrftoken')
        const res = await fetch(`http://localhost:8050/api/link-update/${newLink.id}/`,{
            method: 'PUT',
            headers: {
              'Content-type': 'application/json',
              'X-CSRFToken':csrftoken,
            },
            body: JSON.stringify(newLink),
          })
        setLinks(links.map((link) => (link.id === newLink.id) ? newLink : link))
        setEditingMode(false)
        const data = await res.json()
        return data
    }

    const deleteLink = async (id) => {
        const csrftoken = getCookie('csrftoken')
        await fetch(`http://localhost:8050/api/link-delete/${id}/`, { 
            method: 'DELETE',
            headers: {'X-CSRFToken':csrftoken}
        })
        setLinks(links.filter((link) => link.id !== id))
    }

    const openForm = (selectedLinkType) => {
        setSelectedLinkType(selectedLinkType)
        setShowLinkForm(true)
    }
    
    return (
        <tr 
            className="table-row"
            onMouseOver= {() => setShowEdit(true)} 
            onMouseLeave= {() => setShowEdit(false)} 
        > 
        
            <td>
                <div className="activity-group">
                    <p><a href={course.url}>{course.title}</a></p>
                    {editingMode &&
                    <div className="task-buttons">
                        <MdEdit onClick={() => setShowCourseForm(true)}/>
                    </div>                           
                    }
                    {showCourseForm && 
                        <EditCourse 
                            course={course} 
                            editCourse={updateCourse}
                            closeForm={() => setShowCourseForm(false)} 
                        />
                    }
                </div>
                <span>{course.description}</span>
                <div className="course-buttons">
                    <MdEdit 
                        className={`edit-icon ${(editingMode) && 'active'}`} 
                        onClick={() => setEditingMode(!editingMode)} 
                        style={{visibility:(showEdit || editingMode) ? 'visible' : 'hidden'}} 
                        title = {(editingMode) ? 'Exit Edit Mode' : 'Edit Course'}
                    />
                    {editingMode && <MdDelete className='delete-icon' onClick={() => deleteCourse(course.id)}/>}
                </div>
            </td>
            
            {linkTypes.map((linkType) => (
                <td key={linkType}>
                    {links.filter((link) => link.link_type === linkType).length > 0 ?
                            links.filter((link) => link.link_type === linkType).map((filtered_link) => (
                                <QuickLink 
                                    key={filtered_link.id} 
                                    link={filtered_link} 
                                    editingMode={editingMode} 
                                    deleteLink={deleteLink}
                                    updateLink={updateLink}
                                />
                            ))
                            :
                            (!editingMode) ? <p>-</p> : ''
                    }
                {editingMode && 
                    <div className="task-add" onClick={() => openForm(linkType)}>
                        <FaPlus className="task-add-icon"/>
                        <span>New Link</span>
                    </div>
                }
                {showLinkForm && 
                    <AddLink 
                        setShowLinkForm={setShowLinkForm} 
                        link_type={selectedLinkType} 
                        addLink ={addLink}
                    />
                }
                </td>
            ))}

            <td >
            {tasks.map((task) => (
                <Task 
                    task ={task} 
                    course_id={course.id} 
                    updateTask={updateTask}
                    deleteTask = {deleteTask}
                    key={task.id}
                />
            ))}
            {showAddTask ? 
                <div className="task-add" onClick={() => setShowAddTask(!showAddTask)}>
                    <FaPlus className="task-add-icon"/>
                    <span>New Task</span>
                </div>
                 :
                 <AddTask 
                    course_id={course.id} toggle={() => setShowAddTask(!showAddTask)} addTask={addTask} />
            }
            </td>
        </tr>
    )
}

export default TableRow
