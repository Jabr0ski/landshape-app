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
const lowerCasedCountries = countryDict.map(country => {
    return {
      name: country.name.toLowerCase()
    };
  });

function App(){
    const [guess, setGuess] = useState('');
    const [value, setValue] = useState('');
    const [submitted, setSubmitted] = useState('');
    const [message, setMessage] = useState('');
    const [suggestions, setSuggestions] = useState([]);    

    function getSuggestions(value) {
        return lowerCasedCountries.filter(country =>
          country.name.includes(value.trim().toLowerCase())
        );
      }

    function handleClick(){
        let answer = value.toLowerCase().trim()
        if (!submitted){
            if (answer === cc.name.toLowerCase()){
                setMessage(cc.name + " is correct!")
                console.log(message)
            } else {
                setMessage(answer + " is wrong, it is " + cc.name + ".")
                console.log(message)
            }
        } else {
            cc = countryDict[Math.floor(Math.random()*(countryDict.length))]
            setGuess('')
        }
        setSubmitted(!submitted)
    }
    
    return (
        <div className='app'>
            <TitleRow/>
            <LandBox/>
            <GuessBox 
              guess={guess} 
              setGuess={setGuess}
              submitted={submitted}
              setSubmitted={setSubmitted}
              message={message}
              setMessage={setMessage}
            />
            <AutoSuggest
              className='guessBox'
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
                placeholder: "Guess the country!",
                value: value,
                onChange: (_, { newValue, method }) => {
                  setValue(newValue);
                }
              }}
              highlightFirstSuggestion={true}
            />      
            <SubmitButton 
              onClick={handleClick}
              guess={guess} 
              setGuess={setGuess}
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
    var randomCountry = require('./images/countries/'+cc.code.toLowerCase()+'/vector.svg');
    return (
        <div className='canvas'>
            <img className='country' 
            src={randomCountry} alt={"Country Pic"}>
            </img>
        </div>
    )
}

function GuessBox(props){
    let dispText = ''
    if (props.submitted){
        dispText = props.message
    } else {
        dispText = props.guess
    }
    return (
        <input className='guessBox'
        value={dispText}
        disabled={props.submitted}
        onChange={e => props.setGuess(e.target.value)}>
        </input>
    )
}

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