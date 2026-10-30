import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import type { NodeResult, Result } from 'axe-core';
import { afterEach, beforeEach, vi } from 'vitest';
import { AXE_LOADER, ContrastInspector, INSPECTOR_ATTRIBUTE } from './contrast-inspector';
import { ThemeService } from '../theme/theme.service';

function violation(element: HTMLElement): Result {
  const node = {
    element,
    any: [{ id: 'color-contrast', data: { contrastRatio: 2.66, expectedContrastRatio: '4.5:1' } }],
    all: [],
    none: [],
  } as unknown as NodeResult;
  return { id: 'color-contrast', nodes: [node] } as Result;
}

describe('ContrastInspector', () => {
  const element = document.createElement('p');
  let run: ReturnType<typeof vi.fn>;
  let inspector: ContrastInspector;

  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
    run = vi.fn().mockResolvedValue({ violations: [violation(element)], passes: [], incomplete: [] });
    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: AXE_LOADER, useValue: async () => ({ run }) }],
    });
    inspector = TestBed.inject(ContrastInspector);
    TestBed.tick();
  });

  afterEach(() => vi.useRealTimers());

  async function settle(): Promise<void> {
    TestBed.tick();
    await vi.advanceTimersByTimeAsync(400);
    TestBed.tick();
  }

  it('should stay idle until activated', async () => {
    await settle();
    expect(inspector.active()).toBe(false);
    expect(run).not.toHaveBeenCalled();
  });

  it('should measure the color-contrast rule once activated, excluding its own overlay', async () => {
    inspector.toggle();
    TestBed.tick();
    expect(inspector.running()).toBe(true);
    expect(run).not.toHaveBeenCalled();
    await settle();

    expect(run).toHaveBeenCalledTimes(1);
    const [context, options] = run.mock.calls[0];
    expect(context).toEqual({ exclude: [`[${INSPECTOR_ATTRIBUTE}]`] });
    expect(options).toMatchObject({
      runOnly: { type: 'rule', values: ['color-contrast'] },
      elementRef: true,
    });
    expect(inspector.running()).toBe(false);
    expect(inspector.items().length).toBe(1);
    expect(inspector.failing()).toBe(1);
    expect(inspector.passing()).toBe(0);
  });

  it('should measure again, once, when the theme changes', async () => {
    inspector.toggle();
    await settle();
    const theme = TestBed.inject(ThemeService);
    theme.theme.set('violet');
    theme.scheme.set('dark');
    await settle();

    expect(run).toHaveBeenCalledTimes(2);
  });

  it('should clear the items and drop a pending result when deactivated', async () => {
    let finish: (value: unknown) => void = () => undefined;
    run.mockReturnValue(new Promise((resolve) => (finish = resolve)));
    inspector.toggle();
    await settle();
    expect(inspector.running()).toBe(true);

    inspector.toggle();
    TestBed.tick();
    finish({ violations: [violation(element)], passes: [], incomplete: [] });
    await settle();

    expect(inspector.running()).toBe(false);
    expect(inspector.items()).toEqual([]);
  });

  it('should report an analysis error', async () => {
    run.mockRejectedValue(new Error('axe indisponible'));
    inspector.toggle();
    await settle();

    expect(inspector.error()).toBe('axe indisponible');
    expect(inspector.items()).toEqual([]);
    expect(inspector.running()).toBe(false);
  });
});
