module.exports = {
  stories: [
    // Actions
    '../src/components/buttons/Action.stories.mdx',
    '../src/components/buttons/UnstyledAction.stories.mdx',
    '../src/components/buttons/RoutedAction.stories.mdx',
    // All others
    '../src/**/*.stories.mdx',
  ],
  // TODO Get this working with essentials
  addons: [
    "@storybook/addon-links",
    // "@storybook/addon-essentials",
    "@storybook/preset-create-react-app",
    // '@storybook/addon-a11y',
    {
      name: '@storybook/addon-docs',
      options: {
        configureJSX: true,
        // transcludeMarkdown: true,
      },
    },
  ],
};
