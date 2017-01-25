import addConnector from '../addConnector';
import Connectors from '../Connectors';

jest.unmock('../addConnector');


describe('addConnector', () => {

    it('adds a connector to a map', () => {
        const helloConnector = {
            name: 'toHello',
            connector: function helloWorld() {}
        };
        addConnector(helloConnector);
        expect(Connectors[0]).toEqual(helloConnector);
    });

    it('adds an array of connectors to a map', () => {
        const fooConnector = {
            name: 'toFoo',
            connector: () => {}
        };
        const barConnector = {
            name: 'toBar',
            connector: () => {}
        };
        addConnector([fooConnector, barConnector]);

        expect(Connectors[0].name).toEqual('toHello');
        expect(Connectors[1]).toEqual(fooConnector);
        expect(Connectors[2]).toEqual(barConnector);
    });
});