import { Component, ViewChild } from '@angular/core';
import { CalendarComponent, CalendarMode } from 'ionic7-calendar';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  calendar = {
    mode: 'month' as CalendarMode,
    currentDate: new Date(),
  };
  viewTitle = '';

  @ViewChild(CalendarComponent) myCal!: CalendarComponent;

  constructor() {}

  setToday() {
    this.myCal.currentDate = new Date();
  }

  calendarBack() {
    this.myCal.slidePrev();
  }

  calendarNext() {
    this.myCal.slideNext();
  }

}
