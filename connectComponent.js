import ConnectorMap from './ConnectorMap';
import forEach from 'lodash/forEach';

export default function connectComponent(component) {
    forEach(ConnectorMap, (connector, connectionName) => {
        component[connectionName] = applyConnector(connector, connectionName);
    });

    return component;
}

function applyConnector(connector, connectionName) {
    return function(...args) {
        let connectedComponent = connector(...args)(this);
        delete connectedComponent[connectionName];
        return connectedComponent;
    }
}