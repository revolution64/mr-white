import React, {Fragment, Component} from 'react';
import helper from '../../utilties/helper';
import Button from '../partials/Button/Button';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import mrWhiteActions from '../../store/actions/mrWhiteActions';

class MrWhiteAddPlayers extends Component {

    constructor(props) {
        super(props);
        this.handleSubmitButton = this.handleSubmitButton.bind(this);
    }


    mapPlayerToButton(player) {
        return <Button label={player.name} color={player.color}/>;
    }

    handleSubmitButton(event) {
        event.preventDefault();
        const formData = new FormData(event.target),
            playerName = formData.get('name'),
            playerId = this.props.players.length,
            playerColor = helper.mapNumberToColor(playerId);
        this.props.mrWhiteActions.addPlayer(
            {
                name: playerName,
                id: playerId,
                color: playerColor
            });
    }

    render() {
        const playerButtons = this.props.players.map(
            (key) => this.mapPlayerToButton(key)
        );

        return (
            <Fragment>
                <h1>Voeg spelers toe</h1>
                <form className="rb-margin-bottom" onSubmit={this.handleSubmitButton}>
                    <span className="rb-add-player-label">Speler naam:</span>
                    <input name="name" type="text"/>
                    <input type="submit"/>
                </form>
                {playerButtons}
                <div className="rb-margin-top">
                    <a onClick={this.props.onContinue}>Begin met spelen</a>
                </div>
            </Fragment>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        players: state.mrWhite,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        mrWhiteActions: bindActionCreators(mrWhiteActions, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(MrWhiteAddPlayers);
