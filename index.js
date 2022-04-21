import { createSlice, current } from '@reduxjs/toolkit';
import { inspect } from 'util';

export function classInstanceReducer(classInstance, sliceName) {
    // Note each key, and build initial state from them
    let initialState = {};
    Object.keys(classInstance).forEach(key => {
        if (typeof classInstance[key] === "undefined") {
            console.warn(`Undefined key in class instancee looking to track: ${key}. Ignore if expected. If not make sure it is populated prior to constructing the reducer.`);
        } else {
            initialState[key] = inspect(classInstance[key]);
        }
    })
    // Create the redux slice
    const classSlice = createSlice({
        name: sliceName || classInstance.constructor.name,
        initialState: initialState,
        reducers: {
            equalize: function (state, action) {
                let currentState = current(state);
                Object.keys(currentState).forEach(stateKey => {
                    state[stateKey] = inspect(classInstance[stateKey]);
                })
            }
        },
    })
    // Return the reducer and the state equalize action for dispatching
    return [classSlice.reducer, classSlice.actions.equalize];
}