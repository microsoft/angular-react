// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Directive, Input } from '@angular/core';
import { ICalendarStrings } from 'office-ui-fabric-react';

/**
 * Wrapper directive for calendar strings
 */
@Directive({ selector: 'fab-calendar > fab-calendar-strings' })
export class CalendarStringsDirective {

  @Input() months: ICalendarStrings['months'];
  @Input() shortMonths: ICalendarStrings['shortMonths'];
  @Input() days: ICalendarStrings['days'];
  @Input() shortDays: ICalendarStrings['shortDays'];
  @Input() goToToday: ICalendarStrings['goToToday'];
  @Input() weekNumberFormatString: ICalendarStrings['weekNumberFormatString'];

  
  get strings(): ICalendarStrings {
    return {
      months: this.months,
      shortMonths: this.shortMonths,
      days: this.days,
      shortDays: this.shortDays,
      goToToday: this.goToToday,
      weekNumberFormatString: this.weekNumberFormatString
    }
  }
}
