import React from 'react'
// import AuthorList from './components/Author.js'
import UserList from './components/User.js'

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            'users': [],
        }
    }

    componentDidMount() {
        axios.get('http://localhost:8000/viewsets/users/')
            .then(response => {
                const users = response.data;
                this.setState({
                    'users': users,
                });
            })
            .catch(error => console.log(error));
    }

    render() {
        return (
        <div className="App">
            <UserList items={this.state.users} />
        </div>
        )
    }
}

export default App;