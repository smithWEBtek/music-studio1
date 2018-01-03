import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';

import studentReducer from './store/reducers/studentReducer';
import teacherReducer from './store/reducers/teacherReducer';
import resourceReducer from './store/reducers/resourceReducer';
import lessonReducer from './store/reducers/lessonReducer';


import App from './App';
import classes from './index.css';
import 'bootstrap/dist/css/bootstrap.css';

const rootReducer = combineReducers({
  stu: studentReducer,
  tch: teacherReducer,
  les: lessonReducer,
  res: resourceReducer
});

const logger = store => {
  console.log('[Middleware] prior state', store.getState())
  return next => {
    return action => {
      console.log('[Middleware] Dispatching', action);
      const result = next(action);
      let asdf = { ...store.getState() };
      console.log('[Middleware] next state (what does it all mean?) answer:', asdf.res.meaningOfLife)
      return result
    }
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger)));

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App className={classes.Body} />
    </BrowserRouter>
  </Provider>
)

ReactDOM.render(app, document.getElementById('root'));

