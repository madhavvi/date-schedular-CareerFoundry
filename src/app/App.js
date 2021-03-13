import React, { Component } from 'react'
// import DateSchedular from '../components/DateSchedular';
import DateSchedular from '../components/DateSchedular';
import slots from '../reducers/slots';

function App() {
  return (
    <div className="App">
      <div>
        <DateSchedular slots={slots} />
      </div>
    </div>
  );
}

export default App;


// import React, {Component} from 'react';
// import {connect} from 'react-redux';
// import {getSlotsRequest} from '../actions/slots';

// class App extends Component {
//     constructor(props){
//         super(props);
//         console.log('props : ', props);
//         this.props.getSlotsRequest();
//     }

//     render(){
//         const slots = this.props.slots;
//         console.log('slots app : ', slots);
//         return (
//             <div style={{margin: '0 auto', padding: '20px', maxWidth: '600px'}}>                
//             </div>
//         );
//     }
// }

// export default connect(({slots}) => ({slots}), {
//     getSlotsRequest,
// })(App);