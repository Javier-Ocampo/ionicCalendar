import { Component, ViewChild } from '@angular/core';
import { IonModal, IonRouterOutlet } from '@ionic/angular';
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
  eventSource: any[] = [];

  @ViewChild(CalendarComponent) myCal!: CalendarComponent;
  @ViewChild('modal') modal!: IonModal

  presentingElement: any = null;

  newEvent = {
    title: '',
    desc: '',
    startTime: '',
    endTime: '',
    allDay: false
  };

  showStart = false;

  showEnd = false;

  formatterStart = '';
  formatterEnd = '';

  constructor(private ionRouterOutlet: IonRouterOutlet) {
    this.presentingElement = ionRouterOutlet.nativeEl;
  }

  setToday() {
    this.myCal.currentDate = new Date();
  }

  calendarBack() {
    this.myCal.slidePrev();
  }

  calendarNext() {
    this.myCal.slideNext();
  }

  onTimeSelected(ev: { selectedTime: Date, events: any[]}) {
    const selected = new Date(ev.selectedTime);
    this.formatterStart = new Intl.DateTimeFormat("en", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "short",
      year: "numeric"
    }).format(new Date(selected));
    this.newEvent.startTime = selected.toISOString();
    const later = ev.selectedTime.setHours(selected.getHours() + 1);
    this.formatterEnd = new Intl.DateTimeFormat("en", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "short",
      year: "numeric"
    }).format(new Date(later));
    this.newEvent.endTime = (new Date(later).toISOString());
    if (this.calendar.mode === 'day' || this.calendar.mode === 'week') {
      this.modal.present();
    }
  }

  startChanged(value: any) {
    this.newEvent.startTime = value;
    this.formatterStart = new Intl.DateTimeFormat("en", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "short",
      year: "numeric"
    }).format(new Date(value));
  }

  endChanged(value: any) {
    this.newEvent.endTime = value;
    this.formatterEnd = new Intl.DateTimeFormat("en", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "short",
      year: "numeric"
    }).format(new Date(value));
  }

  scheduleEvent() {}

}
