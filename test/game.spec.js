import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';
import sinon from 'sinon';

import Game from '../app/components/game';

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

      expect(wrapper.instance().state.messageBus.length).to.equal(1);
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
  });
});
