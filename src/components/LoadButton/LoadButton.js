import { h, Component } from 'preact'
import css from './LoadButton.css'

class LoadButton extends Component {

    render({shouldDisplayLoadMore}) {
        return (
            <div class={css.btnContainer}>
                {
                    (shouldDisplayLoadMore) ? <button onClick={(e) => this.props.onLoadMore()}>Load more</button> : ''
                }
            </div>
        )
    }
}

export {LoadButton}