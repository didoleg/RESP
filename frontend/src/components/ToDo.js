import React from 'react'
import {Link, useParams} from "react-router-dom";


const ToDoListItem = ({item}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.text}</td>
            <td>{item.create}</td>
            <td>{item.project}</td>
            <td>{item.user_create}</td>
            <td><button onClick={()=>delete_ToDo(item.id)} type='button'>Delete</button></td>
        </tr>
    )
}

const ToDoList = ({items, delete_ToDo}) => {
    return (
        <div>
        <table className="table">
            <tr>
                <th>Id</th>
                <th>Text</th>
                <th>Create</th>
                <th>Project</th>
                <th>User creator</th>
            </tr>
            {items.map((item) => <ToDoListItem item={item} delete_ToDo={delete_ToDo}/>)}
        </table>
        <Link to='/ToDo/create'>Create</Link>
        </div>
        
    )
}
const ToDoTextItem = ({item}) => {
    return (
            <li>
            {item.text} ({item.user_create})
        </li>
        )
    }
    
const ToDoDetail = ({getToDo, item}) => {
        let { id } = useParams();
        getToDo(id)
        let users = item.user_create ? item.user_create : []
        console.log(id)
        return (
            <div>
                <h1>{item.text}</h1>
                Text: <a href={item.text}>{item.text}</a>
                <p></p>
                User create:
                <ol>
                {users.map((user_create) => <ToDoTextItem item={user_create} />)}
                </ol>
            </div>
        )
}



export default {ToDoList, ToDoDetail}