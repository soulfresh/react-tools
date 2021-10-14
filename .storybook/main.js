const path = require('path');

const package = (p) => `../src${p ? '/' + p : ''}/**/*.stories.(mdx|tsx)`;

module.exports = {
  stories: [
    // Actions
    '../src/components/buttons/Action.stories.mdx',
    '../src/components/buttons/UnstyledAction.stories.mdx',
    '../src/components/buttons/RoutedAction.stories.mdx',
    // Inputs
    '../src/components/numbers/NumberDisplay.stories.mdx',
    package('components/numbers'),
    // All others
    package(),
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    "@storybook/preset-create-react-app",
  ],
};

