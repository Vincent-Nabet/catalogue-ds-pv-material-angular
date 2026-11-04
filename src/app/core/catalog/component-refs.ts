/**
 * Référence Angular Material de chaque page de composant : nom en version originale (documentation
 * Angular Material) et balise, attribut ou service à utiliser. Affichés sous le <h1> par
 * `app-composant-ref`. Fichier séparé du registre : il n'est chargé qu'avec les pages (hors bundle initial).
 */
export interface ComponentRef {
  /** Nom du composant dans la documentation Angular Material (anglais). */
  vo: string;
  /** Balise, directive ou service : ce qu'on écrit dans le code. */
  api: string;
}

export const COMPONENT_REFS: Readonly<Record<string, ComponentRef>> = {
  bouton: { vo: 'Button', api: '<button matButton>' },
  'bouton-bascule': { vo: 'Button toggle', api: '<mat-button-toggle-group>' },
  badge: { vo: 'Badge', api: 'matBadge' },
  icone: { vo: 'Icon', api: '<mat-icon>' },
  'barre-progression': { vo: 'Progress bar', api: '<mat-progress-bar>' },
  'indicateur-circulaire': { vo: 'Progress spinner', api: '<mat-progress-spinner>' },
  ripple: { vo: 'Ripple', api: 'matRipple' },
  'champ-saisie': { vo: 'Form field / Input', api: '<mat-form-field> + matInput' },
  autocompletion: { vo: 'Autocomplete', api: '<mat-autocomplete> + matAutocomplete' },
  'liste-deroulante': { vo: 'Select', api: '<mat-select>' },
  'case-a-cocher': { vo: 'Checkbox', api: '<mat-checkbox>' },
  'bouton-radio': { vo: 'Radio button', api: '<mat-radio-button>' },
  interrupteur: { vo: 'Slide toggle', api: '<mat-slide-toggle>' },
  curseur: { vo: 'Slider', api: '<mat-slider> + matSliderThumb' },
  'selecteur-date': { vo: 'Datepicker', api: '<mat-datepicker> + matDatepicker' },
  'selecteur-heure': { vo: 'Timepicker', api: '<mat-timepicker> + matTimepicker' },
  chips: { vo: 'Chips', api: '<mat-chip-set>' },
  'barre-outils': { vo: 'Toolbar', api: '<mat-toolbar>' },
  'menu-lateral': { vo: 'Sidenav', api: '<mat-sidenav>' },
  menu: { vo: 'Menu', api: '<mat-menu> + matMenuTriggerFor' },
  onglets: { vo: 'Tabs', api: '<mat-tab-group>' },
  carte: { vo: 'Card', api: '<mat-card>' },
  separateur: { vo: 'Divider', api: '<mat-divider>' },
  liste: { vo: 'List', api: '<mat-list>' },
  grille: { vo: 'Grid list', api: '<mat-grid-list>' },
  'panneau-extensible': { vo: 'Expansion Panel', api: '<mat-expansion-panel>' },
  etapes: { vo: 'Stepper', api: '<mat-stepper>' },
  arbre: { vo: 'Tree', api: '<mat-tree>' },
  'boite-dialogue': { vo: 'Dialog', api: 'MatDialog' },
  'feuille-du-bas': { vo: 'Bottom Sheet', api: 'MatBottomSheet' },
  snackbar: { vo: 'Snackbar', api: 'MatSnackBar' },
  infobulle: { vo: 'Tooltip', api: 'matTooltip' },
  tableau: { vo: 'Table', api: '<table mat-table>' },
  tri: { vo: 'Sort header', api: 'matSort + mat-sort-header' },
  pagination: { vo: 'Paginator', api: '<mat-paginator>' },
};
