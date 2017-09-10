import { h, Component } from 'preact'
import Form from './Form/Form'
import Card from './Card/Card'
import './App.css'
import Router from 'preact-router'

export default class App extends Component {

    render() {
        return (
            <div className="app">
                <Router>
                    <Form path="/"/>
                    <Card path="/:user" />
                </Router>
            </div>
        )
    }
}