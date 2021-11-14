# Redux - Counter App

### Redux Core Example App

Take a look at the attached working example of a Redux app - a small counter application:

Because Redux is a standalone JS library with no dependencies, this example is written by only loading a single script tag for the Redux library, and uses basic JS and HTML for the UI. In practice, Redux is normally used by [installing the Redux packages from NPM](https://redux.js.org/introduction/installation), and the UI is created using a library like [React](https://reactjs.org).


Let's break this example down into its separate parts to see what's happening.

#### State, Actions, and Reducers

We start by defining an initial **state** value to describe the application:

```js
// Define an initial state value for the app
const initialState = {
  value: 0
}
```

For this app, we're going to track a single number with the current value of our counter.

Redux apps normally have a JS object as the root piece of the state, with other values inside that object.

Then, we define a **reducer** function. The reducer receives two arguments, the current `state` and an `action` object describing what happened. When the Redux app starts up, we don't have any state yet,
so we provide the `initialState` as the default value for this reducer:

```js
// Create a "reducer" function that determines what the new state
// should be when something happens in the app
const counterReducer = (state = initialState, action) => {
  // Reducers usually look at the type of action that happened
  // to decide how to update the state
  switch (action.type) {
    case 'counter/incremented':
      return { ...state, value: state.value + 1 }
    case 'counter/decremented':
      return { ...state, value: state.value - 1 }
    default:
      // If the reducer doesn't care about this action type,
      // return the existing state unchanged
      return state
  }
}
```

Action objects always have a `type` field, which is a string you provide that
acts as a unique name for the action. The `type` should be a readable name so that
anyone who looks at this code understands what it means. In this case, we use the
word 'counter' as the first half of our action type, and the second half is a
description of "what happened". In this case, our 'counter' was 'incremented', so
we write the action type as `'counter/incremented'`.

Based on the type of the action, we either need to return a brand-new object to
be the new `state` result, or return the existing `state` object if nothing should change.
Note that we update the state _immutably_ by copying the existing state and updating the
copy, instead of modifying the original object directly.

#### Store

Now that we have a reducer function, we can create a **store** instance by
calling the Redux library `createStore` API.

```js
// Create a new Redux store with the `createStore` function,
// and use the `counterReducer` for the update logic
const store = Redux.createStore(counterReducer)
```

We pass the reducer function to `createStore`, which uses the reducer function
to generate the initial state, and to calculate any future updates.

#### UI

In any application, the user interface will show existing state on screen. When a user
does something, the app will update its data and then redraw the UI with those values.

```js
// Our "user interface" is some text in a single HTML element
const valueEl = document.getElementById('value')

// Whenever the store state changes, update the UI by
// reading the latest store state and showing new data
const render = () => {
  const state = store.getState()
  valueEl.innerHTML = state.value.toString()
}

// Update the UI with the initial data
render()
// And subscribe to redraw whenever the data changes in the future
store.subscribe(render)
```

In this small example, we're only using some basic HTML elements as our UI,
with a single `<div>` showing the current value.

So, we write a function that knows how to get the latest state from the Redux
store using the `store.getState()` method, then takes that value and updates the UI to show it.

The Redux store lets us call `store.subscribe()` and pass a subscriber callback function that will be called
every time the store is updated. So, we can pass our `render` function as the subscriber, and know that
each time the store updates, we can update the UI with the latest value.

Redux itself is a standalone library that can be used anywhere. This also means that it can be used with any UI layer.

#### Dispatching Actions

Finally, we need to respond to user input by creating **action** objects that
describe what happened, and **dispatching** them to the store. When we call `store.dispatch(action)`,
the store runs the reducer, calculates the updated state, and runs the subscribers
to update the UI.

```js
// Handle user inputs by "dispatching" action objects,
// which should describe "what happened" in the app
document.getElementById('increment').addEventListener('click', () => {
  store.dispatch({ type: 'counter/incremented' })
})

document.getElementById('decrement').addEventListener('click', () => {
  store.dispatch({ type: 'counter/decremented' })
})

document.getElementById('incrementIfOdd').addEventListener('click', () => {
    // We can write logic to decide what to do based on the state
    if (store.getState().value % 2 !== 0) {
      store.dispatch({ type: 'counter/incremented' })
    }
  })

document.getElementById('incrementAsync').addEventListener('click', () => {
    // We can also write async logic that interacts with the store
    setTimeout(() => {
      store.dispatch({ type: 'counter/incremented' })
    }, 1000)
  })
```

Here, we'll dispatch the actions that will make the reducer add 1 or
subtract 1 from the current counter value.

We can also write code that only dispatches an action if a certain
condition is true, or write some async code that dispatches an action
after a delay.

### Data Flow

We can summarize the flow of data through a Redux app with this diagram. It represents how:

- actions are dispatched in response to a user interaction like a click
- the store runs the reducer function to calculate a new state
- the UI reads the new state to display the new values

(Don't worry if these pieces aren't quite clear yet! Keep this picture in your mind as you go through the rest of this tutorial, and you'll see how the pieces fit together.)

![Redux data flow diagram](https://redux.js.org/assets/images/ReduxDataFlowDiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif)

## What You've Learned

That counter example was small, but it does show all the working pieces of a real Redux app.
**Everything we'll talk about in the following sections expands on those basic pieces.**

With that in mind, let's review what we've learned so far:

> ### Summary
> 
> - **Redux is a library for managing global application state**
>   - Redux is typically used with the React-Redux library for integrating Redux and React together
>   - Redux Toolkit is the recommended way to write Redux logic
> - **Redux uses several types of code**
>   - _Actions_ are plain objects with a `type` field, and describe "what happened" in the app
>   - _Reducers_ are functions that calculate a new state value based on previous state + an action
>   - A Redux _store_ runs the root reducer whenever an action is _dispatched_
> 
