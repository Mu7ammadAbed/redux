// Define an initial state value for the app
const initialState = {
    value: 0
};

// Create a "reducer" function that determines what the new state
// should be when something happens in the app
const counterReducer = (state = initialState, action) => {
    // Reducers usually look at the type of action that happened
    // to decide how to update the state
    switch (action.type) {
        case "counter/incremented":
            return { ...state, value: state.value + 1 };
        case "counter/decremented":
            return { ...state, value: state.value - 1 };
        default:
            // If the reducer doesn't care about this action type,
            // return the existing state unchanged
            return state;
    }
}

// Create a new Redux store with the `createStore` function,
// and use the `counterReducer` for the update logic
const store = Redux.createStore(counterReducer);

// Our "user interface" is some text in a single HTML element
const valueEl = document.getElementById("value");

// Whenever the store state changes, update the UI by
// reading the latest store state and showing new data
const render = () => {
    const state = store.getState();
    valueEl.innerHTML = state.value.toString();
}

// Update the UI with the initial data
render();
// And subscribe to redraw whenever the data changes in the future
store.subscribe(render);

// Handle user inputs by "dispatching" action objects,
// which should describe "what happened" in the app
document.getElementById("increment").addEventListener("click", () => {
        store.dispatch({ type: "counter/incremented" });
    });

document.getElementById("decrement").addEventListener("click", () => {
        store.dispatch({ type: "counter/decremented" });
    });

document.getElementById("incrementIfOdd").addEventListener("click", () => {
        // We can write logic to decide what to do based on the state
        if (store.getState().value % 2 !== 0) {
            store.dispatch({ type: "counter/incremented" });
        }
    });

document.getElementById("incrementAsync").addEventListener("click", () => {
        // We can also write async logic that interacts with the store
        setTimeout(() => {
            store.dispatch({ type: "counter/incremented" });
        }, 1000);
    });