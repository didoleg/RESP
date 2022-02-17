import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import axios from 'axios'
import './bootstrap/css/bootstrap.min.css'
import './bootstrap/css/sticky-footer-navbar.css'
import Footer from './components/Footer.js'
import Navbar from './components/Menu.js'
import UserList from './components/User.js'
import {ProjectList, ProjectDetail} from './components/Project.js'
import ToDoList from './components/ToDo.js'
import LoginForm from './components/Auth.js'
import ProjectForm from './components/ProjectForm.js'
import ToDoForm from './components/ToDoForm.js'



const DOMAIN = 'http://127.0.0.1:8000'
const get_url = (url) => `${DOMAIN}${url}`


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            navbarItems: [
                {name: 'Users', href: '/Users'},
                {name: 'Projects', href: '/Project'},
                {name: 'TODOs', href: '/ToDo'},
            ],
            users: [],
            projects: [],
            project: {},
            todos: [],
            auth: {username: '', is_login: false},
            searchText: '',
            tempProjects: []
        }

    }

    findProjectsFrontend(text) {
        let filtered_projects = this.state.tempProjects
        if (text != '') {
            filtered_projects = filtered_projects.filter((item) => item.name.includes(text))
        }
        this.setState({projects: filtered_projects})
    }

    searchTextChange(text) {
        this.setState({'searchText': text})
        this.findProjectsFrontend(text)
    }

    findProjects() {
        console.log('Find?')
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.state.auth.is_login)
        {
            const token = localStorage.getItem('access')
            headers['Authorization'] = 'Bearer ' + token
        }

        let url = '/api/Project/'
        console.log(this.state.searchText)
        if (this.state.searchText != '') {
            url = `/api/Project/?name=${this.state.searchText}`
        }

        console.log(url)
        axios.get(get_url(url), {headers})
            .then(response => {
                this.setState({projects: response.data.results})
            }).catch(error => console.log(error))
            
    }

    login(username, password) {
        axios.post(get_url('/api/token/'), {username: username, password: password})
        .then(response => {
            const result = response.data
            const access = result.access
            const refresh = result.refresh
            localStorage.setItem('login', username)
            localStorage.setItem('access', access)
            localStorage.setItem('refresh', refresh)
            this.setState({'auth': {username: username, is_login: true}})
            this.load_data()
        }).catch(error => {
            if (error.response.status === 401) {
                alert('Неверный логин или пароль')
            }
            else {
                console.log(error)
            }
        })
    }

    logout() {
        localStorage.setItem('login', '')
        localStorage.setItem('access', '')
        localStorage.setItem('refresh', '')
        this.setState({'auth': {username: '', is_login: false}})
    }

    createProject(name, repository) {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.state.auth.is_login)
        {
            const token = localStorage.getItem('access')
            headers['Authorization'] = 'Bearer ' + token
        }

        const data = {name: name, repository: repository}
        const options = {headers: headers}
        axios.post(get_url('/api/Project/'), data, options)
        .then(response => {
            this.setState({projects: [...this.state.projects, response.data]})
        }).catch(error => console.log(error))
    }

    createToDo(project, text) {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.state.auth.is_login)
        {
            const token = localStorage.getItem('access')
            headers['Authorization'] = 'Bearer ' + token
        }

        const data = {text: text, project: project}
        const options = {headers: headers}
        console.log(data)
        axios.post(get_url('/api/ToDo/'), data, options)
        .then(response => {
            this.setState({todos: [...this.state.todos, response.data]})
        }).catch(error => console.log(error))
    }

    deleteProject(id) {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.state.auth.is_login)
        {
            const token = localStorage.getItem('access')
            headers['Authorization'] = 'Bearer ' + token
        }
        axios.delete(get_url(`/api/Project/${id}`), {headers, headers})
        .then(response => {
            this.setState({projects: this.state.projects.filter((item)=>item.id != id)})
        }).catch(error => console.log(error))
    }

    deleteToDo(id) {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.state.auth.is_login)
        {
            const token = localStorage.getItem('access')
            headers['Authorization'] = 'Bearer ' + token
        }
        axios.delete(get_url(`/api/ToDo/${id}`), {headers, headers})
        .then(response => {
            let todos = [...this.state.todos]
            const todo_index = todos.findIndex((item) => item.id == id)
            let todo = todos[todo_index]
            todo.isActive = false
            this.setState({todos: todos})
        }).catch(error => console.log(error))
    }

    render() {
         return (
              <Router>
                  <header>
                    <Navbar navbarItems={this.state.navbarItems} auth={this.state.auth} logout={()=>this.logout()} searchTextChange={(text)=>this.searchTextChange(text)} findProjects={() => this.findProjects()} />
                  </header>
                  <main role="main" class="flex-shrink-0">
                      <div className="container">
                        <Switch>
                            <Route exact path='/'>
                                <UserList users={this.state.users} />
                            </Route>
                            <Route exact path='/Project'>
                                <ProjectList items={this.state.projects} deleteFunction={(id) => this.deleteProject(id)} />
                            </Route>
                            <Route exact path='/ToDo'>
                                <ToDoList items={this.state.todos} deleteFunction={(id) => this.deleteToDo(id)} />
                            </Route>
                            <Route exact path='/login'>
                                <LoginForm login={(username, password) => this.login(username, password)} />
                            </Route>
                            <Route exact path='/Project/create'>
                                <ProjectForm save={(name, repository) => this.createProject(name, repository)} />
                            </Route>
                            <Route exact path='/ToDo/create'>
                                <ToDoForm save={(project, text) => this.createToDo(project, text)} projects={this.state.projects} />
                            </Route>
                            <Route path="/Project/:id" children={<ProjectDetail getProject={(id) => this.getProject(id)} item={this.state.project} />} />
                            
                        </Switch>
                      </div>
                  </main>

              <Footer />
            </Router>


            )
    }

    getProject(id) {
        
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.state.auth.is_login)
        {
            const token = localStorage.getItem('access')
            headers['Authorization'] = 'Bearer ' + token
        }

        axios.get(get_url(`/api/Project/${id}`), {headers})
        .then(response => {
            this.setState({project: response.data})
        }).catch(error => console.log(error))
    }

    load_data() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.state.auth.is_login)
        {
            const token = localStorage.getItem('access')
            headers['Authorization'] = 'Bearer ' + token
        }
        
            axios.get(get_url('/api/Users/'), {headers})
        .then(response => {
            this.setState({users: response.data.results})
        }).catch(error => console.log(error))

        axios.get(get_url('/api/Project/'), {headers})
        .then(response => {
            this.setState({projects: response.data.results})
            this.setState({tempProjects: response.data.results})
        }).catch(error => console.log(error))

        axios.get(get_url('/api/ToDo/'), {headers})
        .then(response => {

            this.setState({todos: response.data.results})
        }).catch(error => console.log(error))
    }

    componentDidMount() {

        const username = localStorage.getItem('login')
        if ((username != "") & (username != null)) {
            this.setState({'auth': {username: username, is_login: true}}, () => this.load_data())
        }
    }
}


export default App;