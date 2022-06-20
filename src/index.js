import React, { useState, useEffect, useRef } from 'react';
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

let seed = Math.floor(Math.random()*(countryDict.length))
let currScore = 0
let highScore = 0

let currCountry = countryDict[localStorage.getItem('seed')]

if (localStorage.getItem('currScore')){
    currScore = parseInt(localStorage.getItem('currScore'));
}

if (localStorage.getItem('highScore')){
    highScore = parseInt(localStorage.getItem('highScore'))
    console.log(highScore);
}

const lowerCasedCountries = countryDict.map(country => {
    return {
      name: country.name.toLowerCase()
    };
  });

function App(){
    const [value, setValue] = useState('');
    const [submitted, setSubmitted] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const countryInput = useRef();
    // const subButton = useRef();
    
    useEffect(()=>{
        countryInput.current.focus();  
    })

    if (localStorage.getItem('currScore') === 0){
        localStorage.setItem('currScore', 0);
    }
    if (localStorage.getItem('highScore') === 0){
        localStorage.setItem('highScore', 0)
        console.log(highScore);
    }
    if (localStorage.getItem('seed') === null){
        localStorage.setItem('seed', seed);
    } 

    function getSuggestions(value) {
        return lowerCasedCountries.filter(country =>
          country.name.includes(value.trim().toLowerCase())
        );
      }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("refresh prevented");
      };

    function handleKeypress(e) {      
        //triggers by pressing the enter key    
        if (e.keyCode === 13) {      
            handleClick();  
        }
    };

    function handleClick(){
        let answer = value.toLowerCase().trim()
        if (!submitted){
            if (answer === currCountry.name.toLowerCase()){
                setValue(currCountry.name + " is correct!")
                currScore = currScore + 1
                localStorage.setItem('currScore', currScore);
                if (currScore > highScore){
                    highScore = currScore
                    localStorage.setItem('highScore', highScore);
                }
            } else {
                setValue(answer + " is wrong, it is " + currCountry.name + ".")
                currScore = 0
                localStorage.setItem('currScore', currScore);
            }
            seed = Math.floor(Math.random()*(countryDict.length))
            localStorage.setItem('seed', seed)
        } else {
            // subButton.current.focus();
            currCountry = countryDict[localStorage.getItem('seed')]
            setValue('')
        }
        setSubmitted(!submitted)
        return false
    }

    return (
        <div className='app'>
            <TitleRow/>
            <LandBox/>
            <form onSubmit={onSubmit}>
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
                ref: countryInput,
                placeholder: 'Guess the country!',
                value: value,
                disabled: submitted,
                onChange: (_, { newValue, method }) => {
                  setValue(newValue);
                }
              }}
              highlightFirstSuggestion={true}
              onKeyPress={handleKeypress}
              disabled={submitted}
            />      
            <SubmitButton
              onClick={handleClick}
              onKeyPress={handleKeypress}
              submitted={submitted}
              setSubmitted={setSubmitted}
            //   ref={subButton}
            />
            </form>
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
    let countryCode = currCountry.code.toLowerCase()
    var randomCountry = require('./images/countries/'+countryCode+'/vector.svg');
    return (
        <div>
            <span className='align'>Current Score: {localStorage.getItem('currScore')}</span>
                <div className='canvas'>
                    <img className='country' 
                    src={randomCountry} alt={"Country Pic"}>
                    </img>
                </div>
            <span className='align'>Highest Streak: {localStorage.getItem('highScore')}</span>
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
            <button type="submit" className='submitButton'
            onClick={props.onClick}>
            {/* ref={props.subButton}> */}
            {buttonText}
            </button>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);