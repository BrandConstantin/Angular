import { Routes } from '@angular/router';
import { TemplateForms } from './views/template-forms/template-forms';
import { ReactiveForm } from './views/reactive-form/reactive-form';
import { ValueAccesor } from './views/value-accesor/value-accesor';
import { Bonus } from './views/bonus/bonus';

export const routes: Routes = [
    {path: 'template-forms', component: TemplateForms},
    {path: 'reactive-forms', component: ReactiveForm},
    {path: 'value-accesor', component: ValueAccesor},
    {path: 'bonus', component: Bonus},
    {path: '*', pathMatch: 'full', redirectTo: 'template-forms'}

];
