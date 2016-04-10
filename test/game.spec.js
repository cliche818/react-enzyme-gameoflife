import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import Game from '../app/components/game';

describe('<Game />', function () {
  describe('constructor', ()=> {
    it('should generate cells based on dimensions given', ()=> {
      const wrapper = mount(<Game x={3} y={4}/>);

      expect(wrapper.find('.cell')).to.have.length(12);
    });
  });
});
