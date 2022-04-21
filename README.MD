# To be improved...

## Setup 

Import package and use to create a class instance reducer for redux:

```

// reducers.js //
import { classInstanceReducer } from 'redux-class-watcher';
// Export the equalize action with the reducer
export const [demoClassReducer, demoClassEqualize] = classInstanceReducer(demoClassInstance, "demoClass");


// store.js //

// Reducer setup w/ configureStore:
const store = configureStore({
    reducer: {
        app: appSliceReducer,
        demoClass: demoClassReducer,
        demoClassChild: demoClassChildReducer
    },
})

```

## Use class state through store in component:

```
function MyComponent() {

    const classState = useSelector(state => (state.demoClass));

    return (
        <div>
            {demoClass.myVariable}
        </div>
    )

}

```

## Equalize class state through dispatch in component (Will renderUI):

```

import demoClassInstance from '..';
import { demoClassEqualize } from './store.js'

function MyComponent() {

    const classState = useSelector(state => (state.demoClass));
    const dispatch = useDispatch();

    const updateMyVariable = () => {
        demoClassInstance.myVariable = 2;
        dispatch(demoClassEqualize()); // Balances instance state to redux store and prompts UI render on component 
    }

    return (
        <div>
            {demoClassInstance.myVariable}
        </div>
    )

}

```

** New variables cannot be added, they will be ignored. The class is only tracked based on keys available when passed into the reducer creator!