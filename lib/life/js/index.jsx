/** @jsx React.DOM */
'use strict';

var React = require('react');
var Life = require('../../lib/index.jsx');
var is = require('is-predicate');

var mount = document.querySelector('#game');
var height = 500;
var width = 500;

var App = React.createClass({
  getInitialState: function getInitialState() {
    return {
      cellSize: 5,
      cellSpacing: 1,
      deadColor: '#f0f0f0',
      aliveColor: '#369'
    };
  },

  nums: ['cellSpacing', 'cellSize'],

  updateOption: function(e) {
    var update = {};
    var name = e.target.name;
    var value = is.ternary(is.contains(this.nums, name), parseInt(e.target.value) || 0, e.target.value);
    update[name] = value;
    this.setState(update);
  },

  render: function render() {
    return (
      <div id="main">
        <div className='col-lg-5'>
          <Life 
            height={this.props.height} width={this.props.width} 
            aliveColor={this.state.aliveColor} deadColor={this.state.deadColor}
            cellSpacing={this.state.cellSpacing} 
          />
        </div>

        <div className='col-lg-6 col-lg-offset-1'>
          <h4 className="text-muted">Options</h4>

          <div className='form-group'>
            <label htmlFor='aliveColor'>Alive Color</label>
            <input 
              className='form-control' name='aliveColor' 
              type='text' value={this.state.aliveColor}
              onChange={this.updateOption}
            />
          </div>

          <div className='form-group'>
            <label htmlFor='deadColor'>Dead Color</label>
            <input 
              className='form-control' name='deadColor' 
              type='text' value={this.state.deadColor}
              onChange={this.updateOption}
            />
          </div>
          <h5>Coming soon...</h5>
          <ul>
            <li>Start &amp; Stop</li>
            <li>Cell Size</li>
            <li>Starting Patterns</li>
          </ul>
        </div>
      </div>
    );
  }
});

React.renderComponent(<App height={height} width={width} />, mount);
