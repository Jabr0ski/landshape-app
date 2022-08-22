import React from 'react';
import ReactDOM from 'react-dom';

// let AFchkd = 1
let ANchkd = 1
let ASchkd = 1
let EUchkd = 1
let NAchkd = 1
let OCchkd = 1
let SAchkd = 1

if (localStorage.getItem('AF')){
  //nothing
  console.log('test' + localStorage.getItem('AF'))
} else {
  localStorage.setItem('AF', 1)
  console.log('test2' + localStorage.getItem('AF'))
}

if (localStorage.getItem('AN')){
  ANchkd = parseInt(localStorage.getItem('AN'));
} else {
  localStorage.setItem('AN', 1)
}

if (localStorage.getItem('AS')){
  ASchkd = parseInt(localStorage.getItem('AS'));
} else {
  localStorage.setItem('AS', 1)
}

if (localStorage.getItem('EU')){
  EUchkd = parseInt(localStorage.getItem('EU'));
} else {
  localStorage.setItem('EU', 1)
}

if (localStorage.getItem('NA')){
  NAchkd = parseInt(localStorage.getItem('NA'));
} else {
  localStorage.setItem('NA', 1)
}

if (localStorage.getItem('OC')){
  OCchkd = parseInt(localStorage.getItem('OC'));
} else {
  localStorage.setItem('OC', 1)
}

if (localStorage.getItem('SA')){
  SAchkd = parseInt(localStorage.getItem('SA'));
} else {
  localStorage.setItem('SA', 1)
}

function boxUpdate(contCode, currChk){
  console.log(contCode, currChk, 'before' + localStorage.getItem('AF'))
  let newVal = 1 - currChk
  localStorage.setItem(contCode, newVal)
  console.log(newVal, 'after' + localStorage.getItem('AF'))
}

const SettingsModal = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
    <React.Fragment>
      <div className="modal-overlay"/>
      <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div className="modal">
          <div className="modal-header">
            <table className='header-table'>
              <tbody>
                <tr>
                  <td>Continents</td>
                  <td className='shrink'>
                    <button type="button" className="modal-close-button" 
                    data-dismiss="modal" aria-label="Close" onClick={hide}>
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div>
            <form>
              <label htmlFor="AF">
                <input type="checkbox" id="AF" name="Africa" 
                // value="yes" 
                defaultChecked={parseInt(localStorage.getItem('AF'))} 
                onClick={boxUpdate("AF", parseInt(localStorage.getItem('AF')))}/>  Africa 
              </label>
              <br/>
              <label htmlFor="AN">
                <input type="checkbox" id="AN" name="Antarctica" value="yes"/>  Antarctica 
              </label>
              <br/>
              <label htmlFor="AS">
                <input type="checkbox" id="AS" name="Asia" value="yes"/>  Asia 
              </label>
              <br/>
              <label htmlFor="EU">
                <input type="checkbox" id="EU" name="Europe" value="yes"/>  Europe 
              </label>
              <br/>
              <label htmlFor="NA">
                <input type="checkbox" id="NA" name="North America" value="yes"/>  North America 
              </label>
              <br/>
              <label htmlFor="OC">
                <input type="checkbox" id="OC" name="Oceania" value="yes"/>  Oceania 
              </label>
              <br/>
              <label htmlFor="SA">
                <input type="checkbox" id="SA" name="South America" value="yes"/>  South America 
              </label>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>, document.body
  ) : null;

  export default SettingsModal;