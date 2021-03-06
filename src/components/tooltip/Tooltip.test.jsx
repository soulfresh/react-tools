
describe('Tooltip', () => {
  describe('uncontrolled', () => {
    xit('should be able to wrap text.', () => {});
    xit('should be able to wrap components.', () => {});
    xit('should be able to programatically show the tooltip.', () => {});
    xit('should be able to programatically hide the tooltip.', () => {});
    xit('should attach the outer trigger ref correctly.', () => {});

    describe('after hover', () => {
      xit('should show the tooltip.', () => {});
      xit('should be able to programatically hide the tooltip.', () => {});

      describe('and then exit', () => {
        xit('should hide the tooltip.', () => {});
      });

      describe('and then focusing the element', () => {
        xit('should not emit the onOpen event again.', () => {});
      });
    });

    describe('after focus', () => {
      xit('should show the tooltip.', () => {});

      describe('and then blur', () => {
        xit('should hide the tooltip.', () => {});
      });

      describe('and then typing "Escape"', () => {
        xit('should hide the tooltip.', () => {});

        describe('and then typing "Enter"', () => {
          xit('should show the tooltip again.', () => {});
        });

        describe('and then hovering', () => {
          xit('should emit the onOpen event.', () => {});
        });
      });

      describe('and then hovering the element', () => {
        xit('should not emit the onOpen event again.', () => {});
      });
    });

    xit('should have the correct ARIA properties.', () => {});
    xit('should set the arrow class.', () => {});
    xit('should set the content class.', () => {});
    xit('should set the provided className.', () => {});
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
