import connectComponent from '../connectComponent';
import addConnector from '../addConnector';

jest.unmock('../connectComponent');


describe('connectComponent', () => {
    addConnector([{
        name: 'toFoo',
        connector: () => (component) => {
            component.foo = true;
            return { name: 'foo', child: component };
        }
    }, {
        name: 'toBar',
        connector: () => (component) => {
            component.bar = true;
            return { name: 'bar', child: component };
        }
    }, {
        name: 'toBaz',
        connector: () => (component) => {
            component.baz = true;
            return { name: 'baz', child: component };
        }
    }]);

    it('connects a component to single connector', () => {
        let baseComponent = { name: 'baseComponent' };
        let fooComponent = connectComponent(baseComponent).toFoo();

        expect(fooComponent.name).toBe('foo');
        expect(fooComponent.child.name).toBe('baseComponent');
        expect(fooComponent.child.foo).toBeTruthy();
    });

    it('connects a component to multiple connectors', () => {
        let baseComponent = { name: 'baseComponent' };
        let fooBarComponent = connectComponent(baseComponent).toFoo().toBar();

        expect(fooBarComponent.name).toBe('foo');
        expect(fooBarComponent.child.name).toBe('bar');
        expect(fooBarComponent.child.child.name).toBe('baseComponent');
        expect(fooBarComponent.child.child.foo).toBeTruthy();
    });

});