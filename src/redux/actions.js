export const ADD_PLACE = 'ADD_PLACE';
export const REMOVE_PLACE = 'REMOVE_PLACE';
export const TOGGLE_VISITED = 'TOGGLE_VISITED';
export const HIGHLIGHT_PLACE = 'HIGHLIGHT_PLACE';
export const FILTER_BY_STATUS = 'FILTER_BY_STATUS';
export const FILTER_BY_KEY = 'FILTER_BY_KEY';

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_VISITED: 'SHOW_VISITED',
  SHOW_UNVISITED: 'SHOW_UNVISITED'
};

export default class ActionCreators {
  static addPlace(place) {
    return {type: ADD_PLACE, place}
  }

  static removePlace(id) {
    return {type: REMOVE_PLACE, id};
  }

  static toggleVisited(id) {
    return {type: TOGGLE_VISITED, id}
  }

  static highlightPlace(id) {
    return {type: HIGHLIGHT_PLACE, id};
  }

  static filterByStatus(filter) {
    return {type: FILTER_BY_STATUS, filter};
  }

  static filterByKey(filter) {
    console.log('ololo');
    return {type: FILTER_BY_KEY, filter}
  }
}
