import React, {Component} from 'react';
import { connect } from 'react-redux';
import MrWhiteContent from '../components/mrWhite/MrWhiteContent';
import Constants from '../constants/Constants';

class Content extends Component {

    getContentComponentBasedOnKey(key) {
        let componentToBeShown = <MrWhiteContent/>;
        switch(key) {
            case Constants.MENU.START_OVER:
                componentToBeShown = <MrWhiteContent/>;
                break;
            case Constants.MENU.ABOUT:
                break;
            case Constants.MENU.SCORE:
                break;
        }

        return componentToBeShown;
    }

    render() {
        const contentToBeShown = this.getContentComponentBasedOnKey(this.props.menu)

        return (
          <div className={'rb-content-container'}>
              {contentToBeShown}
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        menu: state.menu,
    };
};


export default connect(mapStateToProps, null) (Content);
