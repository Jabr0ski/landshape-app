import React from 'react';
import ReactDOM from 'react-dom';

// let OAqueue = localStorage.getItem('OAqueue').split(',').map(Number)

const StatsModal = ({ isShowing, hide }) => isShowing ? ReactDOM.createPortal(
    <React.Fragment>
      <div className="modal-overlay"/>
      <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
        <div className="modal">
          <div className="modal-header">
            <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          
            <h2>Stats</h2>

            <table>
            <tbody>
              <tr>
                <th>Continent</th>
                <th>Correct % of the Past 100 Guesses</th>
              </tr>
              <tr>
                <td>Overall</td>
                <td>{(localStorage.getItem('OAqueue').split(',').map(Number).reduce((partialSum, a) => partialSum + parseInt(a)
                     /localStorage.getItem('OAqueue').split(',').map(Number).length * 100, 0)).toFixed(2)}%</td>
              </tr>
              <tr>
                <td>Africa</td>
                <td>{(localStorage.getItem('AFqueue').split(',').map(Number).reduce((partialSum, a) => partialSum + parseInt(a)
                     /localStorage.getItem('AFqueue').split(',').map(Number).length * 100, 0)).toFixed(2)}%</td>
              </tr>
              <tr>
                <td>Antarctica</td>
                <td>{(localStorage.getItem('ANqueue').split(',').map(Number).reduce((partialSum, a) => partialSum + parseInt(a)
                     /localStorage.getItem('ANqueue').split(',').map(Number).length * 100, 0)).toFixed(2)}%</td>
              </tr>
              <tr>
                <td>Asia</td>
                <td>{(localStorage.getItem('ASqueue').split(',').map(Number).reduce((partialSum, a) => partialSum + parseInt(a)
                     /localStorage.getItem('ASqueue').split(',').map(Number).length * 100, 0)).toFixed(2)}%</td>
              </tr>
              <tr>
                <td>Europe</td>
                <td>{(localStorage.getItem('EUqueue').split(',').map(Number).reduce((partialSum, a) => partialSum + parseInt(a)
                     /localStorage.getItem('EUqueue').split(',').map(Number).length * 100, 0)).toFixed(2)}%</td>
              </tr>
              <tr>
                <td>North America</td>
                <td>{(localStorage.getItem('NAqueue').split(',').map(Number).reduce((partialSum, a) => partialSum + parseInt(a)
                     /localStorage.getItem('NAqueue').split(',').map(Number).length * 100, 0)).toFixed(2)}%</td>
              </tr>
              <tr>
                <td>Oceania</td>
                <td>{(localStorage.getItem('OCqueue').split(',').map(Number).reduce((partialSum, a) => partialSum + parseInt(a)
                     /localStorage.getItem('OCqueue').split(',').map(Number).length * 100, 0)).toFixed(2)}%</td>
              </tr>
              <tr>
                <td>South America</td>
                <td>{(localStorage.getItem('SAqueue').split(',').map(Number).reduce((partialSum, a) => partialSum + parseInt(a)
                     /localStorage.getItem('SAqueue').split(',').map(Number).length * 100, 0)).toFixed(2)}%</td>
              </tr>
            </tbody>
            </table>

        </div>
      </div>
    </React.Fragment>, document.body
  ) : null;

  export default StatsModal;