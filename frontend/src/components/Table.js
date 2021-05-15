import TableRow from './TableRow'

import {useState, useEffect} from 'react'


const Table = () => {


    const [courses, setCourses] = useState([]
        // [
        //     {
        //         id : "1",
        //         matkul : { title : "Adprog C", url : "#"},
        //         dosen : "Gladhi Guardhin",
        //         mat_links : [
        //             { title : "refactoring guru", url : "https://refactoring.guru/"},
        //             { title : "refactoring", url : "https://refactoring.guru/"},
        //         ],
        //         asg_links : [
        //             { title : "repo demo", url : "https://refactoring.guru/"},
        //             { title : "ruang demo", url : "https://refactoring.guru/"},
        //         ]
        //     },
        //     {   
        //         id : '2',
        //         matkul : { title : "Operating System C", url : "#"},
        //         dosen : "Rahmat M. Salik",
        //         mat_links : [
        //             { title : "os.vslm", url : "https://os.vlsm.org/"},
        //         ],
        //         asg_links : [
        //             { title : "github.io", url : "https://hanifanggawi.github.io/os211/"},
        //             { title : "github", url : "https://github.com/hanifanggawi/os211"},
        //         ]
        //     },
        // ]
    
    )


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



    return (
        <table className="table">
            <thead>
                <tr className="table-header">
                    <th>Matkul</th>
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
                    />
                ))}

            </tbody>
            
        </table>
    )
}

export default Table
