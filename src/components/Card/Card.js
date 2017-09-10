import { h, Component } from 'preact'
import {Filters} from '../Filters/Filters'
import {Sorting} from '../SortBar/SortBar'
import {RepositoriesList} from "../RepositoriesList/RepositoriesList"
import {LoadButton} from "../LoadButton/LoadButton";
import css from './Card.css'
import { handleErrors,
         getFilteredRepositories,
         getSortedRepositories,
         changeSortingOrder,
         changeSortingType,
         changeFilter } from '../../utils/util'
import { route } from 'preact-router';

const reposPerPage = 10;

export default class Card extends Component {

    constructor(props) {
        super(props);

        this.state = {
            repos: null,
            loading: true,
            filters: {
                hasOpenIssues : false,
                hasTopics : false,
                starredTimes : 0,
                updatedAfter : null,
                repoType : null,
                language : null
            },
            languages: [],
            sorting: {
                by: 'name',
                order: 'asc'
            },
            currentPage: 1,
            error : ''
        }
    }

    componentDidMount(){
        fetch(`https://api.github.com/users/${this.props.user}/repos?page=${this.state.currentPage}&per_page=${reposPerPage}`, {
            headers: {
                'Accept': 'application/vnd.github.mercy-preview+json'
            }
        })
        .then(handleErrors)
        .then((response) => {
            const shouldDisplayLoadMore = response.headers.get('Link') && response.headers.get('Link').includes('rel="next"');
            this.setState({shouldDisplayLoadMore});
            return response.json();
        })
        .then((repos) => this.setState({
            repos,
            loading: false,
            languages: (repos.map(r => r.language).filter(l => l).filter((v, i, a) => a.indexOf(v) === i))
        }))
        .catch((e) => this.setState({error: e.message}))
    }

    updateState(filters) {
        this.setState(filters);
        changeFilter(filters.filters);
    }

    changeSortType(type) {
        this.setState({
            sorting: { ...this.state.sorting, by: type }
        });
        changeSortingType(this.state.sorting);
    }

    changeSortOrder(order) {
        this.setState({
            sorting: {...this.state.sorting, order: order}
        });
        changeSortingOrder(this.state.sorting);
    }

    loadMore() {
        fetch(`https://api.github.com/users/${this.props.user}/repos?page=${this.state.currentPage+1}&per_page=${reposPerPage}`, {
            headers: {
                'Accept': 'application/vnd.github.mercy-preview+json'
            }
        })
        .then((response) => {
            const shouldDisplayLoadMore = response.headers.get('Link') && response.headers.get('Link').includes('rel="next"');
            this.setState({shouldDisplayLoadMore});
            return response.json();
        })
        .then((newRepos) => this.setState({
            repos: [...this.state.repos, ...newRepos],
            currentPage: this.state.currentPage + 1,
            languages: [
                ...this.state.languages,
                ...(this.state.repos.map(r => r.language).filter(l => l).filter((v, i, a) => a.indexOf(v) === i))
            ]
        }));
    }

    render({},  {loading, repos, filters, languages, sorting, shouldDisplayLoadMore, error}) {
        const filteredRepos = repos && getFilteredRepositories(filters, repos);
        const sortedRepos = repos && getSortedRepositories(filteredRepos, sorting);

        return (
            <div class={css.card}>

                {loading
                    ?   (error) ? <div>{error}</div> : <div>Please, wait</div>
                    : <div>
                        <Filters
                            languages={languages}
                            filters={filters}
                            update={this.updateState.bind(this)} />

                        <Sorting
                            sortingParams={sorting}
                            onSortType={this.changeSortType.bind(this)}
                            onSortOrder={this.changeSortOrder.bind(this)} />

                        <RepositoriesList repositories={sortedRepos} />
                        {(sortedRepos.length !== 0) ?
                                <LoadButton
                                shouldDisplayLoadMore={shouldDisplayLoadMore}
                                onLoadMore={this.loadMore.bind(this)}/>
                          : ''}
                    </div>
                }
            </div>
        )
    }
}