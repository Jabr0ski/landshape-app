import React from 'react';
import ReactDOM from 'react-dom';

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
          <label htmlFor="AF">
            <input type="checkbox" id="AF" name="Africa" value="yes"/>  Africa 
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
        </div>
      </div>
    </React.Fragment>, document.body
  ) : null;

  export default SettingsModal;