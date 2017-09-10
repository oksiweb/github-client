import { h, Component } from 'preact';
import css from './SortBar.css'

class Sorting extends Component {
    render( { sortingParams } ) {
        return (
            <div class={css.sort}>
                <span>Sort by</span>
                <select onChange={(e) => this.props.onSortType(e.target.value)}>
                    <option value="name"
                            selected={!sortingParams.by || sortingParams.by === 'name'}>
                        Name
                    </option>
                    <option value="stargazers_count"
                            selected={sortingParams.by === 'stargazers_count'}>
                        Stars
                    </option>
                    <option value="open_issues_count"
                            selected={sortingParams.by === 'open_issues_count'}>
                        Open Issues
                    </option>
                    <option value="pushed_at"
                            selected={sortingParams.by === 'pushed_at'}>
                        Updated date
                    </option>
                </select>

                <span>Order</span>
                <select onChange={(e) => this.props.onSortOrder(e.target.value)}>
                    <option value="asc"
                            selected={!sortingParams.order || sortingParams.order === 'asc'}>
                        Ascending
                    </option>
                    <option value="desc"
                            selected={sortingParams.order === 'desc'}>
                        Descending
                    </option>
                </select>
            </div>
        )
    }
}

export {Sorting}
