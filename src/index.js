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
// import Queue from './components/queueClass';
import AutoSuggest from 'react-autosuggest';

let seed = Math.floor(Math.random()*(countryDict.length))
let currScore = 0
let highScore = 0

let currCountry = countryDict[localStorage.getItem('seed')]

let OAqueue = [] 
let AFqueue = []
let ANqueue = []
let ASqueue = []
let EUqueue = []
let NAqueue = []
let OCqueue = []
let SAqueue = []

// OAqueue.enqueue(2);
// console.log(OAqueue.dequeue())

if (localStorage.getItem('OAqueue')){
    // localStorage.removeItem("OAqueue")
        OAqueue = localStorage.getItem('OAqueue');
        // console.log(typeof(OAqueue))
        // console.log(OAqueue)
        // OAqueue.continent = 'OA'
        // OAqueue.enqueue(3);
        // console.log(OAqueue.hello)
} else {
    // OAqueue.continent = 'OA'
    localStorage.setItem('OAqueue', OAqueue)
    // console.log(typeof(OAqueue))
    // console.log(OAqueue)
}

if (localStorage.getItem('AFqueue')){
    // localStorage.removeItem("AFqueue")
        AFqueue = localStorage.getItem('AFqueue');
        // AFqueue.continent = 'AF'
} else {
        // AFqueue.continent = 'AF'
        localStorage.setItem('AFqueue', AFqueue)
}

if (localStorage.getItem('ANqueue')){
    // localStorage.removeItem("ANqueue")
        ANqueue = localStorage.getItem('ANqueue');
        // ANqueue.continent = 'AN'
} else {
        // ANqueue.continent = 'AN'
        localStorage.setItem('ANqueue', ANqueue)
}

if (localStorage.getItem('ASqueue')){
    // localStorage.removeItem("ASqueue")
        ASqueue = localStorage.getItem('ASqueue');
        // ASqueue.continent = 'AS'
} else {
        // ASqueue.continent = 'AS'
        localStorage.setItem('ASqueue', ASqueue)
}

if (localStorage.getItem('EUqueue')){
    // localStorage.removeItem("EUqueue")
        EUqueue = localStorage.getItem('EUqueue');
        // EUqueue.continent = 'EU'
} else {
        // EUqueue.continent = 'EU'
        localStorage.setItem('EUqueue', EUqueue)
}

if (localStorage.getItem('NAqueue')){
    // localStorage.removeItem("NAqueue")
        NAqueue = localStorage.getItem('NAqueue');
        // NAqueue.continent = 'NA'
} else {
        // NAqueue.continent = 'NA'
        localStorage.setItem('NAqueue', NAqueue)
}

if (localStorage.getItem('OCqueue')){
    // localStorage.removeItem("OCqueue")
        OCqueue = localStorage.getItem('OCqueue');
        // OCqueue.continent = 'OC'
} else {
        // OCqueue.continent = 'OC'
        localStorage.setItem('OCqueue', OCqueue)
}

if (localStorage.getItem('SAqueue')){
    // localStorage.removeItem("SAqueue")
        SAqueue = localStorage.getItem('SAqueue');
        // SAqueue.continent = 'SA'
} else {
        // SAqueue.continent = 'SA'
        localStorage.setItem('SAqueue', SAqueue)
}

if (localStorage.getItem('currScore')){
    currScore = parseInt(localStorage.getItem('currScore'));
}

if (localStorage.getItem('highScore')){
    highScore = parseInt(localStorage.getItem('highScore'));
}

const continentsArr = ['OA', 'AF', 'AN', 'AS', 'EU', 'NA', 'OC', 'SA']
const queueArr = [OAqueue, AFqueue, ANqueue, ASqueue, EUqueue, NAqueue, OCqueue, SAqueue]

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

    function handleClick(){
        console.log("click")
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
                queueArr.forEach((q)=>{
                    console.log(continentsArr[q.index] + currCountry.continent)
                    if(continentsArr[q.index] == currCountry.continent || continentsArr[q.index] == 'OA'){
                        console.log('here' + continentsArr[q.index])
                        // console.log(q.elements)
                        q.push(1);
                        if(q.length > 100){
                            q.shift();
                        }
                        localStorage.setItem(continentsArr[q.index] + 'queue', q)
                    } 
                })
            } else {
                if (answer === ""){
                    setValue("It is " + currCountry.name + ".")
                } else {
                    setValue(answer + " is wrong. It is " + currCountry.name + ".")
                }
                currScore = 0
                localStorage.setItem('currScore', currScore);
                queueArr.forEach((q)=>{
                    console.log(continentsArr[q.index] + currCountry.continent)
                    if(continentsArr[q.index] == currCountry.continent || continentsArr[q.index] == 'OA'){
                        console.log('here' + continentsArr[q.index])
                        // console.log(q.elements)
                        q.push(0);
                        if(q.length > 100){
                            q.shift();
                        }
                        localStorage.setItem(continentsArr[q.index] + 'queue', q)
                    } 
                })
                
            }
            seed = Math.floor(Math.random()*(countryDict.length))
            currCountry = countryDict[localStorage.getItem('seed')]

            let testCount = 0
            let contSum = 0
            let testCountry = currCountry

            continentsArr.forEach((cont)=>{
                console.log('testing ' + cont)
                contSum += localStorage.getItem(cont)
            })
            if(contSum == 0) {
                continentsArr.forEach((cont)=>{
                    console.log('changing ' + cont)
                    localStorage.setItem(cont, 1)
                })
            } 
            while (localStorage.getItem(testCountry.continent) == 0 && testCount < 200 ){
                console.log(seed + "in loop before" + testCountry.continent + testCountry.name)
                seed = Math.floor(Math.random()*(countryDict.length))
                testCountry = countryDict[seed]
                console.log(seed + "in loop after" + testCountry.continent + testCountry.name)
                testCount = testCount + 1
            }
            localStorage.setItem('seed', seed)
        } else {
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