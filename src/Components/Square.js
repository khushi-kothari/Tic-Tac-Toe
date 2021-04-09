import React, {Component} from 'react'

class Square extends Component {
    constructor() {
        super();
        this.state = {
            className : "square",
            highlight : false
        };
    }

    render() {
        return (
            <button className = {this.state.className}
            onClick = {() => this.props.onClick()}> {this.props.value} </button>
        );
    }
}

export default Square