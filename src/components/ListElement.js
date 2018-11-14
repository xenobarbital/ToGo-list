import React, { Component } from 'react';
import {connect} from 'react-redux';
import ActionCreators from '../redux/actions';

const styles = {
  cont: {
    width: '98%',
    display: 'flex',
    alignItems: 'center',
    borderColor: '#456288',
    borderWidth: '1px',
    borderStyle: 'solid',
    padding: '4px',
    margin: '0px 0px 2px 0px'
  },
  textCont: {
    flex: 1,
    overflow: 'hidden',
    cursor: 'pointer'
  },
}

const mapStateToProps = state => ({state});
const mapDispatchToProps = dispatch => ({
  removePlace: id => dispatch(ActionCreators.removePlace(id)),
  toggleVisited: id => dispatch(ActionCreators.toggleVisited(id)),
  highlightPlace: id => dispatch(ActionCreators.highlightPlace(id)),
})

class ConnectedListElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visited: this.props.visited
    }
  }

  handleToggle = () => {
    const {toggleVisited} = this.props;
    this.setState({visited: !this.state.visited}, () => {
      toggleVisited(this.props.id);
    });
  }

  handleHighlight = () => {
    const {state, highlightPlace, id} = this.props;
    if (state.highlighted) {
      highlightPlace('');
    } else {
      highlightPlace(id);
    }
  }

  handleDelete = () => {
    const {removePlace} = this.props;
    removePlace(this.props.id);
  }

  generateColor = () => {
    const {state, id} = this.props;
    return state.highlighted === id ? '#999' : '#fff'
  }

  render = () => (
    <li style={{backgroundColor: this.generateColor()}}>
      <div style={styles.cont}>
        <div className="tooltip">
          <input
            type="checkbox"
            checked={this.state.visited}
            onChange={this.handleToggle}
          />
          <span className="tooltiptext">Mark as visited</span>
        </div>
        <div
          style={styles.textCont}
          onClick={this.handleHighlight}
        >
          {this.props.description}
        </div>
        <div><button onClick={this.handleDelete}>Delete</button></div>
      </div>
    </li>
  )
}

const ListElement = connect(mapStateToProps, mapDispatchToProps)(ConnectedListElement);
export default ListElement;
