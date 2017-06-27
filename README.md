# react-component-connector
Easily and cleanly connect your components to many higher order components.
This package was created to provide a cleaner way to connect a component to
many higher order components (HoC). For example consider a component connected to a redux store

### The Problem
```
import connect from 'react-redux';

class MyConnectedComponent extends React.Component {
    static propTypes: {
        storeValue1: PropTypes.number
    }
    ...
}

export default connect(
    (state) => ({
        storeValue1: state.value1
    }), 
    (dispatch) => ({
        ...
    }))(MyConnectedComponent);
```
This by itself isn't too bad, but consider if you wanted to pass this store connected 
component to another higher order component that extended its functionality.
```
...

class MyConnectedComponent extends React.Component {
    static propTypes: {
        ....
        myExtendedFunctionality: PropTypes.func
    }
    ....
}


export default extendFunctionality({
    doAwesomeStuff: true
}, connect(
   (state) => ({
       storeValue1: state.value1
   }), 
   (dispatch) => ({
       ...
   }))(MyConnectedComponent));
```

notice we keep the pattern of taking config and returning a function that takes a component
with only two connections this is already getting pretty hard to read.


### The solution
```
...
export default connectComponent(MyConnectedComponent)
    .toStore(
       (state) => ({
           storeValue1: state.value1
       }), 
       (dispatch) => ({
           ...
       }))
    .toExtendedFunctionality({
        doAwesomeStuff: true
    });
```
Use a function that is pre-configured with the connectors that your app uses, and provides
a declarative api for connecting. `toStore` and `toExtendedFunctionality` are names for `connectors`. We keep the pattern of `connectors` which are functions that take configuration and return 
a function that takes a component (and probably wraps the component in an HoC)

### Usage
You first need to configure you connectComponent function with the connectors your app uses
```
/* connectComponent.js */
import componentConnector from 'react-component-connector';
import { connect } from 'react-redux';
import extendedConnector from './extendedConnector';

// Ordering of connectors DOES matter
const myConnectors = [
    {
        name: 'toStore',
        connector: connect
    },
    {
        name: 'toExtendedFunctionality',
        connector: extendedConnector
    },
    ...
];

export default componentConnector(myConnectors);
```

`connectComponent` will apply connectors in order they show up in your connectors list
this is important because some HoC may expect some piece of data to be on props that another
connector supplied

