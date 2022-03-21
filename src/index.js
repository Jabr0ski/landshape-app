import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function App(){

    return (
        <div className='app'>
            <TitleRow />
            {/* <LandBox />
            <GuessBox />
            <SubmitButton /> */}
        </div>
    )
}

function TitleRow(){
    return (
        <div>
            <header>
                <button className='panelButton'></button>
                <button className='panelButton'></button>
                <text className='title'>LANDSHAPE</text>
                <button className='panelButton'></button>
                <button className='panelButton'></button>
            </header>
            <LandBox/>
            <GuessBox/>
            <SubmitButton/>
        </div>
    )
}

function LandBox(){
    return (
        <div className='canvas'>
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