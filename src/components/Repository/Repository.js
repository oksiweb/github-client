import { h, Component } from 'preact'
import {Dialog} from '../Dialog/Dialog';
import '../Dialog/Dialog.css'
import css from './Repository.css'

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

class Repository extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shouldShowModal: false
        }
    }

    toggleModal (e) {
        e.stopPropagation();

        this.setState({
            shouldShowModal: !this.state.shouldShowModal
        });
    }

    render({repository}, {shouldShowModal}) {
        return (
            <li class={css.listItem}>
                <ul class={css.description}>
                    <li><a onClick={this.toggleModal.bind(this)} >{repository.name}</a></li>
                    <li>{'description '+repository.description || 'description is absent'}</li>
                    <li>{repository.fork ? 'forked' : 'not forked'}</li>
                    <li>stars: {repository.stargazers_count}</li>
                    <li>{formatDate(repository.updated_at)}</li>
                    <li>{repository.language}</li>
                </ul>
                <Dialog
                    shouldShowModal={shouldShowModal}
                    repo={this.props}
                    onClose={this.toggleModal.bind(this)} />
            </li>
        )
    }
}

export {Repository}