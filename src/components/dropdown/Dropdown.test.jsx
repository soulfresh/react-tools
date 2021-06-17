import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ResizeObserver from "resize-observer-polyfill";

import { Dropdown } from './Dropdown.jsx';

describe('Dropdown', function() {
  let onOpen, onClose, onTriggerClick;

  beforeEach(() => {
    onOpen = jest.fn();
    onClose = jest.fn();
    onTriggerClick = jest.fn();
  });

  describe('uncontrolled', () => {
    beforeEach(() => {
      render(
        <Dropdown
          content={(first, last) =>
            <div>
              <div>Menu Content</div>
              <div><button ref={first}>First Button</button></div>
              <div><button ref={last}>Last Button</button></div>
            </div>
          }
          onOpen={onOpen}
          onClose={onClose}
          layerOptions={{ResizeObserver}}
        >
          <button onClick={onTriggerClick}>Trigger</button>
        </Dropdown>
      );
    });

    it('should render the trigger.', () => {
      expect(screen.getByText('Trigger')).toBeInTheDocument();
    });

    it('should set the expected aria attributes.', () => {
      expect(screen.getByText('Trigger')).toHaveAttribute('aria-controls', expect.any(String));
    });

    it('should be closed by default.', () => {
      expect(screen.getByText('Trigger')).toHaveAttribute('aria-expanded', 'false');
    });

    it('should not render the menu DOM.', () => {
      expect(screen.queryByText('Menu Content')).not.toBeInTheDocument();
    });

    describe('after clicking the trigger', () => {
      beforeEach(() => {
        fireEvent.click(screen.getByText('Trigger'));
      });

      it('should open the menu.', () => {
        expect(screen.getByText('Menu Content')).toBeInTheDocument();
      });

      it('should set the aria-expanded state.', () => {
        expect(screen.getByText('Trigger')).toHaveAttribute('aria-expanded', 'true');
      });

      it('should call the onOpen callback.', () => {
        expect(onOpen).toHaveBeenCalledTimes(1);
        expect(onOpen).toHaveBeenCalledWith(expect.any(Object));
      });

      it('should not call the onClose callback.', () => {
        expect(onClose).not.toHaveBeenCalled();
      });

      it('should call the trigger onClick handler.', () => {
        expect(onTriggerClick).toHaveBeenCalledTimes(1);
        expect(onTriggerClick).toHaveBeenCalledWith(expect.objectContaining({
          nativeEvent: expect.any(MouseEvent),
        }));
      });

      it('should focus the first element in the content.', () => {
        expect(screen.getByText('First Button')).toBe(document.activeElement);
      });

      describe('twice', () => {
        beforeEach(() => {
          onOpen.mockClear();
          onTriggerClick.mockClear();
          fireEvent.click(screen.getByText('Trigger'));
        });

        it('should close the menu.', () => {
          expect(screen.queryByText('Menu Content')).not.toBeInTheDocument();
        });

        it('should update the aria-expanded state.', () => {
          expect(screen.getByText('Trigger')).toHaveAttribute('aria-expanded', 'false');
        });

        it('should call the onClose callback.', () => {
          expect(onClose).toHaveBeenCalledTimes(1);
        });

        it('should not call the onOpen callback.', () => {
          expect(onOpen).not.toHaveBeenCalled();
        });

        it('should call the trigger onClick handler.', () => {
          expect(onTriggerClick).toHaveBeenCalledTimes(1);
          expect(onTriggerClick).toHaveBeenCalledWith(expect.objectContaining({
            nativeEvent: expect.any(MouseEvent),
          }));
        });

        it('should return focus to the trigger element.', () => {
          expect(screen.getByText('Trigger')).toBe(document.activeElement);
        });
      });

      describe('and then typing "Escape"', () => {
        beforeEach(() => {
          const options = {key: 'Escape', code: 'Escape'};
          fireEvent.keyDown(document.body, options);
          fireEvent.keyUp(document.body, options);
        });

        it('should close the menu.', () => {
          expect(screen.queryByText('Menu Content')).not.toBeInTheDocument();
          expect(onClose).toHaveBeenCalledTimes(1);
        });
      });
    });
  });

  describe('controlled', () => {
    const Example = ({isOpen, setIsOpen}) => {
      return (
        <Dropdown
          isOpen={isOpen}
          onOpen={() => setIsOpen(true)}
          onClose={() => setIsOpen(false)}
          content={(first, last) =>
            <div>
              <div>Menu Content</div>
              <div><button ref={first}>First Button</button></div>
              <div><button ref={last}>Last Button</button></div>
            </div>
          }
          layerOptions={{ResizeObserver}}
        >
          <button onClick={onTriggerClick}>Trigger</button>
        </Dropdown>
      );
    };

    describe('when open', () => {
      beforeEach(() => {
        render(<Example isOpen={true} setIsOpen={() => {}} />);
      });

      it('should show the menu.', () => {
        expect(screen.getByText('Menu Content')).toBeInTheDocument();
      });
    });

    describe('when closed', () => {
      beforeEach(() => {
        render(<Example isOpen={false} setIsOpen={() => {}} />);
      });

      it('should hide the menu.', () => {
        expect(screen.queryByText('Menu Content')).not.toBeInTheDocument();
      });
    });
  });
});

