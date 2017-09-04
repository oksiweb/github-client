import { h, Component } from 'preact'
import {Filters} from '../Filters/Filters'
import Repository from '../Repository/Repository'

export default class Card extends Component {

    constructor(props) {
        super(props);

        this.state = {
            repos: null,
            loading: true,
            filteredRepositories: null,
            filters: {
                hasOpenIssues : false,
                hasTopics : false,
                starredTimes : 0,
                updatedAfter : null,
                repoType : null,
                language : null
            },
            languages: []
        }
    }

    componentDidMount(){
        fetch('https://api.github.com/users/' + this.props.user + '/repos', {
            headers: {
                'Accept': 'application/vnd.github.mercy-preview+json'
            }
        })
            .then((response) => response.json())
            .then((repos) => this.setState({
                repos,
                loading: false,
                languages: [...new Set(repos.map(r => r.language).filter(l => l))]
            }));
    }

    updateState(filters) {
        this.setState(filters);
        this.setState({filteredRepositories: this.state.repos && this.getFilteredRepositories(this.state.filters)})
    }

    getFilteredRepositories({ hasOpenIssues, hasTopics, starredTimes, updatedAfter, repoType, language }) {
        return this.state.repos.filter(repo => {
            return (hasOpenIssues ? !!repo.open_issues_count : true)
                && (hasTopics ? !!repo.topics.length : true)
                && repo.stargazers_count >= starredTimes
                && (updatedAfter
                    ? new Date(repo.pushed_at) > new Date(updatedAfter)
                    : true)
                && (repoType && repoType !== 'All'
                    ? (repoType === 'Fork' ? repo.fork : !repo.fork)
                    : true)
                && (language && language !== 'All'
                    ? repo.language === language
                    : true)
        });
    }

    render({},  {loading, repos, filteredRepositories, filters, languages, sorting}) {

        return (
            <div className="repositories">

                {loading
                    ? <div>Please, wait</div> :
                    <div>
                        <Filters languages={languages} filters={filters} update={this.updateState.bind(this)} />
                        {(filteredRepositories || repos).map((rep) =>
                           <Repository repository={rep}/>
                        )}
                    </div>
                }
            </div>
        )
    }
}