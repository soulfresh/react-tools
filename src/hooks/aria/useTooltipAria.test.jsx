
describe('useTooltipAria', () => {
  describe('by default', () => {
    xit('should set the tab-index of the trigger.', () => {});
    xit('should generate an id for the tooltip.', () => {});
    xit('should specify the aria-describedby for the trigger.', () => {});
    xit('should set the role of the tooltip element.', () => {});
    xit('should return onFocus and onBlur callbacks.', () => {});

    describe('when open', () => {
      describe('and "Escape" is pressed', () => {
        xit('should call the onClose callback.', () => {});
        xit('should not call the onOpen callback.', () => {});
      });

      describe('and "Enter" is pressed', () => {
        xit('should not call the onOpen callback.', () => {});
        xit('should not call the onClose callback.', () => {});
      });

      describe('and losing focus', () => {
        xit('should call the onClose callback.', () => {});
        xit('should not call the onOpen callback.', () => {});
      });
    });

    describe('when closed"', () => {
      describe('and "Escape" is pressed', () => {
        xit('should not call the onClose callback.', () => {});
        xit('should not call the onOpen callback.', () => {});
      });

      describe('and "Enter" is pressed', () => {
        xit('should call the onOpen callback.', () => {});
        xit('should not call the onClose callback.', () => {});
      });

      describe('and getting focus', () => {
        xit('should not call the onClose callback.', () => {});
        xit('should call the onOpen callback.', () => {});
      });
    });
  });

  describe('with an id provided', () => {
    xit('should use the provided id for the tooltip.', () => {});
    xit('should specify the aria-describedby for the trigger.', () => {});
  });

  describe('with a prefix provided', () => {
    xit('should generate an id for the tooltip that includes the prefix.', () => {});
    xit('should specify the aria-describedby for the trigger.', () => {});
  });
});
