import componentConnector from '../index.js';

jest.unmock('../index.js');


describe('connectComponent', () => {
    const connectors = [{
        name: 'toFoo',
        connector: (...args) => (component) => {
            return { name: 'foo', child: component, args: [...args] };
        }
    }, {
        name: 'toBar',
        connector: (...args) => (component) => {
            return { name: 'bar', child: component, args: [...args] };
        }
    }, {
        name: 'toBaz',
        connector: (...args) => (component) => {
            return { name: 'baz', child: component, args: [...args] };
        }
    }];

    const connectComponent = componentConnector(connectors);

    it('connects a component to single connector', () => {
        let baseComponent = { name: 'baseComponent' };
        let fooComponent = connectComponent(baseComponent).toFoo();

        expect(fooComponent.name).toBe('foo');
    });

    it('connects a component to multiple connectors', () => {
        let baseComponent = { name: 'baseComponent' };
        let fooBarBazComponent = connectComponent(baseComponent)
                .toBar('barArgs')
                .toFoo('fooArgs')
                .toBaz('bazArgs');

        expect(fooBarBazComponent.name).toBe('foo');
        expect(fooBarBazComponent.child.name).toBe('bar');
        expect(fooBarBazComponent.child.child.name).toBe('baz');
        expect(fooBarBazComponent.child.child.child.name).toBe('baseComponent');

        expect(fooBarBazComponent.args).toEqual(['fooArgs']);
        expect(fooBarBazComponent.child.args).toEqual(['barArgs']);
        expect(fooBarBazComponent.child.child.args).toEqual(['bazArgs']);
    });

});