import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';

import Button from '../partials/Button/Button';
import CONSTANTS from '../../constants/Constants';
import RBModal from '../partials/Modal/RBModal';



class MrWhiteGame extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phase: CONSTANTS.MRWHITE.PHASES.CLICK_YOUR_NAME,
            modalIsOpen: false,
            currentWord: 'hello'
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.configurePlayerRoles(props.players);
    }

    configurePlayerRoles(players) {
        const amountOfPlayers = players.length,
            whoIsMisterWhite = Math.floor(Math.random() * amountOfPlayers);

        for (let i = 0; i<amountOfPlayers ; i++) {
            players[i].isMrWhite = i === whoIsMisterWhite;
        }

        return players;
    }

    mapPlayerToButton(player) {
        return <Button label={player.name} onClick={() => (this.openModal(player))} color={player.color}/>;
    }

    openModal(player) {
        this.setState( {
            modalIsOpen: true,
            selectedPlayer: player
        });
    }

    closeModal() {
        this.setState( {
            modalIsOpen: false
        });
    }


    getInstructionBasedOnPhase(phase) {
        switch(phase) {
            case CONSTANTS.MRWHITE.PHASES.CLICK_YOUR_NAME:
                return 'Klik op jouw naam';
            case CONSTANTS.MRWHITE.PHASES.REVEAL_PLAYER:
                return 'Wie is Mr White';
        }
    }

    getContentToShowInModal(selectedPlayer, currentWord) {
        if(selectedPlayer.isMrWhite) {
            return 'Mr White';
        } else {
            return currentWord;
        }
    }

    render() {
        const {phase, modalIsOpen, selectedPlayer, currentWord} = this.state;
        const playerButtons = this.props.players.map(
            (key) => this.mapPlayerToButton(key)
        );
        const instruction = this.getInstructionBasedOnPhase(phase);

        const contentToShowInModal = modalIsOpen && this.getContentToShowInModal(selectedPlayer, currentWord);
        const modal = <RBModal content={contentToShowInModal} isOpen={modalIsOpen} onClose={this.closeModal}/>

        return (
            <Fragment>
                <h1>{instruction}</h1>
                {playerButtons}
                {modal}
            </Fragment>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        players: state.mrWhite,
    };
};


export default connect(mapStateToProps, null)(MrWhiteGame);
