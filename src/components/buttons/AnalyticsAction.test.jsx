import React from 'react';
import { render as testRender, screen } from '@testing-library/react';
import fireEvent from '@testing-library/user-event';

import { AnalyticsProvider } from '../../hooks';
import { AnalyticsAction } from './AnalyticsAction.jsx';

function render(component, service = {}) {
  return testRender(
    <AnalyticsProvider value={service}>
      { component }
    </AnalyticsProvider>
  );
}

/* eslint-disable jsx-a11y/anchor-is-valid */
describe('AnalyticsAction', () => {
  let service;

  const category = 'Media';
  const action = 'Play Video';
  const label = 'Start';
  const value = 20;

  beforeEach(() => {
    service = {
      trackEvent: jest.fn(),
      trackExternalLink: jest.fn(),
    };
  });

  it('should be able to render text children.', () => {
    render(<AnalyticsAction>Text</AnalyticsAction>);

    const action = screen.getByText('Text');
    expect(action).toBeInTheDocument();
    expect(action.tagName).toEqual('SPAN');
  });

  it('should be able to render function children.', () => {
    const children = jest.fn(() => <div>My Text</div>);
    render(
      <AnalyticsAction
        data-foo
        category="foo"
        action="bar"
        label="baz"
      >
        { children }
      </AnalyticsAction>
    );

    expect(children).toHaveBeenCalledTimes(1);
    expect(children).toHaveBeenCalledWith(expect.objectContaining({
      onClick: expect.any(Function),
      'data-foo': true,
    }));

    const action = screen.getByText('My Text');
    expect(action).toBeInTheDocument();
  });

  it('should be able to perform event tracking on a button.', () => {
    render(
      <AnalyticsAction
        category={category}
        action={action}
        label={label}
        value={value}
      >
        <button>My Button</button>
      </AnalyticsAction>,
      service
    );

    const button = screen.getByText('My Button');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(service.trackEvent).toHaveBeenCalledTimes(1);
    expect(service.trackEvent).toHaveBeenCalledWith(category, action, label, value);
  });

  it('should be able to perform event tracking on a link.', () => {
    render(
      <AnalyticsAction
        category={category}
        action={action}
        label={label}
        value={value}
      >
        <a>My Link</a>
      </AnalyticsAction>,
      service
    );

    const link = screen.getByText('My Link');
    expect(link).toBeInTheDocument();

    fireEvent.click(link);
    expect(service.trackEvent).toHaveBeenCalledTimes(1);
    expect(service.trackEvent).toHaveBeenCalledWith(category, action, label, value);
  });

  it('should be able to perform external link tracking on a link.', () => {
    const url = 'http://www.foo.bar';

    render(
      <AnalyticsAction href={url}>
        <a>My Link</a>
      </AnalyticsAction>,
      service
    );

    const link = screen.getByText('My Link');
    expect(link).toBeInTheDocument();

    fireEvent.click(link);
    expect(service.trackExternalLink).toHaveBeenCalledTimes(1);
    expect(service.trackExternalLink).toHaveBeenCalledWith(url);

    expect(service.trackEvent).not.toHaveBeenCalled();
  });

  it('should not perform event tracking without a category.', () => {
    render(
      <AnalyticsAction
        category={null}
        action={action}
        label={label}
        value={value}
      >
        <button>My Button</button>
      </AnalyticsAction>,
      service
    );

    const button = screen.getByText('My Button');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(service.trackEvent).not.toHaveBeenCalled();
  });

  it('should not perform event tracking without a label.', () => {
    render(
      <AnalyticsAction
        category={category}
        action={action}
        label={null}
        value={value}
      >
        <button>My Button</button>
      </AnalyticsAction>,
      service
    );

    const button = screen.getByText('My Button');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(service.trackEvent).not.toHaveBeenCalled();
  });

  it('should not perform event tracking without an action.', () => {
    render(
      <AnalyticsAction
        category={category}
        action={null}
        label={label}
        value={value}
      >
        <button>My Button</button>
      </AnalyticsAction>,
      service
    );

    const button = screen.getByText('My Button');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(service.trackEvent).not.toHaveBeenCalled();
  });

  it('should be able to pass an onClick handler to non-analytics items.', () => {
    const onClick = jest.fn();

    render(
      <AnalyticsAction onClick={onClick}>
        <button>My Button</button>
      </AnalyticsAction>,
      service
    );

    const button = screen.getByText('My Button');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should be able to pass an onClick handler to analytics tracked items.', () => {
    const onClick = jest.fn();

    render(
      <AnalyticsAction
        category={category}
        action={action}
        label={label}
        value={value}
        onClick={onClick}
      >
        <button>My Button</button>
      </AnalyticsAction>,
      service
    );

    const button = screen.getByText('My Button');
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

