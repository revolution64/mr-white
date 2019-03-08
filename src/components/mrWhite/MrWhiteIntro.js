import React, {Component, Fragment} from 'react';

const MrWhiteIntro = ({onContinue}) =>
    <Fragment>
        <h1>Welcome to Mr White</h1>
        <p> Mr White is een spel waarbij elke speler een woord te zien krijgt, behalve 1 persoon: die persoon is mr White!
            Elke speler zegt vervolgens om de beurt een woord wat te maken heeft met het eerder geziene woord.
        </p>
        <p>
            Aangezien dat Mr White het woord niet gezien heeft, gaat die proberen om een woord te zeggen dat in de lijn van de andere woorden ligt.
            Vervolgens proberen de spelers te raden wie Mr White is!
        </p>
        <a onClick={onContinue}>Begin met spelen!</a>
    </Fragment>;

export default MrWhiteIntro;
