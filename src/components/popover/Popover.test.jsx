import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import ResizeObserver from "resize-observer-polyfill";

import { Popover } from './Popover.jsx';

describe('Popover', () => {
  let menuRef, triggerRef;

  const Example = ({isOpen}) => {
    return (
      <Popover
        isOpen={isOpen}
        content={<div>Content</div>}
        layerOptions={{ResizeObserver}}
        ref={menuRef}
      >
        <button ref={triggerRef} className="buttonClasses">Trigger</button>
      </Popover>
    );
  };

  beforeEach(() => {
    menuRef = jest.fn();
    triggerRef = jest.fn();
  });

  describe('when closed', () => {
    beforeEach(() => {
      render(<Example isOpen={false} />);
    });

    it('should render the trigger element.', () => {
      expect(screen.getByText('Trigger')).toBeInTheDocument();
    });

    it('should not render the content.', () => {
      expect(screen.queryByText('Content')).not.toBeInTheDocument();
    });

    it('should be possible to attach a ref to the trigger.', () => {
      expect(triggerRef).toHaveBeenCalledWith(expect.any(HTMLElement));
    });

    it('should be possible to set styles on the trigger.', () => {
      expect(screen.getByText('Trigger')).toHaveClass('buttonClasses');
    });
  });

  describe('when open', () => {
    beforeEach(() => {
      render(<Example isOpen={true} />);
    });

    it('should be possible to set a ref on the content.', () => {
      expect(menuRef).toHaveBeenCalledWith(expect.any(HTMLElement));
    });

    it('should render the content.', () => {
      expect(screen.getByText('Content')).toBeInTheDocument();
    });

    it('should render the trigger.', () => {
      expect(screen.getByText('Trigger')).toBeInTheDocument();
    });
  });
});

