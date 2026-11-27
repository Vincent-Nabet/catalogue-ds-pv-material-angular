import type { Meta, StoryObj } from '@storybook/angular-vite';
import { moduleMetadata } from '@storybook/angular-vite';
import { MatButton } from '@angular/material/button';

const meta: Meta = {
  title: 'Composants/Bouton',
  decorators: [moduleMetadata({ imports: [MatButton] })],
  parameters: { layout: 'centered' },
};
export default meta;

type Story = StoryObj;

export const Variantes: Story = {
  render: () => ({
    template: `
      <div style="display: flex; gap: 16px; flex-wrap: wrap">
        <button matButton>Texte</button>
        <button matButton="elevated">Élevé</button>
        <button matButton="filled">Rempli</button>
        <button matButton="tonal">Tonal</button>
        <button matButton="outlined">Contour</button>
      </div>
    `,
  }),
};

export const Desactive: Story = {
  render: () => ({
    template: `<button matButton="filled" disabled>Désactivé</button>`,
  }),
};
