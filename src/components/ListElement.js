import React, { Component } from 'react';

const styles = {
  cont: {
    width: '100%',
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
  }
}

export default class ListElement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visited: this.props.visited
    }
  }

  handleChange = () => {
    this.setState({visited: !this.state.visited});
  }

  handleHighlight = () => {
    console.log('Highlighted!');
  }

  handleDelete = () => {
    console.log('Deleted');
  }

  render = () => (
    <li>
      <div style={styles.cont}>
        <div><input
          type="checkbox"
          checked={this.state.visited}
          onChange={this.handleChange}
        /></div>
        <div style={styles.textCont} onClick={this.handleHighlight}>
          {this.props.description}
        </div>
        <div><button onClick={this.handleDelete}>Delete</button></div>
      </div>
    </li>
  )
}
