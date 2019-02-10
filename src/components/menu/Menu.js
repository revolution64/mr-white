import React, {Component} from 'react';
import MenuItem from './MenuItem';
import Logo from './Logo';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import CONSTANTS from '../../constants/Constants';
import menuActions from '../../store/actions/menuActions';

class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            menuItems: ['Blog', CONSTANTS.SECTION.MRWHITE, 'About']
        };
    }

    onMenuItemClick(content) {
       this.props.menuActions.openMrWhiteContent(content);
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
        menuActions : bindActionCreators(menuActions, dispatch)
    }
}



export default connect(null, mapDispatchToProps) (Menu);
