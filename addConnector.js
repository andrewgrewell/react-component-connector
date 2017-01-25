import Connectors from './Connectors';
import isArray from 'lodash/isArray';

export default function addConnector(connectionData) {
    connectionData = isArray(connectionData) ? connectionData : [connectionData];
    validateConnectionData(connectionData);
    connectionData.forEach((connection) => {
        Connectors.push(connection);
    });
}

function validateConnectionData(connectionData) {
    connectionData.forEach((connection) => {
        if (!connection.name || !connection.connector) {
            let message = !connection.name
                ? 'Invalid data supplied to `addConnectors` no `name` property on data object'
                : 'Invalid data supplied to `addConnectors` `connector` property must be a function';

            throw new TypeError(message, 'ComponentConnector.js', 14);
        }
    });
}