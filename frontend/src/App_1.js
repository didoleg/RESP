import React from 'react';
import {BrowserRouter, Switch, Route,} from "react-router-dom";
import axios from 'axios'
import './bootstrap/css/bootstrap.min.css'
import './bootstrap/css/sticky-footer-navbar.css'
import Footer from './components/Footer.js'
import Navbar from './components/Menu.js'
import UserList from './components/User.js'
import {ProjectList, ProjectDetail} from './components/Project.js'
import ToDoList from './components/ToDo.js'



const DOMAIN = 'http://localhost:8000'
const get_url = (url) => `${DOMAIN}${url}`


class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            navbarItems: [
                {name: 'users', href: '/users'},
                {name: 'Projects', href: '/Project'},
                {name: 'ToDo', href: '/ToDo'},
            ],
            users: [],
            projects: [],
            project: {},
            todos: []
        }
    }

    render() {
         return (
              <BrowserRouter>
                  <header>
                    <Navbar navbarItems={this.state.navbarItems} />
                  </header>
                  <main role="main" class="flex-shrink-0">
                      <div className="container">
                        <Switch>
                            <Route exact path='/users'>
                                <UserList users={this.state.users} />
                            </Route>
                            <Route exact path='/Project'>
                                <ProjectList items={this.state.projects} />
                            </Route>
                            <Route exact path='/ToDo'>
                                <ToDoList items={this.state.todos} />
                            </Route>
                            <Route path="/Project/:id" children={<ProjectDetail getProject={(id) => this.getProject(id)} item={this.state.project} />} />
                        </Switch>
                      </div>
                  </main>

              <Footer />
            </BrowserRouter>


            )
    }

    getProject(id) {
        axios.get(get_url(`/Project/${id}`))
        .then(response => {
            console.log(response.data)
            this.setState({project: response.data})
        }).catch(error => console.log(error))
    }


    componentDidMount() {
            axios.get(get_url('/users'))
        .then(response => {
            this.setState({users: response.data.results})
        }).catch(error => console.log(error))

        axios.get(get_url('/Project'))
        .then(response => {
            this.setState({projects: response.data.results})
        }).catch(error => console.log(error))

        axios.get(get_url('/ToDo'))
        .then(response => {
            this.setState({todos: response.data.results})
        }).catch(error => console.log(error))

    }
}


export default App;