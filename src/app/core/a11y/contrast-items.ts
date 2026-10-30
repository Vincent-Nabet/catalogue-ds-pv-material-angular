import type { AxeResults, NodeResult, Result } from 'axe-core';

export type ContrastStatus = 'fail' | 'pass' | 'unknown';

export interface ContrastItem {
  element: HTMLElement;
  status: ContrastStatus;
  /** Rapport mesuré (ex. 2.66), absent quand axe ne peut pas conclure. */
  ratio: number | null;
  /** Rapport minimal exigé (4.5, ou 3 pour le grand texte). */
  expected: number | null;
  foreground: string | null;
  background: string | null;
  /** Pour `unknown` : pourquoi axe ne conclut pas. */
  reason: string | null;
}

type Groups = Pick<AxeResults, 'violations' | 'passes' | 'incomplete'>;

const RULE = 'color-contrast';

/** Causes les plus fréquentes d'un résultat « incomplet » (`messageKey` d'axe). */
const REASONS: Record<string, string> = {
  bgImage: 'fond en image',
  bgGradient: 'fond en dégradé',
  imgNode: 'fond en image',
  bgOverlap: 'fond recouvert par un autre élément',
  fgAlpha: 'texte transparent',
  elmPartiallyObscured: 'élément partiellement masqué',
  elmPartiallyObscuring: 'élément qui en recouvre un autre',
  outsideViewport: 'élément hors de la fenêtre',
  equalRatio: 'texte et fond identiques',
  shortTextContent: 'texte trop court pour être évalué',
  nonBgContent: 'fond non déterminable',
  pseudoContent: 'contenu généré par CSS',
};

const ORDER: Record<ContrastStatus, number> = { fail: 0, unknown: 1, pass: 2 };

/**
 * Convertit les résultats de la règle `color-contrast` d'axe en éléments à afficher :
 * échecs d'abord (les plus faibles en premier), puis les cas indéterminés, puis les conformes.
 * Les nœuds sans élément DOM sont ignorés.
 */
export function toContrastItems(results: Groups): ContrastItem[] {
  const items = [
    ...fromGroup(results.violations, 'fail'),
    ...fromGroup(results.incomplete, 'unknown'),
    ...fromGroup(results.passes, 'pass'),
  ];
  return items.sort(
    (a, b) =>
      ORDER[a.status] - ORDER[b.status] || (a.ratio ?? Infinity) - (b.ratio ?? Infinity),
  );
}

function fromGroup(group: Result[], status: ContrastStatus): ContrastItem[] {
  return group
    .filter((result) => result.id === RULE)
    .flatMap((result) => result.nodes)
    .filter((node): node is NodeResult & { element: HTMLElement } => !!node.element)
    .map((node) => toItem(node, status));
}

function toItem(node: NodeResult & { element: HTMLElement }, status: ContrastStatus): ContrastItem {
  const data = (node.any[0] ?? node.all[0] ?? node.none[0])?.data ?? {};
  const ratio = typeof data.contrastRatio === 'number' ? data.contrastRatio : null;
  return {
    element: node.element,
    status,
    ratio,
    expected: parseFloat(data.expectedContrastRatio) || null,
    foreground: typeof data.fgColor === 'string' ? data.fgColor : null,
    background: typeof data.bgColor === 'string' ? data.bgColor : null,
    reason:
      status === 'unknown'
        ? (REASONS[data.messageKey as string] ?? 'contraste indéterminé')
        : null,
  };
}

const ratioFormat = new Intl.NumberFormat('fr-FR', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** `2.66` → `2,66 : 1`. */
export function formatRatio(ratio: number): string {
  return `${ratioFormat.format(ratio)} : 1`;
}

/** Texte court du badge : le rapport mesuré, ou `?` quand axe ne peut pas conclure (il renvoie alors 0). */
export function badgeLabel(item: ContrastItem): string {
  return item.status === 'unknown' || item.ratio === null ? '?' : formatRatio(item.ratio);
}

/** Phrase complète (info-bulle du badge) : verdict, rapport exigé, couleurs mesurées. */
export function describeItem(item: ContrastItem): string {
  if (item.status === 'unknown' || item.ratio === null) {
    return `Contraste à vérifier à la main : ${item.reason ?? 'contraste indéterminé'}.`;
  }
  const expected = item.expected === null ? '' : ` (minimum ${formatRatio(item.expected)})`;
  const colors =
    item.foreground && item.background
      ? ` Texte ${item.foreground} sur fond ${item.background}.`
      : '';
  const verdict = item.status === 'fail' ? 'Contraste insuffisant' : 'Contraste conforme';
  return `${verdict} : ${formatRatio(item.ratio)}${expected}.${colors}`;
}
