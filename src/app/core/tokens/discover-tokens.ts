/**
 * Détection des jetons du design system (`--app-*`) dans le CSS réellement chargé : les pages
 * Fondations gardent leurs listes écrites à la main (libellés, ordre, paires de contraste) et y
 * ajoutent ce qui est déclaré en plus. Fonctions pures, sans état.
 */

/** Une règle CSS, vue par ses seules propriétés utiles (reconnues par leur présence, pas par leur classe). */
type RuleLike = CSSRule & {
  style?: CSSStyleDeclaration;
  cssRules?: CSSRuleList;
  styleSheet?: CSSStyleSheet | null;
};

export type TokenKind = 'color' | 'corner' | 'spacing' | 'weight' | 'other';

export interface TokenClass {
  kind: TokenKind;
  /** Suffixe qui identifie le jeton dans sa famille (`success` pour `--app-color-success`). */
  id: string;
}

/**
 * Noms des variables `--<prefix>-*` déclarées dans les feuilles, dans leur ordre d'apparition :
 * union de tous les blocs (les couleurs sont déclarées par classe `theme-*`, la lecture du seul
 * thème courant serait incomplète). Les règles de groupe (`@media`, `@layer`, `@supports`), les
 * règles imbriquées et les `@import` sont parcourus ; une feuille inaccessible (cross-origin, par
 * exemple Google Fonts) est ignorée.
 */
export function declaredProperties(sheets: Iterable<CSSStyleSheet>, prefix: string): Set<string> {
  const start = `--${prefix}-`;
  const found = new Set<string>();

  const visit = (rules: CSSRuleList): void => {
    for (const rule of Array.from(rules) as RuleLike[]) {
      if (rule.style) {
        for (const name of Array.from(rule.style)) {
          if (name.startsWith(start)) {
            found.add(name);
          }
        }
      }
      if (rule.cssRules) {
        visit(rule.cssRules);
      }
      if (rule.styleSheet) {
        visitSheet(rule.styleSheet);
      }
    }
  };

  const visitSheet = (sheet: CSSStyleSheet): void => {
    let rules: CSSRuleList;
    try {
      rules = sheet.cssRules;
    } catch {
      return;
    }
    visit(rules);
  };

  for (const sheet of sheets) {
    visitSheet(sheet);
  }
  return found;
}

/** Famille d'un jeton d'après son nom ; `other` pour tout nom hors préfixe ou de forme inconnue. */
export function classifyToken(name: string, prefix: string): TokenClass {
  const start = `--${prefix}-`;
  const rest = name.startsWith(start) ? name.slice(start.length) : null;
  if (rest !== null) {
    const weight = /^typescale-emphasized-(.+)-weight$/.exec(rest);
    if (weight) {
      return { kind: 'weight', id: weight[1] };
    }
    for (const [kind, head] of [
      ['color', 'color-'],
      ['corner', 'shape-corner-'],
      ['spacing', 'spacing-'],
    ] as const) {
      if (rest.startsWith(head) && rest.length > head.length) {
        return { kind, id: rest.slice(head.length) };
      }
    }
  }
  return { kind: 'other', id: name };
}

/** Jetons détectés mais absents de la liste écrite à la main. */
export function unlisted(found: Iterable<string>, listed: Iterable<string>): string[] {
  const known = new Set(listed);
  return Array.from(found).filter((name) => !known.has(name));
}

/** Jetons de la liste écrite à la main mais absents du CSS chargé. */
export function missing(listed: Iterable<string>, found: Iterable<string>): string[] {
  const present = new Set(found);
  return Array.from(listed).filter((name) => !present.has(name));
}

/** Identifiants des jetons détectés d'une famille (`kind`) qui ne figurent pas dans `listed`. */
export function detectedIds(
  found: Iterable<string>,
  prefix: string,
  kind: TokenKind,
  listed: Iterable<string>,
): string[] {
  const ids = Array.from(found)
    .map((name) => classifyToken(name, prefix))
    .filter((token) => token.kind === kind)
    .map((token) => token.id);
  return unlisted(ids, listed);
}
