import { defineMain } from '@storybook/angular-vite/node';

export default defineMain({
  stories: ['./stories/**/*.mdx', './stories/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs'],
  framework: '@storybook/angular-vite',
  core: {
    disableTelemetry: true,
  },
});
