import { Component } from '@angular/core';
import { ComputerFactsService } from './service.service';
import { SwUpdate } from '@angular/service-worker';
import { PushNotificationService } from './push-notification.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'PWA';

  Facts: any;

  constructor(
    private computerFactsService: ComputerFactsService,
    private pushNotificationService: PushNotificationService,
    updates: SwUpdate
  ) {
    // updates.available.subscribe((event) => {
    //   updates.activateUpdate().then(() => document.location.reload());
    // });
  }

  ngOnInit(): void {
    this.computerFactsService.getComputerFacts().subscribe(
      (data) => {
        this.Facts = data;
      },
      (error) => {
        console.error('Error fetching computer facts:', error);
      }
    );
  }

  requestNotificationPermission() {
    this.pushNotificationService.registerServiceWorker();
  }
}
