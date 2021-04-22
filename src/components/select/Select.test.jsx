
describe('Select', () => {
  describe('uncontrolled', () => {
    describe('with a function as children', () => {
      xit('should render the trigger.', () => {});
      xit('should be closed by default.', () => {});

      describe('after clicking the trigger', () => {
        xit('should open the menu.', () => {});
        xit('should call the onOpen callback.', () => {});
        xit('should not call the onClose callback.', () => {});
        xit('should call the trigger onClick handler.', () => {});

        describe('twice', () => {
          xit('should close the menu.', () => {});
          xit('should call the onClose callback.', () => {});
          xit('should not call the onOpen callback.', () => {});
          xit('should call the trigger onClick handler.', () => {});
        });
      });
    });

    describe('with an element as children', () => {
      xit('should render the trigger.', () => {});

      describe('after clicking the trigger', () => {
        xit('should open the menu.', () => {});

        describe('twice', () => {
          xit('should close the menu.', () => {});
        });
      });
    });
  });

  describe('controlled', () => {
    describe('when open', () => {
      xit('should show the menu.', () => {});
    });

    describe('when closed', () => {
      xit('should hide the menu.', () => {});
    });
  });
});
