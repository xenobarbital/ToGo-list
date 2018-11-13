import React, { Component } from 'react';
import {connect} from 'react-redux';
import ActionCreators from '../redux/actions';
import ListElement from './ListElement';

const mapStateToProps = state => ({state});
const mapDispatchToProps = dispatch => ({
  removePlace: id => dispatch(ActionCreators.removePlace(id)),
});

const styles = {
  listCont: {
    height: '92vh',
    width: '35vw',
    position: 'absolute',
    top: 0,
    left: '60vw',
    padding: '20px',
    overflow: 'scroll',
  },
  list: {
    listStyleType: 'none'
  },
  header: {
    textAlign: 'center'
  }
}

class ConnectedList extends Component {
  render = () => (
    <div id="list" style={styles.listCont}>
      <h1 style={styles.header}>List of ToGo locations</h1>
      <ul style={styles.list}>
        {this.props.state.places.map(e => (
          // <li>{e.description}</li>
          <ListElement
            description={e.description}
            visited={e.visited}
          />
        ))}
      </ul>
    </div>
  )
}

const List = connect(mapStateToProps, mapDispatchToProps)(ConnectedList);
export default List;
