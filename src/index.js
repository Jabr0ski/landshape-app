import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HelpModal from './components/Modals/HelpModal';
import useHelpModal from './components/Modals/useHelpModal';
import SettingsModal from './components/Modals/SettingsModal';
import useSettingsModal from './components/Modals/useSettingsModal';
import StatsModal from './components/Modals/StatsModal';
import useStatsModal from './components/Modals/useStatsModal';
// import countryCodes from './components/countryCodes';
import countryDict from './components/countryDict'

const cc = countryDict[Math.floor(Math.random()*(countryDict.length))]

function App(){
    const [guess, setGuess] = useState('');
    return (
        <div className='app'>
            <TitleRow/>
            <LandBox/>
            <GuessBox guess={guess} setGuess={setGuess}/>
            <SubmitButton 
            onClick={handleClick(guess.toLowerCase())}/>      
        </div>
    )
}

function handleClick(guess){
    if (guess === cc.name.toLowerCase()){
        console.log(guess, "correct")
    } else {
        console.log(guess, "wrong")
    } 
}

function TitleRow(){
    const {isHelpShowing, toggleHelp} = useHelpModal();
    const {isSettingsShowing, toggleSettings} = useSettingsModal();
    const {isStatsShowing, toggleStats} = useStatsModal();
    return (
        <div>
            <header>
                <button className="panelButton" onClick={toggleSettings}>M</button>
                <SettingsModal
                    isShowing={isSettingsShowing}
                    hide={toggleSettings}
                />
                <button className="panelButton" onClick={toggleHelp}>M</button>
                <HelpModal
                    isShowing={isHelpShowing}
                    hide={toggleHelp}
                />
                <b className='title'>LANDSHAPE</b>
                <button className="panelButton" onClick={toggleHelp}>M</button>
                <HelpModal
                    isShowing={isHelpShowing}
                    hide={toggleHelp}
                />
                <button className="panelButton" onClick={toggleStats}>M</button>
                <StatsModal
                    isShowing={isStatsShowing}
                    hide={toggleStats}
                />
            </header>
        </div>
    )
}

function LandBox(){
    var randomCountry = require('./images/countries/'+cc.code.toLowerCase()+'/vector.svg');
    return (
        <div className='canvas'>
            <img className='country' 
            src={randomCountry} alt={"Country Pic"}>
            </img>
        </div>
    )
}

function GuessBox({guess, setGuess}){
    return (
        <input className='guessBox'
        onChange={e => setGuess(e.target.value)}>
        </input>
    )
}

function SubmitButton(props){  
    return (
        <div>
            <button className='submitButton'>
            SUBMIT
            </button>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);