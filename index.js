export default function componentConnector(connectors) {

    return function connectComponent(Component) {
        connectors.forEach(({ name }) => {
            Component[name] = applyConnectors(Component, name);
        });
        return Component;
    };

    function applyConnectors(BaseComponent, connectionName, existingConnections = [], appliedIndexes = []) {
        return function(...args) {
            // add this connection to the last of connections to apply
            connectors.forEach(({ name }, i) => {
                if (name === connectionName) {
                    existingConnections.push({
                        index: i,
                        providedArgs: [...args]
                    });
                    appliedIndexes.push(i);
                }
            });

            // loops through indexes to apply, and applies them in order
            let ConnectedComponent;
            existingConnections.sort((a, b) => b.index - a.index);
            existingConnections.forEach(({ index, providedArgs }) => {
                let { connector } = connectors[index];
                ConnectedComponent = connector(...providedArgs)(ConnectedComponent || BaseComponent);
            });

            // reapply remaining connectors
            connectors.forEach(({ name }, i) => {
                if (appliedIndexes.indexOf(i) === -1) {
                    ConnectedComponent[name] = applyConnectors(BaseComponent, name, existingConnections, appliedIndexes);
                }
            });

            return ConnectedComponent;
        };
    }
}