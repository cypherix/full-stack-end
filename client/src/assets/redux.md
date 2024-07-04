Redux Toolkit simplifies the setup and use of Redux in React applications. Here are some reusable code snippets to get you started with Redux Toolkit:

### 1. **Setting Up Redux Store with Redux Toolkit**
```javascript
// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

const store = configureStore({
  reducer: rootReducer,
});

export default store;
```

### 2. **Creating Slices**
```javascript
// features/counter/counterSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
```

### 3. **Combining Reducers**
```javascript
// rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
});

export default rootReducer;
```

### 4. **Connecting Redux Store to React Application**
```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
```

### 5. **Using Redux State and Dispatch in Components**
```javascript
// CounterComponent.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from './counterSlice';

const CounterComponent = () => {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>
        <button onClick={() => dispatch(decrement())}>-</button>
        <span>{count}</span>
        <button onClick={() => dispatch(increment())}>+</button>
      </div>
      <div>
        <button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>
      </div>
    </div>
  );
};

export default CounterComponent;
```

### 6. **Creating Async Thunks**
```javascript
// features/user/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUser = createAsyncThunk('user/fetchUser', async (userId) => {
  const response = await axios.get(`/api/user/${userId}`);
  return response.data;
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    data: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
```

### 7. **Using Async Thunks in Components**
```javascript
// UserComponent.js
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUser } from './userSlice';

const UserComponent = ({ userId }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const status = useSelector((state) => state.user.status);
  const error = useSelector((state) => state.user.error);

  useEffect(() => {
    dispatch(fetchUser(userId));
  }, [dispatch, userId]);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error: {error}</div>;

  return <div>{user && <div>{user.name}</div>}</div>;
};

export default UserComponent;
```

### 8. **DevTools and Middleware Configuration**
```javascript
// store.js
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';
import logger from 'redux-logger';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
```

These snippets cover the basic setup and use of Redux Toolkit, including slice creation, combining reducers, async thunks, and middleware configuration. Let me know if you need more advanced patterns or additional examples!