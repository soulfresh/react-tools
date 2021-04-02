import React from 'react';
import { render, screen } from '@testing-library/react';

import { UnstyledAction } from './UnstyledAction.jsx';

describe('UnstyledAction', () => {
  it('should be able to render a button.', () => {
    render(<UnstyledAction button data-foo>My Button</UnstyledAction>);

    const button = screen.getByText('My Button');
    expect(button).toBeInTheDocument();
    expect(button.tagName).toEqual('BUTTON');
    expect(button).toHaveAttribute('data-foo');
    expect(button).toHaveAttribute('type', 'button');
  });

  it('should be able to render a link.', () => {
    const url = 'ww.foo.bar';
    render(<UnstyledAction data-foo href={url}>My Link</UnstyledAction>);

    const link = screen.getByText('My Link');
    expect(link).toBeInTheDocument();
    expect(link.tagName).toEqual('A');
    expect(link).toHaveAttribute('data-foo');
    expect(link).toHaveAttribute('href', url);
    expect(link).not.toHaveAttribute('target');
    expect(link).not.toHaveAttribute('rel');
  });

  it('should be able to render an external link.', () => {
    const url = 'ww.foo.bar';
    render(<UnstyledAction blank href={url}>My Link</UnstyledAction>);

    const link = screen.getByText('My Link');
    expect(link).toBeInTheDocument();
    expect(link.tagName).toEqual('A');
    expect(link).toHaveAttribute('href', url);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });
});
