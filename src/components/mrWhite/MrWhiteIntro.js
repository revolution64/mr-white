import React, {Component ,Fragment} from 'react';

const MrWhiteIntro = ({onContinue}) =>
  <Fragment>
    <h1>Welcome to Mr White</h1>
    <p> Mr White is een spel waarin elke speler 1 woord te zien krijgt, behalve 1 speler, namelijk Mr White.
            Vervolgens
            zegt iedere speler om de beurt een woord dat in de context van het geziene woord ligt. Mr White probeert aan
            de hand van de
            eerders genoemde woorden, eenzelfde woord in de context te vertellen zonder daardoor zijn identiteit prijs te
            geven.</p>
     <a onClick={onContinue}>Begin met spelen!</a>
  </Fragment>;

export default MrWhiteIntro;
