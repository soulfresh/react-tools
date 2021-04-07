import React from 'react';
import { render as testRender, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import { RoutedAction } from './RoutedAction.jsx';

function render(component) {
  return testRender(
    <MemoryRouter>
      { component }
    </MemoryRouter>
  );
}

describe('RoutedAction', () => {
  const url = '/foo/bar';

  it('should be able to render a routed link.', () => {
    render(<RoutedAction to={url}>My Link</RoutedAction>);

    const action = screen.getByText('My Link');
    expect(action).toBeInTheDocument();
    expect(action.tagName).toEqual('A');
    expect(action).toHaveAttribute('href', url);
    expect(action).toHaveAttribute('data-router-link');
  });

  it('should be able to render an unrouted link.', () => {
    render(<RoutedAction unrouted to={url}>My Link</RoutedAction>);

    const action = screen.getByText('My Link');
    expect(action).toBeInTheDocument();
    expect(action.tagName).toEqual('A');
    expect(action).toHaveAttribute('href', url);
    expect(action).not.toHaveAttribute('data-router-link');
  });

  it('should be able to render an external link.', () => {
    render(<RoutedAction blank to={url}>My Link</RoutedAction>);

    const action = screen.getByText('My Link');
    expect(action).toBeInTheDocument();
    expect(action.tagName).toEqual('A');
    expect(action).toHaveAttribute('target', '_blank');
    expect(action).not.toHaveAttribute('data-router-link');
  });

  it('should be able to pass the "href" prop in place of "to".', () => {
    render(<RoutedAction href={url}>My Link</RoutedAction>);

    const action = screen.getByText('My Link');
    expect(action).toBeInTheDocument();
    expect(action.tagName).toEqual('A');
    expect(action).toHaveAttribute('href', url);
    expect(action).toHaveAttribute('data-router-link');
  });

  it('should be able to render a button.', () => {
    render(<RoutedAction data-foo>My Button</RoutedAction>);

    const action = screen.getByText('My Button');
    expect(action).toBeInTheDocument();
    expect(action.tagName).toEqual('BUTTON');
    expect(action).toHaveAttribute('data-foo');
  });
});
