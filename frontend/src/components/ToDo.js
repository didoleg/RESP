import React from 'react'


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

const ToDoList = ({items}) => {
    return (
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
    )
}

export default ToDoList