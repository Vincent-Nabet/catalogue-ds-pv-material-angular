import { Directive, computed, input } from '@angular/core';
import { familyVariables } from '../../core/tokens/color-families';

/**
 * Pose les variables `--r-*` d'une famille `--app-color-*` sur ses descendants, sans boîte propre
 * (`display: contents`) : la classe `.perso` de la page lit ces variables, ce qui permet de rendre
 * une seule fois le composant pour toutes les familles détectées.
 */
@Directive({
  selector: '[appColorFamily]',
  host: { '[style]': 'style()' },
})
export class ColorFamilyScope {
  /** Identifiant de la famille : `success` pour `--app-color-success`. */
  readonly family = input.required<string>({ alias: 'appColorFamily' });

  protected readonly style = computed(() => ({ display: 'contents', ...familyVariables(this.family()) }));
}
