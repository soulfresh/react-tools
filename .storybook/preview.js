
// Import stylesheets that allow us to use the sass-theming
// storybook components.
import '@thesoulfresh/sass-theming/components.scss';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  options: {
    storySort: {
      order: [
        'Intro',
        'Components',
        ['Unstyled Actions', 'Routed Actions', 'Analytics Actions'],
      ],
    },
  }
}

