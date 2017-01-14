import ConnectorMap from './ConnectorMap';
import isArray from 'lodash/isArray';
import isObject from 'lodash/isObject';

export default function addConnector(connectionData) {
    connectionData = isArray(connectionData) ? connectionData : [connectionData];
    connectionData.forEach((connection) => {
        validateConnection(connection);
        ConnectorMap[connection.name] = connection.connector;
    });
}

function validateConnection(connectionData) {
    if (!connectionData.name || !connectionData.connector) {
        let message = !connectionData.name
            ? 'Invalid data supplied to `addConnectors` no `name` property on data object'
            : 'Invalid data supplied to `addConnectors` `connector` property must be a function';

        throw new TypeError(message, 'ComponentConnector.js', 14);
    }
}