import { TestBed } from '@angular/core/testing';
import { MissingTokens } from './missing-tokens';

describe('MissingTokens', () => {
  async function render(names: string[]): Promise<HTMLElement> {
    const fixture = TestBed.createComponent(MissingTokens);
    fixture.componentRef.setInput('names', names);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('should show nothing when no token is missing', async () => {
    expect((await render([])).querySelector('p')).toBeNull();
  });

  it('should list the missing tokens', async () => {
    const note = (await render(['--app-spacing-small', '--app-color-success'])).querySelector('p');
    expect(note?.textContent).toContain('Jetons attendus mais absents du CSS chargé');
    expect(Array.from(note?.querySelectorAll('code') ?? []).map((c) => c.textContent)).toEqual([
      '--app-spacing-small',
      '--app-color-success',
    ]);
  });
});
