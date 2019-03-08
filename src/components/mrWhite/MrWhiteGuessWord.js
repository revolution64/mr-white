import React, {Fragment, Component} from 'react';
import helper from '../../utilities/helper';
import Button from '../partials/Button/Button';
import {bindActionCreators} from 'redux';
import menuActions from '../../store/actions/menuActions';
import {connect} from 'react-redux';
import mrWhiteActions from '../../store/actions/mrWhiteActions';

class MrWhiteGuessWord extends Component {

    constructor(props) {
        super(props);

        this.state = {
            guessed: false,
            correct: false
        };

        this.handleSubmitButton = this.handleSubmitButton.bind(this);
    }

    handleSubmitButton(event) {
        event.preventDefault();
        const formData = new FormData(event.target),
            guessedWord = formData.get('word');

        if (guessedWord.toUpperCase() === this.props.currentWord.toUpperCase()) {
            this.setState({
                guessed: true,
                correct: true
            });
        } else {
            this.setState({
                guessed: true,
                correct: false
            });
        }
    }


    render() {
        const {guessed, correct} = this.state,
            text = guessed && correct ? 'Helemaal correct' : 'Fout geraden, het woord was ' + this.props.currentWord;

        if (!guessed) {
            return (
                (<form className="rb-margin-bottom" onSubmit={this.handleSubmitButton}>
                    <h2 className="rb-add-player-label">Welk woord denk je dat het is?</h2>
                    <div className="rb-input-class">
                        <input className={'rb-input-add-name'} name="word" type="text"/>
                        <input className={'rb-submit-add-name'} type="submit"/>
                    </div>
                </form>)
            );
        } else {
            return (<Fragment>
                <h2>{text}</h2>
                <div>
                    <a onClick={this.props.goToNextRound}>Start volgende ronde.</a>
                </div>
            </Fragment>);
        }
    }

}

export default MrWhiteGuessWord;
