import type { Preview } from '@storybook/react';
import '../src/styles/index.scss';
const preview: Preview = { parameters: { controls: { expanded: true }, layout: 'centered', a11y: { test: 'error' } } };
export default preview;
