import React from "react";
import ReactDOM from "react-dom";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";
import App from "./App";

// Config
Enzyme.configure({
  adapter: new EnzymeAdapter()
});

const setup = (props = {}, state = null) => {
  return shallow(<App {...props} />);
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

const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

test("renders without errors", () => {
  const wrapper = setup();
  // <App /> = component-app
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

test("renders increment button", () => {
  const wrapper = setup();
  // <App /> = component-app
  const button = findByTestAttr(wrapper, "increment-button");
  expect(button.length).toBe(1);
});

test("renders counter display", () => {
  const wrapper = setup();
  // <App /> = component-app
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.length).toBe(1);
});

// testing of the state
test("counter starts at 0", () => {
  const wrapper = setup();
  // make sure the state is defined in this.state = under constructor
  const initialCounterState = wrapper.state("counter");
  expect(initialCounterState).toBe(0);
});

test("clicking button increments counter display", () => {});
