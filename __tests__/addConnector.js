import addConnector from '../addConnector';
import ConnectorMap from '../ConnectorMap';

jest.unmock('../addConnector');


describe('addConnector', () => {

    it('adds a connector to a map', () => {
        const helloConnector = function helloWorld() {};
        addConnector({
            name: 'toHello',
            connector: helloConnector
        });
        expect(ConnectorMap.toHello).toEqual(helloConnector);
    });
});