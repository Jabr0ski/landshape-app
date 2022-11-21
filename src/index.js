/* eslint-disable eqeqeq */
import React, { useState, useEffect, useRef, forwardRef } from 'react';
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
import start from './Helpers/start.js'
import continentQueues from "./Helpers/statQueues.js";

start()

let seed = Math.floor(Math.random()*(countryDict.length))

let currScore = 0
let highScore = 0

let currCountry = countryDict[localStorage.getItem('seed')]

if (localStorage.getItem('currScore')){
    currScore = parseInt(localStorage.getItem('currScore'));
}

if (localStorage.getItem('highScore')){
    highScore = parseInt(localStorage.getItem('highScore'));
}

if (localStorage.getItem('currScore')){
    currScore = parseInt(localStorage.getItem('currScore'));
}

if (localStorage.getItem('highScore')){
    highScore = parseInt(localStorage.getItem('highScore'));
}

const continentsArr = ['OA', 'AF', 'AN', 'AS', 'EU', 'NA', 'OC', 'SA']
const queueArr = 
[continentQueues.OAqueue, 
    continentQueues.AFqueue, 
    continentQueues.ANqueue, 
    continentQueues.ASqueue, 
    continentQueues.EUqueue, 
    continentQueues.NAqueue, 
    continentQueues.OCqueue, 
    continentQueues.SAqueue]

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
    const SubmitButtonRef = useRef();
    
    useEffect(()=>{
        if(value===""){
            countryInput.current.focus();
        }
    })

    if (localStorage.getItem('currScore') === 0){
        localStorage.setItem('currScore', 0);
    }
    if (localStorage.getItem('highScore') === 0){
        localStorage.setItem('highScore', 0)
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
        SubmitButtonRef.current.focus();
      };

    function filterCheck(){
        let contSum = 0
        continentsArr.forEach((cont)=>{
            contSum += parseInt(localStorage.getItem(cont))
            console.log(contSum, " constum and contArr len is ", continentsArr.length)
        })
        if(contSum == 1) {
            continentsArr.forEach((cont)=>{
                localStorage.setItem(cont, 1)
            })
            contSum = continentsArr.length
        } else if(contSum < continentsArr.length) {
            currScore = 0
            localStorage.setItem('currScore', currScore);
        }
        return contSum < continentsArr.length
    }

    function handleClick(){
        let answer = value.toLowerCase().trim()
        // let contSum = 0
        if (!submitted){
            filterCheck()
            if (answer === currCountry.name.toLowerCase()){
                setValue(currCountry.name + " is correct!")
                if (!filterCheck()){
                    currScore = currScore + 1
                    localStorage.setItem('currScore', currScore);
                    if (currScore > highScore){
                        highScore = currScore
                        localStorage.setItem('highScore', highScore);
                    }
                    queueArr.forEach((q, index)=>{
                        if(continentsArr[index] == currCountry.continent || continentsArr[index] == 'OA'){
                            q.push(1);
                            if(q.length > 100){
                                q.shift();
                            }
                            localStorage.setItem(continentsArr[index] + 'queue', q)
                        } 
                    })
                } 
            } else {
                if (answer === ""){
                    setValue("It is " + currCountry.name + ".")
                } else {
                    setValue(answer + " is wrong. It is " + currCountry.name + ".")
                }
                // if (contSum == continentsArr.length){
                    currScore = 0
                    localStorage.setItem('currScore', currScore);
                    queueArr.forEach((q, index)=>{
                        if(continentsArr[index] == currCountry.continent || continentsArr[index] == 'OA'){
                            q.push(0);
                            if(q.length > 100){
                                q.shift();
                            }
                            localStorage.setItem(continentsArr[index] + 'queue', q)
                        } 
                    })  
                // }          
            }
            seed = Math.floor(Math.random()*(countryDict.length))
            let testCountry = countryDict[seed]

            while (localStorage.getItem(testCountry.continent) == 0){
                seed = Math.floor(Math.random()*(countryDict.length))
                testCountry = countryDict[seed]
            }
            localStorage.setItem('seed', seed)
        } else {
            filterCheck()
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
              disabled={submitted}
            />      
            <SubmitButton
              onClick={handleClick}
              ref={SubmitButtonRef}
              submitted={submitted}
              setSubmitted={setSubmitted}
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

const SubmitButton = forwardRef((props, ref) => {
    let buttonText = ''
    if (props.submitted){
        buttonText = 'NEXT'
    } else {
        buttonText = 'SUBMIT'
    }
    return(
    <div>
    <button type="submit" 
    className='submitButton'
    onClick={props.onClick}
    ref = {ref}>
    {buttonText}
    </button>
    </div>)
  })

ReactDOM.render(
    <App />,
    document.getElementById('root')
);