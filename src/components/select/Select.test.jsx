import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import ResizeObserver from "resize-observer-polyfill";

import { Select } from './Select.jsx';

describe('Select', () => {
  let children, content, itemToString, options;
  let onTriggerClick, onChange, onOpen, onClose;

  beforeEach(() => {
    options = ['Apple', 'Orange', 'Grape', 'Dog'];

    onOpen = jest.fn();
    onClose = jest.fn();
    onChange = jest.fn();
    onTriggerClick = jest.fn();
    itemToString = jest.fn(i => String(i));

    children = jest.fn((props, item) =>
      <button {...props}>Trigger</button>
    );

    content = jest.fn(item =>
      <div className="item">{item}</div>
    );
  });

  describe('uncontrolled', () => {
    describe('with a function as children', () => {
      beforeEach(() => {
        render(
          <Select
            data-testid="Menu"
            options={options}
            optionToString={itemToString}
            onOpen={onOpen}
            onClose={onClose}
            onChange={onChange}
            content={content}
            layerOptions={{ResizeObserver}}
          >
            {children}
          </Select>
        );
      });

      it('should render the trigger.', () => {
        expect(screen.getByText('Trigger')).toBeInTheDocument();
      });

      it('should render the menu content hidden.', () => {
        expect(screen.getByTestId('Menu')).toBeInTheDocument();
        expect(screen.getByTestId('Menu')).toHaveClass('closed');
        expect(screen.getByText(options[0])).toBeInTheDocument();
      });

      describe('after clicking the trigger', () => {
        beforeEach(() => {
          fireEvent.click(screen.getByText('Trigger'));
        });

        it('should open the menu.', () => {
          expect(screen.getByTestId('Menu')).toBeInTheDocument();
          expect(screen.getByTestId('Menu')).toHaveClass('open');
        });

        it('should call the onOpen callback.', () => {
          expect(onOpen).toHaveBeenCalledTimes(1);
        });

        it('should not call the onClose callback.', () => {
          expect(onClose).not.toHaveBeenCalled();
        });

        it('should not call the onChange callback.', () => {
          expect(onChange).not.toHaveBeenCalled();
        });

        describe('twice', () => {
          beforeEach(() => {
            onOpen.mockClear();
            fireEvent.click(screen.getByText('Trigger'));
          });

          it('should close the menu.', () => {
            expect(screen.getByTestId('Menu')).toBeInTheDocument();
            expect(screen.getByTestId('Menu')).toHaveClass('closed');
          });

          it('should call the onClose callback.', () => {
            expect(onClose).toHaveBeenCalledTimes(1);
          });

          it('should not call the onOpen callback.', () => {
            expect(onOpen).not.toHaveBeenCalled();
          });
        });
      });
    });

    describe('with an element as children', () => {
      beforeEach(() => {
        render(
          <Select
            data-testid="Menu"
            options={options}
            optionToString={itemToString}
            onOpen={onOpen}
            onClose={onClose}
            onChange={onChange}
            content={content}
            layerOptions={{ResizeObserver}}
          >
            <button onClick={onTriggerClick}>Trigger</button>
          </Select>
        );
      });

      it('should render the trigger.', () => {
        expect(screen.getByText('Trigger')).toBeInTheDocument();
      });

      it('should open the menu.', () => {
        expect(screen.getByTestId('Menu')).toBeInTheDocument();
        expect(screen.getByTestId('Menu')).toHaveClass('closed');
      });

      describe('after clicking the trigger', () => {
        beforeEach(() => {
          fireEvent.click(screen.getByText('Trigger'));
        });

        it('should open the menu.', () => {
          expect(screen.getByTestId('Menu')).toBeInTheDocument();
          expect(screen.getByTestId('Menu')).toHaveClass('open');
        });

        it('should call the trigger onClick callback.', () => {
          expect(onTriggerClick).toHaveBeenCalledTimes(1);
        });

        describe('twice', () => {
          beforeEach(() => {
            fireEvent.click(screen.getByText('Trigger'));
          });

          it('should close the menu.', () => {
            expect(screen.getByTestId('Menu')).toBeInTheDocument();
            expect(screen.getByTestId('Menu')).toHaveClass('closed');
          });
        });
      });
    });
  });

  describe('controlled', () => {
    describe('when open', () => {
      beforeEach(() => {
        render(
          <Select
            isOpen={true}
            data-testid="Menu"
            options={options}
            optionToString={itemToString}
            onOpen={onOpen}
            onClose={onClose}
            onChange={onChange}
            content={content}
            layerOptions={{ResizeObserver}}
          >
            <button onClick={onTriggerClick}>Trigger</button>
          </Select>
        );
      });

      it('should show the menu.', () => {
        expect(screen.getByTestId('Menu')).toBeInTheDocument();
        expect(screen.getByTestId('Menu')).toHaveClass('open');
      });
    });

    describe('when closed', () => {
      beforeEach(() => {
        render(
          <Select
            isOpen={false}
            data-testid="Menu"
            options={options}
            optionToString={itemToString}
            onOpen={onOpen}
            onClose={onClose}
            onChange={onChange}
            content={content}
            layerOptions={{ResizeObserver}}
          >
            <button onClick={onTriggerClick}>Trigger</button>
          </Select>
        );
      });

      it('should hide the menu.', () => {
        expect(screen.getByTestId('Menu')).toBeInTheDocument();
        expect(screen.getByTestId('Menu')).toHaveClass('closed');
      });
    });
  });
});

