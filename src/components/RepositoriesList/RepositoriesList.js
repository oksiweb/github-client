import { h, Component } from 'preact'
import {Repository} from '../Repository/Repository'
import css from './RepositoriesList.css'

class RepositoriesList extends Component {

    render({repositories, repos}) {
        return (
            <ul className={css.list}>
                {(repositories || repos).map((rep) =>
                    <Repository repository={rep}/>
                )}
            </ul>
        )
    }
}

export {RepositoriesList}