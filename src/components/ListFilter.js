import React, { Component } from 'react';
import {connect} from 'react-redux';
import ActionCreators, {VisibilityFilters} from '../redux/actions';

const {SHOW_ALL, SHOW_VISITED, SHOW_UNVISITED} = VisibilityFilters;

const mapStateToProps = state => ({state});
const mapDispatchToProps = dispatch => ({
  filterByStatus: filter => ActionCreators.filterByStatus(filter),
  filterByKey: key => ActionCreators.filterByKey(key)
});

const styles = {
  cont: {
    width: '98%',
    display: 'flex',
    justifyContent: 'space-around',
  }
}

class ConnectedFilterList extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleKey = e => {
    const {state, filterByKey} = this.props;
    filterByKey(e.target.value);
    console.log('Key', state);
  }

  handleFilter = e => {
    const {state, filterByStatus} = this.props;
    filterByStatus(e.target.value);
    console.log('Filter', state);
  }

  render = () => {
    return (
      <div style={styles.cont}>
        <input onChange={this.handleKey} type="text" placeholder="Filter by name"/>
        <select onChange={this.handleFilter}>
          <option value={SHOW_ALL}>Show all</option>
          <option value={SHOW_VISITED}>Show visited</option>
          <option value={SHOW_UNVISITED}>Show unvisited</option>
        </select>
      </div>
    )
  }
}

const ListFilter = connect(mapStateToProps, mapDispatchToProps)(ConnectedFilterList);
export default ListFilter
