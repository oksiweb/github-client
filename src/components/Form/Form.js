import { h, Component } from 'preact'
import { route } from 'preact-router';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: null
        };
        this.updateText = this.updateText.bind(this);
        this.redirectPage = this.redirectPage.bind(this);
    }
    updateText(e) {
        this.setState({ text: e.target.value });
    }
    redirectPage() {
        route(`/${encodeURIComponent(this.state.text)}`)
    }
    render() {

        return (
            <section className="submit">
                <form onSubmit = {this.redirectPage} >
                    <input type="text"  onInput={this.updateText} />
                    <input type="submit" onClick={this.redirectPage} value="add"/>
                </form>
            </section>
        )
    }
}