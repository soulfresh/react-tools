
describe('useKeyWhenActive', () => {
  describe('when active', () => {
    describe('after pressing the key', () => {
      xit('should call the callback.', () => {});
      describe('twice', () => {
        xit('should not call the callback.', () => {});
        describe('and then toggling the active state', () => {
          describe('and pressing the key again', () => {
            xit('should call the callback.', () => {});
          });
        });
      });
    });
    describe('after pressing a different key', () => {
      xit('should not call the callback.', () => {});
    });
  });
  describe('when not active', () => {
    describe('after pressing the key', () => {
      xit('should not call the callback.', () => {});
    });
  });
  describe('with a specific element', () => {
    describe('and focused', () => {
      xit('should call the callback when the key event occurs.', () => {});
    });
    describe('that is not focused', () => {
      xit('should not call the callback when the key event occurs.', () => {});
    });
  });
});
