import React, {Fragment, Component} from 'react';
import {connect} from 'react-redux';

import Button from '../partials/Button/Button';
import CONSTANTS from '../../constants/Constants';
import RBModal from '../partials/Modal/RBModal';
import MrWhiteGuessWord from './MrWhiteGuessWord';


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
        this.goToNextPhase = this.goToNextPhase.bind(this);
    }

    componentDidMount() {
        this.configurePlayerRoles(this.props.players);
    }

    configurePlayerRoles(players) {
        const amountOfPlayers = players.length,
            mrWhitePlayerId = Math.floor(Math.random() * amountOfPlayers),
            whoWillStart = this.calculateWhoWillStart(amountOfPlayers, mrWhitePlayerId, mrWhitePlayerId);

        for (let i = 0; i < amountOfPlayers; i++) {
            players[i].isMrWhite = i === mrWhitePlayerId;
        }

        this.setState({
            whoWillStart: players[whoWillStart]
        });
        return players;
    }

    calculateWhoWillStart(amountOfPlayers, mrWhitePlayerId, starterPlayerId) {
        if (starterPlayerId !== mrWhitePlayerId) {
            return starterPlayerId;
        } else {
            starterPlayerId = Math.floor(Math.random() * amountOfPlayers);
            return this.calculateWhoWillStart(amountOfPlayers, mrWhitePlayerId, starterPlayerId);
        }
    }

    mapPlayerToButton(player) {
        return <Button label={player.name} onClick={() => (this.openModal(player))} color={player.color}/>;
    }

    openModal(player) {
        this.setState({
            modalIsOpen: true,
            selectedPlayer: player
        });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false
        });
    }

    goToNextPhase(currentPhase) {
        let nextPhase;
        switch (currentPhase) {
            case CONSTANTS.MRWHITE.PHASES.CLICK_YOUR_NAME:
                nextPhase = CONSTANTS.MRWHITE.PHASES.REVEAL_PLAYER;
                break;
            case CONSTANTS.MRWHITE.PHASES.REVEAL_PLAYER:
                nextPhase = CONSTANTS.MRWHITE.PHASES.GUESS_WORD;
                break;
            case CONSTANTS.MRWHITE.PHASES.GUESS_WORD:
                nextPhase = CONSTANTS.MRWHITE.PHASES.CLICK_YOUR_NAME;
                break;
        }
        this.setState({
            phase: nextPhase
        });
    }

    getInstructionBasedOnPhase(phase) {
        switch (phase) {
            case CONSTANTS.MRWHITE.PHASES.CLICK_YOUR_NAME:
                return 'Klik op jouw naam';
            case CONSTANTS.MRWHITE.PHASES.REVEAL_PLAYER:
                return this.state.whoWillStart.name + ' zal starten\n\n Wie is Mr White?';
        }
    }

    getContentToShowInModal(selectedPlayer, currentWord, phase) {
        switch (phase) {
            case CONSTANTS.MRWHITE.PHASES.CLICK_YOUR_NAME:
                if (selectedPlayer.isMrWhite) {
                    return {close: true, text: '... ;-)(Jij bent mr White!)'};
                } else {
                    return {close: true, text: currentWord};
                }
            case CONSTANTS.MRWHITE.PHASES.REVEAL_PLAYER:
                if (selectedPlayer.isMrWhite) {
                    return {text: 'Juist gegokt! :-) \nMr White mag nu het woord raden: }',
                            children: (<MrWhiteGuessWord currentWord={currentWord} goToNextRound={() => { this.goToNextPhase(phase); this.closeModal() }}/>),
                            close: false};
                } else {
                    return {
                        close: true,
                        text: 'Fout gegokt! :-('
                    };
                }
            default :
                return {text: 'An Error Occured', close: true};
        }
    }


    render() {
        const {phase, modalIsOpen, selectedPlayer, currentWord} = this.state,
            instruction = this.getInstructionBasedOnPhase(phase),
            contentToShowInModal = modalIsOpen && this.getContentToShowInModal(selectedPlayer, currentWord, phase),
            modal = <RBModal close={contentToShowInModal.close} text={contentToShowInModal.text} children={contentToShowInModal.children}
                             isOpen={modalIsOpen} onClose={this.closeModal}/>,
            startRound = phase === CONSTANTS.MRWHITE.PHASES.CLICK_YOUR_NAME
                && (<a className="rb-margin-top" onClick={() => this.goToNextPhase(phase)}>Begin ronde!</a>),
            playerButtons = this.props.players.map(
                (key) => this.mapPlayerToButton(key));

        return (
            <Fragment>
                <h1>{instruction}</h1>
                {playerButtons}
                {modal}
                {startRound}
            </Fragment>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        players: state.mrWhite
    };
};


export default connect(mapStateToProps, null)(MrWhiteGame);
