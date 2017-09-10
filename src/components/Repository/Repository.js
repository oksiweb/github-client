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
                    <li class={repository.fork ? css.fork : css.notforked }>{repository.fork ? 'forked' : 'not forked'}</li>
                    <li class={css.description}>{repository.description || 'description is absent'}</li>
                    <li class={css.stars}>
                        <svg height="25" width="23"  data-rating="1">
                            <polygon points="9.9, 1.1, 3.3, 21.78, 19.8, 8.58, 0, 8.58, 16.5, 21.78" style="fill-rule:nonzero;"/>
                        </svg>
                        <span>{repository.stargazers_count}</span>
                    </li>
                    <li class={css.date}>
                        <span>{formatDate(repository.updated_at)}</span>
                        <span>{repository.language}</span>
                    </li>
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