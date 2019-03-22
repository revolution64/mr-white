import React, {Component} from 'react';
import MenuItem from './MenuItem';
import Logo from './Logo';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import CONSTANTS from '../../constants/Constants';
import menuActions from '../../store/actions/menuActions';
import Constants from '../../constants/Constants'
import mrWhiteActions from '../../store/actions/mrWhiteActions';

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuItems: [Constants.MENU.START_OVER,
                Constants.MENU.SCORE,
                Constants.MENU.ABOUT]
        };
    }

    onMenuItemClick(content) {
        if (content === Constants.MENU.START_OVER) {
            mrWhiteActions.removePlayers();
        }
       this.props.menuActions.openContent(content);
    }

    render() {
        return (
          <nav className="rb-menu-container">
            <Logo/>
            <div className="rb-menu-items">
              {this.state.menuItems.map((text) => <MenuItem onClick={() => this.onMenuItemClick(text)} text={text}/>)}
            </div>
          </nav>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        menuActions : bindActionCreators(menuActions, dispatch),
        mrWhiteActions : bindActionCreators(mrWhiteActions, dispatch)
    }
}



export default connect(null, mapDispatchToProps) (Menu);
