import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import Cell from '../app/components/cell';

describe('<Cell />', function() {

  var genericCallBack = function() {};

  describe('constructor', () => {
    it('should set the status of the cell to false if no props given', () => {
      this.wrapper = shallow(<Cell x={1} y={1} alive={false} onChange={ genericCallBack }/>);
      this.instance = this.wrapper.instance();
      expect(this.instance.state.alive).to.equal(false);
    });
  });

  describe('onBirth', () => {
    beforeEach(() => {
      this.wrapper = mount(<Cell x={1} y={1} onChange={genericCallBack}/>);
      this.instance = this.wrapper.instance();
    });

    it('should increment neighbour count if the message is from neighbours horizontally', () => {
      this.instance.onBirth({x: 0, y: 1});
      this.instance.onBirth({x: 2, y: 1});

      expect(this.instance.state.neighbourCount).to.equal(2);
    });

    it('should increment neighbour count if the message is from neighbours vertically', () => {
      this.instance.onBirth({x: 1, y: 0});
      this.instance.onBirth({x: 1, y: 2});

      expect(this.instance.state.neighbourCount).to.equal(2);
    });

    it('should increment neighbour count if the message is from neighbours diagonally', () => {
      this.instance.onBirth({x: 0, y: 2});
      this.instance.onBirth({x: 2, y: 2});
      this.instance.onBirth({x: 0, y: 0});
      this.instance.onBirth({x: 2, y: 0});

      expect(this.instance.state.neighbourCount).to.equal(4);
    });

    it('should not increment neighbour count if its not from a neighbour', () => {
      this.instance.onBirth({x: 3, y: 4});
      this.instance.onBirth({x: 1, y: 4});
      this.instance.onBirth({x: 4, y: 1});
      this.instance.onBirth({x: 0, y: 3});
      this.instance.onBirth({x: 3, y: 0});

      expect(this.instance.state.neighbourCount).to.equal(0);
    });
  });

  describe('onDeath', () => {
    beforeEach(() => {
      this.wrapper = mount(<Cell x={1} y={1} onChange={genericCallBack}/>);
      this.instance = this.wrapper.instance();
      this.instance.setNeighbourCount(8);
    });

    it('should increment neighbour count if the message is from neighbours horizontally', () => {
      this.instance.onDeath({x: 0, y: 1});
      this.instance.onDeath({x: 2, y: 1});

      expect(this.instance.state.neighbourCount).to.equal(6);
    });

    it('should increment neighbour count if the message is from neighbours vertically', () => {
      this.instance.onDeath({x: 1, y: 0});
      this.instance.onDeath({x: 1, y: 2});

      expect(this.instance.state.neighbourCount).to.equal(6);
    });

    it('should increment neighbour count if the message is from neighbours diagonally', () => {
      this.instance.onDeath({x: 0, y: 2});
      this.instance.onDeath({x: 2, y: 2});
      this.instance.onDeath({x: 0, y: 0});
      this.instance.onDeath({x: 2, y: 0});

      expect(this.instance.state.neighbourCount).to.equal(4);
    });

    it('should not increment neighbour count if its not from a neighbour', () => {
      this.instance.onDeath({x: 3, y: 4});
      this.instance.onDeath({x: 1, y: 4});
      this.instance.onDeath({x: 4, y: 1});
      this.instance.onDeath({x: 0, y: 3});
      this.instance.onDeath({x: 3, y: 0});

      expect(this.instance.state.neighbourCount).to.equal(8);
    });
  });

  describe('onEvaluate', () => {
    it('should call its onChange callback', () => {
      var parent = {
        genericCallBack: function() {}
      };
      var spy = sinon.spy(parent, 'genericCallBack');
      this.wrapper = mount(<Cell x={1} y={1} alive={true} onChange={parent.genericCallBack}/>);

      this.wrapper.instance().onEvaluate();
      expect(spy.calledOnce).to.equal(true);
    });

    it('needs to reset its neighbourCount', () => {
      this.wrapper = shallow(<Cell x={1} y={1} alive={true} onChange={genericCallBack}/>);
      this.instance = this.wrapper.instance();
      this.instance.setNeighbourCount(2);
      this.instance.onEvaluate();
      expect(this.wrapper.instance().state.neighbourCount).to.equal(0);
    });

    it('should set its status to alive if the neighbour count is 2 and is currently alive', () => {
      this.wrapper = mount(<Cell x={1} y={1} alive={true} onChange={genericCallBack}/>);
      this.instance = this.wrapper.instance();
      this.instance.setNeighbourCount(2);
      this.instance.onEvaluate();
      expect(this.instance.state.alive).to.equal(true);
    });

    it('should set its status to alive if the neighbour count is 3 and is currently alive', () => {
      this.wrapper = mount(<Cell x={1} y={1} alive={true} onChange={genericCallBack}/>);
      this.instance = this.wrapper.instance();
      this.instance.setNeighbourCount(3);
      this.instance.onEvaluate();
      expect(this.instance.state.alive).to.equal(true);
    });

    it('should set its status to not alive if the neighbour count is not 2 or 3 and is currently alive', () => {
      this.wrapper = mount(<Cell x={1} y={1} alive={true} onChange={genericCallBack}/>);
      this.instance = this.wrapper.instance();
      this.instance.setNeighbourCount(0);
      this.instance.onEvaluate();
      expect(this.instance.state.alive).to.equal(false);

      this.wrapper = mount(<Cell x={1} y={1} alive={true} onChange={genericCallBack}/>);
      this.instance = this.wrapper.instance();
      this.instance.setNeighbourCount(1);
      this.instance.onEvaluate();
      expect(this.instance.state.alive).to.equal(false);

      this.wrapper = mount(<Cell x={1} y={1} alive={true} onChange={genericCallBack}/>);
      this.instance = this.wrapper.instance();
      this.instance.setNeighbourCount(4);
      this.instance.onEvaluate();
      expect(this.instance.state.alive).to.equal(false);

      this.wrapper = mount(<Cell x={1} y={1} alive={true} onChange={genericCallBack}/>);
      this.instance = this.wrapper.instance();
      this.instance.setNeighbourCount(5);
      this.instance.onEvaluate();
      expect(this.instance.state.alive).to.equal(false);

      this.wrapper = mount(<Cell x={1} y={1} alive={true} onChange={genericCallBack}/>);
      this.instance = this.wrapper.instance();
      this.instance.setNeighbourCount(6);
      this.instance.onEvaluate();
      expect(this.instance.state.alive).to.equal(false);

      this.wrapper = mount(<Cell x={1} y={1} alive={true} onChange={genericCallBack}/>);
      this.instance = this.wrapper.instance();
      this.instance.setNeighbourCount(7);
      this.instance.onEvaluate();
      expect(this.instance.state.alive).to.equal(false);

      this.wrapper = mount(<Cell x={1} y={1} alive={true} onChange={genericCallBack}/>);
      this.instance = this.wrapper.instance();
      this.instance.setNeighbourCount(8);
      this.instance.onEvaluate();
      expect(this.instance.state.alive).to.equal(false);
    });

    it ('should become alive if it is currently dead and have exactly 3 alive neighbours', () => {
      this.wrapper = mount(<Cell x={1} y={1} alive={false} onChange={genericCallBack}/>);
      this.instance = this.wrapper.instance();
      this.instance.setNeighbourCount(3);
      this.instance.onEvaluate();
      expect(this.instance.state.alive).to.equal(true);
    });
  });
});