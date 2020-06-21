import { createStore } from 'redux';
import applicationReducer from './reducers/application';

export default function configureStore() {
	return createStore(applicationReducer);
}