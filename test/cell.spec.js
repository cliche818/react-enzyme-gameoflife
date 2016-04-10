import React from 'react';
import { mount, shallow } from 'enzyme';
import {expect} from 'chai';

import Cell from '../app/components/cell';

describe('<Cell />', function() {
  beforeEach(() => {
    this.wrapper = mount(<Cell x={1} y={1} />);
    this.instance = this.wrapper.instance();
  });

  describe('onBirth', () => {
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
  })

});