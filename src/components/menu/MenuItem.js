import React, { Component } from "react";

class MenuItem extends Component {

    render() {
        return (
          <span onClick={this.props.onClick} className="rb-menu-item">{this.props.text}</span>
        );
    }
}

export default MenuItem;
