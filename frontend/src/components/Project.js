import React from 'react'
import {
  Link,
  useParams
} from "react-router-dom";


const ProjectListItem = ({item, deleteFunction}) => {
    let link_to_detail = `/project/${item.id}`
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.repository}</td>
            <td><Link to={link_to_detail}>Detail</Link></td>
            <td>Update</td>
            <td><button className='btn btn-danger' onClick={()=>deleteFunction(item.id)}>Delete</button></td>
        </tr>
    )
}

const ProjectList = ({items, deleteFunction}) => {
    //console.log(users)
    return (
        <div>
        <table className="table">
            <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Repository</th>
                <th></th>
                <th></th>
                <th></th>
            </tr>
            {items.map((item) => <ProjectListItem item={item} deleteFunction={deleteFunction} />)}
        </table>
        <Link to='/project/create' className='btn btn-primary'>Create</Link>
        </div>
    )
}

const ProjectUserItem = ({item}) => {
    return (
        <li>
        {item.username} ({item.email})
    </li>
    )
}

const ProjectDetail = ({getProject, item}) => {
    let { id } = useParams();
    getProject(id)
    let users = item.users ? item.users : []
    console.log(id)
    return (
        <div>
            <h1>{item.name}</h1>
            Repository: <a href={item.repository}>{item.repository}</a>
            <p></p>
            Users:
            <ol>
            {users.map((user) => <ProjectUserItem item={user} />)}
            </ol>
        </div>
    )
}

export {ProjectDetail, ProjectList}