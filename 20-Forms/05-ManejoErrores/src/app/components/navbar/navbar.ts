import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, DOCUMENT, effect, inject, OnDestroy, OnInit, Renderer2, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter, fromEvent, merge, Subscription } from 'rxjs';

@Component({
  selector: 'nav[app-navbar]',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  animations: [
    trigger('fadeIn', [
      state('void', style({ 
        opacity: 0,
        height: 0
      })),
      state('*', style({
        opacity: 1,
        height: '100vh' 
      })),
      // Define the transition for entering and leaving the view
      //transition('void => *', [animate('.3s ease-in-out')]),
      //transition('* => void', [animate('.3s ease-in-out')])

      // se puede reemplazar con 
      transition('void <=> *', [animate('.4s ease-in-out')]),
    ])
  ]
})
export class Navbar implements OnInit, OnDestroy {
  private _document = inject(DOCUMENT);
  private _router = inject(Router);
  private _renderer2 = inject(Renderer2);
  toggleNavbarMobile = signal(false);

  private _subscription = new Subscription();

  constructor() {
    effect(() => {
      const isOpen = this.toggleNavbarMobile();

      isOpen ? this._renderer2.addClass(this._document.documentElement, 'no-scroll') : this._renderer2.removeClass(this._document.documentElement, 'no-scroll');
    });
  }

  ngOnInit(): void {
    const routerEvents$ = this._router.events
    .pipe(
      filter(() => this.toggleNavbarMobile()),
      filter(event => event instanceof NavigationEnd)
    );
    
    const escapeEvent$ = fromEvent<KeyboardEvent> (this._document.body, 'keydown')
    .pipe(
      filter(() => this.toggleNavbarMobile()),
      filter(event => event.key === 'Escape')
    );

    const subscription = merge(routerEvents$, escapeEvent$).subscribe(() => this.toggleNavbarMobile.set(false));

    this._subscription.add(subscription);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
