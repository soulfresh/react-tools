import React from 'react';
import { render, screen } from '@testing-library/react';

import { Dropdown } from './Dropdown.jsx';

describe('Dropdown', function() {
  beforeEach(() => {
    render(
      <Dropdown
      />
    );
  });

  it('should render', () => {
    expect(screen.getByTestId('Dropdown')).toBeInTheDocument();
  });

  xit('should set the expected aria attributes.', () => {});
  xit('should be closed by default.', () => {});
  xit('should be able to programatically open the menu.', () => {});

  describe('after clicking the trigger', () => {
    xit('should open the menu.', () => {});
    xit('should call the onOpen callback.', () => {});
    xit('should not call the onClose callback.', () => {});
    xit('should call the trigger onClick handler.', () => {});
    xit('should focus the first element in the content.', () => {});
    xit('should be possible to programatically close the menu.', () => {});

    describe('twice', () => {
      xit('should close the menu.', () => {});
      xit('should call the onClose callback.', () => {});
      xit('should not call the onOpen callback.', () => {});
      xit('should call the trigger onClick handler.', () => {});
      xit('should return focus to the trigger element.', () => {});
    });

    describe('and then typing "Escape"', () => {
      xit('should close the menu.', () => {});
    });
  });

  describe('after focusing the trigger and typing "Enter"', () => {
    xit('should open the menu.', () => {});
    xit('should call the onOpen callback.', () => {});
    xit('should not call the onClose callback.', () => {});
  });
});

