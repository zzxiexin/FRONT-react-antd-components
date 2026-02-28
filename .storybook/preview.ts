import { Preview } from "@storybook/react";
import '../src/index';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
      expanded: true,
      sort: 'requiredFirst',
    },
    docs: {
      story: { 
        inline: true,
        height: '300px',
      },
      canvas: {
        sourceState: 'shown', // 默认显示源代码
      },
      source: {
        language: 'tsx',
      },
    },
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default preview;
