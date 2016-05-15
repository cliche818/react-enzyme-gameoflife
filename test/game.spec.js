import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import Game from '../app/components/game';
import Cell from '../app/components/cell';

describe('<Game />', function () {
  var genericCallback = function() {};

  describe('constructor', ()=> {
    it('should generate cells based on dimensions given', ()=> {
      const wrapper = mount(<Game x={3} y={4}/>);

      expect(wrapper.find('.cell')).to.have.length(12);
    });
  });

  describe('sendMessage', () => {
    it('should add a message to the games messageBus', () => {
      const wrapper = mount(<Game x={3} y={4}/>);

      const fakeData =  {"x": 1, "y": 2, "alive": true};
      expect(wrapper.instance().sendMessage(fakeData));

      expect(wrapper.instance().messageBus.length).to.equal(1);
    });
  });

  describe('processMessage', () => {
    it('should be called when the number of messages in the messageBus is the same number as the number of cells', () => {
      const wrapper = mount(<Game x={2} y={2}/>);

      var mock = sinon.mock(wrapper.instance());
      mock.expects("processMessage").once();

      for(var i = 0; i < 2; i ++) {
        for(var j = 0; j < 2; j++) {
          const fakeData =  {"x": i, "y": j, "alive": true};
          wrapper.instance().sendMessage(fakeData);
        }
      }

      mock.verify();
    });

    it('should call all the cells onBirth function for an alive message in the queue', function(){
      const wrapper = mount(<Game x={1} y={1}/>);
      var spy = sinon.spy(wrapper.instance().refs['cell-0-0'], 'onBirth');

      const fakeData =  {"x": 1, "y": 1, "alive": true};
      wrapper.instance().sendMessage(fakeData);

      expect(spy.calledOnce).to.equal(true);
    });
    
    it('should call all the cells onDeath function for a not alive message in the queue', function(){
      const wrapper = mount(<Game x={1} y={1}/>);
      var spy = sinon.spy(wrapper.instance().refs['cell-0-0'], 'onDeath');

      const fakeData =  {"x": 1, "y": 1, "alive": false};
      wrapper.instance().sendMessage(fakeData);

      expect(spy.calledOnce).to.equal(true);
    });

    it('should send onEvaluate message to all cells when all messages are processed', function() {
      const wrapper = mount(<Game x={1} y={1}/>);
      var spy = sinon.spy(wrapper.instance().refs['cell-0-0'], 'onEvaluate');

      const fakeData =  {"x": 1, "y": 1, "alive": false};
      var clock = sinon.useFakeTimers();
      wrapper.instance().sendMessage(fakeData);
      clock.tick( 300 );

      expect(spy.calledOnce).to.equal(true);
    });

    it('should empty the message queue after all messages are send', function() {
      const wrapper = mount(<Game x={1} y={1}/>);

      const fakeData =  {"x": 1, "y": 1, "alive": false};
      wrapper.instance().sendMessage(fakeData);

      expect(wrapper.instance().messageBus.length).to.equal(0);
    });
  });
});
