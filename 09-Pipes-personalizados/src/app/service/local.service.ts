import { Injectable, signal } from "@angular/core";

export type AvailableLocale = 'es' | 'ro' | 'en';

@Injectable({  providedIn: 'root'})
export class LocalService {
  private currentLocal = signal<AvailableLocale>('es');

  constructor() {
    this.currentLocal.set(localStorage.getItem('locale') as AvailableLocale || 'es');
  }

  get getLocale() {
    return this.currentLocal();
  }

  changeLocale(locale: AvailableLocale) {
    localStorage.setItem('locale', locale);
    this.currentLocal.set(locale);
    window.location.reload();
  }
}