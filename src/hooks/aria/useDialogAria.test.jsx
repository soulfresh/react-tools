
describe('useDialogAria', () => {
  describe('by default', () => {
    xit('should generate an id for the menu element.', () => {});
    xit('should generate an id for the trigger element.', () => {});
    xit('should specify the aria-controls on the trigger.', () => {});
    xit('should specify the aria-labelledby on the menu.', () => {});
    xit('should set the tab order of the trigger.', () => {});
    xit('should return the triggerRef.', () => {});
    xit('should return the firstFocusRef.', () => {});
    xit('should return the lastFocusRef.', () => {});
    xit('should not focus the trigger element when first created.', () => {});

    describe('when open', () => {
      xit('should set the aria-expanded state to true.', () => {});
      xit('should move focus to the firstFocusRef element', () => {});

      describe('after pressing "Escape"', () => {
        xit('should call the onClose callback.', () => {});
        xit('should move focus back to the trigger element.', () => {});
      });

      describe('after tabbing through the menu contents', () => {
        xit('should maintain tab focus within the menu.', () => {});
      });
    });

    describe('when closed', () => {
      xit('should set the aria-expanded state to false.', () => {});

      describe('after pressing "Escape"', () => {
        xit('should not call the onClose callback.', () => {});
      });
    });
  });

  describe('with an id provided for the trigger', () => {
    xit('should use the provided id for the trigger element.', () => {});
    xit('should generate an id for the menu.', () => {});
    xit('should specify the aria-controls on the trigger.', () => {});
    xit('should specify the aria-labelledby on the menu.', () => {});
  });

  describe('with an id provided for the menu', () => {
    xit('should generate the provided id for the trigger element.', () => {});
    xit('should use the provided id for the menu.', () => {});
    xit('should specify the aria-controls on the trigger.', () => {});
    xit('should specify the aria-labelledby on the menu.', () => {});
  });

  describe('with a prefix', () => {
    xit('should generate an id for the menu that includes the prefix.', () => {});
    xit('should generate an id for the trigger that includes the prefix.', () => {});
    xit('should specify the aria-controls on the trigger.', () => {});
    xit('should specify the aria-labelledby on the menu.', () => {});
  });

  describe('with a tabIndex', () => {
    xit('should use the provided tabIndex.', () => {});
  });
});

