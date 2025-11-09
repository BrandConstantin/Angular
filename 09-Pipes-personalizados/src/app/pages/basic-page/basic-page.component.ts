import { DatePipe, LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, effect, inject, LOCALE_ID, signal } from '@angular/core';
import { AvailableLocale, LocalService } from '../../service/local.service';

@Component({
  selector: 'app-basic-page.component',
  imports: [LowerCasePipe, UpperCasePipe, TitleCasePipe, DatePipe],
  templateUrl: './basic-page.component.html',
})
export default class BasicPageComponent {
  localService = inject(LocalService);
  currentLocal = signal(inject(LOCALE_ID));

  nameLower = signal('constantin');
  nameUpper = signal('CONSTANTIN');
  fullName = signal('bRANd CONstanTIN');

  customDate = signal(new Date());

  tickingDateEffect = effect((onCleanup) => {
    const interval = setInterval(() => {
      this.customDate.set(new Date());
    }, 1_000);

    onCleanup(() => {
      clearInterval(interval);
    });
  });

  changeLocale(locale: AvailableLocale) {
    this.localService.changeLocale(locale);
  }
}
