import { h, Component } from 'preact';
import css from './Filters.css'

class Filters extends Component {

    render({ filters, languages }) {
        const { hasOpenIssues, hasTopics, starredTimes, updatedAfter, repoType, language } = filters;

        return (
            <div class={css.filters}>
                <div>
                    <label for="has-open-issues">Has open issues</label>
                    <input
                        id="has-open-issues"
                        type="checkbox"
                        checked={hasOpenIssues}
                        onChange={(e) => this.props.update({filters: {...filters, hasOpenIssues : e.target.checked }})}/>
                </div>

                <div>
                <label for="hasTopics">Has topics</label>
                    <input
                        id="hasTopics"
                        type="checkbox"
                        checked={hasTopics}
                        onChange={(e) => this.props.update({filters: {...filters, hasTopics : e.target.checked }})}/>
                </div>
                <div>
                    <label for="starredTimes" >Stars</label>
                    <input
                        type="number"
                        id="starredTimes"
                        value={starredTimes}
                        onChange={(e) => this.props.update({filters: {...filters, starredTimes : e.target.value }})}/>
                </div>

                <div>
                <label for="updatedAfter">Updated after</label>
                    <input
                        id="updatedAfter"
                        type="date"
                        value={updatedAfter}
                        onChange={(e) => this.props.update({filters: {...filters, updatedAfter : e.target.value }})}/>
                </div>
                <div>
                    <label for="type">Type</label>
                    <select id="type" onInput={(e) => this.props.update({filters: {...filters, repoType : e.target.value }})}>
                        <option value="All" selected={!repoType || repoType === 'All'}>All</option>
                        <option value="Fork" selected={repoType === 'Fork'}>Fork</option>
                        <option value="Source" selected={repoType === 'Source'}>Source</option>
                    </select>
                </div>

                <div>
                    <label for="language">Language</label>
                    <select id="language" onInput={(e) => this.props.update({filters: {...filters, language : e.target.value }})}>
                        <option value="All" selected={!language || language === 'All'}>All</option>
                        {
                            languages.map(lang => {
                                return <option value={lang} selected={language === lang}>{lang}</option>
                            })
                        }
                    </select>
                </div>
            </div>
        )
    }
}

export { Filters }