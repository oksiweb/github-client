import { h, Component } from 'preact'
import css from './Dialog.css'

class Dialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true
        }
    }

    _mounted = false;

    componentDidMount() {
        this._mounted = true;
    }

    shouldComponentUpdate() {
        if (!this.props.shouldShowModal) {
            return false;
        }

        this._mounted = true;
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.shouldShowModal !== nextProps.shouldShowModal && this._mounted) {
            const { repo } = nextProps;
            const fullName = repo.repository.full_name;

            Promise.all([this._getSourceRepoInfo(fullName),
            this._getContributors(fullName),
            this._getLanguages(fullName),
            this._getPopularPullRequests(fullName)])
                .then((res) => this.setStateAsync({
                    loading: false
                }))
                .catch(() => this.setStateAsync({
                    loading: false
                }))
        }
    }

    _getSourceRepoInfo(fullName) {
        return fetch(`https://api.github.com/repos/${fullName}`)
            .then((response) => response.json())
            .then((repoInfo) => this.setStateAsync({
                source_url: repoInfo.html_url,
                source_full_name: repoInfo.full_name
            }))
    }

    _getContributors(fullName) {
        return fetch(`https://api.github.com/repos/${fullName}/contributors`)
            .then((response) => response.json())
            .then((contributors) => this.setStateAsync({
                contributors: contributors.slice(0, 3)
            }))
    }

    _getLanguages(fullName) {
        return fetch(`https://api.github.com/repos/${fullName}/languages`)
            .then((response) => response.json())
            .then((languages) => {
                const moreThanOneKbLanguages = {};

                for (let lang in languages) {
                    if (languages[lang] > 1024) {
                        moreThanOneKbLanguages[lang] = this._formatBytes(languages[lang]);
                    }
                }
                return moreThanOneKbLanguages;
            })
            .then((moreThanOneKbLanguages) => this.setStateAsync({
                languages: moreThanOneKbLanguages
            }))
    }

    _getPopularPullRequests(fullName) {
        return fetch(`https://api.github.com/repos/${fullName}/pulls?sort=popularity&per_page=5&direction=desc`)
            .then((response) => response.json())
            .then((popularPullRequests) => this.setStateAsync({
                pullRequests: popularPullRequests
            }))
    }

    _formatBytes(bytes, decimals) {
        if (bytes == 0) return '0 Bytes';

        const k = 1024;
        const dm = decimals || 2;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));

        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }

    setStateAsync(state) {
        return new Promise((resolve) => {
            this.setState(state, resolve)
        });
    }

    render(
        {shouldShowModal, repo},
        {loading, source_url, source_full_name, contributors, languages, pullRequests}) {

        if(!shouldShowModal) {
            return null;
        }

        return (
            <div class={css.backdrop}
                 onClick={(e) => {this._mounted = false; this.props.onClose(e)}}>

                <div class={css.modal} onClick={(e) => e.stopPropagation()}>
                    {(loading || loading === undefined)
                        ? <p>Fetching...</p>
                        : <div>
                            <h1><a target="_blank" href={repo.repository.html_url}>{repo.repository.name}</a></h1>
                            {source_url &&
                            <h4 class="forked">Forked from <a target="_blank" href={source_url}>{source_full_name}</a></h4>}

                            <table>
                                <tr>
                                    <th>User</th>
                                    <th>Contributions</th>
                                </tr>

                                {contributors.map(c => <tr>
                                    <td>
                                        <a target="_blank" href={c.html_url}>{c.login}</a>
                                    </td>
                                    <td>
                                        <span>{c.contributions}</span>
                                    </td>
                                </tr>)}
                            </table>

                            {Object.keys(languages).length > 0 &&
                            <table>
                                <tr>
                                    <th>Language</th>
                                    <th>Size</th>
                                </tr>

                                {
                                    Object.keys(languages).map(lang => <tr>
                                        <td>{lang}</td>
                                        <td>{languages[lang]}</td>
                                    </tr>)}
                            </table>
                            }

                            <h3 class={!pullRequests.length && 'hidden'}>Popular pull requests</h3>
                            {pullRequests.length > 0 && pullRequests.map(pr => <ul>
                                <li>
                                    <p><a target="_blank" href={pr.html_url}>{pr.title}</a></p>
                                </li>
                            </ul>)
                            }
                        </div>
                    }
                </div>

            </div>
        );
    }
}

export {Dialog};