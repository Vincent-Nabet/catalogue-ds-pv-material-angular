import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatDatepickerIntl } from '@angular/material/datepicker';
import { MatStepperIntl } from '@angular/material/stepper';

/** Libellés français des composants Material, fournis au niveau des pages concernées. */
@Injectable()
export class PaginatorIntlFr extends MatPaginatorIntl {
  override itemsPerPageLabel = 'Éléments par page :';
  override nextPageLabel = 'Page suivante';
  override previousPageLabel = 'Page précédente';
  override firstPageLabel = 'Première page';
  override lastPageLabel = 'Dernière page';
  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) {
      return `0 sur ${length}`;
    }
    const start = page * pageSize;
    const end = start < length ? Math.min(start + pageSize, length) : start + pageSize;
    return `${start + 1} – ${end} sur ${length}`;
  };
}

@Injectable()
export class DatepickerIntlFr extends MatDatepickerIntl {
  override calendarLabel = 'Calendrier';
  override openCalendarLabel = 'Ouvrir le calendrier';
  override closeCalendarLabel = 'Fermer le calendrier';
  override prevMonthLabel = 'Mois précédent';
  override nextMonthLabel = 'Mois suivant';
  override prevYearLabel = 'Année précédente';
  override nextYearLabel = 'Année suivante';
  override prevMultiYearLabel = '24 années précédentes';
  override nextMultiYearLabel = '24 années suivantes';
  override switchToMonthViewLabel = 'Choisir la date';
  override switchToMultiYearViewLabel = 'Choisir le mois et l’année';
  override startDateLabel = 'Date de début';
  override endDateLabel = 'Date de fin';
  override comparisonDateLabel = 'Date de comparaison';

  override formatYearRangeLabel(start: string, end: string): string {
    return `${start} à ${end}`;
  }
}

@Injectable()
export class StepperIntlFr extends MatStepperIntl {
  override optionalLabel = 'Optionnel';
  override completedLabel = 'Terminée';
  override editableLabel = 'Modifiable';
}
