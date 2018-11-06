import React from "react";
import ReactDOM from "react-dom";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import App from "./App";

// Config
Enzyme.configure({
  adapter: new EnzymeAdapter()
});

// We used Enzyme shallow() function to render a component. The shallow component it renders the component without rendering the children component. It just puts placeholders.
// Tested that required DOM elements were rendered using find()
// Tested state usingEnzymes setState() and state()

/**
 * Factory function to create a ShallowWrapper for the App Component
 * @function setup
 * param {object} props - Component props specific to this setup
 * @param {object} state - initial state for setup.
 * @returns {ShallowWrapper}
 */

const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);
  return wrapper;
};

/**
  * Factory function to create a ShallowWrapper for the App Component
  * @Function setup
  * @params {object} props - Component props specific to this setup
  * @param {any} state - Initial state for setup
  * @returns { ShallowWrapper}
  const setup = (props={}, state=null) => {
    return shallow (<App {...props />})
  }
*/

/**
 * Return ShallowWrapper containing node(s) with the given data-test value.
 * @param { ShallowWrapper } wrapper - Enzyme shallow wrapper to search within
 * @returns {ShallowWrapper}
 */

// This is how to create a data-test and getting the values. Its good for reuseability
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

// We want to make sure everything renders inside the div element correctly with no errors
test("renders without errors", () => {
  const wrapper = setup();
  // <App /> = component-app
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

// We want to make sure we have a button
test("renders increment button", () => {
  const wrapper = setup();
  // <App /> = component-app
  const button = findByTestAttr(wrapper, "increment-button");
  expect(button.length).toBe(1);
});

// we want to make sure we have a display
test("renders counter display", () => {
  const wrapper = setup();
  // <App /> = component-app
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.length).toBe(1);
});

// testing of the state. We want to make sure that the counter starts with 0 by checking the state
test("counter starts at 0", () => {
  const wrapper = setup();
  // make sure the state is defined in this.state = under constructor
  const initialCounterState = wrapper.state("counter");
  expect(initialCounterState).toBe(0);
});

// We want to make sure that the button
test("clicking button increments counter display", () => {
  // We simulate the counter. For example if the counter starts at 7, we want it to increment to 8.
  const counter = 7;
  const wrapper = setup(null, { counter });

  // Find button and click
  const button = findByTestAttr(wrapper, "increment-button");
  button.simulate("click");
  wrapper.update();

  // Find display and test value
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.text()).toContain(counter + 1);
});

// 1. Set up Enzyme and Write Test
// - import enzyme and enzyme adapter and config with Enzyme config
// - check
// - it will fail because no test was found
//
