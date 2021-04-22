import { FaPlus } from 'react-icons/fa'
import Task from './Task'
import AddTask from './AddTask'
import {useState, useEffect} from 'react'

const TableRow = ({course}) => {
    const [tasks, setTasks] = useState([])
    const [links, setLinks] = useState([])
    const [showAddTask, setShowAddTask] = useState(true)


    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }

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
      }, [])

    const fetchTasks = async (course_id) => {
        const res = await fetch(`http://localhost:8000/api/task-list/${course_id}`)
        const data = await res.json()
        return data
    }

    const fetchLinks = async (course_id) => {
        const res = await fetch(`http://localhost:8000/api/link-list/${course_id}`)
        const data = await res.json()
        return data
    }

    const addTask = async (text) => {
        const newtask = {title: text, course: course.id}
        const csrftoken = getCookie('csrftoken')
        const res = await fetch('http://localhost:8000/api/task-create/',{
            method: 'POST',
            headers: {
              'Content-type': 'application/json',
              'X-CSRFToken':csrftoken,
            },
            body: JSON.stringify(newtask),
          })
        const data = await res.json()
        console.log(data)
        setTasks([...tasks, data])
        return data
    }

    const deleteTask = async (id) => {
        const csrftoken = getCookie('csrftoken')
        await fetch(`http://localhost:8000/api/task-delete/${id}/`, { 
            method: 'DELETE',
            headers: {'X-CSRFToken':csrftoken}
        })
        setTasks(tasks.filter((task) => task.id !== id))
    }

    return (
        <tr> 
            <td>
                <p><a href={course.url}>{course.matkul}</a></p>
                <p>{course.dosen}</p>
            </td>
            <td>
                {links.filter((link) => link.link_type == "M").length > 0 ?
                        links.filter((link) => link.link_type == "M").map((mat_link) => (
                            <p><a href={mat_link.url}>{mat_link.title}</a></p>
                        ))
                        :
                        <p>-</p>
                }
            </td>
            <td>
                {links.filter((link) => link.link_type == "A").length > 0 ?
                    links.filter((link) => link.link_type == "A").map((asg_link) => (
                        <p><a href={asg_link.url}>{asg_link.title}</a></p>
                    ))
                    :
                    <p>-</p>
                }
                {/* {links.filter((link) => link.link_type == "A").map((asg_link) => (
                    // <p><a href={asg_link.url}>{asg_link.title} {(asg_link == undefined).toString()}</a></p>
                    <p><a href="#">{(asg_link == undefined) && "EMPTY"}</a></p>
                    
                ))} */}
            </td>
            <td >
            {tasks.map((task) => (
                <Task 
                    task ={task} 
                    course_id={course.id} 
                    addTask={addTask}
                    key={task.id}
                    deleteTask = {deleteTask}
                    getCookie = {getCookie}
                />
            ))}
            {showAddTask ? 
                <div className="task-add" onClick={() => setShowAddTask(!showAddTask)}>
                    <FaPlus className="task-add-icon"/>
                    <span>New Task</span>
                </div>
                 :
                 <AddTask course_id={course.id} toggle={() => setShowAddTask(!showAddTask)} addTask={addTask} />
            }
            
            </td>
        </tr>
    )
}

export default TableRow
