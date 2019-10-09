import React from 'react';
import Enzyme from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';

import Dashboard from './index.jsx';

import {
  shallow
} from 'enzyme';

import {
  stateInitial,
  stateHighCpu,
  stateRecovering,
  stateHasRecovered
} from 'assets/constants.jsx';

Enzyme.configure({
  adapter: new EnzymeAdapter(),
  disableLifecycleMethods: true
})

describe('Dashboard Component', () => {

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Dashboard />);
  })

  describe('Alerting', () => {

    it('handleUpdateStateToHighCpu should update state as expected', () => {
      const classInstance = wrapper.instance();

      classInstance.handleUpdateStateToHighCpu(
        1, // highCpuStartTime is one to ensure we always passed the highCpuThreshold
        Date.now(), // currentTimestamp
        stateInitial, // currentCpuState
        0 // currentHighCpuQuantity
      );
      const newState = classInstance.state.currentCpuState;
      expect(newState).toBe(stateHighCpu);
    });

    it('handleUpdateStateToRecovering should update state as expected', () => {
      const classInstance = wrapper.instance();
      classInstance.handleUpdateStateToRecovering();
      const newState = classInstance.state.currentCpuState;
      expect(newState).toBe(stateRecovering);
    });

    it('handleUpdateStateToRecovered should update state as expected', () => {
      const classInstance = wrapper.instance();
      classInstance.handleUpdateStateToRecovered();
      const newState = classInstance.state.currentCpuState;
      expect(newState).toBe(stateHasRecovered);
    });

  })

})
