/** Famille de contraste d'un thème importé (cf. `detecterFamilles` : `id` = suffixe de classe, `standard` si aucun). */
export interface FamilleImportee {
  id: string;
  libelle: string;
  /** Couleur primaire claire (hex), pour la pastille d'aperçu. */
  apercu: string;
  defaut: boolean;
  progression: boolean;
}

export interface RapportImport {
  /** Nombre de fichiers `semantics/*.tokens.json` lus. */
  modes: number;
  /** Variables MD3 écrites. */
  md3: number;
  /** Variables du design system (`--app-*`) écrites. */
  custom: number;
  /** Chemins de tokens non reconnus (non écrits). */
  inconnus: string[];
  /** Nombre de tokens volontairement ignorés. */
  ignores: number;
  /** Modes dont le nom ne contient ni clair ni sombre. */
  modesIgnores: string[];
  /** Valeur de `--md-ref-typeface-plain`. */
  police: string;
  /** Messages français prêts à afficher. */
  avertissements: string[];
}

export interface ThemeGenere {
  /** CSS de toutes les familles, sous `html.theme-<base>-<famille>` ; contrôlé par `validerCss`. */
  css: string;
  /** Familles du zip, la famille par défaut d'abord. */
  familles: FamilleImportee[];
  rapport: RapportImport;
}

/** Lève une `Error` dont le message français est prêt à afficher. */
export function genererThemeImporte(
  octets: Uint8Array,
  options: { base: string; nomSource: string },
): ThemeGenere;
