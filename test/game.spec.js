import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

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
});
