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
            currentWord: this.getRandomWord()
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.goToNextPhase = this.goToNextPhase.bind(this);
        this.startNextRound = this.startNextRound.bind(this);
    }

    componentDidMount() {
        this.configurePlayerRoles(this.props.players);
    }

    getRandomWord() {
        const randomIndex =  Math.floor(Math.random() * this.props.words.length);
        return this.props.words[randomIndex];
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

    startNextRound() {
        this.configurePlayerRoles(this.props.players);
        this.setState({
            modalIsOpen: false,
            phase: CONSTANTS.MRWHITE.PHASES.CLICK_YOUR_NAME,
            currentWord: this.getRandomWord()
        });
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
                return <h2>Klik op jouw naam:</h2>;
            case CONSTANTS.MRWHITE.PHASES.REVEAL_PLAYER:
                return <Fragment>
                    <h2>{this.state.whoWillStart.name}...  Jij begint!</h2>
                    <h2>Wie is Mr White?</h2>
                </Fragment>;
        }
    }

    getContentToShowInModal(selectedPlayer, currentWord, phase) {
        let modalContent;
        switch (phase) {
            case CONSTANTS.MRWHITE.PHASES.CLICK_YOUR_NAME:
                if (selectedPlayer.isMrWhite) {
                    modalContent = {close: true, text: '... Jij bent mr White!'};
                } else {
                    modalContent = {close: true, text: currentWord};
                }
                break;
            case CONSTANTS.MRWHITE.PHASES.REVEAL_PLAYER:
                if (selectedPlayer.isMrWhite) {
                    modalContent = {
                        text: 'Juist gegokt! :-) \nMr White mag nu het woord raden: ',
                        children: (<MrWhiteGuessWord currentWord={currentWord}
                                                     goToNextRound={this.startNextRound}/>),
                        close: false
                    };
                } else {
                    modalContent = {
                        close: true,
                        text: 'Fout gegokt! :-('
                    };
                }
                break;
            default :
                modalContent = {text: 'An Error Occured', close: true};
                break;
        }

        return <RBModal close={modalContent.close} text={modalContent.text} children={modalContent.children}
                        isOpen={this.state.modalIsOpen} onClose={this.closeModal}/>;
    }


    render() {
        const {phase, modalIsOpen, selectedPlayer, currentWord} = this.state,
            instruction = this.getInstructionBasedOnPhase(phase),
            modal = modalIsOpen && this.getContentToShowInModal(selectedPlayer, currentWord, phase),
            startRound = phase === CONSTANTS.MRWHITE.PHASES.CLICK_YOUR_NAME
                && (<div className={'rb-margin-top'}><a onClick={() => this.goToNextPhase(phase)}>Begin ronde!</a>
                </div>),
            playerButtons = this.props.players.map(
                (key) => this.mapPlayerToButton(key));

        return (
            <Fragment>
                {instruction}
                {playerButtons}
                {modal}
                {startRound}
            </Fragment>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        players: state.mrWhite.players,
        words: state.mrWhite.words
    };
};


export default connect(mapStateToProps, null)(MrWhiteGame);
