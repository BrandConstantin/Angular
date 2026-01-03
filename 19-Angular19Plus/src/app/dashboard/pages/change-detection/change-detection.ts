import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { Title } from '@shared/title/title';

@Component({
  selector: 'app-change-detection',
  imports: [CommonModule, Title],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-title [title]="currentFramework()" />

    <pre>{{ frameworkAsSignal() | json }}</pre>
    <pre>{{ frameworkAsProperty | json }}</pre>
  `,
})
export default class ChangeDetection { 
  public currentFramework = computed(
    () => `Change detection - ${ this.frameworkAsSignal().name }`
  );

  public frameworkAsSignal = signal({
    name: 'Angular',
    releaseDate: 2016
  });

  public frameworkAsProperty = {
    name: 'Spring Boot 4',
    releaseDate: 2025
  }

  constructor(){
    setTimeout(() => {
      this.frameworkAsProperty.name = 'React';
      this.frameworkAsSignal.update( value => ({
        ...value, name: 'Vue'
      }));

      console.log("Hecho!");
    }, 2000);
  }
}
