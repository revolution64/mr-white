import React, {Component} from 'react';
import MrWhiteIntro from './MrWhiteIntro';
import CONSTANTS from '../../constants/Constants';
import MrWhiteAddPlayers from './MrWhiteAddPlayers';
import MrWhiteGame from './MrWhiteGame';
import {bindActionCreators} from 'redux';
import mrWhiteActions from '../../store/actions/mrWhiteActions';
import {connect} from 'react-redux';

class MrWhiteContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentContent: CONSTANTS.MRWHITE.INTRO
        };
    }

    componentDidMount() {
        this.props.mrWhiteActions.loadWords();
    }

    getComponentBasedOnState(currentContent) {
        switch(currentContent) {
            case CONSTANTS.MRWHITE.INTRO:
                return <MrWhiteIntro onContinue={() => this.setState( {currentContent: CONSTANTS.MRWHITE.ADD_PLAYERS })}/>;
            case CONSTANTS.MRWHITE.ADD_PLAYERS:
                return <MrWhiteAddPlayers onContinue={() => this.setState( {currentContent: CONSTANTS.MRWHITE.GAME })}/>;
            case CONSTANTS.MRWHITE.GAME:
                return <MrWhiteGame />;
        }
    }

    render() {
        const componentToBeShown = this.getComponentBasedOnState(this.state.currentContent);

        return (
          <div className="rb-mrwhite-container">
            {componentToBeShown}
          </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        mrWhiteActions: bindActionCreators(mrWhiteActions, dispatch)
    };
};

export default connect(null, mapDispatchToProps)(MrWhiteContent);
