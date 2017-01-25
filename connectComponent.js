import Connectors from './Connectors';


export default function connectComponent(component) {
    Connectors.forEach(({ name }) => {
        component[name] = applyConnectors(name, component);
    });
    return component;
}

function applyConnectors(connectionName, baseComponent, existingConnections = [], appliedIndexes = []) {
    return function(...args) {
        // remove connectors from component, and add this connector index to list
        Connectors.forEach(({ name }, i) => {
            if (name === connectionName) {
                existingConnections.push({
                    index: i,
                    providedArgs: [...args]
                });
                appliedIndexes.push(i);
            }
            delete this[name];
        });

        // loops through indexes to apply and apply them in order
        let connectedComponent = baseComponent;
        existingConnections.sort((a, b) => b.index - a.index);
        existingConnections.forEach(({ index, providedArgs}) => {
            let { connector } = Connectors[index];
            connectedComponent = connector(...providedArgs)(connectedComponent);
        });

        // reapply remaining connectors
        Connectors.forEach(({ name }, i) => {
            if (appliedIndexes.indexOf(i) === -1) {
                connectedComponent[name] = applyConnectors.call(this, name, baseComponent, existingConnections, appliedIndexes);
            }
        });
        return connectedComponent;
    }
}