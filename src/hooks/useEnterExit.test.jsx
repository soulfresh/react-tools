
describe('useEnterExit', () => {
  describe('when initially visible', () => {
    xit('should start in the entered state.', () => {});
    xit('should be considered visible.', () => {});
    xit('should set the aria for the tooltip.', () => {});

    describe('and then being hidden', () => {
      xit('should set the exiting state', () => {});
      xit('should be considered visible.', () => {});

      describe('and the transition completes', () => {
        xit('should set the exited state.', () => {});
        xit('should not be considered visible.', () => {});
      });
    });
  });

  describe('when initially hidden', () => {
    xit('should start in the exited state.', () => {});
    xit('should not be considered visible.', () => {});

    describe('and then being shown', () => {
      xit('should set the entering state.', () => {});
      xit('should be considered visible.', () => {});

      describe('and the transition completes', () => {
        xit('should set the entered state.', () => {});
        xit('should be considered visible.', () => {});
      });
    });
  });
});
