import { createSlice, current } from '@reduxjs/toolkit';

export function classInstanceReducer(classInstance, sliceName) {
    // Note each key, and build initial state from them
    let initialState = {};
    Object.keys(classInstance).forEach(key => {
        if (typeof classInstance[key] === 'function' || isClass(classInstance[key])) {
            // Do nothing. . .
        } else {
            initialState[key] = classInstance[key];
        }
    })
    console.log(initialState)
    // Create the redux slice
    const classSlice = createSlice({
        name: sliceName || classInstance.constructor.name,
        initialState: initialState,
        reducers: {
            equalize: function (state, action) {
                let currentState = current(state);
                Object.keys(currentState).forEach(stateKey => {
                    state[stateKey] = classInstance[stateKey];
                })
            }
        },
    })
    // Return the reducer and the state equalize action for dispatching
    return [classSlice.reducer, classSlice.actions.equalize];
}

function isClass(obj) {
    const isCtorClass = obj.constructor
        && obj.constructor.toString().substring(0, 5) === 'class'
    if (obj.prototype === undefined) {
        return isCtorClass
    }
    const isPrototypeCtorClass = obj.prototype.constructor
        && obj.prototype.constructor.toString
        && obj.prototype.constructor.toString().substring(0, 5) === 'class'
    return isCtorClass || isPrototypeCtorClass
}