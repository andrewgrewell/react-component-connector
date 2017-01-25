import Connectors from './Connectors';
import some from 'lodash/find';

export default function connectComponent(component, order) {
    Connectors.forEach(({ name, connector }) => {
        component[name] = applyConnectors(name, component);
    });
    return component;
}

function applyConnectors(connectionName, baseComponent, indexesToApply = []) {
    return function(...args) {
        // remove connectors from component, and add this connector index to list
        Connectors.forEach(({ name }, i) => {
            if (name === connectionName) {
                indexesToApply.push(i);
            }
            delete this[name];
        });

        // loops through indexes to apply and apply them in order
        let connectedComponent = baseComponent;
        indexesToApply.sort((a, b) => (a - b) * -1);
        indexesToApply.forEach((index) => {
            let { connector } = Connectors[index];
            connectedComponent = connector(...args)(connectedComponent)
        });

        // reapply remaining connectors
        Connectors.forEach(({ name }, i) => {
            if (indexesToApply.indexOf(i) === -1) {
                connectedComponent[name] = applyConnectors(name, baseComponent, indexesToApply);
            }
        });

        return connectedComponent;
    }
}