import React, {Component} from 'react';
import MrWhiteIntro from './MrWhiteIntro';
import CONSTANTS from '../../constants/Constants';
import MrWhiteAddPlayers from './MrWhiteAddPlayers';
import MrWhiteGame from './MrWhiteGame';

class MrWhiteContent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentContent: CONSTANTS.MRWHITE.INTRO
        };
    }

    getComponentBasedOnState(currentContent) {
        switch(currentContent) {
            case CONSTANTS.MRWHITE.INTRO:
                return <MrWhiteIntro onContinue={() => this.setState( {currentContent: CONSTANTS.MRWHITE.ADD_PLAYERS })}/>;
            case CONSTANTS.MRWHITE.ADD_PLAYERS:
                return <MrWhiteAddPlayers onContinue={() => this.setState( {currentContent: CONSTANTS.MRWHITE.GAME })}/>;
            case CONSTANTS.MRWHITE.GAME:
                return <MrWhiteGame />
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


export default MrWhiteContent
