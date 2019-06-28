import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { App } from './App';

describe('<App />', () => {
  let wrapper: ShallowWrapper<{}, {}, App>;

  beforeEach(() => {
    wrapper = shallow(<App />);
    wrapper.setState({ activeBook: '2' });
  });

  test('renders <BookList /> component', () => {
    expect(wrapper.find('BookList').length).toBe(1);
  });

  test('passing activeBook prop to <BookList /> component, equal to activeBook value from state', () => {
    expect(wrapper.find('BookList').prop('activeBook')).toEqual('2');
  });
  test('passing setBook method to setBook prop in <BookList /> component', () => {
    expect(wrapper.find('BookList').prop('setBook')).toBe(
      wrapper.instance().setBook
    );
  });
  test('passing bookId prop to <BookDetails /> component, equal to activeBook value from state', () => {
    expect(wrapper.find('BookDetails').prop('bookId')).toEqual('2');
  });
  test('setBook method changes value of activeBook in state, to equal of passed parameter', () => {
    expect(wrapper.state('activeBook')).toBe('2');
    wrapper.instance().setBook('1234');
    expect(wrapper.state('activeBook')).toBe('1234');
  });
});
