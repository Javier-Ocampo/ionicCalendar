import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, IonRouterOutlet } from '@ionic/angular';
import { CalendarComponent, CalendarMode } from 'ionic7-calendar';
import { CalEvent, EventsService } from '../services/events.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

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
    startTime: '',
    endTime: '',
    allDay: false
  };

  showStart = false;

  showEnd = false;

  formatterStart = '';
  formatterEnd = '';

  constructor(private ionRouterOutlet: IonRouterOutlet, private eventsService: EventsService) {
    this.presentingElement = ionRouterOutlet.nativeEl;
  }

  async ngOnInit() {
    this.eventSource = await this.eventsService.getData();
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

  scheduleEvent() {
    const toAdd: CalEvent = {
      title: this.newEvent.title,
      startTime: new Date(this.newEvent.startTime),
      endTime: new Date(this.newEvent.endTime),
      allDay: this.newEvent.allDay
    };

    this.eventSource.push(toAdd);
    this.myCal.loadEvents();
    this.eventsService.addData(toAdd);

    this.newEvent = {
      title: '',
      startTime: '',
      endTime: '',
      allDay: false
    };

    this.modal.dismiss();
  }

  onEventSelected(event: any) {
    console.log('Event selected', event);
  }

}
