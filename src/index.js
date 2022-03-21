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
        <header>
            <button className='panelButton'></button>
            <button className='panelButton'></button>
            <text className='title'>LANDSHAPE</text>
            <button className='panelButton'></button>
            <button className='panelButton'></button>
        </header>
    )
}

function LandBox(){
    return
}

function GuessBox(){
    return
}

function SubmitButton(){
    return
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);