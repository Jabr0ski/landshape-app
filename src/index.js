import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HelpModal from './components/Modals/HelpModal';
import useHelpModal from './components/Modals/useHelpModal';
import SettingsModal from './components/Modals/SettingsModal';
import useSettingsModal from './components/Modals/useSettingsModal';
import StatsModal from './components/Modals/StatsModal';
import useStatsModal from './components/Modals/useStatsModal';
import countryDict from './components/countryDict';
import AutoSuggest from 'react-autosuggest';

let cc = countryDict[Math.floor(Math.random()*(countryDict.length))]
let currScore = 0
let highScore = 0

const lowerCasedCountries = countryDict.map(country => {
    return {
      name: country.name.toLowerCase()
    };
  });

function App(){
    const [value, setValue] = useState('');
    const [submitted, setSubmitted] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    if (localStorage.getItem('currScore') === ''){
        localStorage.setItem('currScore', 0);
    }
    if (localStorage.getItem('highScore') === ''){
        localStorage.setItem('highScore', 0);
    }
    if (localStorage.getItem('cc') === null){
        localStorage.setItem('cc', cc.code);
    }

    function getSuggestions(value) {
        return lowerCasedCountries.filter(country =>
          country.name.includes(value.trim().toLowerCase())
        );
      }

    function handleClick(){
        let answer = value.toLowerCase().trim()
        if (!submitted){
            if (answer === cc.name.toLowerCase()){
                setValue(cc.name + " is correct!")
                currScore = currScore + 1
                localStorage.setItem('currScore', currScore);
                if (currScore > highScore){
                    highScore = currScore
                    localStorage.setItem('Highscore', highScore);
                }
            } else {
                setValue(answer + " is wrong, it is " + cc.name + ".")
                currScore = 0
                localStorage.setItem('currScore', currScore);
            }
        } else {
            cc = countryDict[Math.floor(Math.random()*(countryDict.length))]
            localStorage.setItem('cc', cc.code);
            setValue('')
        }
        setSubmitted(!submitted)
    }

    return (
        <div className='app'>
            <TitleRow/>
            <LandBox/>
            <AutoSuggest
              suggestions={suggestions}
              onSuggestionsClearRequested={() => setSuggestions([])}
              onSuggestionsFetchRequested={({ value }) => {
                setValue(value);
                setSuggestions(getSuggestions(value));
              }}
              onSuggestionSelected={(_, { suggestionValue }) =>
                console.log("Selected: " + suggestionValue)
              }
              getSuggestionValue={suggestion => suggestion.name}
              renderSuggestion={suggestion => <span>{suggestion.name}</span>}
              inputProps={{
                placeholder: 'Guess the country!',
                value: value,
                disabled: submitted,
                onChange: (_, { newValue, method }) => {
                  setValue(newValue);
                }
              }}
              highlightFirstSuggestion={true}
              disabled={submitted}
            />      
            <SubmitButton 
              onClick={handleClick}
              submitted={submitted}
              setSubmitted={setSubmitted}
            />      
        </div>
    )
}

function TitleRow(){
    const {isHelpShowing, toggleHelp} = useHelpModal();
    const {isSettingsShowing, toggleSettings} = useSettingsModal();
    const {isStatsShowing, toggleStats} = useStatsModal();
    return (
        <div>
            <header>
                <button className="panelButton" onClick={toggleSettings}></button>
                <SettingsModal
                    isShowing={isSettingsShowing}
                    hide={toggleSettings}
                />
                <button className="panelButton" onClick={toggleHelp}></button>
                <HelpModal
                    isShowing={isHelpShowing}
                    hide={toggleHelp}
                />
                <b className='title'>LANDSHAPE</b>
                <button className="panelButton" onClick={toggleHelp}></button>
                <HelpModal
                    isShowing={isHelpShowing}
                    hide={toggleHelp}
                />
                <button className="panelButton" onClick={toggleStats}></button>
                <StatsModal
                    isShowing={isStatsShowing}
                    hide={toggleStats}
                />
            </header>
        </div>
    )
}

function LandBox(){
    let ccCode = localStorage.getItem('cc');
    var randomCountry = require('./images/countries/'+ccCode.toLowerCase()+'/vector.svg');
    return (
        <div>
            <span className='align'>Current Score: {localStorage.getItem('currScore')}</span>
                <div className='canvas'>
                    <img className='country' 
                    src={randomCountry} alt={"Country Pic"}>
                    </img>
                </div>
            <span className='align'>Highest Streak: {localStorage.getItem('Highscore')}</span>
        </div>
    )
}

// function GuessBox(props){
//     let dispText = ''
//     if (props.submitted){
//         dispText = props.message
//     } else {
//         dispText = props.guess
//     }
//     return (
//         <input className='guessBox'
//         value={dispText}
//         disabled={props.submitted}
//         onChange={e => props.setGuess(e.target.value)}>
//         </input>
//     )
// }

function SubmitButton(props){
    let buttonText = ''
    if (props.submitted){
        buttonText = 'NEXT'
    } else {
        buttonText = 'SUBMIT'
    }
    return (
        <div>
            <button className='submitButton'
            onClick={props.onClick}>
            {buttonText}
            </button>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);