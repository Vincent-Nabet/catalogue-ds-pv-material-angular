import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Specimen } from './specimen';

@Component({
  imports: [Specimen],
  template: `
    <app-specimen label="Avec code" api="matButton" snippet="<button matButton></button>" />
    <app-specimen label="Sans code" />
  `,
})
class Host {}

describe('Specimen', () => {
  it('should show the snippet button only when a snippet is provided', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const buttons = (fixture.nativeElement as HTMLElement).querySelectorAll('button');
    expect(buttons.length).toBe(1);
    expect(buttons[0].getAttribute('aria-label')).toBe('Voir le code : Avec code');
  });

  it('should open the snippet dialog', async () => {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    (fixture.nativeElement as HTMLElement).querySelector('button')?.click();
    await fixture.whenStable();
    const dialog = document.querySelector('app-snippet-dialog');
    expect(dialog?.textContent).toContain('Code — Avec code');
    expect(dialog?.querySelector('code')?.textContent).toContain('<button matButton></button>');
  });
});
