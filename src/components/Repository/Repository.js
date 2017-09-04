import { h, Component } from 'preact'

const formatDate = (date) => {
    let tmpDate = new Date(date);
    let year = tmpDate.getFullYear();
    let month = tmpDate.getMonth()+1;
    let dt = tmpDate.getDate();

    if (dt < 10) {
        dt = '0' + dt;
    }
    if (month < 10) {
        month = '0' + month;
    }
    return year+'-' + month + '-'+dt;
};

export default class App extends Component {

    render() {
        return (
            <ul>
                <li>{this.props.repository.name}</li>
                <li>{'description '+this.props.repository.description || 'description is absent'}</li>
                <li>{this.props.repository.fork ? 'forked' : 'not forked'}</li>
                <li>stars: {this.props.repository.stargazers_count}</li>
                <li>{formatDate(this.props.repository.updated_at)}</li>
                <li>{this.props.repository.language}</li>
            </ul>
        )
    }
}