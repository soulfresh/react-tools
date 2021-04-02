module.exports = {
  stories: [
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
      },
    },
  ],
};
