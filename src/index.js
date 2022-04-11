import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import AU from './images/countries/au/vector.svg';
import HelpModal from "./components/Modals/HelpModal";
import useHelpModal from './components/Modals/useHelpModal';
import SettingsModal from "./components/Modals/SettingsModal";
import useSettings from './components/Modals/useSettingsModal';
import countryCodes from './components/countryCodes';

function App(){
    
    return (
        <div className='app'>
            <TitleRow />
            <LandBox/>
            <GuessBox/>
            <SubmitButton/>      
        </div>
    )
}

function TitleRow(){
    const {isHelpShowing, toggleHelp} = useHelpModal();
    const {isSettingsShowing, toggleSettings} = useSettings();
    return (
        <div>
            <header>
                <button className="panelButton" onClick={toggleSettings}>SM</button>
                <SettingsModal
                    isShowing={isSettingsShowing}
                    hide={toggleSettings}
                />
                <button className="panelButton" onClick={toggleHelp}>SM</button>
                <HelpModal
                    isShowing={isHelpShowing}
                    hide={toggleHelp}
                />
                <b className='title'>LANDSHAPE</b>
                <button className="panelButton" onClick={toggleHelp}>SM</button>
                <HelpModal
                    isShowing={isHelpShowing}
                    hide={toggleHelp}
                />
                <button className="panelButton" onClick={toggleHelp}>SM</button>
                <HelpModal
                    isShowing={isHelpShowing}
                    hide={toggleHelp}
                />
            </header>
        </div>
    )
}

function LandBox(){
    let cc = countryCodes[Math.floor(Math.random()*countryCodes.length)]
    var randomCountry = require('./images/countries/'+cc+'/vector.svg');
    return (
        <div className='canvas'>
            <img className='country' 
            src={randomCountry} alt={"Country Pic"}>
            </img>
        </div>
    )
}

function GuessBox(){
    return (
        <input className='guessBox'></input>
    )
}

function SubmitButton(){
    
    return (
        <div>
            <button className='submitButton'> SUBMIT</button>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);