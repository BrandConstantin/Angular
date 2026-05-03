import { Routes } from '@angular/router';
import { TemplateForms } from './views/template-forms/template-forms';
import { ReactiveForm } from './views/reactive-form/reactive-form';
import { ValueAccesor } from './views/value-accesor/value-accesor';

export const routes: Routes = [
    {path: 'template-forms', component: TemplateForms},
    {path: 'reactive-forms', component: ReactiveForm},
    {path: 'value-accesor', component: ValueAccesor},
    {path: '*', pathMatch: 'full', redirectTo: 'template-forms'}

];
