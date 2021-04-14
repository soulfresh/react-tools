
describe('useFocus', () => {
  xit('should return a ref object.', () => {});

  describe('when initially inactive', () => {
    xit('should not attach any window listeners.', () => {});
    xit('should not be focused.', () => {});

    describe('and then gaining focus', () => {
      xit('still should not attach any window listeners.', () => {});
      xit('should not indicate the focused state.', () => {});
      xit('should not call the onFocus callback.', () => {});

      describe('and then becoming active', () => {
        xit('should detect that the cotent is focused.', () => {});
        xit('should call the onFocus callback.', () => {});
      });
    });
  });

  describe('when initially active', () => {
    describe('but not focused', () => {
      xit('should attach focus and blur listeners to the element.', () => {});
      xit('should not be focused.', () => {});
      xit('should not call the onFocus callback.', () => {});

      describe('and then receiving focus', () => {
        xit('should detect that it is focused.', () => {});
        xit('should call the onFocus callback', () => {});
      });

      describe('and one of its children receives focus', () => {
        xit('should detect that it is focused.', () => {});
        xit('should call the onFocus callback', () => {});

        describe('and then focus moves out of the element', () => {
          xit('should indicate that it is no longer focused.', () => {});
          xit('should call the onBlur callback.', () => {});
        });

        describe('and then focus moves to another one of the children', () => {
          xit('should indicate that it is still focused.', () => {});
          xit('should not call the onFocus callback.', () => {});
          xit('should not call the onBlur callback.', () => {});
        });
      });
    });

    describe('and focused', () => {
      xit('should attach focus and blur listeners to the element.', () => {});
      xit('should detect that it is focused.', () => {});
      xit('should call the onFocus callback', () => {});
    });
  });
});
