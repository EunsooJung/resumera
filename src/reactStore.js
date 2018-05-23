import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

// https://github.com/reactjs/redux/issues/99#issuecomment-112198579
function promiseMiddleware() {
  return next => action => {
    const { promise, types, ...rest } = action;
    if (!promise) {
      return next(action);
    }

    const [REQUEST, SUCCESS, FAILURE] = types;
    next({ ...rest, type: REQUEST });
    return promise.then(
      value => next({ ...rest, value, type: SUCCESS }),
      error => next({ ...rest, error, type: FAILURE })
    );
  };
}

export default function configureStore() {
  /* eslint-disable no-underscore-dangle */
  return createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__(),
    compose(applyMiddleware(promiseMiddleware, thunk))
  );
  /* eslint-enable */
}
