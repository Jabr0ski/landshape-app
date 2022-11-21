import React from 'react';
import ReactDOM from 'react-dom';

if (localStorage.getItem('AF')){
  // nothing
} else {
  localStorage.setItem('AF', 1)
}

if (localStorage.getItem('AN')){
  // nothing
} else {
  localStorage.setItem('AN', 1)
}

if (localStorage.getItem('AS')){
  // nothing
} else {
  localStorage.setItem('AS', 1)
}

if (localStorage.getItem('EU')){
  // nothing
} else {
  localStorage.setItem('EU', 1)
}

if (localStorage.getItem('NA')){
  // nothing
} else {
  localStorage.setItem('NA', 1)
}

if (localStorage.getItem('OC')){
  // nothing
} else {
  localStorage.setItem('OC', 1)
}

if (localStorage.getItem('SA')){
  // nothing
} else {
  localStorage.setItem('SA', 1)
}

function boxUpdate(contCode, currChk){
  // console.log(contCode, currChk, 'before' + localStorage.getItem('AF'))
  let newVal = 1 - currChk
  localStorage.setItem(contCode, newVal)
  // console.log(newVal, 'after' + localStorage.getItem('AF'))
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
            <p>
              Note that selecting any less than every continent will reset your current score streak.
            </p>
            <form>
              <label htmlFor="AF">
                <input type="checkbox" id="AF" name="Africa"  
                defaultChecked={parseInt(localStorage.getItem('AF'))} 
                onClickCapture={(e)=> {e.stopPropagation(); boxUpdate("AF", parseInt(localStorage.getItem('AF')))}}
                />  Africa 
              </label>
              <br/>
              <label htmlFor="AN">
                <input type="checkbox" id="AN" name="Antarctica"
                defaultChecked={parseInt(localStorage.getItem('AN'))} 
                onClickCapture={(e)=> {e.stopPropagation(); boxUpdate("AN", parseInt(localStorage.getItem('AN')))}}
                />  Antarctica 
              </label>
              <br/>
              <label htmlFor="AS">
                <input type="checkbox" id="AS" name="Asia"
                defaultChecked={parseInt(localStorage.getItem('AS'))} 
                onClickCapture={(e)=> {e.stopPropagation(); boxUpdate("AS", parseInt(localStorage.getItem('AS')))}}
                />  Asia 
              </label>
              <br/>
              <label htmlFor="EU">
                <input type="checkbox" id="EU" name="Europe"
                defaultChecked={parseInt(localStorage.getItem('EU'))} 
                onClickCapture={(e)=> {e.stopPropagation(); boxUpdate("EU", parseInt(localStorage.getItem('EU')))}}
                />  Europe 
              </label>
              <br/>
              <label htmlFor="NA">
                <input type="checkbox" id="NA" name="North America"
                defaultChecked={parseInt(localStorage.getItem('NA'))} 
                onClickCapture={(e)=> {e.stopPropagation(); boxUpdate("NA", parseInt(localStorage.getItem('NA')))}}
                />  North America 
              </label>
              <br/>
              <label htmlFor="OC">
                <input type="checkbox" id="OC" name="Oceania"
                defaultChecked={parseInt(localStorage.getItem('OC'))} 
                onClickCapture={(e)=> {e.stopPropagation(); boxUpdate("OC", parseInt(localStorage.getItem('OC')))}}
                />  Oceania 
              </label>
              <br/>
              <label htmlFor="SA">
                <input type="checkbox" id="SA" name="South America"
                defaultChecked={parseInt(localStorage.getItem('SA'))} 
                onClickCapture={(e)=> {e.stopPropagation(); boxUpdate("SA", parseInt(localStorage.getItem('SA')))}}
                />  South America 
              </label>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>, document.body
  ) : null;

  export default SettingsModal;