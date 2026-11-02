import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { DESIGN_SYSTEM_ONLY_MESSAGE, SpecimenSection } from './specimen-section';

@Component({
  imports: [SpecimenSection],
  template: `
    <app-specimen-section title="Avec description" description="Texte libre" />
    <app-specimen-section title="Sans description" />
    <app-specimen-section title="Design system seulement" designSystemOnly />
  `,
})
class Host {}

describe('SpecimenSection', () => {
  async function paragraphes(): Promise<(string | undefined)[]> {
    const fixture = TestBed.createComponent(Host);
    await fixture.whenStable();
    const sections = (fixture.nativeElement as HTMLElement).querySelectorAll('app-specimen-section');
    return Array.from(sections).map((section) => section.querySelector('p')?.textContent?.trim());
  }

  it('should show the description when provided', async () => {
    expect((await paragraphes())[0]).toBe('Texte libre');
  });

  it('should show no paragraph without description', async () => {
    expect((await paragraphes())[1]).toBeUndefined();
  });

  it('should show the design system message with designSystemOnly', async () => {
    expect((await paragraphes())[2]).toBe(DESIGN_SYSTEM_ONLY_MESSAGE);
  });
});
