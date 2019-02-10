import React, {Component, Fragment} from 'react';
import Menu from '../components/menu/Menu';
import Content from './Content';

class Main extends Component {

    render() {
        return (
            <div className="rb-main-column">
                <Menu/>
                <Content/>
            </div>
        );
    }
}

export default Main;
