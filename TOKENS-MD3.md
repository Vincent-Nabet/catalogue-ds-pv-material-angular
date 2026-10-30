# Correspondance tokens ↔ variables CSS Material Design 3

Document généré à partir des fichiers de `tokens/` (format DTCG).

- **Variable** : chemin du token dans le fichier, séparé par des points.
- **Valeur** : valeur brute du fichier (`{...}` = alias vers un autre token).
- **Valeur résolue** : valeur finale après résolution des alias (fichiers sémantiques uniquement).
- **Équivalent MD3** : nom de variable CSS Material Design 3. `—` = pas d'équivalent MD3 direct.

Notes :
- Les couleurs de `State Layers` n'ont pas de variable MD3 propre : MD3 combine la variable de couleur du rôle avec une variable d'opacité d'état (`hover` 0.08, `focus` 0.10 / `pressed` 0.10, `dragged` 0.16). Ici `Opacity-10` est rapproché de `focus` (`pressed` a la même valeur). Attention : dans les fichiers JSON, ces tokens sont de simples alias vers la couleur du rôle, **sans opacité**. Les valeurs 0.08 / 0.10 / 0.16 sont déduites du nom du token, pas du fichier.
- Les noms marqués « MD3 Expressive » correspondent à l'évolution Expressive de MD3 et ne figurent pas dans MD3 de base. Les graisses « emphasized » suivent la forme `--md-sys-typescale-emphasized-<style>-weight` (préfixe `emphasized` avant le style, comme dans les implémentations communautaires de MD3 Expressive). Ce nom n'est confirmé par aucune source officielle Google. `Weight-emphasized` de Label Large et Label Medium correspond en revanche à la graisse `prominent` de MD3 de base.
- Les graisses sont des valeurs numériques (400, 500, 600), conformes au format DTCG et utilisables telles quelles en CSS. Le token `Font theme.Static.Weight.Bold` vaut 600 (semi-gras), pas 700.
- Les noms MD3 sont déduits de la convention `--md-sys-*` / `--md-ref-*` (minuscules, tirets) et n'ont pas été vérifiés contre une implémentation (Material Web, etc.).

## primitives.tokens.json

| Variable | Valeur | Équivalent MD3 |
|---|---|---|
| Number | `0` | — |
| Number 2 | `0` | — |
| Font theme.Static.Font.Brand | `Poppins` | `--md-ref-typeface-brand` |
| Font theme.Static.Font.Plain | `Poppins` | `--md-ref-typeface-plain` |
| Font theme.Static.Weight.Regular | `400` | `--md-ref-typeface-weight-regular` |
| Font theme.Static.Weight.Medium | `500` | `--md-ref-typeface-weight-medium` |
| Font theme.Static.Weight.Bold | `600` | `--md-ref-typeface-weight-bold` |
| Font theme.Tracking.Small | `0.1px` | — |
| Font theme.Tracking.None | `0px` | — |
| Radius.None | `0px` | `--md-sys-shape-corner-none` |
| Radius.Extra-small | `4px` | `--md-sys-shape-corner-extra-small` |
| Radius.Small | `8px` | `--md-sys-shape-corner-small` |
| Radius.Medium | `12px` | `--md-sys-shape-corner-medium` |
| Radius.Large | `16px` | `--md-sys-shape-corner-large` |
| Radius.Extra-large | `28px` | `--md-sys-shape-corner-extra-large` |
| Radius.Full | `1000px` | `--md-sys-shape-corner-full` |
| Radius.Large-increased | `20px` | `--md-sys-shape-corner-large-increased` (MD3 Expressive) |
| Radius.Extra-large-increased | `32px` | `--md-sys-shape-corner-extra-large-increased` (MD3 Expressive) |
| Radius.Extra-extra-large | `48px` | `--md-sys-shape-corner-extra-extra-large` (MD3 Expressive) |
| Spacing.None | `0px` | — |
| Spacing.Extra-small | `4px` | — |
| Spacing.Small | `8px` | — |
| Spacing.Medium | `16px` | — |
| Spacing.Large | `24px` | — |
| Spacing.Large-increased | `32px` | — |
| Spacing.Extra-large | `40px` | — |
| Spacing.Extra-large-increased | `48px` | — |
| Spacing.Extra-extra-large | `56px` | — |
| Spacing.Full | `64px` | — |
| Colors.Olive.Shade-001 | `#202900` | — (palette de référence, ton non équivalent) |
| Colors.Olive.Shade-002 | `#253000` | — (palette de référence, ton non équivalent) |
| Colors.Olive.Shade-003 | `#263000` | — (palette de référence, ton non équivalent) |
| Colors.Olive.Shade-004 | `#2E3B00` | — (palette de référence, ton non équivalent) |
| Colors.Olive.Shade-005 | `#303B08` | — (palette de référence, ton non équivalent) |
| Colors.Olive.Shade-006 | `#3E4C0C` | — (palette de référence, ton non équivalent) |
| Colors.Olive.Shade-007 | `#465900` | — (palette de référence, ton non équivalent) |
| Colors.Olive.Shade-008 | `#4B5B08` | — (palette de référence, ton non équivalent) |
| Colors.Olive.Shade-009 | `#53651B` | — (palette de référence, ton non équivalent) |
| Colors.Olive.Shade-010 | `#536700` | — (palette de référence, ton non équivalent) |
| Colors.Olive.Shade-011 | `#657C08` | — (palette de référence, ton non équivalent) |
| Colors.Olive.Shade-012 | `#86A315` | — (palette de référence, ton non équivalent) |
| Colors.Olive.Shade-013 | `#A2B653` | — (palette de référence, ton non équivalent) |
| Colors.Olive.Shade-014 | `#AFC75E` | — (palette de référence, ton non équivalent) |
| Colors.Olive.Shade-015 | `#BDCE80` | — (palette de référence, ton non équivalent) |
| Colors.Olive.Shade-016 | `#BCD078` | — (palette de référence, ton non équivalent) |
| Colors.Olive.Shade-017 | `#CADF87` | — (palette de référence, ton non équivalent) |
| Colors.Olive.Shade-018 | `#D2E594` | — (palette de référence, ton non équivalent) |
| Colors.Olive.Shade-019 | `#D8EB9A` | — (palette de référence, ton non équivalent) |
| Colors.Olive.Shade-020 | `#E6F8A6` | — (palette de référence, ton non équivalent) |
| Colors.Olive.Shade-021 | `#F0FFC0` | — (palette de référence, ton non équivalent) |
| Colors.Neutral.Shade-001 | `#000000` | — (palette de référence, ton non équivalent) |
| Colors.Neutral.Shade-002 | `#0D0D0D` | — (palette de référence, ton non équivalent) |
| Colors.Neutral.Shade-003 | `#101010` | — (palette de référence, ton non équivalent) |
| Colors.Neutral.Shade-004 | `#121212` | — (palette de référence, ton non équivalent) |
| Colors.Neutral.Shade-005 | `#1A1A1A` | — (palette de référence, ton non équivalent) |
| Colors.Neutral.Shade-006 | `#1F1F1F` | — (palette de référence, ton non équivalent) |
| Colors.Neutral.Shade-007 | `#292929` | — (palette de référence, ton non équivalent) |
| Colors.Neutral.Shade-008 | `#303030` | — (palette de référence, ton non équivalent) |
| Colors.Neutral.Shade-009 | `#343434` | — (palette de référence, ton non équivalent) |
| Colors.Neutral.Shade-010 | `#383838` | — (palette de référence, ton non équivalent) |
| Colors.Neutral.Shade-011 | `#454545` | — (palette de référence, ton non équivalent) |
| Colors.Neutral.Shade-012 | `#474747` | — (palette de référence, ton non équivalent) |
| Colors.Neutral.Shade-013 | `#494949` | — (palette de référence, ton non équivalent) |
| Colors.Neutral.Shade-014 | `#4D4D4D` | — (palette de référence, ton non équivalent) |
| Colors.Neutral.Shade-015 | `#545454` | — (palette de référence, ton non équivalent) |
| Colors.Neutral.Shade-016 | `#5C5C5C` | — (palette de référence, ton non équivalent) |
| Colors.Neutral.Shade-017 | `#626262` | — (palette de référence, ton non équivalent) |
| Colors.Neutral.Shade-018 | `#747474` | — (palette de référence, ton non équivalent) |
| Colors.Neutral.Shade-019 | `#9F9F9F` | — (palette de référence, ton non équivalent) |
| Colors.Neutral.Shade-020 | `#A3A3A3` | — (palette de référence, ton non équivalent) |
| Colors.Neutral.Shade-021 | `#BDBDBD` | — (palette de référence, ton non équivalent) |
| Colors.Neutral.Shade-022 | `#C4C4C4` | — (palette de référence, ton non équivalent) |
| Colors.Neutral.Shade-023 | `#C6C6C6` | — (palette de référence, ton non équivalent) |
| Colors.Neutral.Shade-024 | `#CCCCCC` | — (palette de référence, ton non équivalent) |
| Colors.Neutral.Shade-025 | `#D1D1D1` | — (palette de référence, ton non équivalent) |
| Colors.Neutral.Shade-026 | `#D6D6D6` | — (palette de référence, ton non équivalent) |
| Colors.Neutral.Shade-027 | `#DADADA` | — (palette de référence, ton non équivalent) |
| Colors.Neutral.Shade-028 | `#E2E2E2` | — (palette de référence, ton non équivalent) |
| Colors.Neutral.Shade-029 | `#E8E8E8` | — (palette de référence, ton non équivalent) |
| Colors.Neutral.Shade-030 | `#EEEEEE` | — (palette de référence, ton non équivalent) |
| Colors.Neutral.Shade-031 | `#F2F2F2` | — (palette de référence, ton non équivalent) |
| Colors.Neutral.Shade-032 | `#F4F4F4` | — (palette de référence, ton non équivalent) |
| Colors.Neutral.Shade-033 | `#F5F5F5` | — (palette de référence, ton non équivalent) |
| Colors.Neutral.Shade-034 | `#FAFAFA` | — (palette de référence, ton non équivalent) |
| Colors.Neutral.Shade-035 | `#FFFFFF` | — (palette de référence, ton non équivalent) |
| Colors.Sage.Shade-001 | `#252A14` | — (palette de référence, ton non équivalent) |
| Colors.Sage.Shade-002 | `#293015` | — (palette de référence, ton non équivalent) |
| Colors.Sage.Shade-003 | `#293700` | — (palette de référence, ton non équivalent) |
| Colors.Sage.Shade-004 | `#30351F` | — (palette de référence, ton non équivalent) |
| Colors.Sage.Shade-005 | `#354500` | — (palette de référence, ton non équivalent) |
| Colors.Sage.Shade-006 | `#41482C` | — (palette de référence, ton non équivalent) |
| Colors.Sage.Shade-007 | `#415400` | — (palette de référence, ton non équivalent) |
| Colors.Sage.Shade-008 | `#4C5D23` | — (palette de référence, ton non équivalent) |
| Colors.Sage.Shade-009 | `#555D3D` | — (palette de référence, ton non équivalent) |
| Colors.Sage.Shade-010 | `#A6AF84` | — (palette de référence, ton non équivalent) |
| Colors.Sage.Shade-011 | `#BDC59A` | — (palette de référence, ton non équivalent) |
| Colors.Sage.Shade-012 | `#BEC79E` | — (palette de référence, ton non équivalent) |
| Colors.Sage.Shade-013 | `#CBD3A8` | — (palette de référence, ton non équivalent) |
| Colors.Sage.Shade-014 | `#D9DFBC` | — (palette de référence, ton non équivalent) |
| Colors.Sage.Shade-015 | `#EEF5CD` | — (palette de référence, ton non équivalent) |
| Colors.Mint.Shade-001 | `#003820` | — (palette de référence, ton non équivalent) |
| Colors.Mint.Shade-002 | `#003821` | — (palette de référence, ton non équivalent) |
| Colors.Mint.Shade-003 | `#00391F` | — (palette de référence, ton non équivalent) |
| Colors.Mint.Shade-004 | `#064B30` | — (palette de référence, ton non équivalent) |
| Colors.Mint.Shade-005 | `#075B3B` | — (palette de référence, ton non équivalent) |
| Colors.Mint.Shade-006 | `#005F38` | — (palette de référence, ton non équivalent) |
| Colors.Mint.Shade-007 | `#106543` | — (palette de référence, ton non équivalent) |
| Colors.Mint.Shade-008 | `#246C49` | — (palette de référence, ton non équivalent) |
| Colors.Mint.Shade-009 | `#087A4C` | — (palette de référence, ton non équivalent) |
| Colors.Mint.Shade-010 | `#72C891` | — (palette de référence, ton non équivalent) |
| Colors.Mint.Shade-011 | `#8BD7A8` | — (palette de référence, ton non équivalent) |
| Colors.Mint.Shade-012 | `#8DDBAA` | — (palette de référence, ton non équivalent) |
| Colors.Mint.Shade-013 | `#3CF19A` | — (palette de référence, ton non équivalent) |
| Colors.Mint.Shade-014 | `#9BE7B6` | — (palette de référence, ton non équivalent) |
| Colors.Mint.Shade-015 | `#AFF2C4` | — (palette de référence, ton non équivalent) |
| Colors.Mint.Shade-016 | `#C9FFD9` | — (palette de référence, ton non équivalent) |
| Colors.Red.Shade-001 | `#690005` | — (palette de référence, ton non équivalent) |
| Colors.Red.Shade-002 | `#641713` | — (palette de référence, ton non équivalent) |
| Colors.Red.Shade-003 | `#74110D` | — (palette de référence, ton non équivalent) |
| Colors.Red.Shade-004 | `#93000A` | — (palette de référence, ton non équivalent) |
| Colors.Red.Shade-005 | `#852221` | — (palette de référence, ton non équivalent) |
| Colors.Red.Shade-006 | `#8C1D18` | — (palette de référence, ton non équivalent) |
| Colors.Red.Shade-007 | `#A52620` | — (palette de référence, ton non équivalent) |
| Colors.Red.Shade-008 | `#A52A23` | — (palette de référence, ton non équivalent) |
| Colors.Red.Shade-009 | `#B3261E` | — (palette de référence, ton non équivalent) |
| Colors.Red.Shade-010 | `#FF9E96` | — (palette de référence, ton non équivalent) |
| Colors.Red.Shade-011 | `#FFB4AB` | — (palette de référence, ton non équivalent) |
| Colors.Red.Shade-012 | `#F5C7C3` | — (palette de référence, ton non équivalent) |
| Colors.Red.Shade-013 | `#FFC4BE` | — (palette de référence, ton non équivalent) |
| Colors.Red.Shade-014 | `#FFDAD6` | — (palette de référence, ton non équivalent) |
| Colors.Red.Shade-015 | `#F9DEDC` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-001 | `#080907` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-002 | `#0B0C0A` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-003 | `#0D0E0C` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-004 | `#10110F` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-005 | `#121311` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-006 | `#13140F` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-007 | `#151613` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-008 | `#181916` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-009 | `#1A1B18` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-010 | `#1B1C19` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-011 | `#1D1E1B` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-012 | `#1E1F1C` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-013 | `#252623` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-014 | `#272824` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-015 | `#282A26` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-016 | `#292A26` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-017 | `#30312E` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-018 | `#30322B` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-019 | `#333430` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-020 | `#343531` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-021 | `#353632` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-022 | `#383936` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-023 | `#383A35` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-024 | `#3D3E3A` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-025 | `#41423E` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-026 | `#46483F` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-027 | `#464842` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-028 | `#484A44` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-029 | `#656760` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-030 | `#696B64` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-031 | `#777970` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-032 | `#777A6F` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-033 | `#91928B` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-034 | `#9A9C94` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-035 | `#A2A49B` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-036 | `#ACAEA5` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-037 | `#C7C8BF` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-038 | `#C7CBBE` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-039 | `#D0D1CB` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-040 | `#D2D3CB` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-041 | `#D7D8D2` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-042 | `#D8D9D1` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-043 | `#DCDDD4` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-044 | `#DCDED7` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-045 | `#E0E1DB` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-046 | `#E4E3DE` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-047 | `#E3E4DD` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-048 | `#E4E5DC` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-049 | `#E4E5DF` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-050 | `#E5E7DC` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-051 | `#E9EAE3` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-052 | `#E9EAE4` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-053 | `#EBECE6` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-054 | `#EEEDE8` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-055 | `#EFF0E9` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-056 | `#F1F0EB` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-057 | `#F1F1EC` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-058 | `#F1F2EA` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-059 | `#F3F3EE` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-060 | `#F5F6EF` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-061 | `#FAF9F5` | — (palette de référence, ton non équivalent) |
| Colors.Neutral Variant.Shade-062 | `#FAFAF5` | — (palette de référence, ton non équivalent) |
| Colors.Green.Shade-001 | `#1C3700` | — (palette de référence, ton non équivalent) |
| Colors.Green.Shade-002 | `#274D05` | — (palette de référence, ton non équivalent) |
| Colors.Green.Shade-003 | `#315D08` | — (palette de référence, ton non équivalent) |
| Colors.Green.Shade-004 | `#365E0A` | — (palette de référence, ton non équivalent) |
| Colors.Green.Shade-005 | `#315F05` | — (palette de référence, ton non équivalent) |
| Colors.Green.Shade-006 | `#38620C` | — (palette de référence, ton non équivalent) |
| Colors.Green.Shade-007 | `#477A14` | — (palette de référence, ton non équivalent) |
| Colors.Green.Shade-008 | `#467F0C` | — (palette de référence, ton non équivalent) |
| Colors.Green.Shade-009 | `#73C322` | — (palette de référence, ton non équivalent) |
| Colors.Green.Shade-010 | `#A5D66A` | — (palette de référence, ton non équivalent) |
| Colors.Green.Shade-011 | `#B7E77E` | — (palette de référence, ton non équivalent) |
| Colors.Green.Shade-012 | `#C8E8A5` | — (palette de référence, ton non équivalent) |
| Colors.Green.Shade-013 | `#DDF3C4` | — (palette de référence, ton non équivalent) |
| Colors.Blue.Shade-001 | `#002E69` | — (palette de référence, ton non équivalent) |
| Colors.Blue.Shade-002 | `#003A88` | — (palette de référence, ton non équivalent) |
| Colors.Blue.Shade-003 | `#003E99` | — (palette de référence, ton non équivalent) |
| Colors.Blue.Shade-004 | `#003F9E` | — (palette de référence, ton non équivalent) |
| Colors.Blue.Shade-005 | `#004494` | — (palette de référence, ton non équivalent) |
| Colors.Blue.Shade-006 | `#0050BF` | — (palette de référence, ton non équivalent) |
| Colors.Blue.Shade-007 | `#1558B7` | — (palette de référence, ton non équivalent) |
| Colors.Blue.Shade-008 | `#0054D1` | — (palette de référence, ton non équivalent) |
| Colors.Blue.Shade-009 | `#0066FF` | — (palette de référence, ton non équivalent) |
| Colors.Blue.Shade-010 | `#9EBBFF` | — (palette de référence, ton non équivalent) |
| Colors.Blue.Shade-011 | `#ADC6FF` | — (palette de référence, ton non équivalent) |
| Colors.Blue.Shade-012 | `#BDD0FF` | — (palette de référence, ton non équivalent) |
| Colors.Blue.Shade-013 | `#C3D6FF` | — (palette de référence, ton non équivalent) |
| Colors.Blue.Shade-014 | `#D9E2FF` | — (palette de référence, ton non équivalent) |
| Colors.Blue.Shade-015 | `#DCE8FF` | — (palette de référence, ton non équivalent) |
| Colors.Amber.Shade-001 | `#482900` | — (palette de référence, ton non équivalent) |
| Colors.Amber.Shade-002 | `#512F00` | — (palette de référence, ton non équivalent) |
| Colors.Amber.Shade-003 | `#6A3D00` | — (palette de référence, ton non équivalent) |
| Colors.Amber.Shade-004 | `#6B3F00` | — (palette de référence, ton non équivalent) |
| Colors.Amber.Shade-005 | `#784200` | — (palette de référence, ton non équivalent) |
| Colors.Amber.Shade-006 | `#7D4900` | — (palette de référence, ton non équivalent) |
| Colors.Amber.Shade-007 | `#844B00` | — (palette de référence, ton non équivalent) |
| Colors.Amber.Shade-008 | `#A85F00` | — (palette de référence, ton non équivalent) |
| Colors.Amber.Shade-009 | `#FF9900` | — (palette de référence, ton non équivalent) |
| Colors.Amber.Shade-010 | `#FFB95C` | — (palette de référence, ton non équivalent) |
| Colors.Amber.Shade-011 | `#FFCB85` | — (palette de référence, ton non équivalent) |
| Colors.Amber.Shade-012 | `#FFD39A` | — (palette de référence, ton non équivalent) |
| Colors.Amber.Shade-013 | `#FFE0B2` | — (palette de référence, ton non équivalent) |
| Colors.Amber.Shade-014 | `#FFE2B8` | — (palette de référence, ton non équivalent) |

## semantics/dark-high-contrast.tokens.json

| Variable | Valeur | Valeur résolue | Équivalent MD3 |
|---|---|---|---|
| Colors.Schemes.Primary | `{Colors.Olive.Shade-019}` | `#D8EB9A` | `--md-sys-color-primary` |
| Colors.Schemes.Surface Tint | `{Colors.Olive.Shade-020}` | `#E6F8A6` | `--md-sys-color-surface-tint` |
| Colors.Schemes.On Primary | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-primary` |
| Colors.Schemes.Primary Container | `{Colors.Olive.Shade-013}` | `#A2B653` | `--md-sys-color-primary-container` |
| Colors.Schemes.On Primary Container | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-primary-container` |
| Colors.Schemes.Secondary | `{Colors.Sage.Shade-014}` | `#D9DFBC` | `--md-sys-color-secondary` |
| Colors.Schemes.On Secondary | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-secondary` |
| Colors.Schemes.Secondary Container | `{Colors.Sage.Shade-010}` | `#A6AF84` | `--md-sys-color-secondary-container` |
| Colors.Schemes.On Secondary Container | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-secondary-container` |
| Colors.Schemes.Tertiary | `{Colors.Mint.Shade-015}` | `#AFF2C4` | `--md-sys-color-tertiary` |
| Colors.Schemes.On Tertiary | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-tertiary` |
| Colors.Schemes.Tertiary Container | `{Colors.Mint.Shade-010}` | `#72C891` | `--md-sys-color-tertiary-container` |
| Colors.Schemes.On Tertiary Container | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-tertiary-container` |
| Colors.Schemes.Error | `{Colors.Red.Shade-014}` | `#FFDAD6` | `--md-sys-color-error` |
| Colors.Schemes.On Error | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-error` |
| Colors.Schemes.Error Container | `{Colors.Red.Shade-010}` | `#FF9E96` | `--md-sys-color-error-container` |
| Colors.Schemes.On Error Container | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-error-container` |
| Colors.Schemes.Background | `{Colors.Neutral Variant.Shade-006}` | `#13140F` | `--md-sys-color-background` |
| Colors.Schemes.On Background | `{Colors.Neutral.Shade-035}` | `#FFFFFF` | `--md-sys-color-on-background` |
| Colors.Schemes.Surface | `{Colors.Neutral Variant.Shade-003}` | `#0D0E0C` | `--md-sys-color-surface` |
| Colors.Schemes.On Surface | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | `--md-sys-color-on-surface` |
| Colors.Schemes.Surface Variant | `{Colors.Neutral Variant.Shade-026}` | `#46483F` | `--md-sys-color-surface-variant` |
| Colors.Schemes.On Surface Variant | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | `--md-sys-color-on-surface-variant` |
| Colors.Schemes.Outline | `{Colors.Neutral Variant.Shade-040}` | `#D2D3CB` | `--md-sys-color-outline` |
| Colors.Schemes.Outline Variant | `{Colors.Neutral Variant.Shade-035}` | `#A2A49B` | `--md-sys-color-outline-variant` |
| Colors.Schemes.Shadow | `{Colors.Neutral.Shade-001}` | `#000000` | `--md-sys-color-shadow` |
| Colors.Schemes.Scrim | `{Colors.Neutral.Shade-001}` | `#000000` | `--md-sys-color-scrim` |
| Colors.Schemes.Inverse Surface | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | `--md-sys-color-inverse-surface` |
| Colors.Schemes.Inverse On Surface | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-inverse-on-surface` |
| Colors.Schemes.Inverse Primary | `{Colors.Olive.Shade-007}` | `#465900` | `--md-sys-color-inverse-primary` |
| Colors.Schemes.Primary Fixed | `{Colors.Olive.Shade-019}` | `#D8EB9A` | `--md-sys-color-primary-fixed` |
| Colors.Schemes.On Primary Fixed | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-primary-fixed` |
| Colors.Schemes.Primary Fixed Dim | `{Colors.Olive.Shade-016}` | `#BCD078` | `--md-sys-color-primary-fixed-dim` |
| Colors.Schemes.On Primary Fixed Variant | `{Colors.Olive.Shade-003}` | `#263000` | `--md-sys-color-on-primary-fixed-variant` |
| Colors.Schemes.Secondary Fixed | `{Colors.Sage.Shade-014}` | `#D9DFBC` | `--md-sys-color-secondary-fixed` |
| Colors.Schemes.On Secondary Fixed | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-secondary-fixed` |
| Colors.Schemes.Secondary Fixed Dim | `{Colors.Sage.Shade-011}` | `#BDC59A` | `--md-sys-color-secondary-fixed-dim` |
| Colors.Schemes.On Secondary Fixed Variant | `{Colors.Sage.Shade-001}` | `#252A14` | `--md-sys-color-on-secondary-fixed-variant` |
| Colors.Schemes.Tertiary Fixed | `{Colors.Mint.Shade-015}` | `#AFF2C4` | `--md-sys-color-tertiary-fixed` |
| Colors.Schemes.On Tertiary Fixed | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-tertiary-fixed` |
| Colors.Schemes.Tertiary Fixed Dim | `{Colors.Mint.Shade-011}` | `#8BD7A8` | `--md-sys-color-tertiary-fixed-dim` |
| Colors.Schemes.On Tertiary Fixed Variant | `{Colors.Mint.Shade-001}` | `#003820` | `--md-sys-color-on-tertiary-fixed-variant` |
| Colors.Schemes.Surface Dim | `{Colors.Neutral Variant.Shade-003}` | `#0D0E0C` | `--md-sys-color-surface-dim` |
| Colors.Schemes.Surface Bright | `{Colors.Neutral Variant.Shade-025}` | `#41423E` | `--md-sys-color-surface-bright` |
| Colors.Schemes.Surface Container Lowest | `{Colors.Neutral Variant.Shade-001}` | `#080907` | `--md-sys-color-surface-container-lowest` |
| Colors.Schemes.Surface Container Low | `{Colors.Neutral Variant.Shade-007}` | `#151613` | `--md-sys-color-surface-container-low` |
| Colors.Schemes.Surface Container | `{Colors.Neutral Variant.Shade-010}` | `#1B1C19` | `--md-sys-color-surface-container` |
| Colors.Schemes.Surface Container High | `{Colors.Neutral Variant.Shade-014}` | `#272824` | `--md-sys-color-surface-container-high` |
| Colors.Schemes.Surface Container Highest | `{Colors.Neutral Variant.Shade-020}` | `#343531` | `--md-sys-color-surface-container-highest` |
| Colors.Schemes.Success | `{Colors.Green.Shade-013}` | `#DDF3C4` | — (extension hors MD3) |
| Colors.Schemes.Info | `{Colors.Blue.Shade-014}` | `#D9E2FF` | — (extension hors MD3) |
| Colors.Schemes.Warning | `{Colors.Amber.Shade-013}` | `#FFE0B2` | — (extension hors MD3) |
| Colors.Schemes.On Warning | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | — (extension hors MD3) |
| Colors.Schemes.On Success | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | — (extension hors MD3) |
| Colors.Schemes.On Info | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | — (extension hors MD3) |
| Colors.Schemes.Warning Container | `{Colors.Amber.Shade-010}` | `#FFB95C` | — (extension hors MD3) |
| Colors.Schemes.On Warning Container | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | — (extension hors MD3) |
| Colors.Schemes.Success Container | `{Colors.Green.Shade-010}` | `#A5D66A` | — (extension hors MD3) |
| Colors.Schemes.On Success Container | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | — (extension hors MD3) |
| Colors.Schemes.Info Container | `{Colors.Blue.Shade-010}` | `#9EBBFF` | — (extension hors MD3) |
| Colors.Schemes.On Info Container | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | — (extension hors MD3) |
| Colors.Schemes.Neutral.0 | `{Colors.Neutral.Shade-035}` | `#FFFFFF` | — |
| Colors.Schemes.Neutral.900 | `{Colors.Neutral.Shade-005}` | `#1A1A1A` | — |
| Colors.State Layers.Primary.Opacity-08 | `{Colors.Schemes.Primary}` | `#D8EB9A` | `--md-sys-color-primary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Primary.Opacity-10 | `{Colors.Schemes.Primary}` | `#D8EB9A` | `--md-sys-color-primary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Primary.Opacity-16 | `{Colors.Schemes.Primary}` | `#D8EB9A` | `--md-sys-color-primary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Primary.Opacity-08 | `{Colors.Schemes.On Primary}` | `#1A1A1A` | `--md-sys-color-on-primary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Primary.Opacity-10 | `{Colors.Schemes.On Primary}` | `#1A1A1A` | `--md-sys-color-on-primary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Primary.Opacity-16 | `{Colors.Schemes.On Primary}` | `#1A1A1A` | `--md-sys-color-on-primary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Primary Container.Opacity-08 | `{Colors.Schemes.Primary Container}` | `#A2B653` | `--md-sys-color-primary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Primary Container.Opacity-10 | `{Colors.Schemes.Primary Container}` | `#A2B653` | `--md-sys-color-primary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Primary Container.Opacity-16 | `{Colors.Schemes.Primary Container}` | `#A2B653` | `--md-sys-color-primary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Primary Container.Opacity-08 | `{Colors.Schemes.On Primary Container}` | `#1A1A1A` | `--md-sys-color-on-primary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Primary Container.Opacity-10 | `{Colors.Schemes.On Primary Container}` | `#1A1A1A` | `--md-sys-color-on-primary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Primary Container.Opacity-16 | `{Colors.Schemes.On Primary Container}` | `#1A1A1A` | `--md-sys-color-on-primary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Primary Fixed.Opacity-08 | `{Colors.Schemes.Primary Fixed}` | `#D8EB9A` | `--md-sys-color-primary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Primary Fixed.Opacity-10 | `{Colors.Schemes.Primary Fixed}` | `#D8EB9A` | `--md-sys-color-primary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Primary Fixed.Opacity-16 | `{Colors.Schemes.Primary Fixed}` | `#D8EB9A` | `--md-sys-color-primary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Primary Fixed.Opacity-08 | `{Colors.Schemes.On Primary Fixed}` | `#1A1A1A` | `--md-sys-color-on-primary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Primary Fixed.Opacity-10 | `{Colors.Schemes.On Primary Fixed}` | `#1A1A1A` | `--md-sys-color-on-primary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Primary Fixed.Opacity-16 | `{Colors.Schemes.On Primary Fixed}` | `#1A1A1A` | `--md-sys-color-on-primary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Primary Fixed Dim.Opacity-08 | `{Colors.Schemes.Primary Fixed Dim}` | `#BCD078` | `--md-sys-color-primary-fixed-dim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Primary Fixed Dim.Opacity-10 | `{Colors.Schemes.Primary Fixed Dim}` | `#BCD078` | `--md-sys-color-primary-fixed-dim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Primary Fixed Dim.Opacity-16 | `{Colors.Schemes.Primary Fixed Dim}` | `#BCD078` | `--md-sys-color-primary-fixed-dim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Primary Fixed Variant.Opacity-08 | `{Colors.Schemes.On Primary Fixed Variant}` | `#263000` | `--md-sys-color-on-primary-fixed-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Primary Fixed Variant.Opacity-10 | `{Colors.Schemes.On Primary Fixed Variant}` | `#263000` | `--md-sys-color-on-primary-fixed-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Primary Fixed Variant.Opacity-16 | `{Colors.Schemes.On Primary Fixed Variant}` | `#263000` | `--md-sys-color-on-primary-fixed-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Secondary.Opacity-08 | `{Colors.Schemes.Secondary}` | `#D9DFBC` | `--md-sys-color-secondary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Secondary.Opacity-10 | `{Colors.Schemes.Secondary}` | `#D9DFBC` | `--md-sys-color-secondary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Secondary.Opacity-16 | `{Colors.Schemes.Secondary}` | `#D9DFBC` | `--md-sys-color-secondary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Secondary.Opacity-08 | `{Colors.Schemes.On Secondary}` | `#1A1A1A` | `--md-sys-color-on-secondary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Secondary.Opacity-10 | `{Colors.Schemes.On Secondary}` | `#1A1A1A` | `--md-sys-color-on-secondary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Secondary.Opacity-16 | `{Colors.Schemes.On Secondary}` | `#1A1A1A` | `--md-sys-color-on-secondary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Secondary Container.Opacity-08 | `{Colors.Schemes.Secondary Container}` | `#A6AF84` | `--md-sys-color-secondary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Secondary Container.Opacity-10 | `{Colors.Schemes.Secondary Container}` | `#A6AF84` | `--md-sys-color-secondary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Secondary Container.Opacity-16 | `{Colors.Schemes.Secondary Container}` | `#A6AF84` | `--md-sys-color-secondary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Secondary Container.Opacity-08 | `{Colors.Schemes.On Secondary Container}` | `#1A1A1A` | `--md-sys-color-on-secondary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Secondary Container.Opacity-10 | `{Colors.Schemes.On Secondary Container}` | `#1A1A1A` | `--md-sys-color-on-secondary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Secondary Container.Opacity-16 | `{Colors.Schemes.On Secondary Container}` | `#1A1A1A` | `--md-sys-color-on-secondary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Secondary Fixed.Opacity-08 | `{Colors.Schemes.Secondary Fixed}` | `#D9DFBC` | `--md-sys-color-secondary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Secondary Fixed.Opacity-10 | `{Colors.Schemes.Secondary Fixed}` | `#D9DFBC` | `--md-sys-color-secondary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Secondary Fixed.Opacity-16 | `{Colors.Schemes.Secondary Fixed}` | `#D9DFBC` | `--md-sys-color-secondary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Secondary Fixed.Opacity-08 | `{Colors.Schemes.On Secondary Fixed}` | `#1A1A1A` | `--md-sys-color-on-secondary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Secondary Fixed.Opacity-10 | `{Colors.Schemes.On Secondary Fixed}` | `#1A1A1A` | `--md-sys-color-on-secondary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Secondary Fixed.Opacity-16 | `{Colors.Schemes.On Secondary Fixed}` | `#1A1A1A` | `--md-sys-color-on-secondary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Secondary Fixed Dim.Opacity-08 | `{Colors.Schemes.Secondary Fixed Dim}` | `#BDC59A` | `--md-sys-color-secondary-fixed-dim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Secondary Fixed Dim.Opacity-10 | `{Colors.Schemes.Secondary Fixed Dim}` | `#BDC59A` | `--md-sys-color-secondary-fixed-dim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Secondary Fixed Dim.Opacity-16 | `{Colors.Schemes.Secondary Fixed Dim}` | `#BDC59A` | `--md-sys-color-secondary-fixed-dim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Secondary Fixed Variant.Opacity-08 | `{Colors.Schemes.On Secondary Fixed Variant}` | `#252A14` | `--md-sys-color-on-secondary-fixed-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Secondary Fixed Variant.Opacity-10 | `{Colors.Schemes.On Secondary Fixed Variant}` | `#252A14` | `--md-sys-color-on-secondary-fixed-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Secondary Fixed Variant.Opacity-16 | `{Colors.Schemes.On Secondary Fixed Variant}` | `#252A14` | `--md-sys-color-on-secondary-fixed-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Tertiary.Opacity-08 | `{Colors.Schemes.Tertiary}` | `#AFF2C4` | `--md-sys-color-tertiary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Tertiary.Opacity-10 | `{Colors.Schemes.Tertiary}` | `#AFF2C4` | `--md-sys-color-tertiary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Tertiary.Opacity-16 | `{Colors.Schemes.Tertiary}` | `#AFF2C4` | `--md-sys-color-tertiary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Tertiary.Opacity-08 | `{Colors.Schemes.On Tertiary}` | `#1A1A1A` | `--md-sys-color-on-tertiary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Tertiary.Opacity-10 | `{Colors.Schemes.On Tertiary}` | `#1A1A1A` | `--md-sys-color-on-tertiary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Tertiary.Opacity-16 | `{Colors.Schemes.On Tertiary}` | `#1A1A1A` | `--md-sys-color-on-tertiary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Tertiary Container.Opacity-08 | `{Colors.Schemes.Tertiary Container}` | `#72C891` | `--md-sys-color-tertiary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Tertiary Container.Opacity-10 | `{Colors.Schemes.Tertiary Container}` | `#72C891` | `--md-sys-color-tertiary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Tertiary Container.Opacity-16 | `{Colors.Schemes.Tertiary Container}` | `#72C891` | `--md-sys-color-tertiary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Tertiary Container.Opacity-08 | `{Colors.Schemes.On Tertiary Container}` | `#1A1A1A` | `--md-sys-color-on-tertiary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Tertiary Container.Opacity-10 | `{Colors.Schemes.On Tertiary Container}` | `#1A1A1A` | `--md-sys-color-on-tertiary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Tertiary Container.Opacity-16 | `{Colors.Schemes.On Tertiary Container}` | `#1A1A1A` | `--md-sys-color-on-tertiary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Tertiary Fixed.Opacity-08 | `{Colors.Schemes.Tertiary Fixed}` | `#AFF2C4` | `--md-sys-color-tertiary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Tertiary Fixed.Opacity-10 | `{Colors.Schemes.Tertiary Fixed}` | `#AFF2C4` | `--md-sys-color-tertiary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Tertiary Fixed.Opacity-16 | `{Colors.Schemes.Tertiary Fixed}` | `#AFF2C4` | `--md-sys-color-tertiary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Tertiary Fixed.Opacity-08 | `{Colors.Schemes.On Tertiary Fixed}` | `#1A1A1A` | `--md-sys-color-on-tertiary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Tertiary Fixed.Opacity-10 | `{Colors.Schemes.On Tertiary Fixed}` | `#1A1A1A` | `--md-sys-color-on-tertiary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Tertiary Fixed.Opacity-16 | `{Colors.Schemes.On Tertiary Fixed}` | `#1A1A1A` | `--md-sys-color-on-tertiary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Tertiary Fixed Dim.Opacity-08 | `{Colors.Schemes.Tertiary Fixed Dim}` | `#8BD7A8` | `--md-sys-color-tertiary-fixed-dim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Tertiary Fixed Dim.Opacity-10 | `{Colors.Schemes.Tertiary Fixed Dim}` | `#8BD7A8` | `--md-sys-color-tertiary-fixed-dim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Tertiary Fixed Dim.Opacity-16 | `{Colors.Schemes.Tertiary Fixed Dim}` | `#8BD7A8` | `--md-sys-color-tertiary-fixed-dim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Tertiary Fixed Variant.Opacity-08 | `{Colors.Schemes.On Tertiary Fixed Variant}` | `#003820` | `--md-sys-color-on-tertiary-fixed-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Tertiary Fixed Variant.Opacity-10 | `{Colors.Schemes.On Tertiary Fixed Variant}` | `#003820` | `--md-sys-color-on-tertiary-fixed-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Tertiary Fixed Variant.Opacity-16 | `{Colors.Schemes.On Tertiary Fixed Variant}` | `#003820` | `--md-sys-color-on-tertiary-fixed-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Error.Opacity-08 | `{Colors.Schemes.Error}` | `#FFDAD6` | `--md-sys-color-error` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Error.Opacity-10 | `{Colors.Schemes.Error}` | `#FFDAD6` | `--md-sys-color-error` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Error.Opacity-16 | `{Colors.Schemes.Error}` | `#FFDAD6` | `--md-sys-color-error` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Error.Opacity-08 | `{Colors.Schemes.On Error}` | `#1A1A1A` | `--md-sys-color-on-error` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Error.Opacity-10 | `{Colors.Schemes.On Error}` | `#1A1A1A` | `--md-sys-color-on-error` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Error.Opacity-16 | `{Colors.Schemes.On Error}` | `#1A1A1A` | `--md-sys-color-on-error` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Error Container.Opacity-08 | `{Colors.Schemes.Error Container}` | `#FF9E96` | `--md-sys-color-error-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Error Container.Opacity-10 | `{Colors.Schemes.Error Container}` | `#FF9E96` | `--md-sys-color-error-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Error Container.Opacity-16 | `{Colors.Schemes.Error Container}` | `#FF9E96` | `--md-sys-color-error-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Error Container.Opacity-08 | `{Colors.Schemes.On Error Container}` | `#1A1A1A` | `--md-sys-color-on-error-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Error Container.Opacity-10 | `{Colors.Schemes.On Error Container}` | `#1A1A1A` | `--md-sys-color-on-error-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Error Container.Opacity-16 | `{Colors.Schemes.On Error Container}` | `#1A1A1A` | `--md-sys-color-on-error-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Outline.Opacity-08 | `{Colors.Schemes.Outline}` | `#D2D3CB` | `--md-sys-color-outline` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Outline.Opacity-10 | `{Colors.Schemes.Outline}` | `#D2D3CB` | `--md-sys-color-outline` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Outline.Opacity-16 | `{Colors.Schemes.Outline}` | `#D2D3CB` | `--md-sys-color-outline` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Background.Opacity-08 | `{Colors.Schemes.Background}` | `#13140F` | `--md-sys-color-background` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Background.Opacity-10 | `{Colors.Schemes.Background}` | `#13140F` | `--md-sys-color-background` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Background.Opacity-16 | `{Colors.Schemes.Background}` | `#13140F` | `--md-sys-color-background` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Background.Opacity-08 | `{Colors.Schemes.On Background}` | `#FFFFFF` | `--md-sys-color-on-background` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Background.Opacity-10 | `{Colors.Schemes.On Background}` | `#FFFFFF` | `--md-sys-color-on-background` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Background.Opacity-16 | `{Colors.Schemes.On Background}` | `#FFFFFF` | `--md-sys-color-on-background` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface.Opacity-08 | `{Colors.Schemes.Surface}` | `#0D0E0C` | `--md-sys-color-surface` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface.Opacity-10 | `{Colors.Schemes.Surface}` | `#0D0E0C` | `--md-sys-color-surface` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface.Opacity-16 | `{Colors.Schemes.Surface}` | `#0D0E0C` | `--md-sys-color-surface` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Surface.Opacity-08 | `{Colors.Schemes.On Surface}` | `#FFFFFF` | `--md-sys-color-on-surface` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Surface.Opacity-10 | `{Colors.Schemes.On Surface}` | `#FFFFFF` | `--md-sys-color-on-surface` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Surface.Opacity-16 | `{Colors.Schemes.On Surface}` | `#FFFFFF` | `--md-sys-color-on-surface` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Variant.Opacity-08 | `{Colors.Schemes.Surface Variant}` | `#46483F` | `--md-sys-color-surface-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Variant.Opacity-10 | `{Colors.Schemes.Surface Variant}` | `#46483F` | `--md-sys-color-surface-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Variant.Opacity-16 | `{Colors.Schemes.Surface Variant}` | `#46483F` | `--md-sys-color-surface-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Surface Variant.Opacity-08 | `{Colors.Schemes.On Surface Variant}` | `#FFFFFF` | `--md-sys-color-on-surface-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Surface Variant.Opacity-10 | `{Colors.Schemes.On Surface Variant}` | `#FFFFFF` | `--md-sys-color-on-surface-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Surface Variant.Opacity-16 | `{Colors.Schemes.On Surface Variant}` | `#FFFFFF` | `--md-sys-color-on-surface-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Inverse Surface.Opacity-08 | `{Colors.Schemes.Inverse Surface}` | `#FFFFFF` | `--md-sys-color-inverse-surface` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Inverse Surface.Opacity-10 | `{Colors.Schemes.Inverse Surface}` | `#FFFFFF` | `--md-sys-color-inverse-surface` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Inverse Surface.Opacity-16 | `{Colors.Schemes.Inverse Surface}` | `#FFFFFF` | `--md-sys-color-inverse-surface` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Inverse On Surface.Opacity-08 | `{Colors.Schemes.Inverse On Surface}` | `#1A1A1A` | `--md-sys-color-inverse-on-surface` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Inverse On Surface.Opacity-10 | `{Colors.Schemes.Inverse On Surface}` | `#1A1A1A` | `--md-sys-color-inverse-on-surface` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Inverse On Surface.Opacity-16 | `{Colors.Schemes.Inverse On Surface}` | `#1A1A1A` | `--md-sys-color-inverse-on-surface` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Inverse Primary.Opacity-08 | `{Colors.Schemes.Inverse Primary}` | `#465900` | `--md-sys-color-inverse-primary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Inverse Primary.Opacity-10 | `{Colors.Schemes.Inverse Primary}` | `#465900` | `--md-sys-color-inverse-primary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Inverse Primary.Opacity-16 | `{Colors.Schemes.Inverse Primary}` | `#465900` | `--md-sys-color-inverse-primary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Shadow.Opacity-08 | `{Colors.Schemes.Shadow}` | `#000000` | `--md-sys-color-shadow` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Shadow.Opacity-10 | `{Colors.Schemes.Shadow}` | `#000000` | `--md-sys-color-shadow` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Shadow.Opacity-16 | `{Colors.Schemes.Shadow}` | `#000000` | `--md-sys-color-shadow` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Tint.Opacity-08 | `{Colors.Schemes.Surface Tint}` | `#E6F8A6` | `--md-sys-color-surface-tint` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Tint.Opacity-10 | `{Colors.Schemes.Surface Tint}` | `#E6F8A6` | `--md-sys-color-surface-tint` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Tint.Opacity-16 | `{Colors.Schemes.Surface Tint}` | `#E6F8A6` | `--md-sys-color-surface-tint` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Outline Variant.Opacity-08 | `{Colors.Schemes.Outline Variant}` | `#A2A49B` | `--md-sys-color-outline-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Outline Variant.Opacity-10 | `{Colors.Schemes.Outline Variant}` | `#A2A49B` | `--md-sys-color-outline-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Outline Variant.Opacity-16 | `{Colors.Schemes.Outline Variant}` | `#A2A49B` | `--md-sys-color-outline-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Scrim.Opacity-08 | `{Colors.Schemes.Scrim}` | `#000000` | `--md-sys-color-scrim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Scrim.Opacity-10 | `{Colors.Schemes.Scrim}` | `#000000` | `--md-sys-color-scrim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Scrim.Opacity-16 | `{Colors.Schemes.Scrim}` | `#000000` | `--md-sys-color-scrim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container Highest.Opacity-08 | `{Colors.Schemes.Surface Container Highest}` | `#343531` | `--md-sys-color-surface-container-highest` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container Highest.Opacity-10 | `{Colors.Schemes.Surface Container Highest}` | `#343531` | `--md-sys-color-surface-container-highest` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container Highest.Opacity-16 | `{Colors.Schemes.Surface Container Highest}` | `#343531` | `--md-sys-color-surface-container-highest` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container High.Opacity-08 | `{Colors.Schemes.Surface Container High}` | `#272824` | `--md-sys-color-surface-container-high` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container High.Opacity-10 | `{Colors.Schemes.Surface Container High}` | `#272824` | `--md-sys-color-surface-container-high` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container High.Opacity-16 | `{Colors.Schemes.Surface Container High}` | `#272824` | `--md-sys-color-surface-container-high` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container.Opacity-08 | `{Colors.Schemes.Surface Container}` | `#1B1C19` | `--md-sys-color-surface-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container.Opacity-10 | `{Colors.Schemes.Surface Container}` | `#1B1C19` | `--md-sys-color-surface-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container.Opacity-16 | `{Colors.Schemes.Surface Container}` | `#1B1C19` | `--md-sys-color-surface-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container Low.Opacity-08 | `{Colors.Schemes.Surface Container Low}` | `#151613` | `--md-sys-color-surface-container-low` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container Low.Opacity-10 | `{Colors.Schemes.Surface Container Low}` | `#151613` | `--md-sys-color-surface-container-low` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container Low.Opacity-16 | `{Colors.Schemes.Surface Container Low}` | `#151613` | `--md-sys-color-surface-container-low` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container Lowest.Opacity-08 | `{Colors.Schemes.Surface Container Lowest}` | `#080907` | `--md-sys-color-surface-container-lowest` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container Lowest.Opacity-10 | `{Colors.Schemes.Surface Container Lowest}` | `#080907` | `--md-sys-color-surface-container-lowest` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container Lowest.Opacity-16 | `{Colors.Schemes.Surface Container Lowest}` | `#080907` | `--md-sys-color-surface-container-lowest` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Bright.Opacity-08 | `{Colors.Schemes.Surface Bright}` | `#41423E` | `--md-sys-color-surface-bright` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Bright.Opacity-10 | `{Colors.Schemes.Surface Bright}` | `#41423E` | `--md-sys-color-surface-bright` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Bright.Opacity-16 | `{Colors.Schemes.Surface Bright}` | `#41423E` | `--md-sys-color-surface-bright` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Dim.Opacity-08 | `{Colors.Schemes.Surface Dim}` | `#0D0E0C` | `--md-sys-color-surface-dim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Dim.Opacity-10 | `{Colors.Schemes.Surface Dim}` | `#0D0E0C` | `--md-sys-color-surface-dim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Dim.Opacity-16 | `{Colors.Schemes.Surface Dim}` | `#0D0E0C` | `--md-sys-color-surface-dim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.Add-ons.Section background | `{Colors.Neutral.Shade-001}` | `#000000` | — (extension hors MD3) |
| Typescale.Static.Display Large.Size | `57px` | `57px` | `--md-sys-typescale-display-large-size` |
| Typescale.Static.Display Large.Tracking | `-0.25px` | `-0.25px` | `--md-sys-typescale-display-large-tracking` |
| Typescale.Static.Display Large.Line Height | `64px` | `64px` | `--md-sys-typescale-display-large-line-height` |
| Typescale.Static.Display Large.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-display-large-font` |
| Typescale.Static.Display Large.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-display-large-weight` |
| Typescale.Static.Display Large.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-display-large-weight` (MD3 Expressive) |
| Typescale.Static.Display Medium.Size | `45px` | `45px` | `--md-sys-typescale-display-medium-size` |
| Typescale.Static.Display Medium.Line Height | `52px` | `52px` | `--md-sys-typescale-display-medium-line-height` |
| Typescale.Static.Display Medium.Tracking | `0px` | `0px` | `--md-sys-typescale-display-medium-tracking` |
| Typescale.Static.Display Medium.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-display-medium-font` |
| Typescale.Static.Display Medium.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-display-medium-weight` |
| Typescale.Static.Display Medium.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-display-medium-weight` (MD3 Expressive) |
| Typescale.Static.Display Small.Size | `36px` | `36px` | `--md-sys-typescale-display-small-size` |
| Typescale.Static.Display Small.Tracking | `0px` | `0px` | `--md-sys-typescale-display-small-tracking` |
| Typescale.Static.Display Small.Line Height | `44px` | `44px` | `--md-sys-typescale-display-small-line-height` |
| Typescale.Static.Display Small.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-display-small-font` |
| Typescale.Static.Display Small.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-display-small-weight` |
| Typescale.Static.Display Small.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-display-small-weight` (MD3 Expressive) |
| Typescale.Static.Headline Large.Size | `32px` | `32px` | `--md-sys-typescale-headline-large-size` |
| Typescale.Static.Headline Large.Tracking | `0px` | `0px` | `--md-sys-typescale-headline-large-tracking` |
| Typescale.Static.Headline Large.Line Height | `40px` | `40px` | `--md-sys-typescale-headline-large-line-height` |
| Typescale.Static.Headline Large.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-headline-large-font` |
| Typescale.Static.Headline Large.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-headline-large-weight` |
| Typescale.Static.Headline Large.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-headline-large-weight` (MD3 Expressive) |
| Typescale.Static.Headline Medium.Size | `28px` | `28px` | `--md-sys-typescale-headline-medium-size` |
| Typescale.Static.Headline Medium.Tracking | `0px` | `0px` | `--md-sys-typescale-headline-medium-tracking` |
| Typescale.Static.Headline Medium.Line Height | `36px` | `36px` | `--md-sys-typescale-headline-medium-line-height` |
| Typescale.Static.Headline Medium.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-headline-medium-font` |
| Typescale.Static.Headline Medium.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-headline-medium-weight` |
| Typescale.Static.Headline Medium.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-headline-medium-weight` (MD3 Expressive) |
| Typescale.Static.Headline Small.Size | `24px` | `24px` | `--md-sys-typescale-headline-small-size` |
| Typescale.Static.Headline Small.Tracking | `0px` | `0px` | `--md-sys-typescale-headline-small-tracking` |
| Typescale.Static.Headline Small.Line Height | `32px` | `32px` | `--md-sys-typescale-headline-small-line-height` |
| Typescale.Static.Headline Small.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-headline-small-font` |
| Typescale.Static.Headline Small.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-headline-small-weight` |
| Typescale.Static.Headline Small.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-headline-small-weight` (MD3 Expressive) |
| Typescale.Static.Title Large.Size | `22px` | `22px` | `--md-sys-typescale-title-large-size` |
| Typescale.Static.Title Large.Tracking | `0px` | `0px` | `--md-sys-typescale-title-large-tracking` |
| Typescale.Static.Title Large.Line Height | `28px` | `28px` | `--md-sys-typescale-title-large-line-height` |
| Typescale.Static.Title Large.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-title-large-font` |
| Typescale.Static.Title Large.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-title-large-weight` |
| Typescale.Static.Title Large.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-title-large-weight` (MD3 Expressive) |
| Typescale.Static.Title Medium.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-title-medium-font` |
| Typescale.Static.Title Medium.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-title-medium-weight` |
| Typescale.Static.Title Medium.Size | `16px` | `16px` | `--md-sys-typescale-title-medium-size` |
| Typescale.Static.Title Medium.Tracking | `0.15000000596046448px` | `0.15000000596046448px` | `--md-sys-typescale-title-medium-tracking` |
| Typescale.Static.Title Medium.Line Height | `24px` | `24px` | `--md-sys-typescale-title-medium-line-height` |
| Typescale.Static.Title Medium.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-emphasized-title-medium-weight` (MD3 Expressive) |
| Typescale.Static.Title Small.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-title-small-font` |
| Typescale.Static.Title Small.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-title-small-weight` |
| Typescale.Static.Title Small.Size | `14px` | `14px` | `--md-sys-typescale-title-small-size` |
| Typescale.Static.Title Small.Tracking | `0.10000000149011612px` | `0.10000000149011612px` | `--md-sys-typescale-title-small-tracking` |
| Typescale.Static.Title Small.Line Height | `20px` | `20px` | `--md-sys-typescale-title-small-line-height` |
| Typescale.Static.Title Small.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-emphasized-title-small-weight` (MD3 Expressive) |
| Typescale.Static.Label Large.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-label-large-font` |
| Typescale.Static.Label Large.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-label-large-weight` |
| Typescale.Static.Label Large.Size | `14px` | `14px` | `--md-sys-typescale-label-large-size` |
| Typescale.Static.Label Large.Tracking | `0.10000000149011612px` | `0.10000000149011612px` | `--md-sys-typescale-label-large-tracking` |
| Typescale.Static.Label Large.Line Height | `20px` | `20px` | `--md-sys-typescale-label-large-line-height` |
| Typescale.Static.Label Large.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-label-large-weight-prominent` |
| Typescale.Static.Label Medium.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-label-medium-font` |
| Typescale.Static.Label Medium.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-label-medium-weight` |
| Typescale.Static.Label Medium.Size | `12px` | `12px` | `--md-sys-typescale-label-medium-size` |
| Typescale.Static.Label Medium.Tracking | `0.5px` | `0.5px` | `--md-sys-typescale-label-medium-tracking` |
| Typescale.Static.Label Medium.Line Height | `16px` | `16px` | `--md-sys-typescale-label-medium-line-height` |
| Typescale.Static.Label Medium.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-label-medium-weight-prominent` |
| Typescale.Static.Label Small.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-label-small-font` |
| Typescale.Static.Label Small.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-label-small-weight` |
| Typescale.Static.Label Small.Size | `11px` | `11px` | `--md-sys-typescale-label-small-size` |
| Typescale.Static.Label Small.Tracking | `0.5px` | `0.5px` | `--md-sys-typescale-label-small-tracking` |
| Typescale.Static.Label Small.Line Height | `16px` | `16px` | `--md-sys-typescale-label-small-line-height` |
| Typescale.Static.Label Small.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-emphasized-label-small-weight` (MD3 Expressive) |
| Typescale.Static.Body Large.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-body-large-font` |
| Typescale.Static.Body Large.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-body-large-weight` |
| Typescale.Static.Body Large.Size | `16px` | `16px` | `--md-sys-typescale-body-large-size` |
| Typescale.Static.Body Large.Tracking | `0.5px` | `0.5px` | `--md-sys-typescale-body-large-tracking` |
| Typescale.Static.Body Large.Line Height | `24px` | `24px` | `--md-sys-typescale-body-large-line-height` |
| Typescale.Static.Body Large.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-body-large-weight` (MD3 Expressive) |
| Typescale.Static.Body Medium.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-body-medium-font` |
| Typescale.Static.Body Medium.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-body-medium-weight` |
| Typescale.Static.Body Medium.Size | `14px` | `14px` | `--md-sys-typescale-body-medium-size` |
| Typescale.Static.Body Medium.Tracking | `0.25px` | `0.25px` | `--md-sys-typescale-body-medium-tracking` |
| Typescale.Static.Body Medium.Line Height | `20px` | `20px` | `--md-sys-typescale-body-medium-line-height` |
| Typescale.Static.Body Medium.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-body-medium-weight` (MD3 Expressive) |
| Typescale.Static.Body Small.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-body-small-font` |
| Typescale.Static.Body Small.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-body-small-weight` |
| Typescale.Static.Body Small.Size | `12px` | `12px` | `--md-sys-typescale-body-small-size` |
| Typescale.Static.Body Small.Tracking | `0.4000000059604645px` | `0.4000000059604645px` | `--md-sys-typescale-body-small-tracking` |
| Typescale.Static.Body Small.Line Height | `16px` | `16px` | `--md-sys-typescale-body-small-line-height` |
| Typescale.Static.Body Small.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-body-small-weight` (MD3 Expressive) |

## semantics/dark-medium-contrast.tokens.json

| Variable | Valeur | Valeur résolue | Équivalent MD3 |
|---|---|---|---|
| Colors.Schemes.Primary | `{Colors.Olive.Shade-017}` | `#CADF87` | `--md-sys-color-primary` |
| Colors.Schemes.Surface Tint | `{Colors.Olive.Shade-018}` | `#D2E594` | `--md-sys-color-surface-tint` |
| Colors.Schemes.On Primary | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-primary` |
| Colors.Schemes.Primary Container | `{Colors.Olive.Shade-009}` | `#53651B` | `--md-sys-color-primary-container` |
| Colors.Schemes.On Primary Container | `{Colors.Olive.Shade-021}` | `#F0FFC0` | `--md-sys-color-on-primary-container` |
| Colors.Schemes.Secondary | `{Colors.Sage.Shade-013}` | `#CBD3A8` | `--md-sys-color-secondary` |
| Colors.Schemes.On Secondary | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-secondary` |
| Colors.Schemes.Secondary Container | `{Colors.Sage.Shade-009}` | `#555D3D` | `--md-sys-color-secondary-container` |
| Colors.Schemes.On Secondary Container | `{Colors.Sage.Shade-015}` | `#EEF5CD` | `--md-sys-color-on-secondary-container` |
| Colors.Schemes.Tertiary | `{Colors.Mint.Shade-014}` | `#9BE7B6` | `--md-sys-color-tertiary` |
| Colors.Schemes.On Tertiary | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-tertiary` |
| Colors.Schemes.Tertiary Container | `{Colors.Mint.Shade-008}` | `#246C49` | `--md-sys-color-tertiary-container` |
| Colors.Schemes.On Tertiary Container | `{Colors.Mint.Shade-016}` | `#C9FFD9` | `--md-sys-color-on-tertiary-container` |
| Colors.Schemes.Error | `{Colors.Red.Shade-013}` | `#FFC4BE` | `--md-sys-color-error` |
| Colors.Schemes.On Error | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-error` |
| Colors.Schemes.Error Container | `{Colors.Red.Shade-007}` | `#A52620` | `--md-sys-color-error-container` |
| Colors.Schemes.On Error Container | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | `--md-sys-color-on-error-container` |
| Colors.Schemes.Background | `{Colors.Neutral Variant.Shade-006}` | `#13140F` | `--md-sys-color-background` |
| Colors.Schemes.On Background | `{Colors.Neutral Variant.Shade-048}` | `#E4E5DC` | `--md-sys-color-on-background` |
| Colors.Schemes.Surface | `{Colors.Neutral Variant.Shade-004}` | `#10110F` | `--md-sys-color-surface` |
| Colors.Schemes.On Surface | `{Colors.Neutral Variant.Shade-056}` | `#F1F0EB` | `--md-sys-color-on-surface` |
| Colors.Schemes.Surface Variant | `{Colors.Neutral Variant.Shade-026}` | `#46483F` | `--md-sys-color-surface-variant` |
| Colors.Schemes.On Surface Variant | `{Colors.Neutral Variant.Shade-042}` | `#D8D9D1` | `--md-sys-color-on-surface-variant` |
| Colors.Schemes.Outline | `{Colors.Neutral Variant.Shade-036}` | `#ACAEA5` | `--md-sys-color-outline` |
| Colors.Schemes.Outline Variant | `{Colors.Neutral Variant.Shade-031}` | `#777970` | `--md-sys-color-outline-variant` |
| Colors.Schemes.Shadow | `{Colors.Neutral.Shade-001}` | `#000000` | `--md-sys-color-shadow` |
| Colors.Schemes.Scrim | `{Colors.Neutral.Shade-001}` | `#000000` | `--md-sys-color-scrim` |
| Colors.Schemes.Inverse Surface | `{Colors.Neutral Variant.Shade-054}` | `#EEEDE8` | `--md-sys-color-inverse-surface` |
| Colors.Schemes.Inverse On Surface | `{Colors.Neutral Variant.Shade-013}` | `#252623` | `--md-sys-color-inverse-on-surface` |
| Colors.Schemes.Inverse Primary | `{Colors.Olive.Shade-010}` | `#536700` | `--md-sys-color-inverse-primary` |
| Colors.Schemes.Primary Fixed | `{Colors.Olive.Shade-019}` | `#D8EB9A` | `--md-sys-color-primary-fixed` |
| Colors.Schemes.On Primary Fixed | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-primary-fixed` |
| Colors.Schemes.Primary Fixed Dim | `{Colors.Olive.Shade-016}` | `#BCD078` | `--md-sys-color-primary-fixed-dim` |
| Colors.Schemes.On Primary Fixed Variant | `{Colors.Olive.Shade-003}` | `#263000` | `--md-sys-color-on-primary-fixed-variant` |
| Colors.Schemes.Secondary Fixed | `{Colors.Sage.Shade-014}` | `#D9DFBC` | `--md-sys-color-secondary-fixed` |
| Colors.Schemes.On Secondary Fixed | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-secondary-fixed` |
| Colors.Schemes.Secondary Fixed Dim | `{Colors.Sage.Shade-011}` | `#BDC59A` | `--md-sys-color-secondary-fixed-dim` |
| Colors.Schemes.On Secondary Fixed Variant | `{Colors.Sage.Shade-001}` | `#252A14` | `--md-sys-color-on-secondary-fixed-variant` |
| Colors.Schemes.Tertiary Fixed | `{Colors.Mint.Shade-015}` | `#AFF2C4` | `--md-sys-color-tertiary-fixed` |
| Colors.Schemes.On Tertiary Fixed | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-tertiary-fixed` |
| Colors.Schemes.Tertiary Fixed Dim | `{Colors.Mint.Shade-011}` | `#8BD7A8` | `--md-sys-color-tertiary-fixed-dim` |
| Colors.Schemes.On Tertiary Fixed Variant | `{Colors.Mint.Shade-001}` | `#003820` | `--md-sys-color-on-tertiary-fixed-variant` |
| Colors.Schemes.Surface Dim | `{Colors.Neutral Variant.Shade-004}` | `#10110F` | `--md-sys-color-surface-dim` |
| Colors.Schemes.Surface Bright | `{Colors.Neutral Variant.Shade-024}` | `#3D3E3A` | `--md-sys-color-surface-bright` |
| Colors.Schemes.Surface Container Lowest | `{Colors.Neutral Variant.Shade-002}` | `#0B0C0A` | `--md-sys-color-surface-container-lowest` |
| Colors.Schemes.Surface Container Low | `{Colors.Neutral Variant.Shade-008}` | `#181916` | `--md-sys-color-surface-container-low` |
| Colors.Schemes.Surface Container | `{Colors.Neutral Variant.Shade-011}` | `#1D1E1B` | `--md-sys-color-surface-container` |
| Colors.Schemes.Surface Container High | `{Colors.Neutral Variant.Shade-016}` | `#292A26` | `--md-sys-color-surface-container-high` |
| Colors.Schemes.Surface Container Highest | `{Colors.Neutral Variant.Shade-021}` | `#353632` | `--md-sys-color-surface-container-highest` |
| Colors.Schemes.Success | `{Colors.Green.Shade-011}` | `#B7E77E` | — (extension hors MD3) |
| Colors.Schemes.Info | `{Colors.Blue.Shade-012}` | `#BDD0FF` | — (extension hors MD3) |
| Colors.Schemes.Warning | `{Colors.Amber.Shade-011}` | `#FFCB85` | — (extension hors MD3) |
| Colors.Schemes.On Warning | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | — (extension hors MD3) |
| Colors.Schemes.On Success | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | — (extension hors MD3) |
| Colors.Schemes.On Info | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | — (extension hors MD3) |
| Colors.Schemes.Warning Container | `{Colors.Amber.Shade-006}` | `#7D4900` | — (extension hors MD3) |
| Colors.Schemes.On Warning Container | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | — (extension hors MD3) |
| Colors.Schemes.Success Container | `{Colors.Green.Shade-007}` | `#477A14` | — (extension hors MD3) |
| Colors.Schemes.On Success Container | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | — (extension hors MD3) |
| Colors.Schemes.Info Container | `{Colors.Blue.Shade-007}` | `#1558B7` | — (extension hors MD3) |
| Colors.Schemes.On Info Container | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | — (extension hors MD3) |
| Colors.Schemes.Neutral.0 | `{Colors.Neutral.Shade-035}` | `#FFFFFF` | — |
| Colors.Schemes.Neutral.900 | `{Colors.Neutral.Shade-005}` | `#1A1A1A` | — |
| Colors.State Layers.Primary.Opacity-08 | `{Colors.Schemes.Primary}` | `#CADF87` | `--md-sys-color-primary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Primary.Opacity-10 | `{Colors.Schemes.Primary}` | `#CADF87` | `--md-sys-color-primary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Primary.Opacity-16 | `{Colors.Schemes.Primary}` | `#CADF87` | `--md-sys-color-primary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Primary.Opacity-08 | `{Colors.Schemes.On Primary}` | `#1A1A1A` | `--md-sys-color-on-primary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Primary.Opacity-10 | `{Colors.Schemes.On Primary}` | `#1A1A1A` | `--md-sys-color-on-primary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Primary.Opacity-16 | `{Colors.Schemes.On Primary}` | `#1A1A1A` | `--md-sys-color-on-primary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Primary Container.Opacity-08 | `{Colors.Schemes.Primary Container}` | `#53651B` | `--md-sys-color-primary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Primary Container.Opacity-10 | `{Colors.Schemes.Primary Container}` | `#53651B` | `--md-sys-color-primary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Primary Container.Opacity-16 | `{Colors.Schemes.Primary Container}` | `#53651B` | `--md-sys-color-primary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Primary Container.Opacity-08 | `{Colors.Schemes.On Primary Container}` | `#F0FFC0` | `--md-sys-color-on-primary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Primary Container.Opacity-10 | `{Colors.Schemes.On Primary Container}` | `#F0FFC0` | `--md-sys-color-on-primary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Primary Container.Opacity-16 | `{Colors.Schemes.On Primary Container}` | `#F0FFC0` | `--md-sys-color-on-primary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Primary Fixed.Opacity-08 | `{Colors.Schemes.Primary Fixed}` | `#D8EB9A` | `--md-sys-color-primary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Primary Fixed.Opacity-10 | `{Colors.Schemes.Primary Fixed}` | `#D8EB9A` | `--md-sys-color-primary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Primary Fixed.Opacity-16 | `{Colors.Schemes.Primary Fixed}` | `#D8EB9A` | `--md-sys-color-primary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Primary Fixed.Opacity-08 | `{Colors.Schemes.On Primary Fixed}` | `#1A1A1A` | `--md-sys-color-on-primary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Primary Fixed.Opacity-10 | `{Colors.Schemes.On Primary Fixed}` | `#1A1A1A` | `--md-sys-color-on-primary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Primary Fixed.Opacity-16 | `{Colors.Schemes.On Primary Fixed}` | `#1A1A1A` | `--md-sys-color-on-primary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Primary Fixed Dim.Opacity-08 | `{Colors.Schemes.Primary Fixed Dim}` | `#BCD078` | `--md-sys-color-primary-fixed-dim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Primary Fixed Dim.Opacity-10 | `{Colors.Schemes.Primary Fixed Dim}` | `#BCD078` | `--md-sys-color-primary-fixed-dim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Primary Fixed Dim.Opacity-16 | `{Colors.Schemes.Primary Fixed Dim}` | `#BCD078` | `--md-sys-color-primary-fixed-dim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Primary Fixed Variant.Opacity-08 | `{Colors.Schemes.On Primary Fixed Variant}` | `#263000` | `--md-sys-color-on-primary-fixed-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Primary Fixed Variant.Opacity-10 | `{Colors.Schemes.On Primary Fixed Variant}` | `#263000` | `--md-sys-color-on-primary-fixed-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Primary Fixed Variant.Opacity-16 | `{Colors.Schemes.On Primary Fixed Variant}` | `#263000` | `--md-sys-color-on-primary-fixed-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Secondary.Opacity-08 | `{Colors.Schemes.Secondary}` | `#CBD3A8` | `--md-sys-color-secondary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Secondary.Opacity-10 | `{Colors.Schemes.Secondary}` | `#CBD3A8` | `--md-sys-color-secondary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Secondary.Opacity-16 | `{Colors.Schemes.Secondary}` | `#CBD3A8` | `--md-sys-color-secondary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Secondary.Opacity-08 | `{Colors.Schemes.On Secondary}` | `#1A1A1A` | `--md-sys-color-on-secondary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Secondary.Opacity-10 | `{Colors.Schemes.On Secondary}` | `#1A1A1A` | `--md-sys-color-on-secondary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Secondary.Opacity-16 | `{Colors.Schemes.On Secondary}` | `#1A1A1A` | `--md-sys-color-on-secondary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Secondary Container.Opacity-08 | `{Colors.Schemes.Secondary Container}` | `#555D3D` | `--md-sys-color-secondary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Secondary Container.Opacity-10 | `{Colors.Schemes.Secondary Container}` | `#555D3D` | `--md-sys-color-secondary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Secondary Container.Opacity-16 | `{Colors.Schemes.Secondary Container}` | `#555D3D` | `--md-sys-color-secondary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Secondary Container.Opacity-08 | `{Colors.Schemes.On Secondary Container}` | `#EEF5CD` | `--md-sys-color-on-secondary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Secondary Container.Opacity-10 | `{Colors.Schemes.On Secondary Container}` | `#EEF5CD` | `--md-sys-color-on-secondary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Secondary Container.Opacity-16 | `{Colors.Schemes.On Secondary Container}` | `#EEF5CD` | `--md-sys-color-on-secondary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Secondary Fixed.Opacity-08 | `{Colors.Schemes.Secondary Fixed}` | `#D9DFBC` | `--md-sys-color-secondary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Secondary Fixed.Opacity-10 | `{Colors.Schemes.Secondary Fixed}` | `#D9DFBC` | `--md-sys-color-secondary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Secondary Fixed.Opacity-16 | `{Colors.Schemes.Secondary Fixed}` | `#D9DFBC` | `--md-sys-color-secondary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Secondary Fixed.Opacity-08 | `{Colors.Schemes.On Secondary Fixed}` | `#1A1A1A` | `--md-sys-color-on-secondary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Secondary Fixed.Opacity-10 | `{Colors.Schemes.On Secondary Fixed}` | `#1A1A1A` | `--md-sys-color-on-secondary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Secondary Fixed.Opacity-16 | `{Colors.Schemes.On Secondary Fixed}` | `#1A1A1A` | `--md-sys-color-on-secondary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Secondary Fixed Dim.Opacity-08 | `{Colors.Schemes.Secondary Fixed Dim}` | `#BDC59A` | `--md-sys-color-secondary-fixed-dim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Secondary Fixed Dim.Opacity-10 | `{Colors.Schemes.Secondary Fixed Dim}` | `#BDC59A` | `--md-sys-color-secondary-fixed-dim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Secondary Fixed Dim.Opacity-16 | `{Colors.Schemes.Secondary Fixed Dim}` | `#BDC59A` | `--md-sys-color-secondary-fixed-dim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Secondary Fixed Variant.Opacity-08 | `{Colors.Schemes.On Secondary Fixed Variant}` | `#252A14` | `--md-sys-color-on-secondary-fixed-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Secondary Fixed Variant.Opacity-10 | `{Colors.Schemes.On Secondary Fixed Variant}` | `#252A14` | `--md-sys-color-on-secondary-fixed-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Secondary Fixed Variant.Opacity-16 | `{Colors.Schemes.On Secondary Fixed Variant}` | `#252A14` | `--md-sys-color-on-secondary-fixed-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Tertiary.Opacity-08 | `{Colors.Schemes.Tertiary}` | `#9BE7B6` | `--md-sys-color-tertiary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Tertiary.Opacity-10 | `{Colors.Schemes.Tertiary}` | `#9BE7B6` | `--md-sys-color-tertiary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Tertiary.Opacity-16 | `{Colors.Schemes.Tertiary}` | `#9BE7B6` | `--md-sys-color-tertiary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Tertiary.Opacity-08 | `{Colors.Schemes.On Tertiary}` | `#1A1A1A` | `--md-sys-color-on-tertiary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Tertiary.Opacity-10 | `{Colors.Schemes.On Tertiary}` | `#1A1A1A` | `--md-sys-color-on-tertiary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Tertiary.Opacity-16 | `{Colors.Schemes.On Tertiary}` | `#1A1A1A` | `--md-sys-color-on-tertiary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Tertiary Container.Opacity-08 | `{Colors.Schemes.Tertiary Container}` | `#246C49` | `--md-sys-color-tertiary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Tertiary Container.Opacity-10 | `{Colors.Schemes.Tertiary Container}` | `#246C49` | `--md-sys-color-tertiary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Tertiary Container.Opacity-16 | `{Colors.Schemes.Tertiary Container}` | `#246C49` | `--md-sys-color-tertiary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Tertiary Container.Opacity-08 | `{Colors.Schemes.On Tertiary Container}` | `#C9FFD9` | `--md-sys-color-on-tertiary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Tertiary Container.Opacity-10 | `{Colors.Schemes.On Tertiary Container}` | `#C9FFD9` | `--md-sys-color-on-tertiary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Tertiary Container.Opacity-16 | `{Colors.Schemes.On Tertiary Container}` | `#C9FFD9` | `--md-sys-color-on-tertiary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Tertiary Fixed.Opacity-08 | `{Colors.Schemes.Tertiary Fixed}` | `#AFF2C4` | `--md-sys-color-tertiary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Tertiary Fixed.Opacity-10 | `{Colors.Schemes.Tertiary Fixed}` | `#AFF2C4` | `--md-sys-color-tertiary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Tertiary Fixed.Opacity-16 | `{Colors.Schemes.Tertiary Fixed}` | `#AFF2C4` | `--md-sys-color-tertiary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Tertiary Fixed.Opacity-08 | `{Colors.Schemes.On Tertiary Fixed}` | `#1A1A1A` | `--md-sys-color-on-tertiary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Tertiary Fixed.Opacity-10 | `{Colors.Schemes.On Tertiary Fixed}` | `#1A1A1A` | `--md-sys-color-on-tertiary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Tertiary Fixed.Opacity-16 | `{Colors.Schemes.On Tertiary Fixed}` | `#1A1A1A` | `--md-sys-color-on-tertiary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Tertiary Fixed Dim.Opacity-08 | `{Colors.Schemes.Tertiary Fixed Dim}` | `#8BD7A8` | `--md-sys-color-tertiary-fixed-dim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Tertiary Fixed Dim.Opacity-10 | `{Colors.Schemes.Tertiary Fixed Dim}` | `#8BD7A8` | `--md-sys-color-tertiary-fixed-dim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Tertiary Fixed Dim.Opacity-16 | `{Colors.Schemes.Tertiary Fixed Dim}` | `#8BD7A8` | `--md-sys-color-tertiary-fixed-dim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Tertiary Fixed Variant.Opacity-08 | `{Colors.Schemes.On Tertiary Fixed Variant}` | `#003820` | `--md-sys-color-on-tertiary-fixed-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Tertiary Fixed Variant.Opacity-10 | `{Colors.Schemes.On Tertiary Fixed Variant}` | `#003820` | `--md-sys-color-on-tertiary-fixed-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Tertiary Fixed Variant.Opacity-16 | `{Colors.Schemes.On Tertiary Fixed Variant}` | `#003820` | `--md-sys-color-on-tertiary-fixed-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Error.Opacity-08 | `{Colors.Schemes.Error}` | `#FFC4BE` | `--md-sys-color-error` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Error.Opacity-10 | `{Colors.Schemes.Error}` | `#FFC4BE` | `--md-sys-color-error` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Error.Opacity-16 | `{Colors.Schemes.Error}` | `#FFC4BE` | `--md-sys-color-error` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Error.Opacity-08 | `{Colors.Schemes.On Error}` | `#1A1A1A` | `--md-sys-color-on-error` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Error.Opacity-10 | `{Colors.Schemes.On Error}` | `#1A1A1A` | `--md-sys-color-on-error` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Error.Opacity-16 | `{Colors.Schemes.On Error}` | `#1A1A1A` | `--md-sys-color-on-error` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Error Container.Opacity-08 | `{Colors.Schemes.Error Container}` | `#A52620` | `--md-sys-color-error-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Error Container.Opacity-10 | `{Colors.Schemes.Error Container}` | `#A52620` | `--md-sys-color-error-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Error Container.Opacity-16 | `{Colors.Schemes.Error Container}` | `#A52620` | `--md-sys-color-error-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Error Container.Opacity-08 | `{Colors.Schemes.On Error Container}` | `#FFFFFF` | `--md-sys-color-on-error-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Error Container.Opacity-10 | `{Colors.Schemes.On Error Container}` | `#FFFFFF` | `--md-sys-color-on-error-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Error Container.Opacity-16 | `{Colors.Schemes.On Error Container}` | `#FFFFFF` | `--md-sys-color-on-error-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Outline.Opacity-08 | `{Colors.Schemes.Outline}` | `#ACAEA5` | `--md-sys-color-outline` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Outline.Opacity-10 | `{Colors.Schemes.Outline}` | `#ACAEA5` | `--md-sys-color-outline` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Outline.Opacity-16 | `{Colors.Schemes.Outline}` | `#ACAEA5` | `--md-sys-color-outline` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Background.Opacity-08 | `{Colors.Schemes.Background}` | `#13140F` | `--md-sys-color-background` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Background.Opacity-10 | `{Colors.Schemes.Background}` | `#13140F` | `--md-sys-color-background` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Background.Opacity-16 | `{Colors.Schemes.Background}` | `#13140F` | `--md-sys-color-background` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Background.Opacity-08 | `{Colors.Schemes.On Background}` | `#E4E5DC` | `--md-sys-color-on-background` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Background.Opacity-10 | `{Colors.Schemes.On Background}` | `#E4E5DC` | `--md-sys-color-on-background` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Background.Opacity-16 | `{Colors.Schemes.On Background}` | `#E4E5DC` | `--md-sys-color-on-background` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface.Opacity-08 | `{Colors.Schemes.Surface}` | `#10110F` | `--md-sys-color-surface` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface.Opacity-10 | `{Colors.Schemes.Surface}` | `#10110F` | `--md-sys-color-surface` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface.Opacity-16 | `{Colors.Schemes.Surface}` | `#10110F` | `--md-sys-color-surface` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Surface.Opacity-08 | `{Colors.Schemes.On Surface}` | `#F1F0EB` | `--md-sys-color-on-surface` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Surface.Opacity-10 | `{Colors.Schemes.On Surface}` | `#F1F0EB` | `--md-sys-color-on-surface` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Surface.Opacity-16 | `{Colors.Schemes.On Surface}` | `#F1F0EB` | `--md-sys-color-on-surface` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Variant.Opacity-08 | `{Colors.Schemes.Surface Variant}` | `#46483F` | `--md-sys-color-surface-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Variant.Opacity-10 | `{Colors.Schemes.Surface Variant}` | `#46483F` | `--md-sys-color-surface-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Variant.Opacity-16 | `{Colors.Schemes.Surface Variant}` | `#46483F` | `--md-sys-color-surface-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Surface Variant.Opacity-08 | `{Colors.Schemes.On Surface Variant}` | `#D8D9D1` | `--md-sys-color-on-surface-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Surface Variant.Opacity-10 | `{Colors.Schemes.On Surface Variant}` | `#D8D9D1` | `--md-sys-color-on-surface-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Surface Variant.Opacity-16 | `{Colors.Schemes.On Surface Variant}` | `#D8D9D1` | `--md-sys-color-on-surface-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Inverse Surface.Opacity-08 | `{Colors.Schemes.Inverse Surface}` | `#EEEDE8` | `--md-sys-color-inverse-surface` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Inverse Surface.Opacity-10 | `{Colors.Schemes.Inverse Surface}` | `#EEEDE8` | `--md-sys-color-inverse-surface` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Inverse Surface.Opacity-16 | `{Colors.Schemes.Inverse Surface}` | `#EEEDE8` | `--md-sys-color-inverse-surface` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Inverse On Surface.Opacity-08 | `{Colors.Schemes.Inverse On Surface}` | `#252623` | `--md-sys-color-inverse-on-surface` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Inverse On Surface.Opacity-10 | `{Colors.Schemes.Inverse On Surface}` | `#252623` | `--md-sys-color-inverse-on-surface` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Inverse On Surface.Opacity-16 | `{Colors.Schemes.Inverse On Surface}` | `#252623` | `--md-sys-color-inverse-on-surface` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Inverse Primary.Opacity-08 | `{Colors.Schemes.Inverse Primary}` | `#536700` | `--md-sys-color-inverse-primary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Inverse Primary.Opacity-10 | `{Colors.Schemes.Inverse Primary}` | `#536700` | `--md-sys-color-inverse-primary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Inverse Primary.Opacity-16 | `{Colors.Schemes.Inverse Primary}` | `#536700` | `--md-sys-color-inverse-primary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Shadow.Opacity-08 | `{Colors.Schemes.Shadow}` | `#000000` | `--md-sys-color-shadow` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Shadow.Opacity-10 | `{Colors.Schemes.Shadow}` | `#000000` | `--md-sys-color-shadow` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Shadow.Opacity-16 | `{Colors.Schemes.Shadow}` | `#000000` | `--md-sys-color-shadow` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Tint.Opacity-08 | `{Colors.Schemes.Surface Tint}` | `#D2E594` | `--md-sys-color-surface-tint` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Tint.Opacity-10 | `{Colors.Schemes.Surface Tint}` | `#D2E594` | `--md-sys-color-surface-tint` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Tint.Opacity-16 | `{Colors.Schemes.Surface Tint}` | `#D2E594` | `--md-sys-color-surface-tint` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Outline Variant.Opacity-08 | `{Colors.Schemes.Outline Variant}` | `#777970` | `--md-sys-color-outline-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Outline Variant.Opacity-10 | `{Colors.Schemes.Outline Variant}` | `#777970` | `--md-sys-color-outline-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Outline Variant.Opacity-16 | `{Colors.Schemes.Outline Variant}` | `#777970` | `--md-sys-color-outline-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Scrim.Opacity-08 | `{Colors.Schemes.Scrim}` | `#000000` | `--md-sys-color-scrim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Scrim.Opacity-10 | `{Colors.Schemes.Scrim}` | `#000000` | `--md-sys-color-scrim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Scrim.Opacity-16 | `{Colors.Schemes.Scrim}` | `#000000` | `--md-sys-color-scrim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container Highest.Opacity-08 | `{Colors.Schemes.Surface Container Highest}` | `#353632` | `--md-sys-color-surface-container-highest` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container Highest.Opacity-10 | `{Colors.Schemes.Surface Container Highest}` | `#353632` | `--md-sys-color-surface-container-highest` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container Highest.Opacity-16 | `{Colors.Schemes.Surface Container Highest}` | `#353632` | `--md-sys-color-surface-container-highest` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container High.Opacity-08 | `{Colors.Schemes.Surface Container High}` | `#292A26` | `--md-sys-color-surface-container-high` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container High.Opacity-10 | `{Colors.Schemes.Surface Container High}` | `#292A26` | `--md-sys-color-surface-container-high` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container High.Opacity-16 | `{Colors.Schemes.Surface Container High}` | `#292A26` | `--md-sys-color-surface-container-high` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container.Opacity-08 | `{Colors.Schemes.Surface Container}` | `#1D1E1B` | `--md-sys-color-surface-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container.Opacity-10 | `{Colors.Schemes.Surface Container}` | `#1D1E1B` | `--md-sys-color-surface-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container.Opacity-16 | `{Colors.Schemes.Surface Container}` | `#1D1E1B` | `--md-sys-color-surface-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container Low.Opacity-08 | `{Colors.Schemes.Surface Container Low}` | `#181916` | `--md-sys-color-surface-container-low` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container Low.Opacity-10 | `{Colors.Schemes.Surface Container Low}` | `#181916` | `--md-sys-color-surface-container-low` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container Low.Opacity-16 | `{Colors.Schemes.Surface Container Low}` | `#181916` | `--md-sys-color-surface-container-low` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container Lowest.Opacity-08 | `{Colors.Schemes.Surface Container Lowest}` | `#0B0C0A` | `--md-sys-color-surface-container-lowest` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container Lowest.Opacity-10 | `{Colors.Schemes.Surface Container Lowest}` | `#0B0C0A` | `--md-sys-color-surface-container-lowest` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container Lowest.Opacity-16 | `{Colors.Schemes.Surface Container Lowest}` | `#0B0C0A` | `--md-sys-color-surface-container-lowest` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Bright.Opacity-08 | `{Colors.Schemes.Surface Bright}` | `#3D3E3A` | `--md-sys-color-surface-bright` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Bright.Opacity-10 | `{Colors.Schemes.Surface Bright}` | `#3D3E3A` | `--md-sys-color-surface-bright` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Bright.Opacity-16 | `{Colors.Schemes.Surface Bright}` | `#3D3E3A` | `--md-sys-color-surface-bright` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Dim.Opacity-08 | `{Colors.Schemes.Surface Dim}` | `#10110F` | `--md-sys-color-surface-dim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Dim.Opacity-10 | `{Colors.Schemes.Surface Dim}` | `#10110F` | `--md-sys-color-surface-dim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Dim.Opacity-16 | `{Colors.Schemes.Surface Dim}` | `#10110F` | `--md-sys-color-surface-dim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.Add-ons.Section background | `{Colors.Neutral.Shade-001}` | `#000000` | — (extension hors MD3) |
| Typescale.Static.Display Large.Size | `57px` | `57px` | `--md-sys-typescale-display-large-size` |
| Typescale.Static.Display Large.Tracking | `-0.25px` | `-0.25px` | `--md-sys-typescale-display-large-tracking` |
| Typescale.Static.Display Large.Line Height | `64px` | `64px` | `--md-sys-typescale-display-large-line-height` |
| Typescale.Static.Display Large.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-display-large-font` |
| Typescale.Static.Display Large.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-display-large-weight` |
| Typescale.Static.Display Large.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-display-large-weight` (MD3 Expressive) |
| Typescale.Static.Display Medium.Size | `45px` | `45px` | `--md-sys-typescale-display-medium-size` |
| Typescale.Static.Display Medium.Line Height | `52px` | `52px` | `--md-sys-typescale-display-medium-line-height` |
| Typescale.Static.Display Medium.Tracking | `0px` | `0px` | `--md-sys-typescale-display-medium-tracking` |
| Typescale.Static.Display Medium.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-display-medium-font` |
| Typescale.Static.Display Medium.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-display-medium-weight` |
| Typescale.Static.Display Medium.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-display-medium-weight` (MD3 Expressive) |
| Typescale.Static.Display Small.Size | `36px` | `36px` | `--md-sys-typescale-display-small-size` |
| Typescale.Static.Display Small.Tracking | `0px` | `0px` | `--md-sys-typescale-display-small-tracking` |
| Typescale.Static.Display Small.Line Height | `44px` | `44px` | `--md-sys-typescale-display-small-line-height` |
| Typescale.Static.Display Small.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-display-small-font` |
| Typescale.Static.Display Small.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-display-small-weight` |
| Typescale.Static.Display Small.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-display-small-weight` (MD3 Expressive) |
| Typescale.Static.Headline Large.Size | `32px` | `32px` | `--md-sys-typescale-headline-large-size` |
| Typescale.Static.Headline Large.Tracking | `0px` | `0px` | `--md-sys-typescale-headline-large-tracking` |
| Typescale.Static.Headline Large.Line Height | `40px` | `40px` | `--md-sys-typescale-headline-large-line-height` |
| Typescale.Static.Headline Large.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-headline-large-font` |
| Typescale.Static.Headline Large.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-headline-large-weight` |
| Typescale.Static.Headline Large.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-headline-large-weight` (MD3 Expressive) |
| Typescale.Static.Headline Medium.Size | `28px` | `28px` | `--md-sys-typescale-headline-medium-size` |
| Typescale.Static.Headline Medium.Tracking | `0px` | `0px` | `--md-sys-typescale-headline-medium-tracking` |
| Typescale.Static.Headline Medium.Line Height | `36px` | `36px` | `--md-sys-typescale-headline-medium-line-height` |
| Typescale.Static.Headline Medium.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-headline-medium-font` |
| Typescale.Static.Headline Medium.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-headline-medium-weight` |
| Typescale.Static.Headline Medium.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-headline-medium-weight` (MD3 Expressive) |
| Typescale.Static.Headline Small.Size | `24px` | `24px` | `--md-sys-typescale-headline-small-size` |
| Typescale.Static.Headline Small.Tracking | `0px` | `0px` | `--md-sys-typescale-headline-small-tracking` |
| Typescale.Static.Headline Small.Line Height | `32px` | `32px` | `--md-sys-typescale-headline-small-line-height` |
| Typescale.Static.Headline Small.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-headline-small-font` |
| Typescale.Static.Headline Small.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-headline-small-weight` |
| Typescale.Static.Headline Small.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-headline-small-weight` (MD3 Expressive) |
| Typescale.Static.Title Large.Size | `22px` | `22px` | `--md-sys-typescale-title-large-size` |
| Typescale.Static.Title Large.Tracking | `0px` | `0px` | `--md-sys-typescale-title-large-tracking` |
| Typescale.Static.Title Large.Line Height | `28px` | `28px` | `--md-sys-typescale-title-large-line-height` |
| Typescale.Static.Title Large.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-title-large-font` |
| Typescale.Static.Title Large.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-title-large-weight` |
| Typescale.Static.Title Large.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-title-large-weight` (MD3 Expressive) |
| Typescale.Static.Title Medium.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-title-medium-font` |
| Typescale.Static.Title Medium.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-title-medium-weight` |
| Typescale.Static.Title Medium.Size | `16px` | `16px` | `--md-sys-typescale-title-medium-size` |
| Typescale.Static.Title Medium.Tracking | `0.15000000596046448px` | `0.15000000596046448px` | `--md-sys-typescale-title-medium-tracking` |
| Typescale.Static.Title Medium.Line Height | `24px` | `24px` | `--md-sys-typescale-title-medium-line-height` |
| Typescale.Static.Title Medium.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-emphasized-title-medium-weight` (MD3 Expressive) |
| Typescale.Static.Title Small.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-title-small-font` |
| Typescale.Static.Title Small.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-title-small-weight` |
| Typescale.Static.Title Small.Size | `14px` | `14px` | `--md-sys-typescale-title-small-size` |
| Typescale.Static.Title Small.Tracking | `0.10000000149011612px` | `0.10000000149011612px` | `--md-sys-typescale-title-small-tracking` |
| Typescale.Static.Title Small.Line Height | `20px` | `20px` | `--md-sys-typescale-title-small-line-height` |
| Typescale.Static.Title Small.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-emphasized-title-small-weight` (MD3 Expressive) |
| Typescale.Static.Label Large.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-label-large-font` |
| Typescale.Static.Label Large.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-label-large-weight` |
| Typescale.Static.Label Large.Size | `14px` | `14px` | `--md-sys-typescale-label-large-size` |
| Typescale.Static.Label Large.Tracking | `0.10000000149011612px` | `0.10000000149011612px` | `--md-sys-typescale-label-large-tracking` |
| Typescale.Static.Label Large.Line Height | `20px` | `20px` | `--md-sys-typescale-label-large-line-height` |
| Typescale.Static.Label Large.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-label-large-weight-prominent` |
| Typescale.Static.Label Medium.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-label-medium-font` |
| Typescale.Static.Label Medium.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-label-medium-weight` |
| Typescale.Static.Label Medium.Size | `12px` | `12px` | `--md-sys-typescale-label-medium-size` |
| Typescale.Static.Label Medium.Tracking | `0.5px` | `0.5px` | `--md-sys-typescale-label-medium-tracking` |
| Typescale.Static.Label Medium.Line Height | `16px` | `16px` | `--md-sys-typescale-label-medium-line-height` |
| Typescale.Static.Label Medium.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-label-medium-weight-prominent` |
| Typescale.Static.Label Small.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-label-small-font` |
| Typescale.Static.Label Small.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-label-small-weight` |
| Typescale.Static.Label Small.Size | `11px` | `11px` | `--md-sys-typescale-label-small-size` |
| Typescale.Static.Label Small.Tracking | `0.5px` | `0.5px` | `--md-sys-typescale-label-small-tracking` |
| Typescale.Static.Label Small.Line Height | `16px` | `16px` | `--md-sys-typescale-label-small-line-height` |
| Typescale.Static.Label Small.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-emphasized-label-small-weight` (MD3 Expressive) |
| Typescale.Static.Body Large.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-body-large-font` |
| Typescale.Static.Body Large.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-body-large-weight` |
| Typescale.Static.Body Large.Size | `16px` | `16px` | `--md-sys-typescale-body-large-size` |
| Typescale.Static.Body Large.Tracking | `0.5px` | `0.5px` | `--md-sys-typescale-body-large-tracking` |
| Typescale.Static.Body Large.Line Height | `24px` | `24px` | `--md-sys-typescale-body-large-line-height` |
| Typescale.Static.Body Large.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-body-large-weight` (MD3 Expressive) |
| Typescale.Static.Body Medium.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-body-medium-font` |
| Typescale.Static.Body Medium.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-body-medium-weight` |
| Typescale.Static.Body Medium.Size | `14px` | `14px` | `--md-sys-typescale-body-medium-size` |
| Typescale.Static.Body Medium.Tracking | `0.25px` | `0.25px` | `--md-sys-typescale-body-medium-tracking` |
| Typescale.Static.Body Medium.Line Height | `20px` | `20px` | `--md-sys-typescale-body-medium-line-height` |
| Typescale.Static.Body Medium.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-body-medium-weight` (MD3 Expressive) |
| Typescale.Static.Body Small.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-body-small-font` |
| Typescale.Static.Body Small.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-body-small-weight` |
| Typescale.Static.Body Small.Size | `12px` | `12px` | `--md-sys-typescale-body-small-size` |
| Typescale.Static.Body Small.Tracking | `0.4000000059604645px` | `0.4000000059604645px` | `--md-sys-typescale-body-small-tracking` |
| Typescale.Static.Body Small.Line Height | `16px` | `16px` | `--md-sys-typescale-body-small-line-height` |
| Typescale.Static.Body Small.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-body-small-weight` (MD3 Expressive) |

## semantics/dark.tokens.json

| Variable | Valeur | Valeur résolue | Équivalent MD3 |
|---|---|---|---|
| Colors.Schemes.Primary | `{Colors.Olive.Shade-016}` | `#BCD078` | `--md-sys-color-primary` |
| Colors.Schemes.Surface Tint | `{Colors.Olive.Shade-015}` | `#BDCE80` | `--md-sys-color-surface-tint` |
| Colors.Schemes.On Primary | `{Colors.Olive.Shade-003}` | `#263000` | `--md-sys-color-on-primary` |
| Colors.Schemes.Primary Container | `{Colors.Olive.Shade-006}` | `#3E4C0C` | `--md-sys-color-primary-container` |
| Colors.Schemes.On Primary Container | `{Colors.Olive.Shade-019}` | `#D8EB9A` | `--md-sys-color-on-primary-container` |
| Colors.Schemes.Secondary | `{Colors.Sage.Shade-011}` | `#BDC59A` | `--md-sys-color-secondary` |
| Colors.Schemes.On Secondary | `{Colors.Sage.Shade-002}` | `#293015` | `--md-sys-color-on-secondary` |
| Colors.Schemes.Secondary Container | `{Colors.Sage.Shade-006}` | `#41482C` | `--md-sys-color-secondary-container` |
| Colors.Schemes.On Secondary Container | `{Colors.Sage.Shade-014}` | `#D9DFBC` | `--md-sys-color-on-secondary-container` |
| Colors.Schemes.Tertiary | `{Colors.Mint.Shade-011}` | `#8BD7A8` | `--md-sys-color-tertiary` |
| Colors.Schemes.On Tertiary | `{Colors.Mint.Shade-003}` | `#00391F` | `--md-sys-color-on-tertiary` |
| Colors.Schemes.Tertiary Container | `{Colors.Mint.Shade-005}` | `#075B3B` | `--md-sys-color-tertiary-container` |
| Colors.Schemes.On Tertiary Container | `{Colors.Mint.Shade-015}` | `#AFF2C4` | `--md-sys-color-on-tertiary-container` |
| Colors.Schemes.Error | `{Colors.Red.Shade-011}` | `#FFB4AB` | `--md-sys-color-error` |
| Colors.Schemes.On Error | `{Colors.Red.Shade-001}` | `#690005` | `--md-sys-color-on-error` |
| Colors.Schemes.Error Container | `{Colors.Red.Shade-004}` | `#93000A` | `--md-sys-color-error-container` |
| Colors.Schemes.On Error Container | `{Colors.Red.Shade-014}` | `#FFDAD6` | `--md-sys-color-on-error-container` |
| Colors.Schemes.Background | `{Colors.Neutral Variant.Shade-006}` | `#13140F` | `--md-sys-color-background` |
| Colors.Schemes.On Background | `{Colors.Neutral Variant.Shade-048}` | `#E4E5DC` | `--md-sys-color-on-background` |
| Colors.Schemes.Surface | `{Colors.Neutral Variant.Shade-005}` | `#121311` | `--md-sys-color-surface` |
| Colors.Schemes.On Surface | `{Colors.Neutral Variant.Shade-046}` | `#E4E3DE` | `--md-sys-color-on-surface` |
| Colors.Schemes.Surface Variant | `{Colors.Neutral Variant.Shade-026}` | `#46483F` | `--md-sys-color-surface-variant` |
| Colors.Schemes.On Surface Variant | `{Colors.Neutral Variant.Shade-037}` | `#C7C8BF` | `--md-sys-color-on-surface-variant` |
| Colors.Schemes.Outline | `{Colors.Neutral Variant.Shade-033}` | `#91928B` | `--md-sys-color-outline` |
| Colors.Schemes.Outline Variant | `{Colors.Neutral Variant.Shade-027}` | `#464842` | `--md-sys-color-outline-variant` |
| Colors.Schemes.Shadow | `{Colors.Neutral.Shade-001}` | `#000000` | `--md-sys-color-shadow` |
| Colors.Schemes.Scrim | `{Colors.Neutral.Shade-001}` | `#000000` | `--md-sys-color-scrim` |
| Colors.Schemes.Inverse Surface | `{Colors.Neutral Variant.Shade-046}` | `#E4E3DE` | `--md-sys-color-inverse-surface` |
| Colors.Schemes.Inverse On Surface | `{Colors.Neutral Variant.Shade-017}` | `#30312E` | `--md-sys-color-inverse-on-surface` |
| Colors.Schemes.Inverse Primary | `{Colors.Olive.Shade-012}` | `#86A315` | `--md-sys-color-inverse-primary` |
| Colors.Schemes.Primary Fixed | `{Colors.Olive.Shade-019}` | `#D8EB9A` | `--md-sys-color-primary-fixed` |
| Colors.Schemes.On Primary Fixed | `{Colors.Olive.Shade-001}` | `#202900` | `--md-sys-color-on-primary-fixed` |
| Colors.Schemes.Primary Fixed Dim | `{Colors.Olive.Shade-016}` | `#BCD078` | `--md-sys-color-primary-fixed-dim` |
| Colors.Schemes.On Primary Fixed Variant | `{Colors.Olive.Shade-006}` | `#3E4C0C` | `--md-sys-color-on-primary-fixed-variant` |
| Colors.Schemes.Secondary Fixed | `{Colors.Sage.Shade-014}` | `#D9DFBC` | `--md-sys-color-secondary-fixed` |
| Colors.Schemes.On Secondary Fixed | `{Colors.Sage.Shade-001}` | `#252A14` | `--md-sys-color-on-secondary-fixed` |
| Colors.Schemes.Secondary Fixed Dim | `{Colors.Sage.Shade-011}` | `#BDC59A` | `--md-sys-color-secondary-fixed-dim` |
| Colors.Schemes.On Secondary Fixed Variant | `{Colors.Sage.Shade-006}` | `#41482C` | `--md-sys-color-on-secondary-fixed-variant` |
| Colors.Schemes.Tertiary Fixed | `{Colors.Mint.Shade-015}` | `#AFF2C4` | `--md-sys-color-tertiary-fixed` |
| Colors.Schemes.On Tertiary Fixed | `{Colors.Mint.Shade-001}` | `#003820` | `--md-sys-color-on-tertiary-fixed` |
| Colors.Schemes.Tertiary Fixed Dim | `{Colors.Mint.Shade-011}` | `#8BD7A8` | `--md-sys-color-tertiary-fixed-dim` |
| Colors.Schemes.On Tertiary Fixed Variant | `{Colors.Mint.Shade-005}` | `#075B3B` | `--md-sys-color-on-tertiary-fixed-variant` |
| Colors.Schemes.Surface Dim | `{Colors.Neutral Variant.Shade-005}` | `#121311` | `--md-sys-color-surface-dim` |
| Colors.Schemes.Surface Bright | `{Colors.Neutral Variant.Shade-022}` | `#383936` | `--md-sys-color-surface-bright` |
| Colors.Schemes.Surface Container Lowest | `{Colors.Neutral Variant.Shade-003}` | `#0D0E0C` | `--md-sys-color-surface-container-lowest` |
| Colors.Schemes.Surface Container Low | `{Colors.Neutral Variant.Shade-009}` | `#1A1B18` | `--md-sys-color-surface-container-low` |
| Colors.Schemes.Surface Container | `{Colors.Neutral Variant.Shade-012}` | `#1E1F1C` | `--md-sys-color-surface-container` |
| Colors.Schemes.Surface Container High | `{Colors.Neutral Variant.Shade-015}` | `#282A26` | `--md-sys-color-surface-container-high` |
| Colors.Schemes.Surface Container Highest | `{Colors.Neutral Variant.Shade-019}` | `#333430` | `--md-sys-color-surface-container-highest` |
| Colors.Schemes.Success | `{Colors.Green.Shade-010}` | `#A5D66A` | — (extension hors MD3) |
| Colors.Schemes.Info | `{Colors.Blue.Shade-011}` | `#ADC6FF` | — (extension hors MD3) |
| Colors.Schemes.Warning | `{Colors.Amber.Shade-010}` | `#FFB95C` | — (extension hors MD3) |
| Colors.Schemes.On Warning | `{Colors.Amber.Shade-001}` | `#482900` | — (extension hors MD3) |
| Colors.Schemes.On Success | `{Colors.Green.Shade-001}` | `#1C3700` | — (extension hors MD3) |
| Colors.Schemes.On Info | `{Colors.Blue.Shade-001}` | `#002E69` | — (extension hors MD3) |
| Colors.Schemes.Warning Container | `{Colors.Amber.Shade-003}` | `#6A3D00` | — (extension hors MD3) |
| Colors.Schemes.On Warning Container | `{Colors.Amber.Shade-013}` | `#FFE0B2` | — (extension hors MD3) |
| Colors.Schemes.Success Container | `{Colors.Green.Shade-004}` | `#365E0A` | — (extension hors MD3) |
| Colors.Schemes.On Success Container | `{Colors.Green.Shade-013}` | `#DDF3C4` | — (extension hors MD3) |
| Colors.Schemes.Info Container | `{Colors.Blue.Shade-005}` | `#004494` | — (extension hors MD3) |
| Colors.Schemes.On Info Container | `{Colors.Blue.Shade-014}` | `#D9E2FF` | — (extension hors MD3) |
| Colors.Schemes.Neutral.0 | `{Colors.Neutral.Shade-035}` | `#FFFFFF` | — |
| Colors.Schemes.Neutral.900 | `{Colors.Neutral.Shade-005}` | `#1A1A1A` | — |
| Colors.State Layers.Primary.Opacity-08 | `{Colors.Schemes.Primary}` | `#BCD078` | `--md-sys-color-primary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Primary.Opacity-10 | `{Colors.Schemes.Primary}` | `#BCD078` | `--md-sys-color-primary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Primary.Opacity-16 | `{Colors.Schemes.Primary}` | `#BCD078` | `--md-sys-color-primary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Primary.Opacity-08 | `{Colors.Schemes.On Primary}` | `#263000` | `--md-sys-color-on-primary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Primary.Opacity-10 | `{Colors.Schemes.On Primary}` | `#263000` | `--md-sys-color-on-primary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Primary.Opacity-16 | `{Colors.Schemes.On Primary}` | `#263000` | `--md-sys-color-on-primary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Primary Container.Opacity-08 | `{Colors.Schemes.Primary Container}` | `#3E4C0C` | `--md-sys-color-primary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Primary Container.Opacity-10 | `{Colors.Schemes.Primary Container}` | `#3E4C0C` | `--md-sys-color-primary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Primary Container.Opacity-16 | `{Colors.Schemes.Primary Container}` | `#3E4C0C` | `--md-sys-color-primary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Primary Container.Opacity-08 | `{Colors.Schemes.On Primary Container}` | `#D8EB9A` | `--md-sys-color-on-primary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Primary Container.Opacity-10 | `{Colors.Schemes.On Primary Container}` | `#D8EB9A` | `--md-sys-color-on-primary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Primary Container.Opacity-16 | `{Colors.Schemes.On Primary Container}` | `#D8EB9A` | `--md-sys-color-on-primary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Primary Fixed.Opacity-08 | `{Colors.Schemes.Primary Fixed}` | `#D8EB9A` | `--md-sys-color-primary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Primary Fixed.Opacity-10 | `{Colors.Schemes.Primary Fixed}` | `#D8EB9A` | `--md-sys-color-primary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Primary Fixed.Opacity-16 | `{Colors.Schemes.Primary Fixed}` | `#D8EB9A` | `--md-sys-color-primary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Primary Fixed.Opacity-08 | `{Colors.Schemes.On Primary Fixed}` | `#202900` | `--md-sys-color-on-primary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Primary Fixed.Opacity-10 | `{Colors.Schemes.On Primary Fixed}` | `#202900` | `--md-sys-color-on-primary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Primary Fixed.Opacity-16 | `{Colors.Schemes.On Primary Fixed}` | `#202900` | `--md-sys-color-on-primary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Primary Fixed Dim.Opacity-08 | `{Colors.Schemes.Primary Fixed Dim}` | `#BCD078` | `--md-sys-color-primary-fixed-dim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Primary Fixed Dim.Opacity-10 | `{Colors.Schemes.Primary Fixed Dim}` | `#BCD078` | `--md-sys-color-primary-fixed-dim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Primary Fixed Dim.Opacity-16 | `{Colors.Schemes.Primary Fixed Dim}` | `#BCD078` | `--md-sys-color-primary-fixed-dim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Primary Fixed Variant.Opacity-08 | `{Colors.Schemes.On Primary Fixed Variant}` | `#3E4C0C` | `--md-sys-color-on-primary-fixed-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Primary Fixed Variant.Opacity-10 | `{Colors.Schemes.On Primary Fixed Variant}` | `#3E4C0C` | `--md-sys-color-on-primary-fixed-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Primary Fixed Variant.Opacity-16 | `{Colors.Schemes.On Primary Fixed Variant}` | `#3E4C0C` | `--md-sys-color-on-primary-fixed-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Secondary.Opacity-08 | `{Colors.Schemes.Secondary}` | `#BDC59A` | `--md-sys-color-secondary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Secondary.Opacity-10 | `{Colors.Schemes.Secondary}` | `#BDC59A` | `--md-sys-color-secondary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Secondary.Opacity-16 | `{Colors.Schemes.Secondary}` | `#BDC59A` | `--md-sys-color-secondary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Secondary.Opacity-08 | `{Colors.Schemes.On Secondary}` | `#293015` | `--md-sys-color-on-secondary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Secondary.Opacity-10 | `{Colors.Schemes.On Secondary}` | `#293015` | `--md-sys-color-on-secondary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Secondary.Opacity-16 | `{Colors.Schemes.On Secondary}` | `#293015` | `--md-sys-color-on-secondary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Secondary Container.Opacity-08 | `{Colors.Schemes.Secondary Container}` | `#41482C` | `--md-sys-color-secondary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Secondary Container.Opacity-10 | `{Colors.Schemes.Secondary Container}` | `#41482C` | `--md-sys-color-secondary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Secondary Container.Opacity-16 | `{Colors.Schemes.Secondary Container}` | `#41482C` | `--md-sys-color-secondary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Secondary Container.Opacity-08 | `{Colors.Schemes.On Secondary Container}` | `#D9DFBC` | `--md-sys-color-on-secondary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Secondary Container.Opacity-10 | `{Colors.Schemes.On Secondary Container}` | `#D9DFBC` | `--md-sys-color-on-secondary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Secondary Container.Opacity-16 | `{Colors.Schemes.On Secondary Container}` | `#D9DFBC` | `--md-sys-color-on-secondary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Secondary Fixed.Opacity-08 | `{Colors.Schemes.Secondary Fixed}` | `#D9DFBC` | `--md-sys-color-secondary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Secondary Fixed.Opacity-10 | `{Colors.Schemes.Secondary Fixed}` | `#D9DFBC` | `--md-sys-color-secondary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Secondary Fixed.Opacity-16 | `{Colors.Schemes.Secondary Fixed}` | `#D9DFBC` | `--md-sys-color-secondary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Secondary Fixed.Opacity-08 | `{Colors.Schemes.On Secondary Fixed}` | `#252A14` | `--md-sys-color-on-secondary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Secondary Fixed.Opacity-10 | `{Colors.Schemes.On Secondary Fixed}` | `#252A14` | `--md-sys-color-on-secondary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Secondary Fixed.Opacity-16 | `{Colors.Schemes.On Secondary Fixed}` | `#252A14` | `--md-sys-color-on-secondary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Secondary Fixed Dim.Opacity-08 | `{Colors.Schemes.Secondary Fixed Dim}` | `#BDC59A` | `--md-sys-color-secondary-fixed-dim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Secondary Fixed Dim.Opacity-10 | `{Colors.Schemes.Secondary Fixed Dim}` | `#BDC59A` | `--md-sys-color-secondary-fixed-dim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Secondary Fixed Dim.Opacity-16 | `{Colors.Schemes.Secondary Fixed Dim}` | `#BDC59A` | `--md-sys-color-secondary-fixed-dim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Secondary Fixed Variant.Opacity-08 | `{Colors.Schemes.On Secondary Fixed Variant}` | `#41482C` | `--md-sys-color-on-secondary-fixed-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Secondary Fixed Variant.Opacity-10 | `{Colors.Schemes.On Secondary Fixed Variant}` | `#41482C` | `--md-sys-color-on-secondary-fixed-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Secondary Fixed Variant.Opacity-16 | `{Colors.Schemes.On Secondary Fixed Variant}` | `#41482C` | `--md-sys-color-on-secondary-fixed-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Tertiary.Opacity-08 | `{Colors.Schemes.Tertiary}` | `#8BD7A8` | `--md-sys-color-tertiary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Tertiary.Opacity-10 | `{Colors.Schemes.Tertiary}` | `#8BD7A8` | `--md-sys-color-tertiary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Tertiary.Opacity-16 | `{Colors.Schemes.Tertiary}` | `#8BD7A8` | `--md-sys-color-tertiary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Tertiary.Opacity-08 | `{Colors.Schemes.On Tertiary}` | `#00391F` | `--md-sys-color-on-tertiary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Tertiary.Opacity-10 | `{Colors.Schemes.On Tertiary}` | `#00391F` | `--md-sys-color-on-tertiary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Tertiary.Opacity-16 | `{Colors.Schemes.On Tertiary}` | `#00391F` | `--md-sys-color-on-tertiary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Tertiary Container.Opacity-08 | `{Colors.Schemes.Tertiary Container}` | `#075B3B` | `--md-sys-color-tertiary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Tertiary Container.Opacity-10 | `{Colors.Schemes.Tertiary Container}` | `#075B3B` | `--md-sys-color-tertiary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Tertiary Container.Opacity-16 | `{Colors.Schemes.Tertiary Container}` | `#075B3B` | `--md-sys-color-tertiary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Tertiary Container.Opacity-08 | `{Colors.Schemes.On Tertiary Container}` | `#AFF2C4` | `--md-sys-color-on-tertiary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Tertiary Container.Opacity-10 | `{Colors.Schemes.On Tertiary Container}` | `#AFF2C4` | `--md-sys-color-on-tertiary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Tertiary Container.Opacity-16 | `{Colors.Schemes.On Tertiary Container}` | `#AFF2C4` | `--md-sys-color-on-tertiary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Tertiary Fixed.Opacity-08 | `{Colors.Schemes.Tertiary Fixed}` | `#AFF2C4` | `--md-sys-color-tertiary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Tertiary Fixed.Opacity-10 | `{Colors.Schemes.Tertiary Fixed}` | `#AFF2C4` | `--md-sys-color-tertiary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Tertiary Fixed.Opacity-16 | `{Colors.Schemes.Tertiary Fixed}` | `#AFF2C4` | `--md-sys-color-tertiary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Tertiary Fixed.Opacity-08 | `{Colors.Schemes.On Tertiary Fixed}` | `#003820` | `--md-sys-color-on-tertiary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Tertiary Fixed.Opacity-10 | `{Colors.Schemes.On Tertiary Fixed}` | `#003820` | `--md-sys-color-on-tertiary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Tertiary Fixed.Opacity-16 | `{Colors.Schemes.On Tertiary Fixed}` | `#003820` | `--md-sys-color-on-tertiary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Tertiary Fixed Dim.Opacity-08 | `{Colors.Schemes.Tertiary Fixed Dim}` | `#8BD7A8` | `--md-sys-color-tertiary-fixed-dim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Tertiary Fixed Dim.Opacity-10 | `{Colors.Schemes.Tertiary Fixed Dim}` | `#8BD7A8` | `--md-sys-color-tertiary-fixed-dim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Tertiary Fixed Dim.Opacity-16 | `{Colors.Schemes.Tertiary Fixed Dim}` | `#8BD7A8` | `--md-sys-color-tertiary-fixed-dim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Tertiary Fixed Variant.Opacity-08 | `{Colors.Schemes.On Tertiary Fixed Variant}` | `#075B3B` | `--md-sys-color-on-tertiary-fixed-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Tertiary Fixed Variant.Opacity-10 | `{Colors.Schemes.On Tertiary Fixed Variant}` | `#075B3B` | `--md-sys-color-on-tertiary-fixed-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Tertiary Fixed Variant.Opacity-16 | `{Colors.Schemes.On Tertiary Fixed Variant}` | `#075B3B` | `--md-sys-color-on-tertiary-fixed-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Error.Opacity-08 | `{Colors.Schemes.Error}` | `#FFB4AB` | `--md-sys-color-error` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Error.Opacity-10 | `{Colors.Schemes.Error}` | `#FFB4AB` | `--md-sys-color-error` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Error.Opacity-16 | `{Colors.Schemes.Error}` | `#FFB4AB` | `--md-sys-color-error` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Error.Opacity-08 | `{Colors.Schemes.On Error}` | `#690005` | `--md-sys-color-on-error` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Error.Opacity-10 | `{Colors.Schemes.On Error}` | `#690005` | `--md-sys-color-on-error` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Error.Opacity-16 | `{Colors.Schemes.On Error}` | `#690005` | `--md-sys-color-on-error` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Error Container.Opacity-08 | `{Colors.Schemes.Error Container}` | `#93000A` | `--md-sys-color-error-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Error Container.Opacity-10 | `{Colors.Schemes.Error Container}` | `#93000A` | `--md-sys-color-error-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Error Container.Opacity-16 | `{Colors.Schemes.Error Container}` | `#93000A` | `--md-sys-color-error-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Error Container.Opacity-08 | `{Colors.Schemes.On Error Container}` | `#FFDAD6` | `--md-sys-color-on-error-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Error Container.Opacity-10 | `{Colors.Schemes.On Error Container}` | `#FFDAD6` | `--md-sys-color-on-error-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Error Container.Opacity-16 | `{Colors.Schemes.On Error Container}` | `#FFDAD6` | `--md-sys-color-on-error-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Outline.Opacity-08 | `{Colors.Schemes.Outline}` | `#91928B` | `--md-sys-color-outline` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Outline.Opacity-10 | `{Colors.Schemes.Outline}` | `#91928B` | `--md-sys-color-outline` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Outline.Opacity-16 | `{Colors.Schemes.Outline}` | `#91928B` | `--md-sys-color-outline` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Background.Opacity-08 | `{Colors.Schemes.Background}` | `#13140F` | `--md-sys-color-background` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Background.Opacity-10 | `{Colors.Schemes.Background}` | `#13140F` | `--md-sys-color-background` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Background.Opacity-16 | `{Colors.Schemes.Background}` | `#13140F` | `--md-sys-color-background` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Background.Opacity-08 | `{Colors.Schemes.On Background}` | `#E4E5DC` | `--md-sys-color-on-background` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Background.Opacity-10 | `{Colors.Schemes.On Background}` | `#E4E5DC` | `--md-sys-color-on-background` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Background.Opacity-16 | `{Colors.Schemes.On Background}` | `#E4E5DC` | `--md-sys-color-on-background` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface.Opacity-08 | `{Colors.Schemes.Surface}` | `#121311` | `--md-sys-color-surface` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface.Opacity-10 | `{Colors.Schemes.Surface}` | `#121311` | `--md-sys-color-surface` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface.Opacity-16 | `{Colors.Schemes.Surface}` | `#121311` | `--md-sys-color-surface` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Surface.Opacity-08 | `{Colors.Schemes.On Surface}` | `#E4E3DE` | `--md-sys-color-on-surface` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Surface.Opacity-10 | `{Colors.Schemes.On Surface}` | `#E4E3DE` | `--md-sys-color-on-surface` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Surface.Opacity-16 | `{Colors.Schemes.On Surface}` | `#E4E3DE` | `--md-sys-color-on-surface` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Variant.Opacity-08 | `{Colors.Schemes.Surface Variant}` | `#46483F` | `--md-sys-color-surface-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Variant.Opacity-10 | `{Colors.Schemes.Surface Variant}` | `#46483F` | `--md-sys-color-surface-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Variant.Opacity-16 | `{Colors.Schemes.Surface Variant}` | `#46483F` | `--md-sys-color-surface-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Surface Variant.Opacity-08 | `{Colors.Schemes.On Surface Variant}` | `#C7C8BF` | `--md-sys-color-on-surface-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Surface Variant.Opacity-10 | `{Colors.Schemes.On Surface Variant}` | `#C7C8BF` | `--md-sys-color-on-surface-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Surface Variant.Opacity-16 | `{Colors.Schemes.On Surface Variant}` | `#C7C8BF` | `--md-sys-color-on-surface-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Inverse Surface.Opacity-08 | `{Colors.Schemes.Inverse Surface}` | `#E4E3DE` | `--md-sys-color-inverse-surface` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Inverse Surface.Opacity-10 | `{Colors.Schemes.Inverse Surface}` | `#E4E3DE` | `--md-sys-color-inverse-surface` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Inverse Surface.Opacity-16 | `{Colors.Schemes.Inverse Surface}` | `#E4E3DE` | `--md-sys-color-inverse-surface` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Inverse On Surface.Opacity-08 | `{Colors.Schemes.Inverse On Surface}` | `#30312E` | `--md-sys-color-inverse-on-surface` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Inverse On Surface.Opacity-10 | `{Colors.Schemes.Inverse On Surface}` | `#30312E` | `--md-sys-color-inverse-on-surface` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Inverse On Surface.Opacity-16 | `{Colors.Schemes.Inverse On Surface}` | `#30312E` | `--md-sys-color-inverse-on-surface` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Inverse Primary.Opacity-08 | `{Colors.Schemes.Inverse Primary}` | `#86A315` | `--md-sys-color-inverse-primary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Inverse Primary.Opacity-10 | `{Colors.Schemes.Inverse Primary}` | `#86A315` | `--md-sys-color-inverse-primary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Inverse Primary.Opacity-16 | `{Colors.Schemes.Inverse Primary}` | `#86A315` | `--md-sys-color-inverse-primary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Shadow.Opacity-08 | `{Colors.Schemes.Shadow}` | `#000000` | `--md-sys-color-shadow` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Shadow.Opacity-10 | `{Colors.Schemes.Shadow}` | `#000000` | `--md-sys-color-shadow` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Shadow.Opacity-16 | `{Colors.Schemes.Shadow}` | `#000000` | `--md-sys-color-shadow` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Tint.Opacity-08 | `{Colors.Schemes.Surface Tint}` | `#BDCE80` | `--md-sys-color-surface-tint` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Tint.Opacity-10 | `{Colors.Schemes.Surface Tint}` | `#BDCE80` | `--md-sys-color-surface-tint` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Tint.Opacity-16 | `{Colors.Schemes.Surface Tint}` | `#BDCE80` | `--md-sys-color-surface-tint` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Outline Variant.Opacity-08 | `{Colors.Schemes.Outline Variant}` | `#464842` | `--md-sys-color-outline-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Outline Variant.Opacity-10 | `{Colors.Schemes.Outline Variant}` | `#464842` | `--md-sys-color-outline-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Outline Variant.Opacity-16 | `{Colors.Schemes.Outline Variant}` | `#464842` | `--md-sys-color-outline-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Scrim.Opacity-08 | `{Colors.Schemes.Scrim}` | `#000000` | `--md-sys-color-scrim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Scrim.Opacity-10 | `{Colors.Schemes.Scrim}` | `#000000` | `--md-sys-color-scrim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Scrim.Opacity-16 | `{Colors.Schemes.Scrim}` | `#000000` | `--md-sys-color-scrim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container Highest.Opacity-08 | `{Colors.Schemes.Surface Container Highest}` | `#333430` | `--md-sys-color-surface-container-highest` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container Highest.Opacity-10 | `{Colors.Schemes.Surface Container Highest}` | `#333430` | `--md-sys-color-surface-container-highest` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container Highest.Opacity-16 | `{Colors.Schemes.Surface Container Highest}` | `#333430` | `--md-sys-color-surface-container-highest` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container High.Opacity-08 | `{Colors.Schemes.Surface Container High}` | `#282A26` | `--md-sys-color-surface-container-high` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container High.Opacity-10 | `{Colors.Schemes.Surface Container High}` | `#282A26` | `--md-sys-color-surface-container-high` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container High.Opacity-16 | `{Colors.Schemes.Surface Container High}` | `#282A26` | `--md-sys-color-surface-container-high` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container.Opacity-08 | `{Colors.Schemes.Surface Container}` | `#1E1F1C` | `--md-sys-color-surface-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container.Opacity-10 | `{Colors.Schemes.Surface Container}` | `#1E1F1C` | `--md-sys-color-surface-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container.Opacity-16 | `{Colors.Schemes.Surface Container}` | `#1E1F1C` | `--md-sys-color-surface-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container Low.Opacity-08 | `{Colors.Schemes.Surface Container Low}` | `#1A1B18` | `--md-sys-color-surface-container-low` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container Low.Opacity-10 | `{Colors.Schemes.Surface Container Low}` | `#1A1B18` | `--md-sys-color-surface-container-low` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container Low.Opacity-16 | `{Colors.Schemes.Surface Container Low}` | `#1A1B18` | `--md-sys-color-surface-container-low` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container Lowest.Opacity-08 | `{Colors.Schemes.Surface Container Lowest}` | `#0D0E0C` | `--md-sys-color-surface-container-lowest` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container Lowest.Opacity-10 | `{Colors.Schemes.Surface Container Lowest}` | `#0D0E0C` | `--md-sys-color-surface-container-lowest` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container Lowest.Opacity-16 | `{Colors.Schemes.Surface Container Lowest}` | `#0D0E0C` | `--md-sys-color-surface-container-lowest` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Bright.Opacity-08 | `{Colors.Schemes.Surface Bright}` | `#383936` | `--md-sys-color-surface-bright` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Bright.Opacity-10 | `{Colors.Schemes.Surface Bright}` | `#383936` | `--md-sys-color-surface-bright` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Bright.Opacity-16 | `{Colors.Schemes.Surface Bright}` | `#383936` | `--md-sys-color-surface-bright` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Dim.Opacity-08 | `{Colors.Schemes.Surface Dim}` | `#121311` | `--md-sys-color-surface-dim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Dim.Opacity-10 | `{Colors.Schemes.Surface Dim}` | `#121311` | `--md-sys-color-surface-dim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Dim.Opacity-16 | `{Colors.Schemes.Surface Dim}` | `#121311` | `--md-sys-color-surface-dim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.Add-ons.Section background | `{Colors.Neutral.Shade-001}` | `#000000` | — (extension hors MD3) |
| Typescale.Static.Display Large.Size | `57px` | `57px` | `--md-sys-typescale-display-large-size` |
| Typescale.Static.Display Large.Tracking | `-0.25px` | `-0.25px` | `--md-sys-typescale-display-large-tracking` |
| Typescale.Static.Display Large.Line Height | `64px` | `64px` | `--md-sys-typescale-display-large-line-height` |
| Typescale.Static.Display Large.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-display-large-font` |
| Typescale.Static.Display Large.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-display-large-weight` |
| Typescale.Static.Display Large.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-display-large-weight` (MD3 Expressive) |
| Typescale.Static.Display Medium.Size | `45px` | `45px` | `--md-sys-typescale-display-medium-size` |
| Typescale.Static.Display Medium.Line Height | `52px` | `52px` | `--md-sys-typescale-display-medium-line-height` |
| Typescale.Static.Display Medium.Tracking | `0px` | `0px` | `--md-sys-typescale-display-medium-tracking` |
| Typescale.Static.Display Medium.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-display-medium-font` |
| Typescale.Static.Display Medium.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-display-medium-weight` |
| Typescale.Static.Display Medium.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-display-medium-weight` (MD3 Expressive) |
| Typescale.Static.Display Small.Size | `36px` | `36px` | `--md-sys-typescale-display-small-size` |
| Typescale.Static.Display Small.Tracking | `0px` | `0px` | `--md-sys-typescale-display-small-tracking` |
| Typescale.Static.Display Small.Line Height | `44px` | `44px` | `--md-sys-typescale-display-small-line-height` |
| Typescale.Static.Display Small.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-display-small-font` |
| Typescale.Static.Display Small.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-display-small-weight` |
| Typescale.Static.Display Small.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-display-small-weight` (MD3 Expressive) |
| Typescale.Static.Headline Large.Size | `32px` | `32px` | `--md-sys-typescale-headline-large-size` |
| Typescale.Static.Headline Large.Tracking | `0px` | `0px` | `--md-sys-typescale-headline-large-tracking` |
| Typescale.Static.Headline Large.Line Height | `40px` | `40px` | `--md-sys-typescale-headline-large-line-height` |
| Typescale.Static.Headline Large.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-headline-large-font` |
| Typescale.Static.Headline Large.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-headline-large-weight` |
| Typescale.Static.Headline Large.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-headline-large-weight` (MD3 Expressive) |
| Typescale.Static.Headline Medium.Size | `28px` | `28px` | `--md-sys-typescale-headline-medium-size` |
| Typescale.Static.Headline Medium.Tracking | `0px` | `0px` | `--md-sys-typescale-headline-medium-tracking` |
| Typescale.Static.Headline Medium.Line Height | `36px` | `36px` | `--md-sys-typescale-headline-medium-line-height` |
| Typescale.Static.Headline Medium.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-headline-medium-font` |
| Typescale.Static.Headline Medium.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-headline-medium-weight` |
| Typescale.Static.Headline Medium.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-headline-medium-weight` (MD3 Expressive) |
| Typescale.Static.Headline Small.Size | `24px` | `24px` | `--md-sys-typescale-headline-small-size` |
| Typescale.Static.Headline Small.Tracking | `0px` | `0px` | `--md-sys-typescale-headline-small-tracking` |
| Typescale.Static.Headline Small.Line Height | `32px` | `32px` | `--md-sys-typescale-headline-small-line-height` |
| Typescale.Static.Headline Small.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-headline-small-font` |
| Typescale.Static.Headline Small.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-headline-small-weight` |
| Typescale.Static.Headline Small.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-headline-small-weight` (MD3 Expressive) |
| Typescale.Static.Title Large.Size | `22px` | `22px` | `--md-sys-typescale-title-large-size` |
| Typescale.Static.Title Large.Tracking | `0px` | `0px` | `--md-sys-typescale-title-large-tracking` |
| Typescale.Static.Title Large.Line Height | `28px` | `28px` | `--md-sys-typescale-title-large-line-height` |
| Typescale.Static.Title Large.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-title-large-font` |
| Typescale.Static.Title Large.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-title-large-weight` |
| Typescale.Static.Title Large.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-title-large-weight` (MD3 Expressive) |
| Typescale.Static.Title Medium.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-title-medium-font` |
| Typescale.Static.Title Medium.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-title-medium-weight` |
| Typescale.Static.Title Medium.Size | `16px` | `16px` | `--md-sys-typescale-title-medium-size` |
| Typescale.Static.Title Medium.Tracking | `0.15000000596046448px` | `0.15000000596046448px` | `--md-sys-typescale-title-medium-tracking` |
| Typescale.Static.Title Medium.Line Height | `24px` | `24px` | `--md-sys-typescale-title-medium-line-height` |
| Typescale.Static.Title Medium.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-emphasized-title-medium-weight` (MD3 Expressive) |
| Typescale.Static.Title Small.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-title-small-font` |
| Typescale.Static.Title Small.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-title-small-weight` |
| Typescale.Static.Title Small.Size | `14px` | `14px` | `--md-sys-typescale-title-small-size` |
| Typescale.Static.Title Small.Tracking | `0.10000000149011612px` | `0.10000000149011612px` | `--md-sys-typescale-title-small-tracking` |
| Typescale.Static.Title Small.Line Height | `20px` | `20px` | `--md-sys-typescale-title-small-line-height` |
| Typescale.Static.Title Small.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-emphasized-title-small-weight` (MD3 Expressive) |
| Typescale.Static.Label Large.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-label-large-font` |
| Typescale.Static.Label Large.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-label-large-weight` |
| Typescale.Static.Label Large.Size | `14px` | `14px` | `--md-sys-typescale-label-large-size` |
| Typescale.Static.Label Large.Tracking | `0.10000000149011612px` | `0.10000000149011612px` | `--md-sys-typescale-label-large-tracking` |
| Typescale.Static.Label Large.Line Height | `20px` | `20px` | `--md-sys-typescale-label-large-line-height` |
| Typescale.Static.Label Large.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-label-large-weight-prominent` |
| Typescale.Static.Label Medium.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-label-medium-font` |
| Typescale.Static.Label Medium.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-label-medium-weight` |
| Typescale.Static.Label Medium.Size | `12px` | `12px` | `--md-sys-typescale-label-medium-size` |
| Typescale.Static.Label Medium.Tracking | `0.5px` | `0.5px` | `--md-sys-typescale-label-medium-tracking` |
| Typescale.Static.Label Medium.Line Height | `16px` | `16px` | `--md-sys-typescale-label-medium-line-height` |
| Typescale.Static.Label Medium.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-label-medium-weight-prominent` |
| Typescale.Static.Label Small.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-label-small-font` |
| Typescale.Static.Label Small.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-label-small-weight` |
| Typescale.Static.Label Small.Size | `11px` | `11px` | `--md-sys-typescale-label-small-size` |
| Typescale.Static.Label Small.Tracking | `0.5px` | `0.5px` | `--md-sys-typescale-label-small-tracking` |
| Typescale.Static.Label Small.Line Height | `16px` | `16px` | `--md-sys-typescale-label-small-line-height` |
| Typescale.Static.Label Small.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-emphasized-label-small-weight` (MD3 Expressive) |
| Typescale.Static.Body Large.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-body-large-font` |
| Typescale.Static.Body Large.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-body-large-weight` |
| Typescale.Static.Body Large.Size | `16px` | `16px` | `--md-sys-typescale-body-large-size` |
| Typescale.Static.Body Large.Tracking | `0.5px` | `0.5px` | `--md-sys-typescale-body-large-tracking` |
| Typescale.Static.Body Large.Line Height | `24px` | `24px` | `--md-sys-typescale-body-large-line-height` |
| Typescale.Static.Body Large.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-body-large-weight` (MD3 Expressive) |
| Typescale.Static.Body Medium.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-body-medium-font` |
| Typescale.Static.Body Medium.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-body-medium-weight` |
| Typescale.Static.Body Medium.Size | `14px` | `14px` | `--md-sys-typescale-body-medium-size` |
| Typescale.Static.Body Medium.Tracking | `0.25px` | `0.25px` | `--md-sys-typescale-body-medium-tracking` |
| Typescale.Static.Body Medium.Line Height | `20px` | `20px` | `--md-sys-typescale-body-medium-line-height` |
| Typescale.Static.Body Medium.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-body-medium-weight` (MD3 Expressive) |
| Typescale.Static.Body Small.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-body-small-font` |
| Typescale.Static.Body Small.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-body-small-weight` |
| Typescale.Static.Body Small.Size | `12px` | `12px` | `--md-sys-typescale-body-small-size` |
| Typescale.Static.Body Small.Tracking | `0.4000000059604645px` | `0.4000000059604645px` | `--md-sys-typescale-body-small-tracking` |
| Typescale.Static.Body Small.Line Height | `16px` | `16px` | `--md-sys-typescale-body-small-line-height` |
| Typescale.Static.Body Small.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-body-small-weight` (MD3 Expressive) |

## semantics/light-high-contrast.tokens.json

| Variable | Valeur | Valeur résolue | Équivalent MD3 |
|---|---|---|---|
| Colors.Schemes.Primary | `{Colors.Olive.Shade-007}` | `#465900` | `--md-sys-color-primary` |
| Colors.Schemes.Surface Tint | `{Colors.Olive.Shade-002}` | `#253000` | `--md-sys-color-surface-tint` |
| Colors.Schemes.On Primary | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | `--md-sys-color-on-primary` |
| Colors.Schemes.Primary Container | `{Colors.Olive.Shade-008}` | `#4B5B08` | `--md-sys-color-primary-container` |
| Colors.Schemes.On Primary Container | `{Colors.Neutral.Shade-035}` | `#FFFFFF` | `--md-sys-color-on-primary-container` |
| Colors.Schemes.Secondary | `{Colors.Sage.Shade-003}` | `#293700` | `--md-sys-color-secondary` |
| Colors.Schemes.On Secondary | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | `--md-sys-color-on-secondary` |
| Colors.Schemes.Secondary Container | `{Colors.Sage.Shade-008}` | `#4C5D23` | `--md-sys-color-secondary-container` |
| Colors.Schemes.On Secondary Container | `{Colors.Neutral.Shade-035}` | `#FFFFFF` | `--md-sys-color-on-secondary-container` |
| Colors.Schemes.Tertiary | `{Colors.Mint.Shade-006}` | `#005F38` | `--md-sys-color-tertiary` |
| Colors.Schemes.On Tertiary | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | `--md-sys-color-on-tertiary` |
| Colors.Schemes.Tertiary Container | `{Colors.Mint.Shade-007}` | `#106543` | `--md-sys-color-tertiary-container` |
| Colors.Schemes.On Tertiary Container | `{Colors.Neutral.Shade-035}` | `#FFFFFF` | `--md-sys-color-on-tertiary-container` |
| Colors.Schemes.Error | `{Colors.Red.Shade-003}` | `#74110D` | `--md-sys-color-error` |
| Colors.Schemes.On Error | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | `--md-sys-color-on-error` |
| Colors.Schemes.Error Container | `{Colors.Red.Shade-008}` | `#A52A23` | `--md-sys-color-error-container` |
| Colors.Schemes.On Error Container | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | `--md-sys-color-on-error-container` |
| Colors.Schemes.Background | `{Colors.Neutral Variant.Shade-062}` | `#FAFAF5` | `--md-sys-color-background` |
| Colors.Schemes.On Background | `{Colors.Neutral.Shade-001}` | `#000000` | `--md-sys-color-on-background` |
| Colors.Schemes.Surface | `{Colors.Neutral Variant.Shade-061}` | `#FAF9F5` | `--md-sys-color-surface` |
| Colors.Schemes.On Surface | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-surface` |
| Colors.Schemes.Surface Variant | `{Colors.Neutral Variant.Shade-050}` | `#E5E7DC` | `--md-sys-color-surface-variant` |
| Colors.Schemes.On Surface Variant | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-surface-variant` |
| Colors.Schemes.Outline | `{Colors.Neutral Variant.Shade-028}` | `#484A44` | `--md-sys-color-outline` |
| Colors.Schemes.Outline Variant | `{Colors.Neutral Variant.Shade-030}` | `#696B64` | `--md-sys-color-outline-variant` |
| Colors.Schemes.Shadow | `{Colors.Neutral.Shade-001}` | `#000000` | `--md-sys-color-shadow` |
| Colors.Schemes.Scrim | `{Colors.Neutral.Shade-001}` | `#000000` | `--md-sys-color-scrim` |
| Colors.Schemes.Inverse Surface | `{Colors.Neutral Variant.Shade-013}` | `#252623` | `--md-sys-color-inverse-surface` |
| Colors.Schemes.Inverse On Surface | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | `--md-sys-color-inverse-on-surface` |
| Colors.Schemes.Inverse Primary | `{Colors.Olive.Shade-019}` | `#D8EB9A` | `--md-sys-color-inverse-primary` |
| Colors.Schemes.Primary Fixed | `{Colors.Olive.Shade-019}` | `#D8EB9A` | `--md-sys-color-primary-fixed` |
| Colors.Schemes.On Primary Fixed | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-primary-fixed` |
| Colors.Schemes.Primary Fixed Dim | `{Colors.Olive.Shade-016}` | `#BCD078` | `--md-sys-color-primary-fixed-dim` |
| Colors.Schemes.On Primary Fixed Variant | `{Colors.Olive.Shade-003}` | `#263000` | `--md-sys-color-on-primary-fixed-variant` |
| Colors.Schemes.Secondary Fixed | `{Colors.Sage.Shade-014}` | `#D9DFBC` | `--md-sys-color-secondary-fixed` |
| Colors.Schemes.On Secondary Fixed | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-secondary-fixed` |
| Colors.Schemes.Secondary Fixed Dim | `{Colors.Sage.Shade-011}` | `#BDC59A` | `--md-sys-color-secondary-fixed-dim` |
| Colors.Schemes.On Secondary Fixed Variant | `{Colors.Sage.Shade-001}` | `#252A14` | `--md-sys-color-on-secondary-fixed-variant` |
| Colors.Schemes.Tertiary Fixed | `{Colors.Mint.Shade-015}` | `#AFF2C4` | `--md-sys-color-tertiary-fixed` |
| Colors.Schemes.On Tertiary Fixed | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-tertiary-fixed` |
| Colors.Schemes.Tertiary Fixed Dim | `{Colors.Mint.Shade-011}` | `#8BD7A8` | `--md-sys-color-tertiary-fixed-dim` |
| Colors.Schemes.On Tertiary Fixed Variant | `{Colors.Mint.Shade-001}` | `#003820` | `--md-sys-color-on-tertiary-fixed-variant` |
| Colors.Schemes.Surface Dim | `{Colors.Neutral Variant.Shade-039}` | `#D0D1CB` | `--md-sys-color-surface-dim` |
| Colors.Schemes.Surface Bright | `{Colors.Neutral Variant.Shade-061}` | `#FAF9F5` | `--md-sys-color-surface-bright` |
| Colors.Schemes.Surface Container Lowest | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | `--md-sys-color-surface-container-lowest` |
| Colors.Schemes.Surface Container Low | `{Colors.Neutral Variant.Shade-057}` | `#F1F1EC` | `--md-sys-color-surface-container-low` |
| Colors.Schemes.Surface Container | `{Colors.Neutral Variant.Shade-052}` | `#E9EAE4` | `--md-sys-color-surface-container` |
| Colors.Schemes.Surface Container High | `{Colors.Neutral Variant.Shade-045}` | `#E0E1DB` | `--md-sys-color-surface-container-high` |
| Colors.Schemes.Surface Container Highest | `{Colors.Neutral Variant.Shade-041}` | `#D7D8D2` | `--md-sys-color-surface-container-highest` |
| Colors.Schemes.Success | `{Colors.Green.Shade-005}` | `#315F05` | — (extension hors MD3) |
| Colors.Schemes.Info | `{Colors.Blue.Shade-004}` | `#003F9E` | — (extension hors MD3) |
| Colors.Schemes.Warning | `{Colors.Amber.Shade-005}` | `#784200` | — (extension hors MD3) |
| Colors.Schemes.On Warning | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | — (extension hors MD3) |
| Colors.Schemes.On Success | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | — (extension hors MD3) |
| Colors.Schemes.On Info | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | — (extension hors MD3) |
| Colors.Schemes.Warning Container | `{Colors.Amber.Shade-007}` | `#844B00` | — (extension hors MD3) |
| Colors.Schemes.On Warning Container | `{Colors.Neutral.Shade-035}` | `#FFFFFF` | — (extension hors MD3) |
| Colors.Schemes.Success Container | `{Colors.Green.Shade-006}` | `#38620C` | — (extension hors MD3) |
| Colors.Schemes.On Success Container | `{Colors.Neutral.Shade-035}` | `#FFFFFF` | — (extension hors MD3) |
| Colors.Schemes.Info Container | `{Colors.Blue.Shade-006}` | `#0050BF` | — (extension hors MD3) |
| Colors.Schemes.On Info Container | `{Colors.Neutral.Shade-035}` | `#FFFFFF` | — (extension hors MD3) |
| Colors.Schemes.Neutral.0 | `{Colors.Neutral.Shade-035}` | `#FFFFFF` | — |
| Colors.Schemes.Neutral.900 | `{Colors.Neutral.Shade-005}` | `#1A1A1A` | — |
| Colors.State Layers.Primary.Opacity-08 | `{Colors.Schemes.Primary}` | `#465900` | `--md-sys-color-primary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Primary.Opacity-10 | `{Colors.Schemes.Primary}` | `#465900` | `--md-sys-color-primary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Primary.Opacity-16 | `{Colors.Schemes.Primary}` | `#465900` | `--md-sys-color-primary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Primary.Opacity-08 | `{Colors.Schemes.On Primary}` | `#FFFFFF` | `--md-sys-color-on-primary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Primary.Opacity-10 | `{Colors.Schemes.On Primary}` | `#FFFFFF` | `--md-sys-color-on-primary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Primary.Opacity-16 | `{Colors.Schemes.On Primary}` | `#FFFFFF` | `--md-sys-color-on-primary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Primary Container.Opacity-08 | `{Colors.Schemes.Primary Container}` | `#4B5B08` | `--md-sys-color-primary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Primary Container.Opacity-10 | `{Colors.Schemes.Primary Container}` | `#4B5B08` | `--md-sys-color-primary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Primary Container.Opacity-16 | `{Colors.Schemes.Primary Container}` | `#4B5B08` | `--md-sys-color-primary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Primary Container.Opacity-08 | `{Colors.Schemes.On Primary Container}` | `#FFFFFF` | `--md-sys-color-on-primary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Primary Container.Opacity-10 | `{Colors.Schemes.On Primary Container}` | `#FFFFFF` | `--md-sys-color-on-primary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Primary Container.Opacity-16 | `{Colors.Schemes.On Primary Container}` | `#FFFFFF` | `--md-sys-color-on-primary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Primary Fixed.Opacity-08 | `{Colors.Schemes.Primary Fixed}` | `#D8EB9A` | `--md-sys-color-primary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Primary Fixed.Opacity-10 | `{Colors.Schemes.Primary Fixed}` | `#D8EB9A` | `--md-sys-color-primary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Primary Fixed.Opacity-16 | `{Colors.Schemes.Primary Fixed}` | `#D8EB9A` | `--md-sys-color-primary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Primary Fixed.Opacity-08 | `{Colors.Schemes.On Primary Fixed}` | `#1A1A1A` | `--md-sys-color-on-primary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Primary Fixed.Opacity-10 | `{Colors.Schemes.On Primary Fixed}` | `#1A1A1A` | `--md-sys-color-on-primary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Primary Fixed.Opacity-16 | `{Colors.Schemes.On Primary Fixed}` | `#1A1A1A` | `--md-sys-color-on-primary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Primary Fixed Dim.Opacity-08 | `{Colors.Schemes.Primary Fixed Dim}` | `#BCD078` | `--md-sys-color-primary-fixed-dim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Primary Fixed Dim.Opacity-10 | `{Colors.Schemes.Primary Fixed Dim}` | `#BCD078` | `--md-sys-color-primary-fixed-dim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Primary Fixed Dim.Opacity-16 | `{Colors.Schemes.Primary Fixed Dim}` | `#BCD078` | `--md-sys-color-primary-fixed-dim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Primary Fixed Variant.Opacity-08 | `{Colors.Schemes.On Primary Fixed Variant}` | `#263000` | `--md-sys-color-on-primary-fixed-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Primary Fixed Variant.Opacity-10 | `{Colors.Schemes.On Primary Fixed Variant}` | `#263000` | `--md-sys-color-on-primary-fixed-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Primary Fixed Variant.Opacity-16 | `{Colors.Schemes.On Primary Fixed Variant}` | `#263000` | `--md-sys-color-on-primary-fixed-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Secondary.Opacity-08 | `{Colors.Schemes.Secondary}` | `#293700` | `--md-sys-color-secondary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Secondary.Opacity-10 | `{Colors.Schemes.Secondary}` | `#293700` | `--md-sys-color-secondary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Secondary.Opacity-16 | `{Colors.Schemes.Secondary}` | `#293700` | `--md-sys-color-secondary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Secondary.Opacity-08 | `{Colors.Schemes.On Secondary}` | `#FFFFFF` | `--md-sys-color-on-secondary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Secondary.Opacity-10 | `{Colors.Schemes.On Secondary}` | `#FFFFFF` | `--md-sys-color-on-secondary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Secondary.Opacity-16 | `{Colors.Schemes.On Secondary}` | `#FFFFFF` | `--md-sys-color-on-secondary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Secondary Container.Opacity-08 | `{Colors.Schemes.Secondary Container}` | `#4C5D23` | `--md-sys-color-secondary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Secondary Container.Opacity-10 | `{Colors.Schemes.Secondary Container}` | `#4C5D23` | `--md-sys-color-secondary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Secondary Container.Opacity-16 | `{Colors.Schemes.Secondary Container}` | `#4C5D23` | `--md-sys-color-secondary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Secondary Container.Opacity-08 | `{Colors.Schemes.On Secondary Container}` | `#FFFFFF` | `--md-sys-color-on-secondary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Secondary Container.Opacity-10 | `{Colors.Schemes.On Secondary Container}` | `#FFFFFF` | `--md-sys-color-on-secondary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Secondary Container.Opacity-16 | `{Colors.Schemes.On Secondary Container}` | `#FFFFFF` | `--md-sys-color-on-secondary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Secondary Fixed.Opacity-08 | `{Colors.Schemes.Secondary Fixed}` | `#D9DFBC` | `--md-sys-color-secondary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Secondary Fixed.Opacity-10 | `{Colors.Schemes.Secondary Fixed}` | `#D9DFBC` | `--md-sys-color-secondary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Secondary Fixed.Opacity-16 | `{Colors.Schemes.Secondary Fixed}` | `#D9DFBC` | `--md-sys-color-secondary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Secondary Fixed.Opacity-08 | `{Colors.Schemes.On Secondary Fixed}` | `#1A1A1A` | `--md-sys-color-on-secondary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Secondary Fixed.Opacity-10 | `{Colors.Schemes.On Secondary Fixed}` | `#1A1A1A` | `--md-sys-color-on-secondary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Secondary Fixed.Opacity-16 | `{Colors.Schemes.On Secondary Fixed}` | `#1A1A1A` | `--md-sys-color-on-secondary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Secondary Fixed Dim.Opacity-08 | `{Colors.Schemes.Secondary Fixed Dim}` | `#BDC59A` | `--md-sys-color-secondary-fixed-dim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Secondary Fixed Dim.Opacity-10 | `{Colors.Schemes.Secondary Fixed Dim}` | `#BDC59A` | `--md-sys-color-secondary-fixed-dim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Secondary Fixed Dim.Opacity-16 | `{Colors.Schemes.Secondary Fixed Dim}` | `#BDC59A` | `--md-sys-color-secondary-fixed-dim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Secondary Fixed Variant.Opacity-08 | `{Colors.Schemes.On Secondary Fixed Variant}` | `#252A14` | `--md-sys-color-on-secondary-fixed-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Secondary Fixed Variant.Opacity-10 | `{Colors.Schemes.On Secondary Fixed Variant}` | `#252A14` | `--md-sys-color-on-secondary-fixed-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Secondary Fixed Variant.Opacity-16 | `{Colors.Schemes.On Secondary Fixed Variant}` | `#252A14` | `--md-sys-color-on-secondary-fixed-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Tertiary.Opacity-08 | `{Colors.Schemes.Tertiary}` | `#005F38` | `--md-sys-color-tertiary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Tertiary.Opacity-10 | `{Colors.Schemes.Tertiary}` | `#005F38` | `--md-sys-color-tertiary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Tertiary.Opacity-16 | `{Colors.Schemes.Tertiary}` | `#005F38` | `--md-sys-color-tertiary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Tertiary.Opacity-08 | `{Colors.Schemes.On Tertiary}` | `#FFFFFF` | `--md-sys-color-on-tertiary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Tertiary.Opacity-10 | `{Colors.Schemes.On Tertiary}` | `#FFFFFF` | `--md-sys-color-on-tertiary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Tertiary.Opacity-16 | `{Colors.Schemes.On Tertiary}` | `#FFFFFF` | `--md-sys-color-on-tertiary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Tertiary Container.Opacity-08 | `{Colors.Schemes.Tertiary Container}` | `#106543` | `--md-sys-color-tertiary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Tertiary Container.Opacity-10 | `{Colors.Schemes.Tertiary Container}` | `#106543` | `--md-sys-color-tertiary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Tertiary Container.Opacity-16 | `{Colors.Schemes.Tertiary Container}` | `#106543` | `--md-sys-color-tertiary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Tertiary Container.Opacity-08 | `{Colors.Schemes.On Tertiary Container}` | `#FFFFFF` | `--md-sys-color-on-tertiary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Tertiary Container.Opacity-10 | `{Colors.Schemes.On Tertiary Container}` | `#FFFFFF` | `--md-sys-color-on-tertiary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Tertiary Container.Opacity-16 | `{Colors.Schemes.On Tertiary Container}` | `#FFFFFF` | `--md-sys-color-on-tertiary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Tertiary Fixed.Opacity-08 | `{Colors.Schemes.Tertiary Fixed}` | `#AFF2C4` | `--md-sys-color-tertiary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Tertiary Fixed.Opacity-10 | `{Colors.Schemes.Tertiary Fixed}` | `#AFF2C4` | `--md-sys-color-tertiary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Tertiary Fixed.Opacity-16 | `{Colors.Schemes.Tertiary Fixed}` | `#AFF2C4` | `--md-sys-color-tertiary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Tertiary Fixed.Opacity-08 | `{Colors.Schemes.On Tertiary Fixed}` | `#1A1A1A` | `--md-sys-color-on-tertiary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Tertiary Fixed.Opacity-10 | `{Colors.Schemes.On Tertiary Fixed}` | `#1A1A1A` | `--md-sys-color-on-tertiary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Tertiary Fixed.Opacity-16 | `{Colors.Schemes.On Tertiary Fixed}` | `#1A1A1A` | `--md-sys-color-on-tertiary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Tertiary Fixed Dim.Opacity-08 | `{Colors.Schemes.Tertiary Fixed Dim}` | `#8BD7A8` | `--md-sys-color-tertiary-fixed-dim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Tertiary Fixed Dim.Opacity-10 | `{Colors.Schemes.Tertiary Fixed Dim}` | `#8BD7A8` | `--md-sys-color-tertiary-fixed-dim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Tertiary Fixed Dim.Opacity-16 | `{Colors.Schemes.Tertiary Fixed Dim}` | `#8BD7A8` | `--md-sys-color-tertiary-fixed-dim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Tertiary Fixed Variant.Opacity-08 | `{Colors.Schemes.On Tertiary Fixed Variant}` | `#003820` | `--md-sys-color-on-tertiary-fixed-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Tertiary Fixed Variant.Opacity-10 | `{Colors.Schemes.On Tertiary Fixed Variant}` | `#003820` | `--md-sys-color-on-tertiary-fixed-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Tertiary Fixed Variant.Opacity-16 | `{Colors.Schemes.On Tertiary Fixed Variant}` | `#003820` | `--md-sys-color-on-tertiary-fixed-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Error.Opacity-08 | `{Colors.Schemes.Error}` | `#74110D` | `--md-sys-color-error` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Error.Opacity-10 | `{Colors.Schemes.Error}` | `#74110D` | `--md-sys-color-error` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Error.Opacity-16 | `{Colors.Schemes.Error}` | `#74110D` | `--md-sys-color-error` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Error.Opacity-08 | `{Colors.Schemes.On Error}` | `#FFFFFF` | `--md-sys-color-on-error` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Error.Opacity-10 | `{Colors.Schemes.On Error}` | `#FFFFFF` | `--md-sys-color-on-error` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Error.Opacity-16 | `{Colors.Schemes.On Error}` | `#FFFFFF` | `--md-sys-color-on-error` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Error Container.Opacity-08 | `{Colors.Schemes.Error Container}` | `#A52A23` | `--md-sys-color-error-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Error Container.Opacity-10 | `{Colors.Schemes.Error Container}` | `#A52A23` | `--md-sys-color-error-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Error Container.Opacity-16 | `{Colors.Schemes.Error Container}` | `#A52A23` | `--md-sys-color-error-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Error Container.Opacity-08 | `{Colors.Schemes.On Error Container}` | `#FFFFFF` | `--md-sys-color-on-error-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Error Container.Opacity-10 | `{Colors.Schemes.On Error Container}` | `#FFFFFF` | `--md-sys-color-on-error-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Error Container.Opacity-16 | `{Colors.Schemes.On Error Container}` | `#FFFFFF` | `--md-sys-color-on-error-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Outline.Opacity-08 | `{Colors.Schemes.Outline}` | `#484A44` | `--md-sys-color-outline` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Outline.Opacity-10 | `{Colors.Schemes.Outline}` | `#484A44` | `--md-sys-color-outline` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Outline.Opacity-16 | `{Colors.Schemes.Outline}` | `#484A44` | `--md-sys-color-outline` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Background.Opacity-08 | `{Colors.Schemes.Background}` | `#FAFAF5` | `--md-sys-color-background` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Background.Opacity-10 | `{Colors.Schemes.Background}` | `#FAFAF5` | `--md-sys-color-background` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Background.Opacity-16 | `{Colors.Schemes.Background}` | `#FAFAF5` | `--md-sys-color-background` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Background.Opacity-08 | `{Colors.Schemes.On Background}` | `#000000` | `--md-sys-color-on-background` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Background.Opacity-10 | `{Colors.Schemes.On Background}` | `#000000` | `--md-sys-color-on-background` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Background.Opacity-16 | `{Colors.Schemes.On Background}` | `#000000` | `--md-sys-color-on-background` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface.Opacity-08 | `{Colors.Schemes.Surface}` | `#FAF9F5` | `--md-sys-color-surface` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface.Opacity-10 | `{Colors.Schemes.Surface}` | `#FAF9F5` | `--md-sys-color-surface` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface.Opacity-16 | `{Colors.Schemes.Surface}` | `#FAF9F5` | `--md-sys-color-surface` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Surface.Opacity-08 | `{Colors.Schemes.On Surface}` | `#1A1A1A` | `--md-sys-color-on-surface` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Surface.Opacity-10 | `{Colors.Schemes.On Surface}` | `#1A1A1A` | `--md-sys-color-on-surface` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Surface.Opacity-16 | `{Colors.Schemes.On Surface}` | `#1A1A1A` | `--md-sys-color-on-surface` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Variant.Opacity-08 | `{Colors.Schemes.Surface Variant}` | `#E5E7DC` | `--md-sys-color-surface-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Variant.Opacity-10 | `{Colors.Schemes.Surface Variant}` | `#E5E7DC` | `--md-sys-color-surface-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Variant.Opacity-16 | `{Colors.Schemes.Surface Variant}` | `#E5E7DC` | `--md-sys-color-surface-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Surface Variant.Opacity-08 | `{Colors.Schemes.On Surface Variant}` | `#1A1A1A` | `--md-sys-color-on-surface-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Surface Variant.Opacity-10 | `{Colors.Schemes.On Surface Variant}` | `#1A1A1A` | `--md-sys-color-on-surface-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Surface Variant.Opacity-16 | `{Colors.Schemes.On Surface Variant}` | `#1A1A1A` | `--md-sys-color-on-surface-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Inverse Surface.Opacity-08 | `{Colors.Schemes.Inverse Surface}` | `#252623` | `--md-sys-color-inverse-surface` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Inverse Surface.Opacity-10 | `{Colors.Schemes.Inverse Surface}` | `#252623` | `--md-sys-color-inverse-surface` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Inverse Surface.Opacity-16 | `{Colors.Schemes.Inverse Surface}` | `#252623` | `--md-sys-color-inverse-surface` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Inverse On Surface.Opacity-08 | `{Colors.Schemes.Inverse On Surface}` | `#FFFFFF` | `--md-sys-color-inverse-on-surface` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Inverse On Surface.Opacity-10 | `{Colors.Schemes.Inverse On Surface}` | `#FFFFFF` | `--md-sys-color-inverse-on-surface` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Inverse On Surface.Opacity-16 | `{Colors.Schemes.Inverse On Surface}` | `#FFFFFF` | `--md-sys-color-inverse-on-surface` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Inverse Primary.Opacity-08 | `{Colors.Schemes.Inverse Primary}` | `#D8EB9A` | `--md-sys-color-inverse-primary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Inverse Primary.Opacity-10 | `{Colors.Schemes.Inverse Primary}` | `#D8EB9A` | `--md-sys-color-inverse-primary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Inverse Primary.Opacity-16 | `{Colors.Schemes.Inverse Primary}` | `#D8EB9A` | `--md-sys-color-inverse-primary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Shadow.Opacity-08 | `{Colors.Schemes.Shadow}` | `#000000` | `--md-sys-color-shadow` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Shadow.Opacity-10 | `{Colors.Schemes.Shadow}` | `#000000` | `--md-sys-color-shadow` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Shadow.Opacity-16 | `{Colors.Schemes.Shadow}` | `#000000` | `--md-sys-color-shadow` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Tint.Opacity-08 | `{Colors.Schemes.Surface Tint}` | `#253000` | `--md-sys-color-surface-tint` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Tint.Opacity-10 | `{Colors.Schemes.Surface Tint}` | `#253000` | `--md-sys-color-surface-tint` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Tint.Opacity-16 | `{Colors.Schemes.Surface Tint}` | `#253000` | `--md-sys-color-surface-tint` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Outline Variant.Opacity-08 | `{Colors.Schemes.Outline Variant}` | `#696B64` | `--md-sys-color-outline-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Outline Variant.Opacity-10 | `{Colors.Schemes.Outline Variant}` | `#696B64` | `--md-sys-color-outline-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Outline Variant.Opacity-16 | `{Colors.Schemes.Outline Variant}` | `#696B64` | `--md-sys-color-outline-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Scrim.Opacity-08 | `{Colors.Schemes.Scrim}` | `#000000` | `--md-sys-color-scrim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Scrim.Opacity-10 | `{Colors.Schemes.Scrim}` | `#000000` | `--md-sys-color-scrim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Scrim.Opacity-16 | `{Colors.Schemes.Scrim}` | `#000000` | `--md-sys-color-scrim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container Highest.Opacity-08 | `{Colors.Schemes.Surface Container Highest}` | `#D7D8D2` | `--md-sys-color-surface-container-highest` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container Highest.Opacity-10 | `{Colors.Schemes.Surface Container Highest}` | `#D7D8D2` | `--md-sys-color-surface-container-highest` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container Highest.Opacity-16 | `{Colors.Schemes.Surface Container Highest}` | `#D7D8D2` | `--md-sys-color-surface-container-highest` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container High.Opacity-08 | `{Colors.Schemes.Surface Container High}` | `#E0E1DB` | `--md-sys-color-surface-container-high` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container High.Opacity-10 | `{Colors.Schemes.Surface Container High}` | `#E0E1DB` | `--md-sys-color-surface-container-high` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container High.Opacity-16 | `{Colors.Schemes.Surface Container High}` | `#E0E1DB` | `--md-sys-color-surface-container-high` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container.Opacity-08 | `{Colors.Schemes.Surface Container}` | `#E9EAE4` | `--md-sys-color-surface-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container.Opacity-10 | `{Colors.Schemes.Surface Container}` | `#E9EAE4` | `--md-sys-color-surface-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container.Opacity-16 | `{Colors.Schemes.Surface Container}` | `#E9EAE4` | `--md-sys-color-surface-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container Low.Opacity-08 | `{Colors.Schemes.Surface Container Low}` | `#F1F1EC` | `--md-sys-color-surface-container-low` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container Low.Opacity-10 | `{Colors.Schemes.Surface Container Low}` | `#F1F1EC` | `--md-sys-color-surface-container-low` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container Low.Opacity-16 | `{Colors.Schemes.Surface Container Low}` | `#F1F1EC` | `--md-sys-color-surface-container-low` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container Lowest.Opacity-08 | `{Colors.Schemes.Surface Container Lowest}` | `#FFFFFF` | `--md-sys-color-surface-container-lowest` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container Lowest.Opacity-10 | `{Colors.Schemes.Surface Container Lowest}` | `#FFFFFF` | `--md-sys-color-surface-container-lowest` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container Lowest.Opacity-16 | `{Colors.Schemes.Surface Container Lowest}` | `#FFFFFF` | `--md-sys-color-surface-container-lowest` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Bright.Opacity-08 | `{Colors.Schemes.Surface Bright}` | `#FAF9F5` | `--md-sys-color-surface-bright` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Bright.Opacity-10 | `{Colors.Schemes.Surface Bright}` | `#FAF9F5` | `--md-sys-color-surface-bright` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Bright.Opacity-16 | `{Colors.Schemes.Surface Bright}` | `#FAF9F5` | `--md-sys-color-surface-bright` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Dim.Opacity-08 | `{Colors.Schemes.Surface Dim}` | `#D0D1CB` | `--md-sys-color-surface-dim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Dim.Opacity-10 | `{Colors.Schemes.Surface Dim}` | `#D0D1CB` | `--md-sys-color-surface-dim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Dim.Opacity-16 | `{Colors.Schemes.Surface Dim}` | `#D0D1CB` | `--md-sys-color-surface-dim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.Add-ons.Section background | `{Colors.Neutral.Shade-033}` | `#F5F5F5` | — (extension hors MD3) |
| Typescale.Static.Display Large.Size | `57px` | `57px` | `--md-sys-typescale-display-large-size` |
| Typescale.Static.Display Large.Tracking | `-0.25px` | `-0.25px` | `--md-sys-typescale-display-large-tracking` |
| Typescale.Static.Display Large.Line Height | `64px` | `64px` | `--md-sys-typescale-display-large-line-height` |
| Typescale.Static.Display Large.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-display-large-font` |
| Typescale.Static.Display Large.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-display-large-weight` |
| Typescale.Static.Display Large.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-display-large-weight` (MD3 Expressive) |
| Typescale.Static.Display Medium.Size | `45px` | `45px` | `--md-sys-typescale-display-medium-size` |
| Typescale.Static.Display Medium.Line Height | `52px` | `52px` | `--md-sys-typescale-display-medium-line-height` |
| Typescale.Static.Display Medium.Tracking | `0px` | `0px` | `--md-sys-typescale-display-medium-tracking` |
| Typescale.Static.Display Medium.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-display-medium-font` |
| Typescale.Static.Display Medium.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-display-medium-weight` |
| Typescale.Static.Display Medium.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-display-medium-weight` (MD3 Expressive) |
| Typescale.Static.Display Small.Size | `36px` | `36px` | `--md-sys-typescale-display-small-size` |
| Typescale.Static.Display Small.Tracking | `0px` | `0px` | `--md-sys-typescale-display-small-tracking` |
| Typescale.Static.Display Small.Line Height | `44px` | `44px` | `--md-sys-typescale-display-small-line-height` |
| Typescale.Static.Display Small.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-display-small-font` |
| Typescale.Static.Display Small.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-display-small-weight` |
| Typescale.Static.Display Small.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-display-small-weight` (MD3 Expressive) |
| Typescale.Static.Headline Large.Size | `32px` | `32px` | `--md-sys-typescale-headline-large-size` |
| Typescale.Static.Headline Large.Tracking | `0px` | `0px` | `--md-sys-typescale-headline-large-tracking` |
| Typescale.Static.Headline Large.Line Height | `40px` | `40px` | `--md-sys-typescale-headline-large-line-height` |
| Typescale.Static.Headline Large.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-headline-large-font` |
| Typescale.Static.Headline Large.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-headline-large-weight` |
| Typescale.Static.Headline Large.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-headline-large-weight` (MD3 Expressive) |
| Typescale.Static.Headline Medium.Size | `28px` | `28px` | `--md-sys-typescale-headline-medium-size` |
| Typescale.Static.Headline Medium.Tracking | `0px` | `0px` | `--md-sys-typescale-headline-medium-tracking` |
| Typescale.Static.Headline Medium.Line Height | `36px` | `36px` | `--md-sys-typescale-headline-medium-line-height` |
| Typescale.Static.Headline Medium.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-headline-medium-font` |
| Typescale.Static.Headline Medium.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-headline-medium-weight` |
| Typescale.Static.Headline Medium.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-headline-medium-weight` (MD3 Expressive) |
| Typescale.Static.Headline Small.Size | `24px` | `24px` | `--md-sys-typescale-headline-small-size` |
| Typescale.Static.Headline Small.Tracking | `0px` | `0px` | `--md-sys-typescale-headline-small-tracking` |
| Typescale.Static.Headline Small.Line Height | `32px` | `32px` | `--md-sys-typescale-headline-small-line-height` |
| Typescale.Static.Headline Small.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-headline-small-font` |
| Typescale.Static.Headline Small.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-headline-small-weight` |
| Typescale.Static.Headline Small.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-headline-small-weight` (MD3 Expressive) |
| Typescale.Static.Title Large.Size | `22px` | `22px` | `--md-sys-typescale-title-large-size` |
| Typescale.Static.Title Large.Tracking | `0px` | `0px` | `--md-sys-typescale-title-large-tracking` |
| Typescale.Static.Title Large.Line Height | `28px` | `28px` | `--md-sys-typescale-title-large-line-height` |
| Typescale.Static.Title Large.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-title-large-font` |
| Typescale.Static.Title Large.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-title-large-weight` |
| Typescale.Static.Title Large.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-title-large-weight` (MD3 Expressive) |
| Typescale.Static.Title Medium.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-title-medium-font` |
| Typescale.Static.Title Medium.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-title-medium-weight` |
| Typescale.Static.Title Medium.Size | `16px` | `16px` | `--md-sys-typescale-title-medium-size` |
| Typescale.Static.Title Medium.Tracking | `0.15000000596046448px` | `0.15000000596046448px` | `--md-sys-typescale-title-medium-tracking` |
| Typescale.Static.Title Medium.Line Height | `24px` | `24px` | `--md-sys-typescale-title-medium-line-height` |
| Typescale.Static.Title Medium.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-emphasized-title-medium-weight` (MD3 Expressive) |
| Typescale.Static.Title Small.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-title-small-font` |
| Typescale.Static.Title Small.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-title-small-weight` |
| Typescale.Static.Title Small.Size | `14px` | `14px` | `--md-sys-typescale-title-small-size` |
| Typescale.Static.Title Small.Tracking | `0.10000000149011612px` | `0.10000000149011612px` | `--md-sys-typescale-title-small-tracking` |
| Typescale.Static.Title Small.Line Height | `20px` | `20px` | `--md-sys-typescale-title-small-line-height` |
| Typescale.Static.Title Small.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-emphasized-title-small-weight` (MD3 Expressive) |
| Typescale.Static.Label Large.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-label-large-font` |
| Typescale.Static.Label Large.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-label-large-weight` |
| Typescale.Static.Label Large.Size | `14px` | `14px` | `--md-sys-typescale-label-large-size` |
| Typescale.Static.Label Large.Tracking | `0.10000000149011612px` | `0.10000000149011612px` | `--md-sys-typescale-label-large-tracking` |
| Typescale.Static.Label Large.Line Height | `20px` | `20px` | `--md-sys-typescale-label-large-line-height` |
| Typescale.Static.Label Large.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-label-large-weight-prominent` |
| Typescale.Static.Label Medium.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-label-medium-font` |
| Typescale.Static.Label Medium.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-label-medium-weight` |
| Typescale.Static.Label Medium.Size | `12px` | `12px` | `--md-sys-typescale-label-medium-size` |
| Typescale.Static.Label Medium.Tracking | `0.5px` | `0.5px` | `--md-sys-typescale-label-medium-tracking` |
| Typescale.Static.Label Medium.Line Height | `16px` | `16px` | `--md-sys-typescale-label-medium-line-height` |
| Typescale.Static.Label Medium.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-label-medium-weight-prominent` |
| Typescale.Static.Label Small.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-label-small-font` |
| Typescale.Static.Label Small.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-label-small-weight` |
| Typescale.Static.Label Small.Size | `11px` | `11px` | `--md-sys-typescale-label-small-size` |
| Typescale.Static.Label Small.Tracking | `0.5px` | `0.5px` | `--md-sys-typescale-label-small-tracking` |
| Typescale.Static.Label Small.Line Height | `16px` | `16px` | `--md-sys-typescale-label-small-line-height` |
| Typescale.Static.Label Small.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-emphasized-label-small-weight` (MD3 Expressive) |
| Typescale.Static.Body Large.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-body-large-font` |
| Typescale.Static.Body Large.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-body-large-weight` |
| Typescale.Static.Body Large.Size | `16px` | `16px` | `--md-sys-typescale-body-large-size` |
| Typescale.Static.Body Large.Tracking | `0.5px` | `0.5px` | `--md-sys-typescale-body-large-tracking` |
| Typescale.Static.Body Large.Line Height | `24px` | `24px` | `--md-sys-typescale-body-large-line-height` |
| Typescale.Static.Body Large.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-body-large-weight` (MD3 Expressive) |
| Typescale.Static.Body Medium.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-body-medium-font` |
| Typescale.Static.Body Medium.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-body-medium-weight` |
| Typescale.Static.Body Medium.Size | `14px` | `14px` | `--md-sys-typescale-body-medium-size` |
| Typescale.Static.Body Medium.Tracking | `0.25px` | `0.25px` | `--md-sys-typescale-body-medium-tracking` |
| Typescale.Static.Body Medium.Line Height | `20px` | `20px` | `--md-sys-typescale-body-medium-line-height` |
| Typescale.Static.Body Medium.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-body-medium-weight` (MD3 Expressive) |
| Typescale.Static.Body Small.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-body-small-font` |
| Typescale.Static.Body Small.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-body-small-weight` |
| Typescale.Static.Body Small.Size | `12px` | `12px` | `--md-sys-typescale-body-small-size` |
| Typescale.Static.Body Small.Tracking | `0.4000000059604645px` | `0.4000000059604645px` | `--md-sys-typescale-body-small-tracking` |
| Typescale.Static.Body Small.Line Height | `16px` | `16px` | `--md-sys-typescale-body-small-line-height` |
| Typescale.Static.Body Small.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-body-small-weight` (MD3 Expressive) |

## semantics/light-medium-contrast.tokens.json

| Variable | Valeur | Valeur résolue | Équivalent MD3 |
|---|---|---|---|
| Colors.Schemes.Primary | `{Colors.Olive.Shade-011}` | `#657C08` | `--md-sys-color-primary` |
| Colors.Schemes.Surface Tint | `{Colors.Olive.Shade-004}` | `#2E3B00` | `--md-sys-color-surface-tint` |
| Colors.Schemes.On Primary | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | `--md-sys-color-on-primary` |
| Colors.Schemes.Primary Container | `{Colors.Olive.Shade-014}` | `#AFC75E` | `--md-sys-color-primary-container` |
| Colors.Schemes.On Primary Container | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-primary-container` |
| Colors.Schemes.Secondary | `{Colors.Sage.Shade-005}` | `#354500` | `--md-sys-color-secondary` |
| Colors.Schemes.On Secondary | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | `--md-sys-color-on-secondary` |
| Colors.Schemes.Secondary Container | `{Colors.Sage.Shade-012}` | `#BEC79E` | `--md-sys-color-secondary-container` |
| Colors.Schemes.On Secondary Container | `{Colors.Sage.Shade-001}` | `#252A14` | `--md-sys-color-on-secondary-container` |
| Colors.Schemes.Tertiary | `{Colors.Mint.Shade-009}` | `#087A4C` | `--md-sys-color-tertiary` |
| Colors.Schemes.On Tertiary | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | `--md-sys-color-on-tertiary` |
| Colors.Schemes.Tertiary Container | `{Colors.Mint.Shade-012}` | `#8DDBAA` | `--md-sys-color-tertiary-container` |
| Colors.Schemes.On Tertiary Container | `{Colors.Mint.Shade-001}` | `#003820` | `--md-sys-color-on-tertiary-container` |
| Colors.Schemes.Error | `{Colors.Red.Shade-006}` | `#8C1D18` | `--md-sys-color-error` |
| Colors.Schemes.On Error | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | `--md-sys-color-on-error` |
| Colors.Schemes.Error Container | `{Colors.Red.Shade-012}` | `#F5C7C3` | `--md-sys-color-error-container` |
| Colors.Schemes.On Error Container | `{Colors.Red.Shade-002}` | `#641713` | `--md-sys-color-on-error-container` |
| Colors.Schemes.Background | `{Colors.Neutral Variant.Shade-062}` | `#FAFAF5` | `--md-sys-color-background` |
| Colors.Schemes.On Background | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-background` |
| Colors.Schemes.Surface | `{Colors.Neutral Variant.Shade-061}` | `#FAF9F5` | `--md-sys-color-surface` |
| Colors.Schemes.On Surface | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-surface` |
| Colors.Schemes.Surface Variant | `{Colors.Neutral Variant.Shade-050}` | `#E5E7DC` | `--md-sys-color-surface-variant` |
| Colors.Schemes.On Surface Variant | `{Colors.Neutral Variant.Shade-023}` | `#383A35` | `--md-sys-color-on-surface-variant` |
| Colors.Schemes.Outline | `{Colors.Neutral Variant.Shade-029}` | `#656760` | `--md-sys-color-outline` |
| Colors.Schemes.Outline Variant | `{Colors.Neutral Variant.Shade-034}` | `#9A9C94` | `--md-sys-color-outline-variant` |
| Colors.Schemes.Shadow | `{Colors.Neutral.Shade-001}` | `#000000` | `--md-sys-color-shadow` |
| Colors.Schemes.Scrim | `{Colors.Neutral.Shade-001}` | `#000000` | `--md-sys-color-scrim` |
| Colors.Schemes.Inverse Surface | `{Colors.Neutral Variant.Shade-018}` | `#30322B` | `--md-sys-color-inverse-surface` |
| Colors.Schemes.Inverse On Surface | `{Colors.Neutral Variant.Shade-058}` | `#F1F2EA` | `--md-sys-color-inverse-on-surface` |
| Colors.Schemes.Inverse Primary | `{Colors.Olive.Shade-018}` | `#D2E594` | `--md-sys-color-inverse-primary` |
| Colors.Schemes.Primary Fixed | `{Colors.Olive.Shade-019}` | `#D8EB9A` | `--md-sys-color-primary-fixed` |
| Colors.Schemes.On Primary Fixed | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-primary-fixed` |
| Colors.Schemes.Primary Fixed Dim | `{Colors.Olive.Shade-016}` | `#BCD078` | `--md-sys-color-primary-fixed-dim` |
| Colors.Schemes.On Primary Fixed Variant | `{Colors.Olive.Shade-005}` | `#303B08` | `--md-sys-color-on-primary-fixed-variant` |
| Colors.Schemes.Secondary Fixed | `{Colors.Sage.Shade-014}` | `#D9DFBC` | `--md-sys-color-secondary-fixed` |
| Colors.Schemes.On Secondary Fixed | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-secondary-fixed` |
| Colors.Schemes.Secondary Fixed Dim | `{Colors.Sage.Shade-011}` | `#BDC59A` | `--md-sys-color-secondary-fixed-dim` |
| Colors.Schemes.On Secondary Fixed Variant | `{Colors.Sage.Shade-004}` | `#30351F` | `--md-sys-color-on-secondary-fixed-variant` |
| Colors.Schemes.Tertiary Fixed | `{Colors.Mint.Shade-015}` | `#AFF2C4` | `--md-sys-color-tertiary-fixed` |
| Colors.Schemes.On Tertiary Fixed | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-tertiary-fixed` |
| Colors.Schemes.Tertiary Fixed Dim | `{Colors.Mint.Shade-011}` | `#8BD7A8` | `--md-sys-color-tertiary-fixed-dim` |
| Colors.Schemes.On Tertiary Fixed Variant | `{Colors.Mint.Shade-004}` | `#064B30` | `--md-sys-color-on-tertiary-fixed-variant` |
| Colors.Schemes.Surface Dim | `{Colors.Neutral Variant.Shade-041}` | `#D7D8D2` | `--md-sys-color-surface-dim` |
| Colors.Schemes.Surface Bright | `{Colors.Neutral Variant.Shade-061}` | `#FAF9F5` | `--md-sys-color-surface-bright` |
| Colors.Schemes.Surface Container Lowest | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | `--md-sys-color-surface-container-lowest` |
| Colors.Schemes.Surface Container Low | `{Colors.Neutral Variant.Shade-059}` | `#F3F3EE` | `--md-sys-color-surface-container-low` |
| Colors.Schemes.Surface Container | `{Colors.Neutral Variant.Shade-053}` | `#EBECE6` | `--md-sys-color-surface-container` |
| Colors.Schemes.Surface Container High | `{Colors.Neutral Variant.Shade-049}` | `#E4E5DF` | `--md-sys-color-surface-container-high` |
| Colors.Schemes.Surface Container Highest | `{Colors.Neutral Variant.Shade-044}` | `#DCDED7` | `--md-sys-color-surface-container-highest` |
| Colors.Schemes.Success | `{Colors.Green.Shade-008}` | `#467F0C` | — (extension hors MD3) |
| Colors.Schemes.Info | `{Colors.Blue.Shade-008}` | `#0054D1` | — (extension hors MD3) |
| Colors.Schemes.Warning | `{Colors.Amber.Shade-008}` | `#A85F00` | — (extension hors MD3) |
| Colors.Schemes.On Warning | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | — (extension hors MD3) |
| Colors.Schemes.On Success | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | — (extension hors MD3) |
| Colors.Schemes.On Info | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | — (extension hors MD3) |
| Colors.Schemes.Warning Container | `{Colors.Amber.Shade-012}` | `#FFD39A` | — (extension hors MD3) |
| Colors.Schemes.On Warning Container | `{Colors.Amber.Shade-002}` | `#512F00` | — (extension hors MD3) |
| Colors.Schemes.Success Container | `{Colors.Green.Shade-012}` | `#C8E8A5` | — (extension hors MD3) |
| Colors.Schemes.On Success Container | `{Colors.Green.Shade-002}` | `#274D05` | — (extension hors MD3) |
| Colors.Schemes.Info Container | `{Colors.Blue.Shade-013}` | `#C3D6FF` | — (extension hors MD3) |
| Colors.Schemes.On Info Container | `{Colors.Blue.Shade-002}` | `#003A88` | — (extension hors MD3) |
| Colors.Schemes.Neutral.0 | `{Colors.Neutral.Shade-035}` | `#FFFFFF` | — |
| Colors.Schemes.Neutral.900 | `{Colors.Neutral.Shade-005}` | `#1A1A1A` | — |
| Colors.State Layers.Primary.Opacity-08 | `{Colors.Schemes.Primary}` | `#657C08` | `--md-sys-color-primary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Primary.Opacity-10 | `{Colors.Schemes.Primary}` | `#657C08` | `--md-sys-color-primary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Primary.Opacity-16 | `{Colors.Schemes.Primary}` | `#657C08` | `--md-sys-color-primary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Primary.Opacity-08 | `{Colors.Schemes.On Primary}` | `#FFFFFF` | `--md-sys-color-on-primary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Primary.Opacity-10 | `{Colors.Schemes.On Primary}` | `#FFFFFF` | `--md-sys-color-on-primary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Primary.Opacity-16 | `{Colors.Schemes.On Primary}` | `#FFFFFF` | `--md-sys-color-on-primary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Primary Container.Opacity-08 | `{Colors.Schemes.Primary Container}` | `#AFC75E` | `--md-sys-color-primary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Primary Container.Opacity-10 | `{Colors.Schemes.Primary Container}` | `#AFC75E` | `--md-sys-color-primary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Primary Container.Opacity-16 | `{Colors.Schemes.Primary Container}` | `#AFC75E` | `--md-sys-color-primary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Primary Container.Opacity-08 | `{Colors.Schemes.On Primary Container}` | `#1A1A1A` | `--md-sys-color-on-primary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Primary Container.Opacity-10 | `{Colors.Schemes.On Primary Container}` | `#1A1A1A` | `--md-sys-color-on-primary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Primary Container.Opacity-16 | `{Colors.Schemes.On Primary Container}` | `#1A1A1A` | `--md-sys-color-on-primary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Primary Fixed.Opacity-08 | `{Colors.Schemes.Primary Fixed}` | `#D8EB9A` | `--md-sys-color-primary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Primary Fixed.Opacity-10 | `{Colors.Schemes.Primary Fixed}` | `#D8EB9A` | `--md-sys-color-primary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Primary Fixed.Opacity-16 | `{Colors.Schemes.Primary Fixed}` | `#D8EB9A` | `--md-sys-color-primary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Primary Fixed.Opacity-08 | `{Colors.Schemes.On Primary Fixed}` | `#1A1A1A` | `--md-sys-color-on-primary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Primary Fixed.Opacity-10 | `{Colors.Schemes.On Primary Fixed}` | `#1A1A1A` | `--md-sys-color-on-primary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Primary Fixed.Opacity-16 | `{Colors.Schemes.On Primary Fixed}` | `#1A1A1A` | `--md-sys-color-on-primary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Primary Fixed Dim.Opacity-08 | `{Colors.Schemes.Primary Fixed Dim}` | `#BCD078` | `--md-sys-color-primary-fixed-dim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Primary Fixed Dim.Opacity-10 | `{Colors.Schemes.Primary Fixed Dim}` | `#BCD078` | `--md-sys-color-primary-fixed-dim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Primary Fixed Dim.Opacity-16 | `{Colors.Schemes.Primary Fixed Dim}` | `#BCD078` | `--md-sys-color-primary-fixed-dim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Primary Fixed Variant.Opacity-08 | `{Colors.Schemes.On Primary Fixed Variant}` | `#303B08` | `--md-sys-color-on-primary-fixed-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Primary Fixed Variant.Opacity-10 | `{Colors.Schemes.On Primary Fixed Variant}` | `#303B08` | `--md-sys-color-on-primary-fixed-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Primary Fixed Variant.Opacity-16 | `{Colors.Schemes.On Primary Fixed Variant}` | `#303B08` | `--md-sys-color-on-primary-fixed-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Secondary.Opacity-08 | `{Colors.Schemes.Secondary}` | `#354500` | `--md-sys-color-secondary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Secondary.Opacity-10 | `{Colors.Schemes.Secondary}` | `#354500` | `--md-sys-color-secondary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Secondary.Opacity-16 | `{Colors.Schemes.Secondary}` | `#354500` | `--md-sys-color-secondary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Secondary.Opacity-08 | `{Colors.Schemes.On Secondary}` | `#FFFFFF` | `--md-sys-color-on-secondary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Secondary.Opacity-10 | `{Colors.Schemes.On Secondary}` | `#FFFFFF` | `--md-sys-color-on-secondary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Secondary.Opacity-16 | `{Colors.Schemes.On Secondary}` | `#FFFFFF` | `--md-sys-color-on-secondary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Secondary Container.Opacity-08 | `{Colors.Schemes.Secondary Container}` | `#BEC79E` | `--md-sys-color-secondary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Secondary Container.Opacity-10 | `{Colors.Schemes.Secondary Container}` | `#BEC79E` | `--md-sys-color-secondary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Secondary Container.Opacity-16 | `{Colors.Schemes.Secondary Container}` | `#BEC79E` | `--md-sys-color-secondary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Secondary Container.Opacity-08 | `{Colors.Schemes.On Secondary Container}` | `#252A14` | `--md-sys-color-on-secondary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Secondary Container.Opacity-10 | `{Colors.Schemes.On Secondary Container}` | `#252A14` | `--md-sys-color-on-secondary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Secondary Container.Opacity-16 | `{Colors.Schemes.On Secondary Container}` | `#252A14` | `--md-sys-color-on-secondary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Secondary Fixed.Opacity-08 | `{Colors.Schemes.Secondary Fixed}` | `#D9DFBC` | `--md-sys-color-secondary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Secondary Fixed.Opacity-10 | `{Colors.Schemes.Secondary Fixed}` | `#D9DFBC` | `--md-sys-color-secondary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Secondary Fixed.Opacity-16 | `{Colors.Schemes.Secondary Fixed}` | `#D9DFBC` | `--md-sys-color-secondary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Secondary Fixed.Opacity-08 | `{Colors.Schemes.On Secondary Fixed}` | `#1A1A1A` | `--md-sys-color-on-secondary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Secondary Fixed.Opacity-10 | `{Colors.Schemes.On Secondary Fixed}` | `#1A1A1A` | `--md-sys-color-on-secondary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Secondary Fixed.Opacity-16 | `{Colors.Schemes.On Secondary Fixed}` | `#1A1A1A` | `--md-sys-color-on-secondary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Secondary Fixed Dim.Opacity-08 | `{Colors.Schemes.Secondary Fixed Dim}` | `#BDC59A` | `--md-sys-color-secondary-fixed-dim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Secondary Fixed Dim.Opacity-10 | `{Colors.Schemes.Secondary Fixed Dim}` | `#BDC59A` | `--md-sys-color-secondary-fixed-dim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Secondary Fixed Dim.Opacity-16 | `{Colors.Schemes.Secondary Fixed Dim}` | `#BDC59A` | `--md-sys-color-secondary-fixed-dim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Secondary Fixed Variant.Opacity-08 | `{Colors.Schemes.On Secondary Fixed Variant}` | `#30351F` | `--md-sys-color-on-secondary-fixed-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Secondary Fixed Variant.Opacity-10 | `{Colors.Schemes.On Secondary Fixed Variant}` | `#30351F` | `--md-sys-color-on-secondary-fixed-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Secondary Fixed Variant.Opacity-16 | `{Colors.Schemes.On Secondary Fixed Variant}` | `#30351F` | `--md-sys-color-on-secondary-fixed-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Tertiary.Opacity-08 | `{Colors.Schemes.Tertiary}` | `#087A4C` | `--md-sys-color-tertiary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Tertiary.Opacity-10 | `{Colors.Schemes.Tertiary}` | `#087A4C` | `--md-sys-color-tertiary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Tertiary.Opacity-16 | `{Colors.Schemes.Tertiary}` | `#087A4C` | `--md-sys-color-tertiary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Tertiary.Opacity-08 | `{Colors.Schemes.On Tertiary}` | `#FFFFFF` | `--md-sys-color-on-tertiary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Tertiary.Opacity-10 | `{Colors.Schemes.On Tertiary}` | `#FFFFFF` | `--md-sys-color-on-tertiary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Tertiary.Opacity-16 | `{Colors.Schemes.On Tertiary}` | `#FFFFFF` | `--md-sys-color-on-tertiary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Tertiary Container.Opacity-08 | `{Colors.Schemes.Tertiary Container}` | `#8DDBAA` | `--md-sys-color-tertiary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Tertiary Container.Opacity-10 | `{Colors.Schemes.Tertiary Container}` | `#8DDBAA` | `--md-sys-color-tertiary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Tertiary Container.Opacity-16 | `{Colors.Schemes.Tertiary Container}` | `#8DDBAA` | `--md-sys-color-tertiary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Tertiary Container.Opacity-08 | `{Colors.Schemes.On Tertiary Container}` | `#003820` | `--md-sys-color-on-tertiary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Tertiary Container.Opacity-10 | `{Colors.Schemes.On Tertiary Container}` | `#003820` | `--md-sys-color-on-tertiary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Tertiary Container.Opacity-16 | `{Colors.Schemes.On Tertiary Container}` | `#003820` | `--md-sys-color-on-tertiary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Tertiary Fixed.Opacity-08 | `{Colors.Schemes.Tertiary Fixed}` | `#AFF2C4` | `--md-sys-color-tertiary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Tertiary Fixed.Opacity-10 | `{Colors.Schemes.Tertiary Fixed}` | `#AFF2C4` | `--md-sys-color-tertiary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Tertiary Fixed.Opacity-16 | `{Colors.Schemes.Tertiary Fixed}` | `#AFF2C4` | `--md-sys-color-tertiary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Tertiary Fixed.Opacity-08 | `{Colors.Schemes.On Tertiary Fixed}` | `#1A1A1A` | `--md-sys-color-on-tertiary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Tertiary Fixed.Opacity-10 | `{Colors.Schemes.On Tertiary Fixed}` | `#1A1A1A` | `--md-sys-color-on-tertiary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Tertiary Fixed.Opacity-16 | `{Colors.Schemes.On Tertiary Fixed}` | `#1A1A1A` | `--md-sys-color-on-tertiary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Tertiary Fixed Dim.Opacity-08 | `{Colors.Schemes.Tertiary Fixed Dim}` | `#8BD7A8` | `--md-sys-color-tertiary-fixed-dim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Tertiary Fixed Dim.Opacity-10 | `{Colors.Schemes.Tertiary Fixed Dim}` | `#8BD7A8` | `--md-sys-color-tertiary-fixed-dim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Tertiary Fixed Dim.Opacity-16 | `{Colors.Schemes.Tertiary Fixed Dim}` | `#8BD7A8` | `--md-sys-color-tertiary-fixed-dim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Tertiary Fixed Variant.Opacity-08 | `{Colors.Schemes.On Tertiary Fixed Variant}` | `#064B30` | `--md-sys-color-on-tertiary-fixed-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Tertiary Fixed Variant.Opacity-10 | `{Colors.Schemes.On Tertiary Fixed Variant}` | `#064B30` | `--md-sys-color-on-tertiary-fixed-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Tertiary Fixed Variant.Opacity-16 | `{Colors.Schemes.On Tertiary Fixed Variant}` | `#064B30` | `--md-sys-color-on-tertiary-fixed-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Error.Opacity-08 | `{Colors.Schemes.Error}` | `#8C1D18` | `--md-sys-color-error` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Error.Opacity-10 | `{Colors.Schemes.Error}` | `#8C1D18` | `--md-sys-color-error` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Error.Opacity-16 | `{Colors.Schemes.Error}` | `#8C1D18` | `--md-sys-color-error` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Error.Opacity-08 | `{Colors.Schemes.On Error}` | `#FFFFFF` | `--md-sys-color-on-error` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Error.Opacity-10 | `{Colors.Schemes.On Error}` | `#FFFFFF` | `--md-sys-color-on-error` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Error.Opacity-16 | `{Colors.Schemes.On Error}` | `#FFFFFF` | `--md-sys-color-on-error` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Error Container.Opacity-08 | `{Colors.Schemes.Error Container}` | `#F5C7C3` | `--md-sys-color-error-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Error Container.Opacity-10 | `{Colors.Schemes.Error Container}` | `#F5C7C3` | `--md-sys-color-error-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Error Container.Opacity-16 | `{Colors.Schemes.Error Container}` | `#F5C7C3` | `--md-sys-color-error-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Error Container.Opacity-08 | `{Colors.Schemes.On Error Container}` | `#641713` | `--md-sys-color-on-error-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Error Container.Opacity-10 | `{Colors.Schemes.On Error Container}` | `#641713` | `--md-sys-color-on-error-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Error Container.Opacity-16 | `{Colors.Schemes.On Error Container}` | `#641713` | `--md-sys-color-on-error-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Outline.Opacity-08 | `{Colors.Schemes.Outline}` | `#656760` | `--md-sys-color-outline` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Outline.Opacity-10 | `{Colors.Schemes.Outline}` | `#656760` | `--md-sys-color-outline` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Outline.Opacity-16 | `{Colors.Schemes.Outline}` | `#656760` | `--md-sys-color-outline` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Background.Opacity-08 | `{Colors.Schemes.Background}` | `#FAFAF5` | `--md-sys-color-background` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Background.Opacity-10 | `{Colors.Schemes.Background}` | `#FAFAF5` | `--md-sys-color-background` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Background.Opacity-16 | `{Colors.Schemes.Background}` | `#FAFAF5` | `--md-sys-color-background` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Background.Opacity-08 | `{Colors.Schemes.On Background}` | `#1A1A1A` | `--md-sys-color-on-background` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Background.Opacity-10 | `{Colors.Schemes.On Background}` | `#1A1A1A` | `--md-sys-color-on-background` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Background.Opacity-16 | `{Colors.Schemes.On Background}` | `#1A1A1A` | `--md-sys-color-on-background` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface.Opacity-08 | `{Colors.Schemes.Surface}` | `#FAF9F5` | `--md-sys-color-surface` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface.Opacity-10 | `{Colors.Schemes.Surface}` | `#FAF9F5` | `--md-sys-color-surface` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface.Opacity-16 | `{Colors.Schemes.Surface}` | `#FAF9F5` | `--md-sys-color-surface` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Surface.Opacity-08 | `{Colors.Schemes.On Surface}` | `#1A1A1A` | `--md-sys-color-on-surface` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Surface.Opacity-10 | `{Colors.Schemes.On Surface}` | `#1A1A1A` | `--md-sys-color-on-surface` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Surface.Opacity-16 | `{Colors.Schemes.On Surface}` | `#1A1A1A` | `--md-sys-color-on-surface` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Variant.Opacity-08 | `{Colors.Schemes.Surface Variant}` | `#E5E7DC` | `--md-sys-color-surface-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Variant.Opacity-10 | `{Colors.Schemes.Surface Variant}` | `#E5E7DC` | `--md-sys-color-surface-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Variant.Opacity-16 | `{Colors.Schemes.Surface Variant}` | `#E5E7DC` | `--md-sys-color-surface-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Surface Variant.Opacity-08 | `{Colors.Schemes.On Surface Variant}` | `#383A35` | `--md-sys-color-on-surface-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Surface Variant.Opacity-10 | `{Colors.Schemes.On Surface Variant}` | `#383A35` | `--md-sys-color-on-surface-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Surface Variant.Opacity-16 | `{Colors.Schemes.On Surface Variant}` | `#383A35` | `--md-sys-color-on-surface-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Inverse Surface.Opacity-08 | `{Colors.Schemes.Inverse Surface}` | `#30322B` | `--md-sys-color-inverse-surface` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Inverse Surface.Opacity-10 | `{Colors.Schemes.Inverse Surface}` | `#30322B` | `--md-sys-color-inverse-surface` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Inverse Surface.Opacity-16 | `{Colors.Schemes.Inverse Surface}` | `#30322B` | `--md-sys-color-inverse-surface` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Inverse On Surface.Opacity-08 | `{Colors.Schemes.Inverse On Surface}` | `#F1F2EA` | `--md-sys-color-inverse-on-surface` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Inverse On Surface.Opacity-10 | `{Colors.Schemes.Inverse On Surface}` | `#F1F2EA` | `--md-sys-color-inverse-on-surface` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Inverse On Surface.Opacity-16 | `{Colors.Schemes.Inverse On Surface}` | `#F1F2EA` | `--md-sys-color-inverse-on-surface` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Inverse Primary.Opacity-08 | `{Colors.Schemes.Inverse Primary}` | `#D2E594` | `--md-sys-color-inverse-primary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Inverse Primary.Opacity-10 | `{Colors.Schemes.Inverse Primary}` | `#D2E594` | `--md-sys-color-inverse-primary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Inverse Primary.Opacity-16 | `{Colors.Schemes.Inverse Primary}` | `#D2E594` | `--md-sys-color-inverse-primary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Shadow.Opacity-08 | `{Colors.Schemes.Shadow}` | `#000000` | `--md-sys-color-shadow` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Shadow.Opacity-10 | `{Colors.Schemes.Shadow}` | `#000000` | `--md-sys-color-shadow` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Shadow.Opacity-16 | `{Colors.Schemes.Shadow}` | `#000000` | `--md-sys-color-shadow` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Tint.Opacity-08 | `{Colors.Schemes.Surface Tint}` | `#2E3B00` | `--md-sys-color-surface-tint` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Tint.Opacity-10 | `{Colors.Schemes.Surface Tint}` | `#2E3B00` | `--md-sys-color-surface-tint` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Tint.Opacity-16 | `{Colors.Schemes.Surface Tint}` | `#2E3B00` | `--md-sys-color-surface-tint` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Outline Variant.Opacity-08 | `{Colors.Schemes.Outline Variant}` | `#9A9C94` | `--md-sys-color-outline-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Outline Variant.Opacity-10 | `{Colors.Schemes.Outline Variant}` | `#9A9C94` | `--md-sys-color-outline-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Outline Variant.Opacity-16 | `{Colors.Schemes.Outline Variant}` | `#9A9C94` | `--md-sys-color-outline-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Scrim.Opacity-08 | `{Colors.Schemes.Scrim}` | `#000000` | `--md-sys-color-scrim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Scrim.Opacity-10 | `{Colors.Schemes.Scrim}` | `#000000` | `--md-sys-color-scrim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Scrim.Opacity-16 | `{Colors.Schemes.Scrim}` | `#000000` | `--md-sys-color-scrim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container Highest.Opacity-08 | `{Colors.Schemes.Surface Container Highest}` | `#DCDED7` | `--md-sys-color-surface-container-highest` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container Highest.Opacity-10 | `{Colors.Schemes.Surface Container Highest}` | `#DCDED7` | `--md-sys-color-surface-container-highest` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container Highest.Opacity-16 | `{Colors.Schemes.Surface Container Highest}` | `#DCDED7` | `--md-sys-color-surface-container-highest` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container High.Opacity-08 | `{Colors.Schemes.Surface Container High}` | `#E4E5DF` | `--md-sys-color-surface-container-high` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container High.Opacity-10 | `{Colors.Schemes.Surface Container High}` | `#E4E5DF` | `--md-sys-color-surface-container-high` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container High.Opacity-16 | `{Colors.Schemes.Surface Container High}` | `#E4E5DF` | `--md-sys-color-surface-container-high` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container.Opacity-08 | `{Colors.Schemes.Surface Container}` | `#EBECE6` | `--md-sys-color-surface-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container.Opacity-10 | `{Colors.Schemes.Surface Container}` | `#EBECE6` | `--md-sys-color-surface-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container.Opacity-16 | `{Colors.Schemes.Surface Container}` | `#EBECE6` | `--md-sys-color-surface-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container Low.Opacity-08 | `{Colors.Schemes.Surface Container Low}` | `#F3F3EE` | `--md-sys-color-surface-container-low` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container Low.Opacity-10 | `{Colors.Schemes.Surface Container Low}` | `#F3F3EE` | `--md-sys-color-surface-container-low` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container Low.Opacity-16 | `{Colors.Schemes.Surface Container Low}` | `#F3F3EE` | `--md-sys-color-surface-container-low` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container Lowest.Opacity-08 | `{Colors.Schemes.Surface Container Lowest}` | `#FFFFFF` | `--md-sys-color-surface-container-lowest` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container Lowest.Opacity-10 | `{Colors.Schemes.Surface Container Lowest}` | `#FFFFFF` | `--md-sys-color-surface-container-lowest` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container Lowest.Opacity-16 | `{Colors.Schemes.Surface Container Lowest}` | `#FFFFFF` | `--md-sys-color-surface-container-lowest` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Bright.Opacity-08 | `{Colors.Schemes.Surface Bright}` | `#FAF9F5` | `--md-sys-color-surface-bright` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Bright.Opacity-10 | `{Colors.Schemes.Surface Bright}` | `#FAF9F5` | `--md-sys-color-surface-bright` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Bright.Opacity-16 | `{Colors.Schemes.Surface Bright}` | `#FAF9F5` | `--md-sys-color-surface-bright` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Dim.Opacity-08 | `{Colors.Schemes.Surface Dim}` | `#D7D8D2` | `--md-sys-color-surface-dim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Dim.Opacity-10 | `{Colors.Schemes.Surface Dim}` | `#D7D8D2` | `--md-sys-color-surface-dim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Dim.Opacity-16 | `{Colors.Schemes.Surface Dim}` | `#D7D8D2` | `--md-sys-color-surface-dim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.Add-ons.Section background | `{Colors.Neutral.Shade-033}` | `#F5F5F5` | — (extension hors MD3) |
| Typescale.Static.Display Large.Size | `57px` | `57px` | `--md-sys-typescale-display-large-size` |
| Typescale.Static.Display Large.Tracking | `-0.25px` | `-0.25px` | `--md-sys-typescale-display-large-tracking` |
| Typescale.Static.Display Large.Line Height | `64px` | `64px` | `--md-sys-typescale-display-large-line-height` |
| Typescale.Static.Display Large.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-display-large-font` |
| Typescale.Static.Display Large.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-display-large-weight` |
| Typescale.Static.Display Large.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-display-large-weight` (MD3 Expressive) |
| Typescale.Static.Display Medium.Size | `45px` | `45px` | `--md-sys-typescale-display-medium-size` |
| Typescale.Static.Display Medium.Line Height | `52px` | `52px` | `--md-sys-typescale-display-medium-line-height` |
| Typescale.Static.Display Medium.Tracking | `0px` | `0px` | `--md-sys-typescale-display-medium-tracking` |
| Typescale.Static.Display Medium.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-display-medium-font` |
| Typescale.Static.Display Medium.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-display-medium-weight` |
| Typescale.Static.Display Medium.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-display-medium-weight` (MD3 Expressive) |
| Typescale.Static.Display Small.Size | `36px` | `36px` | `--md-sys-typescale-display-small-size` |
| Typescale.Static.Display Small.Tracking | `0px` | `0px` | `--md-sys-typescale-display-small-tracking` |
| Typescale.Static.Display Small.Line Height | `44px` | `44px` | `--md-sys-typescale-display-small-line-height` |
| Typescale.Static.Display Small.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-display-small-font` |
| Typescale.Static.Display Small.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-display-small-weight` |
| Typescale.Static.Display Small.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-display-small-weight` (MD3 Expressive) |
| Typescale.Static.Headline Large.Size | `32px` | `32px` | `--md-sys-typescale-headline-large-size` |
| Typescale.Static.Headline Large.Tracking | `0px` | `0px` | `--md-sys-typescale-headline-large-tracking` |
| Typescale.Static.Headline Large.Line Height | `40px` | `40px` | `--md-sys-typescale-headline-large-line-height` |
| Typescale.Static.Headline Large.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-headline-large-font` |
| Typescale.Static.Headline Large.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-headline-large-weight` |
| Typescale.Static.Headline Large.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-headline-large-weight` (MD3 Expressive) |
| Typescale.Static.Headline Medium.Size | `28px` | `28px` | `--md-sys-typescale-headline-medium-size` |
| Typescale.Static.Headline Medium.Tracking | `0px` | `0px` | `--md-sys-typescale-headline-medium-tracking` |
| Typescale.Static.Headline Medium.Line Height | `36px` | `36px` | `--md-sys-typescale-headline-medium-line-height` |
| Typescale.Static.Headline Medium.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-headline-medium-font` |
| Typescale.Static.Headline Medium.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-headline-medium-weight` |
| Typescale.Static.Headline Medium.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-headline-medium-weight` (MD3 Expressive) |
| Typescale.Static.Headline Small.Size | `24px` | `24px` | `--md-sys-typescale-headline-small-size` |
| Typescale.Static.Headline Small.Tracking | `0px` | `0px` | `--md-sys-typescale-headline-small-tracking` |
| Typescale.Static.Headline Small.Line Height | `32px` | `32px` | `--md-sys-typescale-headline-small-line-height` |
| Typescale.Static.Headline Small.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-headline-small-font` |
| Typescale.Static.Headline Small.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-headline-small-weight` |
| Typescale.Static.Headline Small.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-headline-small-weight` (MD3 Expressive) |
| Typescale.Static.Title Large.Size | `22px` | `22px` | `--md-sys-typescale-title-large-size` |
| Typescale.Static.Title Large.Tracking | `0px` | `0px` | `--md-sys-typescale-title-large-tracking` |
| Typescale.Static.Title Large.Line Height | `28px` | `28px` | `--md-sys-typescale-title-large-line-height` |
| Typescale.Static.Title Large.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-title-large-font` |
| Typescale.Static.Title Large.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-title-large-weight` |
| Typescale.Static.Title Large.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-title-large-weight` (MD3 Expressive) |
| Typescale.Static.Title Medium.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-title-medium-font` |
| Typescale.Static.Title Medium.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-title-medium-weight` |
| Typescale.Static.Title Medium.Size | `16px` | `16px` | `--md-sys-typescale-title-medium-size` |
| Typescale.Static.Title Medium.Tracking | `0.15000000596046448px` | `0.15000000596046448px` | `--md-sys-typescale-title-medium-tracking` |
| Typescale.Static.Title Medium.Line Height | `24px` | `24px` | `--md-sys-typescale-title-medium-line-height` |
| Typescale.Static.Title Medium.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-emphasized-title-medium-weight` (MD3 Expressive) |
| Typescale.Static.Title Small.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-title-small-font` |
| Typescale.Static.Title Small.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-title-small-weight` |
| Typescale.Static.Title Small.Size | `14px` | `14px` | `--md-sys-typescale-title-small-size` |
| Typescale.Static.Title Small.Tracking | `0.10000000149011612px` | `0.10000000149011612px` | `--md-sys-typescale-title-small-tracking` |
| Typescale.Static.Title Small.Line Height | `20px` | `20px` | `--md-sys-typescale-title-small-line-height` |
| Typescale.Static.Title Small.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-emphasized-title-small-weight` (MD3 Expressive) |
| Typescale.Static.Label Large.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-label-large-font` |
| Typescale.Static.Label Large.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-label-large-weight` |
| Typescale.Static.Label Large.Size | `14px` | `14px` | `--md-sys-typescale-label-large-size` |
| Typescale.Static.Label Large.Tracking | `0.10000000149011612px` | `0.10000000149011612px` | `--md-sys-typescale-label-large-tracking` |
| Typescale.Static.Label Large.Line Height | `20px` | `20px` | `--md-sys-typescale-label-large-line-height` |
| Typescale.Static.Label Large.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-label-large-weight-prominent` |
| Typescale.Static.Label Medium.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-label-medium-font` |
| Typescale.Static.Label Medium.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-label-medium-weight` |
| Typescale.Static.Label Medium.Size | `12px` | `12px` | `--md-sys-typescale-label-medium-size` |
| Typescale.Static.Label Medium.Tracking | `0.5px` | `0.5px` | `--md-sys-typescale-label-medium-tracking` |
| Typescale.Static.Label Medium.Line Height | `16px` | `16px` | `--md-sys-typescale-label-medium-line-height` |
| Typescale.Static.Label Medium.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-label-medium-weight-prominent` |
| Typescale.Static.Label Small.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-label-small-font` |
| Typescale.Static.Label Small.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-label-small-weight` |
| Typescale.Static.Label Small.Size | `11px` | `11px` | `--md-sys-typescale-label-small-size` |
| Typescale.Static.Label Small.Tracking | `0.5px` | `0.5px` | `--md-sys-typescale-label-small-tracking` |
| Typescale.Static.Label Small.Line Height | `16px` | `16px` | `--md-sys-typescale-label-small-line-height` |
| Typescale.Static.Label Small.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-emphasized-label-small-weight` (MD3 Expressive) |
| Typescale.Static.Body Large.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-body-large-font` |
| Typescale.Static.Body Large.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-body-large-weight` |
| Typescale.Static.Body Large.Size | `16px` | `16px` | `--md-sys-typescale-body-large-size` |
| Typescale.Static.Body Large.Tracking | `0.5px` | `0.5px` | `--md-sys-typescale-body-large-tracking` |
| Typescale.Static.Body Large.Line Height | `24px` | `24px` | `--md-sys-typescale-body-large-line-height` |
| Typescale.Static.Body Large.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-body-large-weight` (MD3 Expressive) |
| Typescale.Static.Body Medium.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-body-medium-font` |
| Typescale.Static.Body Medium.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-body-medium-weight` |
| Typescale.Static.Body Medium.Size | `14px` | `14px` | `--md-sys-typescale-body-medium-size` |
| Typescale.Static.Body Medium.Tracking | `0.25px` | `0.25px` | `--md-sys-typescale-body-medium-tracking` |
| Typescale.Static.Body Medium.Line Height | `20px` | `20px` | `--md-sys-typescale-body-medium-line-height` |
| Typescale.Static.Body Medium.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-body-medium-weight` (MD3 Expressive) |
| Typescale.Static.Body Small.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-body-small-font` |
| Typescale.Static.Body Small.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-body-small-weight` |
| Typescale.Static.Body Small.Size | `12px` | `12px` | `--md-sys-typescale-body-small-size` |
| Typescale.Static.Body Small.Tracking | `0.4000000059604645px` | `0.4000000059604645px` | `--md-sys-typescale-body-small-tracking` |
| Typescale.Static.Body Small.Line Height | `16px` | `16px` | `--md-sys-typescale-body-small-line-height` |
| Typescale.Static.Body Small.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-body-small-weight` (MD3 Expressive) |

## semantics/light.tokens.json

| Variable | Valeur | Valeur résolue | Équivalent MD3 |
|---|---|---|---|
| Colors.Schemes.Primary | `{Colors.Olive.Shade-012}` | `#86A315` | `--md-sys-color-primary` |
| Colors.Schemes.Surface Tint | `{Colors.Olive.Shade-012}` | `#86A315` | `--md-sys-color-surface-tint` |
| Colors.Schemes.On Primary | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-primary` |
| Colors.Schemes.Primary Container | `{Colors.Olive.Shade-019}` | `#D8EB9A` | `--md-sys-color-primary-container` |
| Colors.Schemes.On Primary Container | `{Colors.Olive.Shade-005}` | `#303B08` | `--md-sys-color-on-primary-container` |
| Colors.Schemes.Secondary | `{Colors.Sage.Shade-007}` | `#415400` | `--md-sys-color-secondary` |
| Colors.Schemes.On Secondary | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | `--md-sys-color-on-secondary` |
| Colors.Schemes.Secondary Container | `{Colors.Sage.Shade-014}` | `#D9DFBC` | `--md-sys-color-secondary-container` |
| Colors.Schemes.On Secondary Container | `{Colors.Sage.Shade-004}` | `#30351F` | `--md-sys-color-on-secondary-container` |
| Colors.Schemes.Tertiary | `{Colors.Mint.Shade-013}` | `#3CF19A` | `--md-sys-color-tertiary` |
| Colors.Schemes.On Tertiary | `{Colors.Mint.Shade-002}` | `#003821` | `--md-sys-color-on-tertiary` |
| Colors.Schemes.Tertiary Container | `{Colors.Mint.Shade-015}` | `#AFF2C4` | `--md-sys-color-tertiary-container` |
| Colors.Schemes.On Tertiary Container | `{Colors.Mint.Shade-004}` | `#064B30` | `--md-sys-color-on-tertiary-container` |
| Colors.Schemes.Error | `{Colors.Red.Shade-009}` | `#B3261E` | `--md-sys-color-error` |
| Colors.Schemes.On Error | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | `--md-sys-color-on-error` |
| Colors.Schemes.Error Container | `{Colors.Red.Shade-015}` | `#F9DEDC` | `--md-sys-color-error-container` |
| Colors.Schemes.On Error Container | `{Colors.Red.Shade-005}` | `#852221` | `--md-sys-color-on-error-container` |
| Colors.Schemes.Background | `{Colors.Neutral Variant.Shade-062}` | `#FAFAF5` | `--md-sys-color-background` |
| Colors.Schemes.On Background | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-background` |
| Colors.Schemes.Surface | `{Colors.Neutral Variant.Shade-062}` | `#FAFAF5` | `--md-sys-color-surface` |
| Colors.Schemes.On Surface | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-surface` |
| Colors.Schemes.Surface Variant | `{Colors.Neutral Variant.Shade-050}` | `#E5E7DC` | `--md-sys-color-surface-variant` |
| Colors.Schemes.On Surface Variant | `{Colors.Neutral Variant.Shade-026}` | `#46483F` | `--md-sys-color-on-surface-variant` |
| Colors.Schemes.Outline | `{Colors.Neutral Variant.Shade-032}` | `#777A6F` | `--md-sys-color-outline` |
| Colors.Schemes.Outline Variant | `{Colors.Neutral Variant.Shade-038}` | `#C7CBBE` | `--md-sys-color-outline-variant` |
| Colors.Schemes.Shadow | `{Colors.Neutral.Shade-001}` | `#000000` | `--md-sys-color-shadow` |
| Colors.Schemes.Scrim | `{Colors.Neutral.Shade-001}` | `#000000` | `--md-sys-color-scrim` |
| Colors.Schemes.Inverse Surface | `{Colors.Neutral Variant.Shade-018}` | `#30322B` | `--md-sys-color-inverse-surface` |
| Colors.Schemes.Inverse On Surface | `{Colors.Neutral Variant.Shade-058}` | `#F1F2EA` | `--md-sys-color-inverse-on-surface` |
| Colors.Schemes.Inverse Primary | `{Colors.Olive.Shade-015}` | `#BDCE80` | `--md-sys-color-inverse-primary` |
| Colors.Schemes.Primary Fixed | `{Colors.Olive.Shade-019}` | `#D8EB9A` | `--md-sys-color-primary-fixed` |
| Colors.Schemes.On Primary Fixed | `{Colors.Olive.Shade-001}` | `#202900` | `--md-sys-color-on-primary-fixed` |
| Colors.Schemes.Primary Fixed Dim | `{Colors.Olive.Shade-016}` | `#BCD078` | `--md-sys-color-primary-fixed-dim` |
| Colors.Schemes.On Primary Fixed Variant | `{Colors.Olive.Shade-006}` | `#3E4C0C` | `--md-sys-color-on-primary-fixed-variant` |
| Colors.Schemes.Secondary Fixed | `{Colors.Sage.Shade-014}` | `#D9DFBC` | `--md-sys-color-secondary-fixed` |
| Colors.Schemes.On Secondary Fixed | `{Colors.Sage.Shade-001}` | `#252A14` | `--md-sys-color-on-secondary-fixed` |
| Colors.Schemes.Secondary Fixed Dim | `{Colors.Sage.Shade-011}` | `#BDC59A` | `--md-sys-color-secondary-fixed-dim` |
| Colors.Schemes.On Secondary Fixed Variant | `{Colors.Sage.Shade-006}` | `#41482C` | `--md-sys-color-on-secondary-fixed-variant` |
| Colors.Schemes.Tertiary Fixed | `{Colors.Mint.Shade-015}` | `#AFF2C4` | `--md-sys-color-tertiary-fixed` |
| Colors.Schemes.On Tertiary Fixed | `{Colors.Mint.Shade-001}` | `#003820` | `--md-sys-color-on-tertiary-fixed` |
| Colors.Schemes.Tertiary Fixed Dim | `{Colors.Mint.Shade-011}` | `#8BD7A8` | `--md-sys-color-tertiary-fixed-dim` |
| Colors.Schemes.On Tertiary Fixed Variant | `{Colors.Mint.Shade-005}` | `#075B3B` | `--md-sys-color-on-tertiary-fixed-variant` |
| Colors.Schemes.Surface Dim | `{Colors.Neutral Variant.Shade-043}` | `#DCDDD4` | `--md-sys-color-surface-dim` |
| Colors.Schemes.Surface Bright | `{Colors.Neutral Variant.Shade-062}` | `#FAFAF5` | `--md-sys-color-surface-bright` |
| Colors.Schemes.Surface Container Lowest | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | `--md-sys-color-surface-container-lowest` |
| Colors.Schemes.Surface Container Low | `{Colors.Neutral Variant.Shade-060}` | `#F5F6EF` | `--md-sys-color-surface-container-low` |
| Colors.Schemes.Surface Container | `{Colors.Neutral Variant.Shade-055}` | `#EFF0E9` | `--md-sys-color-surface-container` |
| Colors.Schemes.Surface Container High | `{Colors.Neutral Variant.Shade-051}` | `#E9EAE3` | `--md-sys-color-surface-container-high` |
| Colors.Schemes.Surface Container Highest | `{Colors.Neutral Variant.Shade-047}` | `#E3E4DD` | `--md-sys-color-surface-container-highest` |
| Colors.Schemes.Success | `{Colors.Green.Shade-009}` | `#73C322` | — (extension hors MD3) |
| Colors.Schemes.Info | `{Colors.Blue.Shade-009}` | `#0066FF` | — (extension hors MD3) |
| Colors.Schemes.Warning | `{Colors.Amber.Shade-009}` | `#FF9900` | — (extension hors MD3) |
| Colors.Schemes.On Warning | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | — (extension hors MD3) |
| Colors.Schemes.On Success | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | — (extension hors MD3) |
| Colors.Schemes.On Info | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | — (extension hors MD3) |
| Colors.Schemes.Warning Container | `{Colors.Amber.Shade-014}` | `#FFE2B8` | — (extension hors MD3) |
| Colors.Schemes.On Warning Container | `{Colors.Amber.Shade-004}` | `#6B3F00` | — (extension hors MD3) |
| Colors.Schemes.Success Container | `{Colors.Green.Shade-013}` | `#DDF3C4` | — (extension hors MD3) |
| Colors.Schemes.On Success Container | `{Colors.Green.Shade-003}` | `#315D08` | — (extension hors MD3) |
| Colors.Schemes.Info Container | `{Colors.Blue.Shade-015}` | `#DCE8FF` | — (extension hors MD3) |
| Colors.Schemes.On Info Container | `{Colors.Blue.Shade-003}` | `#003E99` | — (extension hors MD3) |
| Colors.Schemes.Neutral.0 | `{Colors.Neutral.Shade-035}` | `#FFFFFF` | — |
| Colors.Schemes.Neutral.900 | `{Colors.Neutral.Shade-005}` | `#1A1A1A` | — |
| Colors.State Layers.Primary.Opacity-08 | `{Colors.Schemes.Primary}` | `#86A315` | `--md-sys-color-primary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Primary.Opacity-10 | `{Colors.Schemes.Primary}` | `#86A315` | `--md-sys-color-primary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Primary.Opacity-16 | `{Colors.Schemes.Primary}` | `#86A315` | `--md-sys-color-primary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Primary.Opacity-08 | `{Colors.Schemes.On Primary}` | `#1A1A1A` | `--md-sys-color-on-primary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Primary.Opacity-10 | `{Colors.Schemes.On Primary}` | `#1A1A1A` | `--md-sys-color-on-primary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Primary.Opacity-16 | `{Colors.Schemes.On Primary}` | `#1A1A1A` | `--md-sys-color-on-primary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Primary Container.Opacity-08 | `{Colors.Schemes.Primary Container}` | `#D8EB9A` | `--md-sys-color-primary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Primary Container.Opacity-10 | `{Colors.Schemes.Primary Container}` | `#D8EB9A` | `--md-sys-color-primary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Primary Container.Opacity-16 | `{Colors.Schemes.Primary Container}` | `#D8EB9A` | `--md-sys-color-primary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Primary Container.Opacity-08 | `{Colors.Schemes.On Primary Container}` | `#303B08` | `--md-sys-color-on-primary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Primary Container.Opacity-10 | `{Colors.Schemes.On Primary Container}` | `#303B08` | `--md-sys-color-on-primary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Primary Container.Opacity-16 | `{Colors.Schemes.On Primary Container}` | `#303B08` | `--md-sys-color-on-primary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Primary Fixed.Opacity-08 | `{Colors.Schemes.Primary Fixed}` | `#D8EB9A` | `--md-sys-color-primary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Primary Fixed.Opacity-10 | `{Colors.Schemes.Primary Fixed}` | `#D8EB9A` | `--md-sys-color-primary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Primary Fixed.Opacity-16 | `{Colors.Schemes.Primary Fixed}` | `#D8EB9A` | `--md-sys-color-primary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Primary Fixed.Opacity-08 | `{Colors.Schemes.On Primary Fixed}` | `#202900` | `--md-sys-color-on-primary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Primary Fixed.Opacity-10 | `{Colors.Schemes.On Primary Fixed}` | `#202900` | `--md-sys-color-on-primary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Primary Fixed.Opacity-16 | `{Colors.Schemes.On Primary Fixed}` | `#202900` | `--md-sys-color-on-primary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Primary Fixed Dim.Opacity-08 | `{Colors.Schemes.Primary Fixed Dim}` | `#BCD078` | `--md-sys-color-primary-fixed-dim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Primary Fixed Dim.Opacity-10 | `{Colors.Schemes.Primary Fixed Dim}` | `#BCD078` | `--md-sys-color-primary-fixed-dim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Primary Fixed Dim.Opacity-16 | `{Colors.Schemes.Primary Fixed Dim}` | `#BCD078` | `--md-sys-color-primary-fixed-dim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Primary Fixed Variant.Opacity-08 | `{Colors.Schemes.On Primary Fixed Variant}` | `#3E4C0C` | `--md-sys-color-on-primary-fixed-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Primary Fixed Variant.Opacity-10 | `{Colors.Schemes.On Primary Fixed Variant}` | `#3E4C0C` | `--md-sys-color-on-primary-fixed-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Primary Fixed Variant.Opacity-16 | `{Colors.Schemes.On Primary Fixed Variant}` | `#3E4C0C` | `--md-sys-color-on-primary-fixed-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Secondary.Opacity-08 | `{Colors.Schemes.Secondary}` | `#415400` | `--md-sys-color-secondary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Secondary.Opacity-10 | `{Colors.Schemes.Secondary}` | `#415400` | `--md-sys-color-secondary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Secondary.Opacity-16 | `{Colors.Schemes.Secondary}` | `#415400` | `--md-sys-color-secondary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Secondary.Opacity-08 | `{Colors.Schemes.On Secondary}` | `#FFFFFF` | `--md-sys-color-on-secondary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Secondary.Opacity-10 | `{Colors.Schemes.On Secondary}` | `#FFFFFF` | `--md-sys-color-on-secondary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Secondary.Opacity-16 | `{Colors.Schemes.On Secondary}` | `#FFFFFF` | `--md-sys-color-on-secondary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Secondary Container.Opacity-08 | `{Colors.Schemes.Secondary Container}` | `#D9DFBC` | `--md-sys-color-secondary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Secondary Container.Opacity-10 | `{Colors.Schemes.Secondary Container}` | `#D9DFBC` | `--md-sys-color-secondary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Secondary Container.Opacity-16 | `{Colors.Schemes.Secondary Container}` | `#D9DFBC` | `--md-sys-color-secondary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Secondary Container.Opacity-08 | `{Colors.Schemes.On Secondary Container}` | `#30351F` | `--md-sys-color-on-secondary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Secondary Container.Opacity-10 | `{Colors.Schemes.On Secondary Container}` | `#30351F` | `--md-sys-color-on-secondary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Secondary Container.Opacity-16 | `{Colors.Schemes.On Secondary Container}` | `#30351F` | `--md-sys-color-on-secondary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Secondary Fixed.Opacity-08 | `{Colors.Schemes.Secondary Fixed}` | `#D9DFBC` | `--md-sys-color-secondary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Secondary Fixed.Opacity-10 | `{Colors.Schemes.Secondary Fixed}` | `#D9DFBC` | `--md-sys-color-secondary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Secondary Fixed.Opacity-16 | `{Colors.Schemes.Secondary Fixed}` | `#D9DFBC` | `--md-sys-color-secondary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Secondary Fixed.Opacity-08 | `{Colors.Schemes.On Secondary Fixed}` | `#252A14` | `--md-sys-color-on-secondary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Secondary Fixed.Opacity-10 | `{Colors.Schemes.On Secondary Fixed}` | `#252A14` | `--md-sys-color-on-secondary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Secondary Fixed.Opacity-16 | `{Colors.Schemes.On Secondary Fixed}` | `#252A14` | `--md-sys-color-on-secondary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Secondary Fixed Dim.Opacity-08 | `{Colors.Schemes.Secondary Fixed Dim}` | `#BDC59A` | `--md-sys-color-secondary-fixed-dim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Secondary Fixed Dim.Opacity-10 | `{Colors.Schemes.Secondary Fixed Dim}` | `#BDC59A` | `--md-sys-color-secondary-fixed-dim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Secondary Fixed Dim.Opacity-16 | `{Colors.Schemes.Secondary Fixed Dim}` | `#BDC59A` | `--md-sys-color-secondary-fixed-dim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Secondary Fixed Variant.Opacity-08 | `{Colors.Schemes.On Secondary Fixed Variant}` | `#41482C` | `--md-sys-color-on-secondary-fixed-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Secondary Fixed Variant.Opacity-10 | `{Colors.Schemes.On Secondary Fixed Variant}` | `#41482C` | `--md-sys-color-on-secondary-fixed-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Secondary Fixed Variant.Opacity-16 | `{Colors.Schemes.On Secondary Fixed Variant}` | `#41482C` | `--md-sys-color-on-secondary-fixed-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Tertiary.Opacity-08 | `{Colors.Schemes.Tertiary}` | `#3CF19A` | `--md-sys-color-tertiary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Tertiary.Opacity-10 | `{Colors.Schemes.Tertiary}` | `#3CF19A` | `--md-sys-color-tertiary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Tertiary.Opacity-16 | `{Colors.Schemes.Tertiary}` | `#3CF19A` | `--md-sys-color-tertiary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Tertiary.Opacity-08 | `{Colors.Schemes.On Tertiary}` | `#003821` | `--md-sys-color-on-tertiary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Tertiary.Opacity-10 | `{Colors.Schemes.On Tertiary}` | `#003821` | `--md-sys-color-on-tertiary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Tertiary.Opacity-16 | `{Colors.Schemes.On Tertiary}` | `#003821` | `--md-sys-color-on-tertiary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Tertiary Container.Opacity-08 | `{Colors.Schemes.Tertiary Container}` | `#AFF2C4` | `--md-sys-color-tertiary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Tertiary Container.Opacity-10 | `{Colors.Schemes.Tertiary Container}` | `#AFF2C4` | `--md-sys-color-tertiary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Tertiary Container.Opacity-16 | `{Colors.Schemes.Tertiary Container}` | `#AFF2C4` | `--md-sys-color-tertiary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Tertiary Container.Opacity-08 | `{Colors.Schemes.On Tertiary Container}` | `#064B30` | `--md-sys-color-on-tertiary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Tertiary Container.Opacity-10 | `{Colors.Schemes.On Tertiary Container}` | `#064B30` | `--md-sys-color-on-tertiary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Tertiary Container.Opacity-16 | `{Colors.Schemes.On Tertiary Container}` | `#064B30` | `--md-sys-color-on-tertiary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Tertiary Fixed.Opacity-08 | `{Colors.Schemes.Tertiary Fixed}` | `#AFF2C4` | `--md-sys-color-tertiary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Tertiary Fixed.Opacity-10 | `{Colors.Schemes.Tertiary Fixed}` | `#AFF2C4` | `--md-sys-color-tertiary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Tertiary Fixed.Opacity-16 | `{Colors.Schemes.Tertiary Fixed}` | `#AFF2C4` | `--md-sys-color-tertiary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Tertiary Fixed.Opacity-08 | `{Colors.Schemes.On Tertiary Fixed}` | `#003820` | `--md-sys-color-on-tertiary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Tertiary Fixed.Opacity-10 | `{Colors.Schemes.On Tertiary Fixed}` | `#003820` | `--md-sys-color-on-tertiary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Tertiary Fixed.Opacity-16 | `{Colors.Schemes.On Tertiary Fixed}` | `#003820` | `--md-sys-color-on-tertiary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Tertiary Fixed Dim.Opacity-08 | `{Colors.Schemes.Tertiary Fixed Dim}` | `#8BD7A8` | `--md-sys-color-tertiary-fixed-dim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Tertiary Fixed Dim.Opacity-10 | `{Colors.Schemes.Tertiary Fixed Dim}` | `#8BD7A8` | `--md-sys-color-tertiary-fixed-dim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Tertiary Fixed Dim.Opacity-16 | `{Colors.Schemes.Tertiary Fixed Dim}` | `#8BD7A8` | `--md-sys-color-tertiary-fixed-dim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Tertiary Fixed Variant.Opacity-08 | `{Colors.Schemes.On Tertiary Fixed Variant}` | `#075B3B` | `--md-sys-color-on-tertiary-fixed-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Tertiary Fixed Variant.Opacity-10 | `{Colors.Schemes.On Tertiary Fixed Variant}` | `#075B3B` | `--md-sys-color-on-tertiary-fixed-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Tertiary Fixed Variant.Opacity-16 | `{Colors.Schemes.On Tertiary Fixed Variant}` | `#075B3B` | `--md-sys-color-on-tertiary-fixed-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Error.Opacity-08 | `{Colors.Schemes.Error}` | `#B3261E` | `--md-sys-color-error` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Error.Opacity-10 | `{Colors.Schemes.Error}` | `#B3261E` | `--md-sys-color-error` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Error.Opacity-16 | `{Colors.Schemes.Error}` | `#B3261E` | `--md-sys-color-error` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Error.Opacity-08 | `{Colors.Schemes.On Error}` | `#FFFFFF` | `--md-sys-color-on-error` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Error.Opacity-10 | `{Colors.Schemes.On Error}` | `#FFFFFF` | `--md-sys-color-on-error` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Error.Opacity-16 | `{Colors.Schemes.On Error}` | `#FFFFFF` | `--md-sys-color-on-error` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Error Container.Opacity-08 | `{Colors.Schemes.Error Container}` | `#F9DEDC` | `--md-sys-color-error-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Error Container.Opacity-10 | `{Colors.Schemes.Error Container}` | `#F9DEDC` | `--md-sys-color-error-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Error Container.Opacity-16 | `{Colors.Schemes.Error Container}` | `#F9DEDC` | `--md-sys-color-error-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Error Container.Opacity-08 | `{Colors.Schemes.On Error Container}` | `#852221` | `--md-sys-color-on-error-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Error Container.Opacity-10 | `{Colors.Schemes.On Error Container}` | `#852221` | `--md-sys-color-on-error-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Error Container.Opacity-16 | `{Colors.Schemes.On Error Container}` | `#852221` | `--md-sys-color-on-error-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Outline.Opacity-08 | `{Colors.Schemes.Outline}` | `#777A6F` | `--md-sys-color-outline` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Outline.Opacity-10 | `{Colors.Schemes.Outline}` | `#777A6F` | `--md-sys-color-outline` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Outline.Opacity-16 | `{Colors.Schemes.Outline}` | `#777A6F` | `--md-sys-color-outline` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Background.Opacity-08 | `{Colors.Schemes.Background}` | `#FAFAF5` | `--md-sys-color-background` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Background.Opacity-10 | `{Colors.Schemes.Background}` | `#FAFAF5` | `--md-sys-color-background` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Background.Opacity-16 | `{Colors.Schemes.Background}` | `#FAFAF5` | `--md-sys-color-background` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Background.Opacity-08 | `{Colors.Schemes.On Background}` | `#1A1A1A` | `--md-sys-color-on-background` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Background.Opacity-10 | `{Colors.Schemes.On Background}` | `#1A1A1A` | `--md-sys-color-on-background` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Background.Opacity-16 | `{Colors.Schemes.On Background}` | `#1A1A1A` | `--md-sys-color-on-background` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface.Opacity-08 | `{Colors.Schemes.Surface}` | `#FAFAF5` | `--md-sys-color-surface` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface.Opacity-10 | `{Colors.Schemes.Surface}` | `#FAFAF5` | `--md-sys-color-surface` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface.Opacity-16 | `{Colors.Schemes.Surface}` | `#FAFAF5` | `--md-sys-color-surface` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Surface.Opacity-08 | `{Colors.Schemes.On Surface}` | `#1A1A1A` | `--md-sys-color-on-surface` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Surface.Opacity-10 | `{Colors.Schemes.On Surface}` | `#1A1A1A` | `--md-sys-color-on-surface` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Surface.Opacity-16 | `{Colors.Schemes.On Surface}` | `#1A1A1A` | `--md-sys-color-on-surface` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Variant.Opacity-08 | `{Colors.Schemes.Surface Variant}` | `#E5E7DC` | `--md-sys-color-surface-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Variant.Opacity-10 | `{Colors.Schemes.Surface Variant}` | `#E5E7DC` | `--md-sys-color-surface-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Variant.Opacity-16 | `{Colors.Schemes.Surface Variant}` | `#E5E7DC` | `--md-sys-color-surface-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Surface Variant.Opacity-08 | `{Colors.Schemes.On Surface Variant}` | `#46483F` | `--md-sys-color-on-surface-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Surface Variant.Opacity-10 | `{Colors.Schemes.On Surface Variant}` | `#46483F` | `--md-sys-color-on-surface-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Surface Variant.Opacity-16 | `{Colors.Schemes.On Surface Variant}` | `#46483F` | `--md-sys-color-on-surface-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Inverse Surface.Opacity-08 | `{Colors.Schemes.Inverse Surface}` | `#30322B` | `--md-sys-color-inverse-surface` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Inverse Surface.Opacity-10 | `{Colors.Schemes.Inverse Surface}` | `#30322B` | `--md-sys-color-inverse-surface` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Inverse Surface.Opacity-16 | `{Colors.Schemes.Inverse Surface}` | `#30322B` | `--md-sys-color-inverse-surface` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Inverse On Surface.Opacity-08 | `{Colors.Schemes.Inverse On Surface}` | `#F1F2EA` | `--md-sys-color-inverse-on-surface` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Inverse On Surface.Opacity-10 | `{Colors.Schemes.Inverse On Surface}` | `#F1F2EA` | `--md-sys-color-inverse-on-surface` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Inverse On Surface.Opacity-16 | `{Colors.Schemes.Inverse On Surface}` | `#F1F2EA` | `--md-sys-color-inverse-on-surface` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Inverse Primary.Opacity-08 | `{Colors.Schemes.Inverse Primary}` | `#BDCE80` | `--md-sys-color-inverse-primary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Inverse Primary.Opacity-10 | `{Colors.Schemes.Inverse Primary}` | `#BDCE80` | `--md-sys-color-inverse-primary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Inverse Primary.Opacity-16 | `{Colors.Schemes.Inverse Primary}` | `#BDCE80` | `--md-sys-color-inverse-primary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Shadow.Opacity-08 | `{Colors.Schemes.Shadow}` | `#000000` | `--md-sys-color-shadow` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Shadow.Opacity-10 | `{Colors.Schemes.Shadow}` | `#000000` | `--md-sys-color-shadow` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Shadow.Opacity-16 | `{Colors.Schemes.Shadow}` | `#000000` | `--md-sys-color-shadow` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Tint.Opacity-08 | `{Colors.Schemes.Surface Tint}` | `#86A315` | `--md-sys-color-surface-tint` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Tint.Opacity-10 | `{Colors.Schemes.Surface Tint}` | `#86A315` | `--md-sys-color-surface-tint` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Tint.Opacity-16 | `{Colors.Schemes.Surface Tint}` | `#86A315` | `--md-sys-color-surface-tint` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Outline Variant.Opacity-08 | `{Colors.Schemes.Outline Variant}` | `#C7CBBE` | `--md-sys-color-outline-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Outline Variant.Opacity-10 | `{Colors.Schemes.Outline Variant}` | `#C7CBBE` | `--md-sys-color-outline-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Outline Variant.Opacity-16 | `{Colors.Schemes.Outline Variant}` | `#C7CBBE` | `--md-sys-color-outline-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Scrim.Opacity-08 | `{Colors.Schemes.Scrim}` | `#000000` | `--md-sys-color-scrim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Scrim.Opacity-10 | `{Colors.Schemes.Scrim}` | `#000000` | `--md-sys-color-scrim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Scrim.Opacity-16 | `{Colors.Schemes.Scrim}` | `#000000` | `--md-sys-color-scrim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container Highest.Opacity-08 | `{Colors.Schemes.Surface Container Highest}` | `#E3E4DD` | `--md-sys-color-surface-container-highest` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container Highest.Opacity-10 | `{Colors.Schemes.Surface Container Highest}` | `#E3E4DD` | `--md-sys-color-surface-container-highest` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container Highest.Opacity-16 | `{Colors.Schemes.Surface Container Highest}` | `#E3E4DD` | `--md-sys-color-surface-container-highest` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container High.Opacity-08 | `{Colors.Schemes.Surface Container High}` | `#E9EAE3` | `--md-sys-color-surface-container-high` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container High.Opacity-10 | `{Colors.Schemes.Surface Container High}` | `#E9EAE3` | `--md-sys-color-surface-container-high` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container High.Opacity-16 | `{Colors.Schemes.Surface Container High}` | `#E9EAE3` | `--md-sys-color-surface-container-high` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container.Opacity-08 | `{Colors.Schemes.Surface Container}` | `#EFF0E9` | `--md-sys-color-surface-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container.Opacity-10 | `{Colors.Schemes.Surface Container}` | `#EFF0E9` | `--md-sys-color-surface-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container.Opacity-16 | `{Colors.Schemes.Surface Container}` | `#EFF0E9` | `--md-sys-color-surface-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container Low.Opacity-08 | `{Colors.Schemes.Surface Container Low}` | `#F5F6EF` | `--md-sys-color-surface-container-low` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container Low.Opacity-10 | `{Colors.Schemes.Surface Container Low}` | `#F5F6EF` | `--md-sys-color-surface-container-low` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container Low.Opacity-16 | `{Colors.Schemes.Surface Container Low}` | `#F5F6EF` | `--md-sys-color-surface-container-low` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container Lowest.Opacity-08 | `{Colors.Schemes.Surface Container Lowest}` | `#FFFFFF` | `--md-sys-color-surface-container-lowest` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container Lowest.Opacity-10 | `{Colors.Schemes.Surface Container Lowest}` | `#FFFFFF` | `--md-sys-color-surface-container-lowest` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container Lowest.Opacity-16 | `{Colors.Schemes.Surface Container Lowest}` | `#FFFFFF` | `--md-sys-color-surface-container-lowest` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Bright.Opacity-08 | `{Colors.Schemes.Surface Bright}` | `#FAFAF5` | `--md-sys-color-surface-bright` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Bright.Opacity-10 | `{Colors.Schemes.Surface Bright}` | `#FAFAF5` | `--md-sys-color-surface-bright` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Bright.Opacity-16 | `{Colors.Schemes.Surface Bright}` | `#FAFAF5` | `--md-sys-color-surface-bright` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Dim.Opacity-08 | `{Colors.Schemes.Surface Dim}` | `#DCDDD4` | `--md-sys-color-surface-dim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Dim.Opacity-10 | `{Colors.Schemes.Surface Dim}` | `#DCDDD4` | `--md-sys-color-surface-dim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Dim.Opacity-16 | `{Colors.Schemes.Surface Dim}` | `#DCDDD4` | `--md-sys-color-surface-dim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.Add-ons.Section background | `{Colors.Neutral.Shade-033}` | `#F5F5F5` | — (extension hors MD3) |
| Typescale.Static.Display Large.Size | `57px` | `57px` | `--md-sys-typescale-display-large-size` |
| Typescale.Static.Display Large.Tracking | `-0.25px` | `-0.25px` | `--md-sys-typescale-display-large-tracking` |
| Typescale.Static.Display Large.Line Height | `64px` | `64px` | `--md-sys-typescale-display-large-line-height` |
| Typescale.Static.Display Large.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-display-large-font` |
| Typescale.Static.Display Large.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-display-large-weight` |
| Typescale.Static.Display Large.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-display-large-weight` (MD3 Expressive) |
| Typescale.Static.Display Medium.Size | `45px` | `45px` | `--md-sys-typescale-display-medium-size` |
| Typescale.Static.Display Medium.Line Height | `52px` | `52px` | `--md-sys-typescale-display-medium-line-height` |
| Typescale.Static.Display Medium.Tracking | `0px` | `0px` | `--md-sys-typescale-display-medium-tracking` |
| Typescale.Static.Display Medium.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-display-medium-font` |
| Typescale.Static.Display Medium.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-display-medium-weight` |
| Typescale.Static.Display Medium.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-display-medium-weight` (MD3 Expressive) |
| Typescale.Static.Display Small.Size | `36px` | `36px` | `--md-sys-typescale-display-small-size` |
| Typescale.Static.Display Small.Tracking | `0px` | `0px` | `--md-sys-typescale-display-small-tracking` |
| Typescale.Static.Display Small.Line Height | `44px` | `44px` | `--md-sys-typescale-display-small-line-height` |
| Typescale.Static.Display Small.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-display-small-font` |
| Typescale.Static.Display Small.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-display-small-weight` |
| Typescale.Static.Display Small.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-display-small-weight` (MD3 Expressive) |
| Typescale.Static.Headline Large.Size | `32px` | `32px` | `--md-sys-typescale-headline-large-size` |
| Typescale.Static.Headline Large.Tracking | `0px` | `0px` | `--md-sys-typescale-headline-large-tracking` |
| Typescale.Static.Headline Large.Line Height | `40px` | `40px` | `--md-sys-typescale-headline-large-line-height` |
| Typescale.Static.Headline Large.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-headline-large-font` |
| Typescale.Static.Headline Large.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-headline-large-weight` |
| Typescale.Static.Headline Large.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-headline-large-weight` (MD3 Expressive) |
| Typescale.Static.Headline Medium.Size | `28px` | `28px` | `--md-sys-typescale-headline-medium-size` |
| Typescale.Static.Headline Medium.Tracking | `0px` | `0px` | `--md-sys-typescale-headline-medium-tracking` |
| Typescale.Static.Headline Medium.Line Height | `36px` | `36px` | `--md-sys-typescale-headline-medium-line-height` |
| Typescale.Static.Headline Medium.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-headline-medium-font` |
| Typescale.Static.Headline Medium.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-headline-medium-weight` |
| Typescale.Static.Headline Medium.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-headline-medium-weight` (MD3 Expressive) |
| Typescale.Static.Headline Small.Size | `24px` | `24px` | `--md-sys-typescale-headline-small-size` |
| Typescale.Static.Headline Small.Tracking | `0px` | `0px` | `--md-sys-typescale-headline-small-tracking` |
| Typescale.Static.Headline Small.Line Height | `32px` | `32px` | `--md-sys-typescale-headline-small-line-height` |
| Typescale.Static.Headline Small.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-headline-small-font` |
| Typescale.Static.Headline Small.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-headline-small-weight` |
| Typescale.Static.Headline Small.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-headline-small-weight` (MD3 Expressive) |
| Typescale.Static.Title Large.Size | `22px` | `22px` | `--md-sys-typescale-title-large-size` |
| Typescale.Static.Title Large.Tracking | `0px` | `0px` | `--md-sys-typescale-title-large-tracking` |
| Typescale.Static.Title Large.Line Height | `28px` | `28px` | `--md-sys-typescale-title-large-line-height` |
| Typescale.Static.Title Large.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-title-large-font` |
| Typescale.Static.Title Large.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-title-large-weight` |
| Typescale.Static.Title Large.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-title-large-weight` (MD3 Expressive) |
| Typescale.Static.Title Medium.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-title-medium-font` |
| Typescale.Static.Title Medium.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-title-medium-weight` |
| Typescale.Static.Title Medium.Size | `16px` | `16px` | `--md-sys-typescale-title-medium-size` |
| Typescale.Static.Title Medium.Tracking | `0.15000000596046448px` | `0.15000000596046448px` | `--md-sys-typescale-title-medium-tracking` |
| Typescale.Static.Title Medium.Line Height | `24px` | `24px` | `--md-sys-typescale-title-medium-line-height` |
| Typescale.Static.Title Medium.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-emphasized-title-medium-weight` (MD3 Expressive) |
| Typescale.Static.Title Small.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-title-small-font` |
| Typescale.Static.Title Small.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-title-small-weight` |
| Typescale.Static.Title Small.Size | `14px` | `14px` | `--md-sys-typescale-title-small-size` |
| Typescale.Static.Title Small.Tracking | `0.10000000149011612px` | `0.10000000149011612px` | `--md-sys-typescale-title-small-tracking` |
| Typescale.Static.Title Small.Line Height | `20px` | `20px` | `--md-sys-typescale-title-small-line-height` |
| Typescale.Static.Title Small.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-emphasized-title-small-weight` (MD3 Expressive) |
| Typescale.Static.Label Large.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-label-large-font` |
| Typescale.Static.Label Large.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-label-large-weight` |
| Typescale.Static.Label Large.Size | `14px` | `14px` | `--md-sys-typescale-label-large-size` |
| Typescale.Static.Label Large.Tracking | `0.10000000149011612px` | `0.10000000149011612px` | `--md-sys-typescale-label-large-tracking` |
| Typescale.Static.Label Large.Line Height | `20px` | `20px` | `--md-sys-typescale-label-large-line-height` |
| Typescale.Static.Label Large.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-label-large-weight-prominent` |
| Typescale.Static.Label Medium.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-label-medium-font` |
| Typescale.Static.Label Medium.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-label-medium-weight` |
| Typescale.Static.Label Medium.Size | `12px` | `12px` | `--md-sys-typescale-label-medium-size` |
| Typescale.Static.Label Medium.Tracking | `0.5px` | `0.5px` | `--md-sys-typescale-label-medium-tracking` |
| Typescale.Static.Label Medium.Line Height | `16px` | `16px` | `--md-sys-typescale-label-medium-line-height` |
| Typescale.Static.Label Medium.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-label-medium-weight-prominent` |
| Typescale.Static.Label Small.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-label-small-font` |
| Typescale.Static.Label Small.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-label-small-weight` |
| Typescale.Static.Label Small.Size | `11px` | `11px` | `--md-sys-typescale-label-small-size` |
| Typescale.Static.Label Small.Tracking | `0.5px` | `0.5px` | `--md-sys-typescale-label-small-tracking` |
| Typescale.Static.Label Small.Line Height | `16px` | `16px` | `--md-sys-typescale-label-small-line-height` |
| Typescale.Static.Label Small.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-emphasized-label-small-weight` (MD3 Expressive) |
| Typescale.Static.Body Large.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-body-large-font` |
| Typescale.Static.Body Large.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-body-large-weight` |
| Typescale.Static.Body Large.Size | `16px` | `16px` | `--md-sys-typescale-body-large-size` |
| Typescale.Static.Body Large.Tracking | `0.5px` | `0.5px` | `--md-sys-typescale-body-large-tracking` |
| Typescale.Static.Body Large.Line Height | `24px` | `24px` | `--md-sys-typescale-body-large-line-height` |
| Typescale.Static.Body Large.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-body-large-weight` (MD3 Expressive) |
| Typescale.Static.Body Medium.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-body-medium-font` |
| Typescale.Static.Body Medium.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-body-medium-weight` |
| Typescale.Static.Body Medium.Size | `14px` | `14px` | `--md-sys-typescale-body-medium-size` |
| Typescale.Static.Body Medium.Tracking | `0.25px` | `0.25px` | `--md-sys-typescale-body-medium-tracking` |
| Typescale.Static.Body Medium.Line Height | `20px` | `20px` | `--md-sys-typescale-body-medium-line-height` |
| Typescale.Static.Body Medium.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-body-medium-weight` (MD3 Expressive) |
| Typescale.Static.Body Small.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-body-small-font` |
| Typescale.Static.Body Small.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-body-small-weight` |
| Typescale.Static.Body Small.Size | `12px` | `12px` | `--md-sys-typescale-body-small-size` |
| Typescale.Static.Body Small.Tracking | `0.4000000059604645px` | `0.4000000059604645px` | `--md-sys-typescale-body-small-tracking` |
| Typescale.Static.Body Small.Line Height | `16px` | `16px` | `--md-sys-typescale-body-small-line-height` |
| Typescale.Static.Body Small.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-body-small-weight` (MD3 Expressive) |

## semantics/monochrome-dt.tokens.json

| Variable | Valeur | Valeur résolue | Équivalent MD3 |
|---|---|---|---|
| Colors.Schemes.Primary | `{Colors.Neutral.Shade-028}` | `#E2E2E2` | `--md-sys-color-primary` |
| Colors.Schemes.Surface Tint | `{Colors.Neutral.Shade-029}` | `#E8E8E8` | `--md-sys-color-surface-tint` |
| Colors.Schemes.On Primary | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-primary` |
| Colors.Schemes.Primary Container | `{Colors.Neutral.Shade-011}` | `#454545` | `--md-sys-color-primary-container` |
| Colors.Schemes.On Primary Container | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | `--md-sys-color-on-primary-container` |
| Colors.Schemes.Secondary | `{Colors.Neutral.Shade-023}` | `#C6C6C6` | `--md-sys-color-secondary` |
| Colors.Schemes.On Secondary | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-secondary` |
| Colors.Schemes.Secondary Container | `{Colors.Neutral.Shade-013}` | `#494949` | `--md-sys-color-secondary-container` |
| Colors.Schemes.On Secondary Container | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | `--md-sys-color-on-secondary-container` |
| Colors.Schemes.Tertiary | `{Colors.Neutral.Shade-021}` | `#BDBDBD` | `--md-sys-color-tertiary` |
| Colors.Schemes.On Tertiary | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-tertiary` |
| Colors.Schemes.Tertiary Container | `{Colors.Neutral.Shade-015}` | `#545454` | `--md-sys-color-tertiary-container` |
| Colors.Schemes.On Tertiary Container | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | `--md-sys-color-on-tertiary-container` |
| Colors.Schemes.Error | `{Colors.Neutral.Shade-026}` | `#D6D6D6` | `--md-sys-color-error` |
| Colors.Schemes.On Error | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-error` |
| Colors.Schemes.Error Container | `{Colors.Neutral.Shade-013}` | `#494949` | `--md-sys-color-error-container` |
| Colors.Schemes.On Error Container | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | `--md-sys-color-on-error-container` |
| Colors.Schemes.Background | `{Colors.Neutral.Shade-004}` | `#121212` | `--md-sys-color-background` |
| Colors.Schemes.On Background | `{Colors.Neutral.Shade-031}` | `#F2F2F2` | `--md-sys-color-on-background` |
| Colors.Schemes.Surface | `{Colors.Neutral.Shade-004}` | `#121212` | `--md-sys-color-surface` |
| Colors.Schemes.On Surface | `{Colors.Neutral.Shade-031}` | `#F2F2F2` | `--md-sys-color-on-surface` |
| Colors.Schemes.Surface Variant | `{Colors.Neutral.Shade-012}` | `#474747` | `--md-sys-color-surface-variant` |
| Colors.Schemes.On Surface Variant | `{Colors.Neutral.Shade-025}` | `#D1D1D1` | `--md-sys-color-on-surface-variant` |
| Colors.Schemes.Outline | `{Colors.Neutral.Shade-020}` | `#A3A3A3` | `--md-sys-color-outline` |
| Colors.Schemes.Outline Variant | `{Colors.Neutral.Shade-013}` | `#494949` | `--md-sys-color-outline-variant` |
| Colors.Schemes.Shadow | `{Colors.Neutral.Shade-001}` | `#000000` | `--md-sys-color-shadow` |
| Colors.Schemes.Scrim | `{Colors.Neutral.Shade-001}` | `#000000` | `--md-sys-color-scrim` |
| Colors.Schemes.Inverse Surface | `{Colors.Neutral.Shade-028}` | `#E2E2E2` | `--md-sys-color-inverse-surface` |
| Colors.Schemes.Inverse On Surface | `{Colors.Neutral.Shade-008}` | `#303030` | `--md-sys-color-inverse-on-surface` |
| Colors.Schemes.Inverse Primary | `{Colors.Neutral.Shade-011}` | `#454545` | `--md-sys-color-inverse-primary` |
| Colors.Schemes.Primary Fixed | `{Colors.Neutral.Shade-028}` | `#E2E2E2` | `--md-sys-color-primary-fixed` |
| Colors.Schemes.On Primary Fixed | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-primary-fixed` |
| Colors.Schemes.Primary Fixed Dim | `{Colors.Neutral.Shade-023}` | `#C6C6C6` | `--md-sys-color-primary-fixed-dim` |
| Colors.Schemes.On Primary Fixed Variant | `{Colors.Neutral.Shade-011}` | `#454545` | `--md-sys-color-on-primary-fixed-variant` |
| Colors.Schemes.Secondary Fixed | `{Colors.Neutral.Shade-028}` | `#E2E2E2` | `--md-sys-color-secondary-fixed` |
| Colors.Schemes.On Secondary Fixed | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-secondary-fixed` |
| Colors.Schemes.Secondary Fixed Dim | `{Colors.Neutral.Shade-023}` | `#C6C6C6` | `--md-sys-color-secondary-fixed-dim` |
| Colors.Schemes.On Secondary Fixed Variant | `{Colors.Neutral.Shade-011}` | `#454545` | `--md-sys-color-on-secondary-fixed-variant` |
| Colors.Schemes.Tertiary Fixed | `{Colors.Neutral.Shade-028}` | `#E2E2E2` | `--md-sys-color-tertiary-fixed` |
| Colors.Schemes.On Tertiary Fixed | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-tertiary-fixed` |
| Colors.Schemes.Tertiary Fixed Dim | `{Colors.Neutral.Shade-023}` | `#C6C6C6` | `--md-sys-color-tertiary-fixed-dim` |
| Colors.Schemes.On Tertiary Fixed Variant | `{Colors.Neutral.Shade-011}` | `#454545` | `--md-sys-color-on-tertiary-fixed-variant` |
| Colors.Schemes.Surface Dim | `{Colors.Neutral.Shade-003}` | `#101010` | `--md-sys-color-surface-dim` |
| Colors.Schemes.Surface Bright | `{Colors.Neutral.Shade-010}` | `#383838` | `--md-sys-color-surface-bright` |
| Colors.Schemes.Surface Container Lowest | `{Colors.Neutral.Shade-002}` | `#0D0D0D` | `--md-sys-color-surface-container-lowest` |
| Colors.Schemes.Surface Container Low | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-surface-container-low` |
| Colors.Schemes.Surface Container | `{Colors.Neutral.Shade-006}` | `#1F1F1F` | `--md-sys-color-surface-container` |
| Colors.Schemes.Surface Container High | `{Colors.Neutral.Shade-007}` | `#292929` | `--md-sys-color-surface-container-high` |
| Colors.Schemes.Surface Container Highest | `{Colors.Neutral.Shade-009}` | `#343434` | `--md-sys-color-surface-container-highest` |
| Colors.Schemes.Success | `{Colors.Neutral.Shade-025}` | `#D1D1D1` | — (extension hors MD3) |
| Colors.Schemes.Info | `{Colors.Neutral.Shade-023}` | `#C6C6C6` | — (extension hors MD3) |
| Colors.Schemes.Warning | `{Colors.Neutral.Shade-024}` | `#CCCCCC` | — (extension hors MD3) |
| Colors.Schemes.On Warning | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | — (extension hors MD3) |
| Colors.Schemes.On Success | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | — (extension hors MD3) |
| Colors.Schemes.On Info | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | — (extension hors MD3) |
| Colors.Schemes.Warning Container | `{Colors.Neutral.Shade-015}` | `#545454` | — (extension hors MD3) |
| Colors.Schemes.On Warning Container | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | — (extension hors MD3) |
| Colors.Schemes.Success Container | `{Colors.Neutral.Shade-014}` | `#4D4D4D` | — (extension hors MD3) |
| Colors.Schemes.On Success Container | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | — (extension hors MD3) |
| Colors.Schemes.Info Container | `{Colors.Neutral.Shade-016}` | `#5C5C5C` | — (extension hors MD3) |
| Colors.Schemes.On Info Container | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | — (extension hors MD3) |
| Colors.Schemes.Neutral.0 | `{Colors.Neutral.Shade-035}` | `#FFFFFF` | — |
| Colors.Schemes.Neutral.900 | `{Colors.Neutral.Shade-005}` | `#1A1A1A` | — |
| Colors.State Layers.Primary.Opacity-08 | `{Colors.Schemes.Primary}` | `#E2E2E2` | `--md-sys-color-primary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Primary.Opacity-10 | `{Colors.Schemes.Primary}` | `#E2E2E2` | `--md-sys-color-primary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Primary.Opacity-16 | `{Colors.Schemes.Primary}` | `#E2E2E2` | `--md-sys-color-primary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Primary.Opacity-08 | `{Colors.Schemes.On Primary}` | `#1A1A1A` | `--md-sys-color-on-primary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Primary.Opacity-10 | `{Colors.Schemes.On Primary}` | `#1A1A1A` | `--md-sys-color-on-primary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Primary.Opacity-16 | `{Colors.Schemes.On Primary}` | `#1A1A1A` | `--md-sys-color-on-primary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Primary Container.Opacity-08 | `{Colors.Schemes.Primary Container}` | `#454545` | `--md-sys-color-primary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Primary Container.Opacity-10 | `{Colors.Schemes.Primary Container}` | `#454545` | `--md-sys-color-primary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Primary Container.Opacity-16 | `{Colors.Schemes.Primary Container}` | `#454545` | `--md-sys-color-primary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Primary Container.Opacity-08 | `{Colors.Schemes.On Primary Container}` | `#FFFFFF` | `--md-sys-color-on-primary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Primary Container.Opacity-10 | `{Colors.Schemes.On Primary Container}` | `#FFFFFF` | `--md-sys-color-on-primary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Primary Container.Opacity-16 | `{Colors.Schemes.On Primary Container}` | `#FFFFFF` | `--md-sys-color-on-primary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Primary Fixed.Opacity-08 | `{Colors.Schemes.Primary Fixed}` | `#E2E2E2` | `--md-sys-color-primary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Primary Fixed.Opacity-10 | `{Colors.Schemes.Primary Fixed}` | `#E2E2E2` | `--md-sys-color-primary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Primary Fixed.Opacity-16 | `{Colors.Schemes.Primary Fixed}` | `#E2E2E2` | `--md-sys-color-primary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Primary Fixed.Opacity-08 | `{Colors.Schemes.On Primary Fixed}` | `#1A1A1A` | `--md-sys-color-on-primary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Primary Fixed.Opacity-10 | `{Colors.Schemes.On Primary Fixed}` | `#1A1A1A` | `--md-sys-color-on-primary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Primary Fixed.Opacity-16 | `{Colors.Schemes.On Primary Fixed}` | `#1A1A1A` | `--md-sys-color-on-primary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Primary Fixed Dim.Opacity-08 | `{Colors.Schemes.Primary Fixed Dim}` | `#C6C6C6` | `--md-sys-color-primary-fixed-dim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Primary Fixed Dim.Opacity-10 | `{Colors.Schemes.Primary Fixed Dim}` | `#C6C6C6` | `--md-sys-color-primary-fixed-dim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Primary Fixed Dim.Opacity-16 | `{Colors.Schemes.Primary Fixed Dim}` | `#C6C6C6` | `--md-sys-color-primary-fixed-dim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Primary Fixed Variant.Opacity-08 | `{Colors.Schemes.On Primary Fixed Variant}` | `#454545` | `--md-sys-color-on-primary-fixed-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Primary Fixed Variant.Opacity-10 | `{Colors.Schemes.On Primary Fixed Variant}` | `#454545` | `--md-sys-color-on-primary-fixed-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Primary Fixed Variant.Opacity-16 | `{Colors.Schemes.On Primary Fixed Variant}` | `#454545` | `--md-sys-color-on-primary-fixed-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Secondary.Opacity-08 | `{Colors.Schemes.Secondary}` | `#C6C6C6` | `--md-sys-color-secondary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Secondary.Opacity-10 | `{Colors.Schemes.Secondary}` | `#C6C6C6` | `--md-sys-color-secondary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Secondary.Opacity-16 | `{Colors.Schemes.Secondary}` | `#C6C6C6` | `--md-sys-color-secondary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Secondary.Opacity-08 | `{Colors.Schemes.On Secondary}` | `#1A1A1A` | `--md-sys-color-on-secondary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Secondary.Opacity-10 | `{Colors.Schemes.On Secondary}` | `#1A1A1A` | `--md-sys-color-on-secondary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Secondary.Opacity-16 | `{Colors.Schemes.On Secondary}` | `#1A1A1A` | `--md-sys-color-on-secondary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Secondary Container.Opacity-08 | `{Colors.Schemes.Secondary Container}` | `#494949` | `--md-sys-color-secondary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Secondary Container.Opacity-10 | `{Colors.Schemes.Secondary Container}` | `#494949` | `--md-sys-color-secondary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Secondary Container.Opacity-16 | `{Colors.Schemes.Secondary Container}` | `#494949` | `--md-sys-color-secondary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Secondary Container.Opacity-08 | `{Colors.Schemes.On Secondary Container}` | `#FFFFFF` | `--md-sys-color-on-secondary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Secondary Container.Opacity-10 | `{Colors.Schemes.On Secondary Container}` | `#FFFFFF` | `--md-sys-color-on-secondary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Secondary Container.Opacity-16 | `{Colors.Schemes.On Secondary Container}` | `#FFFFFF` | `--md-sys-color-on-secondary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Secondary Fixed.Opacity-08 | `{Colors.Schemes.Secondary Fixed}` | `#E2E2E2` | `--md-sys-color-secondary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Secondary Fixed.Opacity-10 | `{Colors.Schemes.Secondary Fixed}` | `#E2E2E2` | `--md-sys-color-secondary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Secondary Fixed.Opacity-16 | `{Colors.Schemes.Secondary Fixed}` | `#E2E2E2` | `--md-sys-color-secondary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Secondary Fixed.Opacity-08 | `{Colors.Schemes.On Secondary Fixed}` | `#1A1A1A` | `--md-sys-color-on-secondary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Secondary Fixed.Opacity-10 | `{Colors.Schemes.On Secondary Fixed}` | `#1A1A1A` | `--md-sys-color-on-secondary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Secondary Fixed.Opacity-16 | `{Colors.Schemes.On Secondary Fixed}` | `#1A1A1A` | `--md-sys-color-on-secondary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Secondary Fixed Dim.Opacity-08 | `{Colors.Schemes.Secondary Fixed Dim}` | `#C6C6C6` | `--md-sys-color-secondary-fixed-dim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Secondary Fixed Dim.Opacity-10 | `{Colors.Schemes.Secondary Fixed Dim}` | `#C6C6C6` | `--md-sys-color-secondary-fixed-dim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Secondary Fixed Dim.Opacity-16 | `{Colors.Schemes.Secondary Fixed Dim}` | `#C6C6C6` | `--md-sys-color-secondary-fixed-dim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Secondary Fixed Variant.Opacity-08 | `{Colors.Schemes.On Secondary Fixed Variant}` | `#454545` | `--md-sys-color-on-secondary-fixed-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Secondary Fixed Variant.Opacity-10 | `{Colors.Schemes.On Secondary Fixed Variant}` | `#454545` | `--md-sys-color-on-secondary-fixed-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Secondary Fixed Variant.Opacity-16 | `{Colors.Schemes.On Secondary Fixed Variant}` | `#454545` | `--md-sys-color-on-secondary-fixed-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Tertiary.Opacity-08 | `{Colors.Schemes.Tertiary}` | `#BDBDBD` | `--md-sys-color-tertiary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Tertiary.Opacity-10 | `{Colors.Schemes.Tertiary}` | `#BDBDBD` | `--md-sys-color-tertiary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Tertiary.Opacity-16 | `{Colors.Schemes.Tertiary}` | `#BDBDBD` | `--md-sys-color-tertiary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Tertiary.Opacity-08 | `{Colors.Schemes.On Tertiary}` | `#1A1A1A` | `--md-sys-color-on-tertiary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Tertiary.Opacity-10 | `{Colors.Schemes.On Tertiary}` | `#1A1A1A` | `--md-sys-color-on-tertiary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Tertiary.Opacity-16 | `{Colors.Schemes.On Tertiary}` | `#1A1A1A` | `--md-sys-color-on-tertiary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Tertiary Container.Opacity-08 | `{Colors.Schemes.Tertiary Container}` | `#545454` | `--md-sys-color-tertiary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Tertiary Container.Opacity-10 | `{Colors.Schemes.Tertiary Container}` | `#545454` | `--md-sys-color-tertiary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Tertiary Container.Opacity-16 | `{Colors.Schemes.Tertiary Container}` | `#545454` | `--md-sys-color-tertiary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Tertiary Container.Opacity-08 | `{Colors.Schemes.On Tertiary Container}` | `#FFFFFF` | `--md-sys-color-on-tertiary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Tertiary Container.Opacity-10 | `{Colors.Schemes.On Tertiary Container}` | `#FFFFFF` | `--md-sys-color-on-tertiary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Tertiary Container.Opacity-16 | `{Colors.Schemes.On Tertiary Container}` | `#FFFFFF` | `--md-sys-color-on-tertiary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Tertiary Fixed.Opacity-08 | `{Colors.Schemes.Tertiary Fixed}` | `#E2E2E2` | `--md-sys-color-tertiary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Tertiary Fixed.Opacity-10 | `{Colors.Schemes.Tertiary Fixed}` | `#E2E2E2` | `--md-sys-color-tertiary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Tertiary Fixed.Opacity-16 | `{Colors.Schemes.Tertiary Fixed}` | `#E2E2E2` | `--md-sys-color-tertiary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Tertiary Fixed.Opacity-08 | `{Colors.Schemes.On Tertiary Fixed}` | `#1A1A1A` | `--md-sys-color-on-tertiary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Tertiary Fixed.Opacity-10 | `{Colors.Schemes.On Tertiary Fixed}` | `#1A1A1A` | `--md-sys-color-on-tertiary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Tertiary Fixed.Opacity-16 | `{Colors.Schemes.On Tertiary Fixed}` | `#1A1A1A` | `--md-sys-color-on-tertiary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Tertiary Fixed Dim.Opacity-08 | `{Colors.Schemes.Tertiary Fixed Dim}` | `#C6C6C6` | `--md-sys-color-tertiary-fixed-dim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Tertiary Fixed Dim.Opacity-10 | `{Colors.Schemes.Tertiary Fixed Dim}` | `#C6C6C6` | `--md-sys-color-tertiary-fixed-dim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Tertiary Fixed Dim.Opacity-16 | `{Colors.Schemes.Tertiary Fixed Dim}` | `#C6C6C6` | `--md-sys-color-tertiary-fixed-dim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Tertiary Fixed Variant.Opacity-08 | `{Colors.Schemes.On Tertiary Fixed Variant}` | `#454545` | `--md-sys-color-on-tertiary-fixed-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Tertiary Fixed Variant.Opacity-10 | `{Colors.Schemes.On Tertiary Fixed Variant}` | `#454545` | `--md-sys-color-on-tertiary-fixed-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Tertiary Fixed Variant.Opacity-16 | `{Colors.Schemes.On Tertiary Fixed Variant}` | `#454545` | `--md-sys-color-on-tertiary-fixed-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Error.Opacity-08 | `{Colors.Schemes.Error}` | `#D6D6D6` | `--md-sys-color-error` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Error.Opacity-10 | `{Colors.Schemes.Error}` | `#D6D6D6` | `--md-sys-color-error` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Error.Opacity-16 | `{Colors.Schemes.Error}` | `#D6D6D6` | `--md-sys-color-error` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Error.Opacity-08 | `{Colors.Schemes.On Error}` | `#1A1A1A` | `--md-sys-color-on-error` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Error.Opacity-10 | `{Colors.Schemes.On Error}` | `#1A1A1A` | `--md-sys-color-on-error` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Error.Opacity-16 | `{Colors.Schemes.On Error}` | `#1A1A1A` | `--md-sys-color-on-error` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Error Container.Opacity-08 | `{Colors.Schemes.Error Container}` | `#494949` | `--md-sys-color-error-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Error Container.Opacity-10 | `{Colors.Schemes.Error Container}` | `#494949` | `--md-sys-color-error-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Error Container.Opacity-16 | `{Colors.Schemes.Error Container}` | `#494949` | `--md-sys-color-error-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Error Container.Opacity-08 | `{Colors.Schemes.On Error Container}` | `#FFFFFF` | `--md-sys-color-on-error-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Error Container.Opacity-10 | `{Colors.Schemes.On Error Container}` | `#FFFFFF` | `--md-sys-color-on-error-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Error Container.Opacity-16 | `{Colors.Schemes.On Error Container}` | `#FFFFFF` | `--md-sys-color-on-error-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Outline.Opacity-08 | `{Colors.Schemes.Outline}` | `#A3A3A3` | `--md-sys-color-outline` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Outline.Opacity-10 | `{Colors.Schemes.Outline}` | `#A3A3A3` | `--md-sys-color-outline` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Outline.Opacity-16 | `{Colors.Schemes.Outline}` | `#A3A3A3` | `--md-sys-color-outline` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Background.Opacity-08 | `{Colors.Schemes.Background}` | `#121212` | `--md-sys-color-background` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Background.Opacity-10 | `{Colors.Schemes.Background}` | `#121212` | `--md-sys-color-background` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Background.Opacity-16 | `{Colors.Schemes.Background}` | `#121212` | `--md-sys-color-background` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Background.Opacity-08 | `{Colors.Schemes.On Background}` | `#F2F2F2` | `--md-sys-color-on-background` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Background.Opacity-10 | `{Colors.Schemes.On Background}` | `#F2F2F2` | `--md-sys-color-on-background` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Background.Opacity-16 | `{Colors.Schemes.On Background}` | `#F2F2F2` | `--md-sys-color-on-background` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface.Opacity-08 | `{Colors.Schemes.Surface}` | `#121212` | `--md-sys-color-surface` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface.Opacity-10 | `{Colors.Schemes.Surface}` | `#121212` | `--md-sys-color-surface` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface.Opacity-16 | `{Colors.Schemes.Surface}` | `#121212` | `--md-sys-color-surface` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Surface.Opacity-08 | `{Colors.Schemes.On Surface}` | `#F2F2F2` | `--md-sys-color-on-surface` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Surface.Opacity-10 | `{Colors.Schemes.On Surface}` | `#F2F2F2` | `--md-sys-color-on-surface` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Surface.Opacity-16 | `{Colors.Schemes.On Surface}` | `#F2F2F2` | `--md-sys-color-on-surface` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Variant.Opacity-08 | `{Colors.Schemes.Surface Variant}` | `#474747` | `--md-sys-color-surface-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Variant.Opacity-10 | `{Colors.Schemes.Surface Variant}` | `#474747` | `--md-sys-color-surface-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Variant.Opacity-16 | `{Colors.Schemes.Surface Variant}` | `#474747` | `--md-sys-color-surface-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Surface Variant.Opacity-08 | `{Colors.Schemes.On Surface Variant}` | `#D1D1D1` | `--md-sys-color-on-surface-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Surface Variant.Opacity-10 | `{Colors.Schemes.On Surface Variant}` | `#D1D1D1` | `--md-sys-color-on-surface-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Surface Variant.Opacity-16 | `{Colors.Schemes.On Surface Variant}` | `#D1D1D1` | `--md-sys-color-on-surface-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Inverse Surface.Opacity-08 | `{Colors.Schemes.Inverse Surface}` | `#E2E2E2` | `--md-sys-color-inverse-surface` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Inverse Surface.Opacity-10 | `{Colors.Schemes.Inverse Surface}` | `#E2E2E2` | `--md-sys-color-inverse-surface` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Inverse Surface.Opacity-16 | `{Colors.Schemes.Inverse Surface}` | `#E2E2E2` | `--md-sys-color-inverse-surface` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Inverse On Surface.Opacity-08 | `{Colors.Schemes.Inverse On Surface}` | `#303030` | `--md-sys-color-inverse-on-surface` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Inverse On Surface.Opacity-10 | `{Colors.Schemes.Inverse On Surface}` | `#303030` | `--md-sys-color-inverse-on-surface` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Inverse On Surface.Opacity-16 | `{Colors.Schemes.Inverse On Surface}` | `#303030` | `--md-sys-color-inverse-on-surface` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Inverse Primary.Opacity-08 | `{Colors.Schemes.Inverse Primary}` | `#454545` | `--md-sys-color-inverse-primary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Inverse Primary.Opacity-10 | `{Colors.Schemes.Inverse Primary}` | `#454545` | `--md-sys-color-inverse-primary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Inverse Primary.Opacity-16 | `{Colors.Schemes.Inverse Primary}` | `#454545` | `--md-sys-color-inverse-primary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Shadow.Opacity-08 | `{Colors.Schemes.Shadow}` | `#000000` | `--md-sys-color-shadow` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Shadow.Opacity-10 | `{Colors.Schemes.Shadow}` | `#000000` | `--md-sys-color-shadow` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Shadow.Opacity-16 | `{Colors.Schemes.Shadow}` | `#000000` | `--md-sys-color-shadow` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Tint.Opacity-08 | `{Colors.Schemes.Surface Tint}` | `#E8E8E8` | `--md-sys-color-surface-tint` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Tint.Opacity-10 | `{Colors.Schemes.Surface Tint}` | `#E8E8E8` | `--md-sys-color-surface-tint` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Tint.Opacity-16 | `{Colors.Schemes.Surface Tint}` | `#E8E8E8` | `--md-sys-color-surface-tint` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Outline Variant.Opacity-08 | `{Colors.Schemes.Outline Variant}` | `#494949` | `--md-sys-color-outline-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Outline Variant.Opacity-10 | `{Colors.Schemes.Outline Variant}` | `#494949` | `--md-sys-color-outline-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Outline Variant.Opacity-16 | `{Colors.Schemes.Outline Variant}` | `#494949` | `--md-sys-color-outline-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Scrim.Opacity-08 | `{Colors.Schemes.Scrim}` | `#000000` | `--md-sys-color-scrim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Scrim.Opacity-10 | `{Colors.Schemes.Scrim}` | `#000000` | `--md-sys-color-scrim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Scrim.Opacity-16 | `{Colors.Schemes.Scrim}` | `#000000` | `--md-sys-color-scrim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container Highest.Opacity-08 | `{Colors.Schemes.Surface Container Highest}` | `#343434` | `--md-sys-color-surface-container-highest` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container Highest.Opacity-10 | `{Colors.Schemes.Surface Container Highest}` | `#343434` | `--md-sys-color-surface-container-highest` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container Highest.Opacity-16 | `{Colors.Schemes.Surface Container Highest}` | `#343434` | `--md-sys-color-surface-container-highest` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container High.Opacity-08 | `{Colors.Schemes.Surface Container High}` | `#292929` | `--md-sys-color-surface-container-high` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container High.Opacity-10 | `{Colors.Schemes.Surface Container High}` | `#292929` | `--md-sys-color-surface-container-high` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container High.Opacity-16 | `{Colors.Schemes.Surface Container High}` | `#292929` | `--md-sys-color-surface-container-high` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container.Opacity-08 | `{Colors.Schemes.Surface Container}` | `#1F1F1F` | `--md-sys-color-surface-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container.Opacity-10 | `{Colors.Schemes.Surface Container}` | `#1F1F1F` | `--md-sys-color-surface-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container.Opacity-16 | `{Colors.Schemes.Surface Container}` | `#1F1F1F` | `--md-sys-color-surface-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container Low.Opacity-08 | `{Colors.Schemes.Surface Container Low}` | `#1A1A1A` | `--md-sys-color-surface-container-low` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container Low.Opacity-10 | `{Colors.Schemes.Surface Container Low}` | `#1A1A1A` | `--md-sys-color-surface-container-low` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container Low.Opacity-16 | `{Colors.Schemes.Surface Container Low}` | `#1A1A1A` | `--md-sys-color-surface-container-low` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container Lowest.Opacity-08 | `{Colors.Schemes.Surface Container Lowest}` | `#0D0D0D` | `--md-sys-color-surface-container-lowest` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container Lowest.Opacity-10 | `{Colors.Schemes.Surface Container Lowest}` | `#0D0D0D` | `--md-sys-color-surface-container-lowest` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container Lowest.Opacity-16 | `{Colors.Schemes.Surface Container Lowest}` | `#0D0D0D` | `--md-sys-color-surface-container-lowest` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Bright.Opacity-08 | `{Colors.Schemes.Surface Bright}` | `#383838` | `--md-sys-color-surface-bright` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Bright.Opacity-10 | `{Colors.Schemes.Surface Bright}` | `#383838` | `--md-sys-color-surface-bright` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Bright.Opacity-16 | `{Colors.Schemes.Surface Bright}` | `#383838` | `--md-sys-color-surface-bright` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Dim.Opacity-08 | `{Colors.Schemes.Surface Dim}` | `#101010` | `--md-sys-color-surface-dim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Dim.Opacity-10 | `{Colors.Schemes.Surface Dim}` | `#101010` | `--md-sys-color-surface-dim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Dim.Opacity-16 | `{Colors.Schemes.Surface Dim}` | `#101010` | `--md-sys-color-surface-dim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.Add-ons.Section background | `{Colors.Neutral.Shade-001}` | `#000000` | — (extension hors MD3) |
| Typescale.Static.Display Large.Size | `57px` | `57px` | `--md-sys-typescale-display-large-size` |
| Typescale.Static.Display Large.Tracking | `-0.25px` | `-0.25px` | `--md-sys-typescale-display-large-tracking` |
| Typescale.Static.Display Large.Line Height | `64px` | `64px` | `--md-sys-typescale-display-large-line-height` |
| Typescale.Static.Display Large.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-display-large-font` |
| Typescale.Static.Display Large.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-display-large-weight` |
| Typescale.Static.Display Large.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-display-large-weight` (MD3 Expressive) |
| Typescale.Static.Display Medium.Size | `45px` | `45px` | `--md-sys-typescale-display-medium-size` |
| Typescale.Static.Display Medium.Line Height | `52px` | `52px` | `--md-sys-typescale-display-medium-line-height` |
| Typescale.Static.Display Medium.Tracking | `0px` | `0px` | `--md-sys-typescale-display-medium-tracking` |
| Typescale.Static.Display Medium.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-display-medium-font` |
| Typescale.Static.Display Medium.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-display-medium-weight` |
| Typescale.Static.Display Medium.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-display-medium-weight` (MD3 Expressive) |
| Typescale.Static.Display Small.Size | `36px` | `36px` | `--md-sys-typescale-display-small-size` |
| Typescale.Static.Display Small.Tracking | `0px` | `0px` | `--md-sys-typescale-display-small-tracking` |
| Typescale.Static.Display Small.Line Height | `44px` | `44px` | `--md-sys-typescale-display-small-line-height` |
| Typescale.Static.Display Small.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-display-small-font` |
| Typescale.Static.Display Small.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-display-small-weight` |
| Typescale.Static.Display Small.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-display-small-weight` (MD3 Expressive) |
| Typescale.Static.Headline Large.Size | `32px` | `32px` | `--md-sys-typescale-headline-large-size` |
| Typescale.Static.Headline Large.Tracking | `0px` | `0px` | `--md-sys-typescale-headline-large-tracking` |
| Typescale.Static.Headline Large.Line Height | `40px` | `40px` | `--md-sys-typescale-headline-large-line-height` |
| Typescale.Static.Headline Large.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-headline-large-font` |
| Typescale.Static.Headline Large.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-headline-large-weight` |
| Typescale.Static.Headline Large.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-headline-large-weight` (MD3 Expressive) |
| Typescale.Static.Headline Medium.Size | `28px` | `28px` | `--md-sys-typescale-headline-medium-size` |
| Typescale.Static.Headline Medium.Tracking | `0px` | `0px` | `--md-sys-typescale-headline-medium-tracking` |
| Typescale.Static.Headline Medium.Line Height | `36px` | `36px` | `--md-sys-typescale-headline-medium-line-height` |
| Typescale.Static.Headline Medium.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-headline-medium-font` |
| Typescale.Static.Headline Medium.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-headline-medium-weight` |
| Typescale.Static.Headline Medium.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-headline-medium-weight` (MD3 Expressive) |
| Typescale.Static.Headline Small.Size | `24px` | `24px` | `--md-sys-typescale-headline-small-size` |
| Typescale.Static.Headline Small.Tracking | `0px` | `0px` | `--md-sys-typescale-headline-small-tracking` |
| Typescale.Static.Headline Small.Line Height | `32px` | `32px` | `--md-sys-typescale-headline-small-line-height` |
| Typescale.Static.Headline Small.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-headline-small-font` |
| Typescale.Static.Headline Small.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-headline-small-weight` |
| Typescale.Static.Headline Small.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-headline-small-weight` (MD3 Expressive) |
| Typescale.Static.Title Large.Size | `22px` | `22px` | `--md-sys-typescale-title-large-size` |
| Typescale.Static.Title Large.Tracking | `0px` | `0px` | `--md-sys-typescale-title-large-tracking` |
| Typescale.Static.Title Large.Line Height | `28px` | `28px` | `--md-sys-typescale-title-large-line-height` |
| Typescale.Static.Title Large.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-title-large-font` |
| Typescale.Static.Title Large.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-title-large-weight` |
| Typescale.Static.Title Large.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-title-large-weight` (MD3 Expressive) |
| Typescale.Static.Title Medium.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-title-medium-font` |
| Typescale.Static.Title Medium.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-title-medium-weight` |
| Typescale.Static.Title Medium.Size | `16px` | `16px` | `--md-sys-typescale-title-medium-size` |
| Typescale.Static.Title Medium.Tracking | `0.15000000596046448px` | `0.15000000596046448px` | `--md-sys-typescale-title-medium-tracking` |
| Typescale.Static.Title Medium.Line Height | `24px` | `24px` | `--md-sys-typescale-title-medium-line-height` |
| Typescale.Static.Title Medium.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-emphasized-title-medium-weight` (MD3 Expressive) |
| Typescale.Static.Title Small.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-title-small-font` |
| Typescale.Static.Title Small.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-title-small-weight` |
| Typescale.Static.Title Small.Size | `14px` | `14px` | `--md-sys-typescale-title-small-size` |
| Typescale.Static.Title Small.Tracking | `0.10000000149011612px` | `0.10000000149011612px` | `--md-sys-typescale-title-small-tracking` |
| Typescale.Static.Title Small.Line Height | `20px` | `20px` | `--md-sys-typescale-title-small-line-height` |
| Typescale.Static.Title Small.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-emphasized-title-small-weight` (MD3 Expressive) |
| Typescale.Static.Label Large.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-label-large-font` |
| Typescale.Static.Label Large.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-label-large-weight` |
| Typescale.Static.Label Large.Size | `14px` | `14px` | `--md-sys-typescale-label-large-size` |
| Typescale.Static.Label Large.Tracking | `0.10000000149011612px` | `0.10000000149011612px` | `--md-sys-typescale-label-large-tracking` |
| Typescale.Static.Label Large.Line Height | `20px` | `20px` | `--md-sys-typescale-label-large-line-height` |
| Typescale.Static.Label Large.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-label-large-weight-prominent` |
| Typescale.Static.Label Medium.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-label-medium-font` |
| Typescale.Static.Label Medium.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-label-medium-weight` |
| Typescale.Static.Label Medium.Size | `12px` | `12px` | `--md-sys-typescale-label-medium-size` |
| Typescale.Static.Label Medium.Tracking | `0.5px` | `0.5px` | `--md-sys-typescale-label-medium-tracking` |
| Typescale.Static.Label Medium.Line Height | `16px` | `16px` | `--md-sys-typescale-label-medium-line-height` |
| Typescale.Static.Label Medium.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-label-medium-weight-prominent` |
| Typescale.Static.Label Small.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-label-small-font` |
| Typescale.Static.Label Small.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-label-small-weight` |
| Typescale.Static.Label Small.Size | `11px` | `11px` | `--md-sys-typescale-label-small-size` |
| Typescale.Static.Label Small.Tracking | `0.5px` | `0.5px` | `--md-sys-typescale-label-small-tracking` |
| Typescale.Static.Label Small.Line Height | `16px` | `16px` | `--md-sys-typescale-label-small-line-height` |
| Typescale.Static.Label Small.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-emphasized-label-small-weight` (MD3 Expressive) |
| Typescale.Static.Body Large.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-body-large-font` |
| Typescale.Static.Body Large.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-body-large-weight` |
| Typescale.Static.Body Large.Size | `16px` | `16px` | `--md-sys-typescale-body-large-size` |
| Typescale.Static.Body Large.Tracking | `0.5px` | `0.5px` | `--md-sys-typescale-body-large-tracking` |
| Typescale.Static.Body Large.Line Height | `24px` | `24px` | `--md-sys-typescale-body-large-line-height` |
| Typescale.Static.Body Large.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-body-large-weight` (MD3 Expressive) |
| Typescale.Static.Body Medium.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-body-medium-font` |
| Typescale.Static.Body Medium.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-body-medium-weight` |
| Typescale.Static.Body Medium.Size | `14px` | `14px` | `--md-sys-typescale-body-medium-size` |
| Typescale.Static.Body Medium.Tracking | `0.25px` | `0.25px` | `--md-sys-typescale-body-medium-tracking` |
| Typescale.Static.Body Medium.Line Height | `20px` | `20px` | `--md-sys-typescale-body-medium-line-height` |
| Typescale.Static.Body Medium.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-body-medium-weight` (MD3 Expressive) |
| Typescale.Static.Body Small.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-body-small-font` |
| Typescale.Static.Body Small.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-body-small-weight` |
| Typescale.Static.Body Small.Size | `12px` | `12px` | `--md-sys-typescale-body-small-size` |
| Typescale.Static.Body Small.Tracking | `0.4000000059604645px` | `0.4000000059604645px` | `--md-sys-typescale-body-small-tracking` |
| Typescale.Static.Body Small.Line Height | `16px` | `16px` | `--md-sys-typescale-body-small-line-height` |
| Typescale.Static.Body Small.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-body-small-weight` (MD3 Expressive) |

## semantics/monochrome-lt.tokens.json

| Variable | Valeur | Valeur résolue | Équivalent MD3 |
|---|---|---|---|
| Colors.Schemes.Primary | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-primary` |
| Colors.Schemes.Surface Tint | `{Colors.Neutral.Shade-019}` | `#9F9F9F` | `--md-sys-color-surface-tint` |
| Colors.Schemes.On Primary | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | `--md-sys-color-on-primary` |
| Colors.Schemes.Primary Container | `{Colors.Neutral.Shade-028}` | `#E2E2E2` | `--md-sys-color-primary-container` |
| Colors.Schemes.On Primary Container | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-primary-container` |
| Colors.Schemes.Secondary | `{Colors.Neutral.Shade-013}` | `#494949` | `--md-sys-color-secondary` |
| Colors.Schemes.On Secondary | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | `--md-sys-color-on-secondary` |
| Colors.Schemes.Secondary Container | `{Colors.Neutral.Shade-028}` | `#E2E2E2` | `--md-sys-color-secondary-container` |
| Colors.Schemes.On Secondary Container | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-secondary-container` |
| Colors.Schemes.Tertiary | `{Colors.Neutral.Shade-017}` | `#626262` | `--md-sys-color-tertiary` |
| Colors.Schemes.On Tertiary | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | `--md-sys-color-on-tertiary` |
| Colors.Schemes.Tertiary Container | `{Colors.Neutral.Shade-028}` | `#E2E2E2` | `--md-sys-color-tertiary-container` |
| Colors.Schemes.On Tertiary Container | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-tertiary-container` |
| Colors.Schemes.Error | `{Colors.Neutral.Shade-011}` | `#454545` | `--md-sys-color-error` |
| Colors.Schemes.On Error | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | `--md-sys-color-on-error` |
| Colors.Schemes.Error Container | `{Colors.Neutral.Shade-028}` | `#E2E2E2` | `--md-sys-color-error-container` |
| Colors.Schemes.On Error Container | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-error-container` |
| Colors.Schemes.Background | `{Colors.Neutral.Shade-034}` | `#FAFAFA` | `--md-sys-color-background` |
| Colors.Schemes.On Background | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-background` |
| Colors.Schemes.Surface | `{Colors.Neutral.Shade-034}` | `#FAFAFA` | `--md-sys-color-surface` |
| Colors.Schemes.On Surface | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-surface` |
| Colors.Schemes.Surface Variant | `{Colors.Neutral.Shade-028}` | `#E2E2E2` | `--md-sys-color-surface-variant` |
| Colors.Schemes.On Surface Variant | `{Colors.Neutral.Shade-011}` | `#454545` | `--md-sys-color-on-surface-variant` |
| Colors.Schemes.Outline | `{Colors.Neutral.Shade-018}` | `#747474` | `--md-sys-color-outline` |
| Colors.Schemes.Outline Variant | `{Colors.Neutral.Shade-022}` | `#C4C4C4` | `--md-sys-color-outline-variant` |
| Colors.Schemes.Shadow | `{Colors.Neutral.Shade-001}` | `#000000` | `--md-sys-color-shadow` |
| Colors.Schemes.Scrim | `{Colors.Neutral.Shade-001}` | `#000000` | `--md-sys-color-scrim` |
| Colors.Schemes.Inverse Surface | `{Colors.Neutral.Shade-008}` | `#303030` | `--md-sys-color-inverse-surface` |
| Colors.Schemes.Inverse On Surface | `{Colors.Neutral.Shade-031}` | `#F2F2F2` | `--md-sys-color-inverse-on-surface` |
| Colors.Schemes.Inverse Primary | `{Colors.Neutral.Shade-023}` | `#C6C6C6` | `--md-sys-color-inverse-primary` |
| Colors.Schemes.Primary Fixed | `{Colors.Neutral.Shade-028}` | `#E2E2E2` | `--md-sys-color-primary-fixed` |
| Colors.Schemes.On Primary Fixed | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-primary-fixed` |
| Colors.Schemes.Primary Fixed Dim | `{Colors.Neutral.Shade-023}` | `#C6C6C6` | `--md-sys-color-primary-fixed-dim` |
| Colors.Schemes.On Primary Fixed Variant | `{Colors.Neutral.Shade-011}` | `#454545` | `--md-sys-color-on-primary-fixed-variant` |
| Colors.Schemes.Secondary Fixed | `{Colors.Neutral.Shade-028}` | `#E2E2E2` | `--md-sys-color-secondary-fixed` |
| Colors.Schemes.On Secondary Fixed | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-secondary-fixed` |
| Colors.Schemes.Secondary Fixed Dim | `{Colors.Neutral.Shade-023}` | `#C6C6C6` | `--md-sys-color-secondary-fixed-dim` |
| Colors.Schemes.On Secondary Fixed Variant | `{Colors.Neutral.Shade-011}` | `#454545` | `--md-sys-color-on-secondary-fixed-variant` |
| Colors.Schemes.Tertiary Fixed | `{Colors.Neutral.Shade-028}` | `#E2E2E2` | `--md-sys-color-tertiary-fixed` |
| Colors.Schemes.On Tertiary Fixed | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | `--md-sys-color-on-tertiary-fixed` |
| Colors.Schemes.Tertiary Fixed Dim | `{Colors.Neutral.Shade-023}` | `#C6C6C6` | `--md-sys-color-tertiary-fixed-dim` |
| Colors.Schemes.On Tertiary Fixed Variant | `{Colors.Neutral.Shade-011}` | `#454545` | `--md-sys-color-on-tertiary-fixed-variant` |
| Colors.Schemes.Surface Dim | `{Colors.Neutral.Shade-027}` | `#DADADA` | `--md-sys-color-surface-dim` |
| Colors.Schemes.Surface Bright | `{Colors.Neutral.Shade-034}` | `#FAFAFA` | `--md-sys-color-surface-bright` |
| Colors.Schemes.Surface Container Lowest | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | `--md-sys-color-surface-container-lowest` |
| Colors.Schemes.Surface Container Low | `{Colors.Neutral.Shade-032}` | `#F4F4F4` | `--md-sys-color-surface-container-low` |
| Colors.Schemes.Surface Container | `{Colors.Neutral.Shade-030}` | `#EEEEEE` | `--md-sys-color-surface-container` |
| Colors.Schemes.Surface Container High | `{Colors.Neutral.Shade-029}` | `#E8E8E8` | `--md-sys-color-surface-container-high` |
| Colors.Schemes.Surface Container Highest | `{Colors.Neutral.Shade-028}` | `#E2E2E2` | `--md-sys-color-surface-container-highest` |
| Colors.Schemes.Success | `{Colors.Neutral.Shade-014}` | `#4D4D4D` | — (extension hors MD3) |
| Colors.Schemes.Info | `{Colors.Neutral.Shade-016}` | `#5C5C5C` | — (extension hors MD3) |
| Colors.Schemes.Warning | `{Colors.Neutral.Shade-015}` | `#545454` | — (extension hors MD3) |
| Colors.Schemes.On Warning | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | — (extension hors MD3) |
| Colors.Schemes.On Success | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | — (extension hors MD3) |
| Colors.Schemes.On Info | `{Colors.Schemes.Neutral.0}` | `#FFFFFF` | — (extension hors MD3) |
| Colors.Schemes.Warning Container | `{Colors.Neutral.Shade-028}` | `#E2E2E2` | — (extension hors MD3) |
| Colors.Schemes.On Warning Container | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | — (extension hors MD3) |
| Colors.Schemes.Success Container | `{Colors.Neutral.Shade-028}` | `#E2E2E2` | — (extension hors MD3) |
| Colors.Schemes.On Success Container | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | — (extension hors MD3) |
| Colors.Schemes.Info Container | `{Colors.Neutral.Shade-028}` | `#E2E2E2` | — (extension hors MD3) |
| Colors.Schemes.On Info Container | `{Colors.Schemes.Neutral.900}` | `#1A1A1A` | — (extension hors MD3) |
| Colors.Schemes.Neutral.0 | `{Colors.Neutral.Shade-035}` | `#FFFFFF` | — |
| Colors.Schemes.Neutral.900 | `{Colors.Neutral.Shade-005}` | `#1A1A1A` | — |
| Colors.State Layers.Primary.Opacity-08 | `{Colors.Schemes.Primary}` | `#1A1A1A` | `--md-sys-color-primary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Primary.Opacity-10 | `{Colors.Schemes.Primary}` | `#1A1A1A` | `--md-sys-color-primary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Primary.Opacity-16 | `{Colors.Schemes.Primary}` | `#1A1A1A` | `--md-sys-color-primary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Primary.Opacity-08 | `{Colors.Schemes.On Primary}` | `#FFFFFF` | `--md-sys-color-on-primary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Primary.Opacity-10 | `{Colors.Schemes.On Primary}` | `#FFFFFF` | `--md-sys-color-on-primary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Primary.Opacity-16 | `{Colors.Schemes.On Primary}` | `#FFFFFF` | `--md-sys-color-on-primary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Primary Container.Opacity-08 | `{Colors.Schemes.Primary Container}` | `#E2E2E2` | `--md-sys-color-primary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Primary Container.Opacity-10 | `{Colors.Schemes.Primary Container}` | `#E2E2E2` | `--md-sys-color-primary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Primary Container.Opacity-16 | `{Colors.Schemes.Primary Container}` | `#E2E2E2` | `--md-sys-color-primary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Primary Container.Opacity-08 | `{Colors.Schemes.On Primary Container}` | `#1A1A1A` | `--md-sys-color-on-primary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Primary Container.Opacity-10 | `{Colors.Schemes.On Primary Container}` | `#1A1A1A` | `--md-sys-color-on-primary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Primary Container.Opacity-16 | `{Colors.Schemes.On Primary Container}` | `#1A1A1A` | `--md-sys-color-on-primary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Primary Fixed.Opacity-08 | `{Colors.Schemes.Primary Fixed}` | `#E2E2E2` | `--md-sys-color-primary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Primary Fixed.Opacity-10 | `{Colors.Schemes.Primary Fixed}` | `#E2E2E2` | `--md-sys-color-primary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Primary Fixed.Opacity-16 | `{Colors.Schemes.Primary Fixed}` | `#E2E2E2` | `--md-sys-color-primary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Primary Fixed.Opacity-08 | `{Colors.Schemes.On Primary Fixed}` | `#1A1A1A` | `--md-sys-color-on-primary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Primary Fixed.Opacity-10 | `{Colors.Schemes.On Primary Fixed}` | `#1A1A1A` | `--md-sys-color-on-primary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Primary Fixed.Opacity-16 | `{Colors.Schemes.On Primary Fixed}` | `#1A1A1A` | `--md-sys-color-on-primary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Primary Fixed Dim.Opacity-08 | `{Colors.Schemes.Primary Fixed Dim}` | `#C6C6C6` | `--md-sys-color-primary-fixed-dim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Primary Fixed Dim.Opacity-10 | `{Colors.Schemes.Primary Fixed Dim}` | `#C6C6C6` | `--md-sys-color-primary-fixed-dim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Primary Fixed Dim.Opacity-16 | `{Colors.Schemes.Primary Fixed Dim}` | `#C6C6C6` | `--md-sys-color-primary-fixed-dim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Primary Fixed Variant.Opacity-08 | `{Colors.Schemes.On Primary Fixed Variant}` | `#454545` | `--md-sys-color-on-primary-fixed-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Primary Fixed Variant.Opacity-10 | `{Colors.Schemes.On Primary Fixed Variant}` | `#454545` | `--md-sys-color-on-primary-fixed-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Primary Fixed Variant.Opacity-16 | `{Colors.Schemes.On Primary Fixed Variant}` | `#454545` | `--md-sys-color-on-primary-fixed-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Secondary.Opacity-08 | `{Colors.Schemes.Secondary}` | `#494949` | `--md-sys-color-secondary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Secondary.Opacity-10 | `{Colors.Schemes.Secondary}` | `#494949` | `--md-sys-color-secondary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Secondary.Opacity-16 | `{Colors.Schemes.Secondary}` | `#494949` | `--md-sys-color-secondary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Secondary.Opacity-08 | `{Colors.Schemes.On Secondary}` | `#FFFFFF` | `--md-sys-color-on-secondary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Secondary.Opacity-10 | `{Colors.Schemes.On Secondary}` | `#FFFFFF` | `--md-sys-color-on-secondary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Secondary.Opacity-16 | `{Colors.Schemes.On Secondary}` | `#FFFFFF` | `--md-sys-color-on-secondary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Secondary Container.Opacity-08 | `{Colors.Schemes.Secondary Container}` | `#E2E2E2` | `--md-sys-color-secondary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Secondary Container.Opacity-10 | `{Colors.Schemes.Secondary Container}` | `#E2E2E2` | `--md-sys-color-secondary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Secondary Container.Opacity-16 | `{Colors.Schemes.Secondary Container}` | `#E2E2E2` | `--md-sys-color-secondary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Secondary Container.Opacity-08 | `{Colors.Schemes.On Secondary Container}` | `#1A1A1A` | `--md-sys-color-on-secondary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Secondary Container.Opacity-10 | `{Colors.Schemes.On Secondary Container}` | `#1A1A1A` | `--md-sys-color-on-secondary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Secondary Container.Opacity-16 | `{Colors.Schemes.On Secondary Container}` | `#1A1A1A` | `--md-sys-color-on-secondary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Secondary Fixed.Opacity-08 | `{Colors.Schemes.Secondary Fixed}` | `#E2E2E2` | `--md-sys-color-secondary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Secondary Fixed.Opacity-10 | `{Colors.Schemes.Secondary Fixed}` | `#E2E2E2` | `--md-sys-color-secondary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Secondary Fixed.Opacity-16 | `{Colors.Schemes.Secondary Fixed}` | `#E2E2E2` | `--md-sys-color-secondary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Secondary Fixed.Opacity-08 | `{Colors.Schemes.On Secondary Fixed}` | `#1A1A1A` | `--md-sys-color-on-secondary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Secondary Fixed.Opacity-10 | `{Colors.Schemes.On Secondary Fixed}` | `#1A1A1A` | `--md-sys-color-on-secondary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Secondary Fixed.Opacity-16 | `{Colors.Schemes.On Secondary Fixed}` | `#1A1A1A` | `--md-sys-color-on-secondary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Secondary Fixed Dim.Opacity-08 | `{Colors.Schemes.Secondary Fixed Dim}` | `#C6C6C6` | `--md-sys-color-secondary-fixed-dim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Secondary Fixed Dim.Opacity-10 | `{Colors.Schemes.Secondary Fixed Dim}` | `#C6C6C6` | `--md-sys-color-secondary-fixed-dim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Secondary Fixed Dim.Opacity-16 | `{Colors.Schemes.Secondary Fixed Dim}` | `#C6C6C6` | `--md-sys-color-secondary-fixed-dim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Secondary Fixed Variant.Opacity-08 | `{Colors.Schemes.On Secondary Fixed Variant}` | `#454545` | `--md-sys-color-on-secondary-fixed-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Secondary Fixed Variant.Opacity-10 | `{Colors.Schemes.On Secondary Fixed Variant}` | `#454545` | `--md-sys-color-on-secondary-fixed-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Secondary Fixed Variant.Opacity-16 | `{Colors.Schemes.On Secondary Fixed Variant}` | `#454545` | `--md-sys-color-on-secondary-fixed-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Tertiary.Opacity-08 | `{Colors.Schemes.Tertiary}` | `#626262` | `--md-sys-color-tertiary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Tertiary.Opacity-10 | `{Colors.Schemes.Tertiary}` | `#626262` | `--md-sys-color-tertiary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Tertiary.Opacity-16 | `{Colors.Schemes.Tertiary}` | `#626262` | `--md-sys-color-tertiary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Tertiary.Opacity-08 | `{Colors.Schemes.On Tertiary}` | `#FFFFFF` | `--md-sys-color-on-tertiary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Tertiary.Opacity-10 | `{Colors.Schemes.On Tertiary}` | `#FFFFFF` | `--md-sys-color-on-tertiary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Tertiary.Opacity-16 | `{Colors.Schemes.On Tertiary}` | `#FFFFFF` | `--md-sys-color-on-tertiary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Tertiary Container.Opacity-08 | `{Colors.Schemes.Tertiary Container}` | `#E2E2E2` | `--md-sys-color-tertiary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Tertiary Container.Opacity-10 | `{Colors.Schemes.Tertiary Container}` | `#E2E2E2` | `--md-sys-color-tertiary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Tertiary Container.Opacity-16 | `{Colors.Schemes.Tertiary Container}` | `#E2E2E2` | `--md-sys-color-tertiary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Tertiary Container.Opacity-08 | `{Colors.Schemes.On Tertiary Container}` | `#1A1A1A` | `--md-sys-color-on-tertiary-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Tertiary Container.Opacity-10 | `{Colors.Schemes.On Tertiary Container}` | `#1A1A1A` | `--md-sys-color-on-tertiary-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Tertiary Container.Opacity-16 | `{Colors.Schemes.On Tertiary Container}` | `#1A1A1A` | `--md-sys-color-on-tertiary-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Tertiary Fixed.Opacity-08 | `{Colors.Schemes.Tertiary Fixed}` | `#E2E2E2` | `--md-sys-color-tertiary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Tertiary Fixed.Opacity-10 | `{Colors.Schemes.Tertiary Fixed}` | `#E2E2E2` | `--md-sys-color-tertiary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Tertiary Fixed.Opacity-16 | `{Colors.Schemes.Tertiary Fixed}` | `#E2E2E2` | `--md-sys-color-tertiary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Tertiary Fixed.Opacity-08 | `{Colors.Schemes.On Tertiary Fixed}` | `#1A1A1A` | `--md-sys-color-on-tertiary-fixed` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Tertiary Fixed.Opacity-10 | `{Colors.Schemes.On Tertiary Fixed}` | `#1A1A1A` | `--md-sys-color-on-tertiary-fixed` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Tertiary Fixed.Opacity-16 | `{Colors.Schemes.On Tertiary Fixed}` | `#1A1A1A` | `--md-sys-color-on-tertiary-fixed` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Tertiary Fixed Dim.Opacity-08 | `{Colors.Schemes.Tertiary Fixed Dim}` | `#C6C6C6` | `--md-sys-color-tertiary-fixed-dim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Tertiary Fixed Dim.Opacity-10 | `{Colors.Schemes.Tertiary Fixed Dim}` | `#C6C6C6` | `--md-sys-color-tertiary-fixed-dim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Tertiary Fixed Dim.Opacity-16 | `{Colors.Schemes.Tertiary Fixed Dim}` | `#C6C6C6` | `--md-sys-color-tertiary-fixed-dim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Tertiary Fixed Variant.Opacity-08 | `{Colors.Schemes.On Tertiary Fixed Variant}` | `#454545` | `--md-sys-color-on-tertiary-fixed-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Tertiary Fixed Variant.Opacity-10 | `{Colors.Schemes.On Tertiary Fixed Variant}` | `#454545` | `--md-sys-color-on-tertiary-fixed-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Tertiary Fixed Variant.Opacity-16 | `{Colors.Schemes.On Tertiary Fixed Variant}` | `#454545` | `--md-sys-color-on-tertiary-fixed-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Error.Opacity-08 | `{Colors.Schemes.Error}` | `#454545` | `--md-sys-color-error` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Error.Opacity-10 | `{Colors.Schemes.Error}` | `#454545` | `--md-sys-color-error` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Error.Opacity-16 | `{Colors.Schemes.Error}` | `#454545` | `--md-sys-color-error` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Error.Opacity-08 | `{Colors.Schemes.On Error}` | `#FFFFFF` | `--md-sys-color-on-error` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Error.Opacity-10 | `{Colors.Schemes.On Error}` | `#FFFFFF` | `--md-sys-color-on-error` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Error.Opacity-16 | `{Colors.Schemes.On Error}` | `#FFFFFF` | `--md-sys-color-on-error` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Error Container.Opacity-08 | `{Colors.Schemes.Error Container}` | `#E2E2E2` | `--md-sys-color-error-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Error Container.Opacity-10 | `{Colors.Schemes.Error Container}` | `#E2E2E2` | `--md-sys-color-error-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Error Container.Opacity-16 | `{Colors.Schemes.Error Container}` | `#E2E2E2` | `--md-sys-color-error-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Error Container.Opacity-08 | `{Colors.Schemes.On Error Container}` | `#1A1A1A` | `--md-sys-color-on-error-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Error Container.Opacity-10 | `{Colors.Schemes.On Error Container}` | `#1A1A1A` | `--md-sys-color-on-error-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Error Container.Opacity-16 | `{Colors.Schemes.On Error Container}` | `#1A1A1A` | `--md-sys-color-on-error-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Outline.Opacity-08 | `{Colors.Schemes.Outline}` | `#747474` | `--md-sys-color-outline` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Outline.Opacity-10 | `{Colors.Schemes.Outline}` | `#747474` | `--md-sys-color-outline` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Outline.Opacity-16 | `{Colors.Schemes.Outline}` | `#747474` | `--md-sys-color-outline` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Background.Opacity-08 | `{Colors.Schemes.Background}` | `#FAFAFA` | `--md-sys-color-background` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Background.Opacity-10 | `{Colors.Schemes.Background}` | `#FAFAFA` | `--md-sys-color-background` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Background.Opacity-16 | `{Colors.Schemes.Background}` | `#FAFAFA` | `--md-sys-color-background` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Background.Opacity-08 | `{Colors.Schemes.On Background}` | `#1A1A1A` | `--md-sys-color-on-background` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Background.Opacity-10 | `{Colors.Schemes.On Background}` | `#1A1A1A` | `--md-sys-color-on-background` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Background.Opacity-16 | `{Colors.Schemes.On Background}` | `#1A1A1A` | `--md-sys-color-on-background` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface.Opacity-08 | `{Colors.Schemes.Surface}` | `#FAFAFA` | `--md-sys-color-surface` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface.Opacity-10 | `{Colors.Schemes.Surface}` | `#FAFAFA` | `--md-sys-color-surface` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface.Opacity-16 | `{Colors.Schemes.Surface}` | `#FAFAFA` | `--md-sys-color-surface` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Surface.Opacity-08 | `{Colors.Schemes.On Surface}` | `#1A1A1A` | `--md-sys-color-on-surface` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Surface.Opacity-10 | `{Colors.Schemes.On Surface}` | `#1A1A1A` | `--md-sys-color-on-surface` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Surface.Opacity-16 | `{Colors.Schemes.On Surface}` | `#1A1A1A` | `--md-sys-color-on-surface` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Variant.Opacity-08 | `{Colors.Schemes.Surface Variant}` | `#E2E2E2` | `--md-sys-color-surface-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Variant.Opacity-10 | `{Colors.Schemes.Surface Variant}` | `#E2E2E2` | `--md-sys-color-surface-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Variant.Opacity-16 | `{Colors.Schemes.Surface Variant}` | `#E2E2E2` | `--md-sys-color-surface-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.On Surface Variant.Opacity-08 | `{Colors.Schemes.On Surface Variant}` | `#454545` | `--md-sys-color-on-surface-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.On Surface Variant.Opacity-10 | `{Colors.Schemes.On Surface Variant}` | `#454545` | `--md-sys-color-on-surface-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.On Surface Variant.Opacity-16 | `{Colors.Schemes.On Surface Variant}` | `#454545` | `--md-sys-color-on-surface-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Inverse Surface.Opacity-08 | `{Colors.Schemes.Inverse Surface}` | `#303030` | `--md-sys-color-inverse-surface` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Inverse Surface.Opacity-10 | `{Colors.Schemes.Inverse Surface}` | `#303030` | `--md-sys-color-inverse-surface` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Inverse Surface.Opacity-16 | `{Colors.Schemes.Inverse Surface}` | `#303030` | `--md-sys-color-inverse-surface` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Inverse On Surface.Opacity-08 | `{Colors.Schemes.Inverse On Surface}` | `#F2F2F2` | `--md-sys-color-inverse-on-surface` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Inverse On Surface.Opacity-10 | `{Colors.Schemes.Inverse On Surface}` | `#F2F2F2` | `--md-sys-color-inverse-on-surface` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Inverse On Surface.Opacity-16 | `{Colors.Schemes.Inverse On Surface}` | `#F2F2F2` | `--md-sys-color-inverse-on-surface` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Inverse Primary.Opacity-08 | `{Colors.Schemes.Inverse Primary}` | `#C6C6C6` | `--md-sys-color-inverse-primary` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Inverse Primary.Opacity-10 | `{Colors.Schemes.Inverse Primary}` | `#C6C6C6` | `--md-sys-color-inverse-primary` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Inverse Primary.Opacity-16 | `{Colors.Schemes.Inverse Primary}` | `#C6C6C6` | `--md-sys-color-inverse-primary` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Shadow.Opacity-08 | `{Colors.Schemes.Shadow}` | `#000000` | `--md-sys-color-shadow` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Shadow.Opacity-10 | `{Colors.Schemes.Shadow}` | `#000000` | `--md-sys-color-shadow` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Shadow.Opacity-16 | `{Colors.Schemes.Shadow}` | `#000000` | `--md-sys-color-shadow` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Tint.Opacity-08 | `{Colors.Schemes.Surface Tint}` | `#9F9F9F` | `--md-sys-color-surface-tint` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Tint.Opacity-10 | `{Colors.Schemes.Surface Tint}` | `#9F9F9F` | `--md-sys-color-surface-tint` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Tint.Opacity-16 | `{Colors.Schemes.Surface Tint}` | `#9F9F9F` | `--md-sys-color-surface-tint` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Outline Variant.Opacity-08 | `{Colors.Schemes.Outline Variant}` | `#C4C4C4` | `--md-sys-color-outline-variant` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Outline Variant.Opacity-10 | `{Colors.Schemes.Outline Variant}` | `#C4C4C4` | `--md-sys-color-outline-variant` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Outline Variant.Opacity-16 | `{Colors.Schemes.Outline Variant}` | `#C4C4C4` | `--md-sys-color-outline-variant` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Scrim.Opacity-08 | `{Colors.Schemes.Scrim}` | `#000000` | `--md-sys-color-scrim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Scrim.Opacity-10 | `{Colors.Schemes.Scrim}` | `#000000` | `--md-sys-color-scrim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Scrim.Opacity-16 | `{Colors.Schemes.Scrim}` | `#000000` | `--md-sys-color-scrim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container Highest.Opacity-08 | `{Colors.Schemes.Surface Container Highest}` | `#E2E2E2` | `--md-sys-color-surface-container-highest` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container Highest.Opacity-10 | `{Colors.Schemes.Surface Container Highest}` | `#E2E2E2` | `--md-sys-color-surface-container-highest` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container Highest.Opacity-16 | `{Colors.Schemes.Surface Container Highest}` | `#E2E2E2` | `--md-sys-color-surface-container-highest` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container High.Opacity-08 | `{Colors.Schemes.Surface Container High}` | `#E8E8E8` | `--md-sys-color-surface-container-high` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container High.Opacity-10 | `{Colors.Schemes.Surface Container High}` | `#E8E8E8` | `--md-sys-color-surface-container-high` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container High.Opacity-16 | `{Colors.Schemes.Surface Container High}` | `#E8E8E8` | `--md-sys-color-surface-container-high` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container.Opacity-08 | `{Colors.Schemes.Surface Container}` | `#EEEEEE` | `--md-sys-color-surface-container` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container.Opacity-10 | `{Colors.Schemes.Surface Container}` | `#EEEEEE` | `--md-sys-color-surface-container` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container.Opacity-16 | `{Colors.Schemes.Surface Container}` | `#EEEEEE` | `--md-sys-color-surface-container` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container Low.Opacity-08 | `{Colors.Schemes.Surface Container Low}` | `#F4F4F4` | `--md-sys-color-surface-container-low` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container Low.Opacity-10 | `{Colors.Schemes.Surface Container Low}` | `#F4F4F4` | `--md-sys-color-surface-container-low` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container Low.Opacity-16 | `{Colors.Schemes.Surface Container Low}` | `#F4F4F4` | `--md-sys-color-surface-container-low` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Container Lowest.Opacity-08 | `{Colors.Schemes.Surface Container Lowest}` | `#FFFFFF` | `--md-sys-color-surface-container-lowest` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Container Lowest.Opacity-10 | `{Colors.Schemes.Surface Container Lowest}` | `#FFFFFF` | `--md-sys-color-surface-container-lowest` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Container Lowest.Opacity-16 | `{Colors.Schemes.Surface Container Lowest}` | `#FFFFFF` | `--md-sys-color-surface-container-lowest` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Bright.Opacity-08 | `{Colors.Schemes.Surface Bright}` | `#FAFAFA` | `--md-sys-color-surface-bright` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Bright.Opacity-10 | `{Colors.Schemes.Surface Bright}` | `#FAFAFA` | `--md-sys-color-surface-bright` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Bright.Opacity-16 | `{Colors.Schemes.Surface Bright}` | `#FAFAFA` | `--md-sys-color-surface-bright` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.State Layers.Surface Dim.Opacity-08 | `{Colors.Schemes.Surface Dim}` | `#DADADA` | `--md-sys-color-surface-dim` + `--md-sys-state-hover-state-layer-opacity` (0.08) |
| Colors.State Layers.Surface Dim.Opacity-10 | `{Colors.Schemes.Surface Dim}` | `#DADADA` | `--md-sys-color-surface-dim` + `--md-sys-state-focus-state-layer-opacity` (0.10) |
| Colors.State Layers.Surface Dim.Opacity-16 | `{Colors.Schemes.Surface Dim}` | `#DADADA` | `--md-sys-color-surface-dim` + `--md-sys-state-dragged-state-layer-opacity` (0.16) |
| Colors.Add-ons.Section background | `{Colors.Neutral.Shade-033}` | `#F5F5F5` | — (extension hors MD3) |
| Typescale.Static.Display Large.Size | `57px` | `57px` | `--md-sys-typescale-display-large-size` |
| Typescale.Static.Display Large.Tracking | `-0.25px` | `-0.25px` | `--md-sys-typescale-display-large-tracking` |
| Typescale.Static.Display Large.Line Height | `64px` | `64px` | `--md-sys-typescale-display-large-line-height` |
| Typescale.Static.Display Large.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-display-large-font` |
| Typescale.Static.Display Large.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-display-large-weight` |
| Typescale.Static.Display Large.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-display-large-weight` (MD3 Expressive) |
| Typescale.Static.Display Medium.Size | `45px` | `45px` | `--md-sys-typescale-display-medium-size` |
| Typescale.Static.Display Medium.Line Height | `52px` | `52px` | `--md-sys-typescale-display-medium-line-height` |
| Typescale.Static.Display Medium.Tracking | `0px` | `0px` | `--md-sys-typescale-display-medium-tracking` |
| Typescale.Static.Display Medium.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-display-medium-font` |
| Typescale.Static.Display Medium.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-display-medium-weight` |
| Typescale.Static.Display Medium.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-display-medium-weight` (MD3 Expressive) |
| Typescale.Static.Display Small.Size | `36px` | `36px` | `--md-sys-typescale-display-small-size` |
| Typescale.Static.Display Small.Tracking | `0px` | `0px` | `--md-sys-typescale-display-small-tracking` |
| Typescale.Static.Display Small.Line Height | `44px` | `44px` | `--md-sys-typescale-display-small-line-height` |
| Typescale.Static.Display Small.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-display-small-font` |
| Typescale.Static.Display Small.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-display-small-weight` |
| Typescale.Static.Display Small.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-display-small-weight` (MD3 Expressive) |
| Typescale.Static.Headline Large.Size | `32px` | `32px` | `--md-sys-typescale-headline-large-size` |
| Typescale.Static.Headline Large.Tracking | `0px` | `0px` | `--md-sys-typescale-headline-large-tracking` |
| Typescale.Static.Headline Large.Line Height | `40px` | `40px` | `--md-sys-typescale-headline-large-line-height` |
| Typescale.Static.Headline Large.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-headline-large-font` |
| Typescale.Static.Headline Large.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-headline-large-weight` |
| Typescale.Static.Headline Large.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-headline-large-weight` (MD3 Expressive) |
| Typescale.Static.Headline Medium.Size | `28px` | `28px` | `--md-sys-typescale-headline-medium-size` |
| Typescale.Static.Headline Medium.Tracking | `0px` | `0px` | `--md-sys-typescale-headline-medium-tracking` |
| Typescale.Static.Headline Medium.Line Height | `36px` | `36px` | `--md-sys-typescale-headline-medium-line-height` |
| Typescale.Static.Headline Medium.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-headline-medium-font` |
| Typescale.Static.Headline Medium.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-headline-medium-weight` |
| Typescale.Static.Headline Medium.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-headline-medium-weight` (MD3 Expressive) |
| Typescale.Static.Headline Small.Size | `24px` | `24px` | `--md-sys-typescale-headline-small-size` |
| Typescale.Static.Headline Small.Tracking | `0px` | `0px` | `--md-sys-typescale-headline-small-tracking` |
| Typescale.Static.Headline Small.Line Height | `32px` | `32px` | `--md-sys-typescale-headline-small-line-height` |
| Typescale.Static.Headline Small.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-headline-small-font` |
| Typescale.Static.Headline Small.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-headline-small-weight` |
| Typescale.Static.Headline Small.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-headline-small-weight` (MD3 Expressive) |
| Typescale.Static.Title Large.Size | `22px` | `22px` | `--md-sys-typescale-title-large-size` |
| Typescale.Static.Title Large.Tracking | `0px` | `0px` | `--md-sys-typescale-title-large-tracking` |
| Typescale.Static.Title Large.Line Height | `28px` | `28px` | `--md-sys-typescale-title-large-line-height` |
| Typescale.Static.Title Large.Font | `{Font theme.Static.Font.Brand}` | `Poppins` | `--md-sys-typescale-title-large-font` |
| Typescale.Static.Title Large.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-title-large-weight` |
| Typescale.Static.Title Large.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-title-large-weight` (MD3 Expressive) |
| Typescale.Static.Title Medium.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-title-medium-font` |
| Typescale.Static.Title Medium.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-title-medium-weight` |
| Typescale.Static.Title Medium.Size | `16px` | `16px` | `--md-sys-typescale-title-medium-size` |
| Typescale.Static.Title Medium.Tracking | `0.15000000596046448px` | `0.15000000596046448px` | `--md-sys-typescale-title-medium-tracking` |
| Typescale.Static.Title Medium.Line Height | `24px` | `24px` | `--md-sys-typescale-title-medium-line-height` |
| Typescale.Static.Title Medium.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-emphasized-title-medium-weight` (MD3 Expressive) |
| Typescale.Static.Title Small.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-title-small-font` |
| Typescale.Static.Title Small.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-title-small-weight` |
| Typescale.Static.Title Small.Size | `14px` | `14px` | `--md-sys-typescale-title-small-size` |
| Typescale.Static.Title Small.Tracking | `0.10000000149011612px` | `0.10000000149011612px` | `--md-sys-typescale-title-small-tracking` |
| Typescale.Static.Title Small.Line Height | `20px` | `20px` | `--md-sys-typescale-title-small-line-height` |
| Typescale.Static.Title Small.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-emphasized-title-small-weight` (MD3 Expressive) |
| Typescale.Static.Label Large.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-label-large-font` |
| Typescale.Static.Label Large.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-label-large-weight` |
| Typescale.Static.Label Large.Size | `14px` | `14px` | `--md-sys-typescale-label-large-size` |
| Typescale.Static.Label Large.Tracking | `0.10000000149011612px` | `0.10000000149011612px` | `--md-sys-typescale-label-large-tracking` |
| Typescale.Static.Label Large.Line Height | `20px` | `20px` | `--md-sys-typescale-label-large-line-height` |
| Typescale.Static.Label Large.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-label-large-weight-prominent` |
| Typescale.Static.Label Medium.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-label-medium-font` |
| Typescale.Static.Label Medium.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-label-medium-weight` |
| Typescale.Static.Label Medium.Size | `12px` | `12px` | `--md-sys-typescale-label-medium-size` |
| Typescale.Static.Label Medium.Tracking | `0.5px` | `0.5px` | `--md-sys-typescale-label-medium-tracking` |
| Typescale.Static.Label Medium.Line Height | `16px` | `16px` | `--md-sys-typescale-label-medium-line-height` |
| Typescale.Static.Label Medium.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-label-medium-weight-prominent` |
| Typescale.Static.Label Small.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-label-small-font` |
| Typescale.Static.Label Small.Weight | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-label-small-weight` |
| Typescale.Static.Label Small.Size | `11px` | `11px` | `--md-sys-typescale-label-small-size` |
| Typescale.Static.Label Small.Tracking | `0.5px` | `0.5px` | `--md-sys-typescale-label-small-tracking` |
| Typescale.Static.Label Small.Line Height | `16px` | `16px` | `--md-sys-typescale-label-small-line-height` |
| Typescale.Static.Label Small.Weight-emphasized | `{Font theme.Static.Weight.Bold}` | `600` | `--md-sys-typescale-emphasized-label-small-weight` (MD3 Expressive) |
| Typescale.Static.Body Large.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-body-large-font` |
| Typescale.Static.Body Large.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-body-large-weight` |
| Typescale.Static.Body Large.Size | `16px` | `16px` | `--md-sys-typescale-body-large-size` |
| Typescale.Static.Body Large.Tracking | `0.5px` | `0.5px` | `--md-sys-typescale-body-large-tracking` |
| Typescale.Static.Body Large.Line Height | `24px` | `24px` | `--md-sys-typescale-body-large-line-height` |
| Typescale.Static.Body Large.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-body-large-weight` (MD3 Expressive) |
| Typescale.Static.Body Medium.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-body-medium-font` |
| Typescale.Static.Body Medium.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-body-medium-weight` |
| Typescale.Static.Body Medium.Size | `14px` | `14px` | `--md-sys-typescale-body-medium-size` |
| Typescale.Static.Body Medium.Tracking | `0.25px` | `0.25px` | `--md-sys-typescale-body-medium-tracking` |
| Typescale.Static.Body Medium.Line Height | `20px` | `20px` | `--md-sys-typescale-body-medium-line-height` |
| Typescale.Static.Body Medium.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-body-medium-weight` (MD3 Expressive) |
| Typescale.Static.Body Small.Font | `{Font theme.Static.Font.Plain}` | `Poppins` | `--md-sys-typescale-body-small-font` |
| Typescale.Static.Body Small.Weight | `{Font theme.Static.Weight.Regular}` | `400` | `--md-sys-typescale-body-small-weight` |
| Typescale.Static.Body Small.Size | `12px` | `12px` | `--md-sys-typescale-body-small-size` |
| Typescale.Static.Body Small.Tracking | `0.4000000059604645px` | `0.4000000059604645px` | `--md-sys-typescale-body-small-tracking` |
| Typescale.Static.Body Small.Line Height | `16px` | `16px` | `--md-sys-typescale-body-small-line-height` |
| Typescale.Static.Body Small.Weight-emphasized | `{Font theme.Static.Weight.Medium}` | `500` | `--md-sys-typescale-emphasized-body-small-weight` (MD3 Expressive) |
