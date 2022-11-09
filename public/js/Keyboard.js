const Key = {
    Pressed: 0,
    Released: 1
}


export default class Keyboard {

    constructor() {
        // The state of each key (pressed or released)
        this.states = new Map();

        // Map of all the key states to their callbacks
        this.callbacks = new Map();
    }


    addMapping(key, callback) {
        this.callbacks.set(key, callback);
    }


    handleEvent(event) {
        const { keyCode } = event;

        // If we have no registered callback for the keyCode, return
        if (!this.callbacks.has(keyCode)) {
            return false
        }

        // This prevents the default action/callback for the keyCode
        // inside the browser
        event.preventDefault();

        // Determine the event type (pressed or released)
        const state = event.type === 'keydown' ? Key.Pressed : Key.Released;

        // If the current state was pressed, and this is another press
        // event, ignore it.  We only care when the state is toggled
        // from pressed to released or released to pressed.
        if (this.states.get(keyCode) === state) {
            return;
        }

        // The key state has toggled, update the state, and invoke the
        // callback for that key passing the new state.
        this.states.set(keyCode, state)
        this.callbacks.get(keyCode)(state);
    }


    listenTo(window) {
        [ 'keydown', 'keyup' ].forEach(eventName => {
            window.addEventListener(eventName, event => {
                this.handleEvent(event);
            });
        });
    }
}
