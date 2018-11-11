import {combineReducers} from 'redux';
import {
  ADD_PLACE,
  REMOVE_PLACE,
  TOGGLE_VISITED,
  HIGHLIGHT_PLACE,
  FILTER_BY_STATUS,
  FILTER_BY_KEY,
  VisibilityFilters
} from './actions';

const {SHOW_ALL} = VisibilityFilters;

const places = (state = [], action) => {
  switch(action.type) {
    case ADD_PLACE:
      return [...state, action.place];
    case REMOVE_PLACE:
      return state.filter(el => el.id !== action.id);
    case TOGGLE_VISITED:
      return state.map(el => el.id !== action.id
        ? el : {...el, visited: !el.visited});
    default:
      return state;
  }
}

const highlighted = (state = '', action) => {
  switch (action.type) {
    case HIGHLIGHT_PLACE:
      return action.id;
    default:
      return state;
  }
}

const visibilityFilter = (state = SHOW_ALL, action) => {
  switch (action.type) {
    case FILTER_BY_STATUS:
      return action.filter;
    default:
      return state;
  }
}

const filterKey = (state = '', action) => {
  switch (action.type) {
    case FILTER_BY_KEY:
      return action.filter;
    default:
      return state
  }
}

const reducer = combineReducers({
  places,
  highlighted,
  visibilityFilter,
  filterKey
});

export default reducer;
