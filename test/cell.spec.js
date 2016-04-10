import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import Cell from '../app/components/cell';

describe('<Cell />', function () {
  //before(function() {
  //  this.wrapper = mount(<Cell x={1} y={1} />);
  //});

  describe('onBirth', () => {
    it('should increment neighbour count if its neighbour', () => {
      const wrapper = mount(<Cell x={1} y={1} />);
      wrapper.instance().onBirth({x: 0, y: 1});
      
      expect(wrapper.instance().state.neighbourCount).to.equal(1);
    });
  })

});