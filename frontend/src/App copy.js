import React from 'react';
import './App.css';
// import UserList from './components/User.js';
// import MenuItemList from './components/Menu.js';
import ToDoList from './components/ToDo';
import axios from 'axios';

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            'ToDo': [],
            // 'menu': []
        }
    }

    componentDidMount() {

        axios.get('http://127.0.0.1:8000/viewsets/ToDo/')
            .then(response => {
                const ToDo = response.data;
                this.setState({
                    'ToDo': ToDo,
                });
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
          <div className="App">
            <ToDoList items={this.state.data} />
          </div>
        )
      }
}

export default App;