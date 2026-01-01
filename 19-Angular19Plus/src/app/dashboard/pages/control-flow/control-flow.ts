import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

type Grade = 'A' | 'B' | 'C';

@Component({
  selector: 'app-control-flow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './control-flow.html',
  styles: ``,
})
export default class ControlFlow { 
  // @if
  public showContent = signal(false);

  public toggleContent(){
    this.showContent.update(value => !value);
  }

  // @switch
  public grade = signal<Grade>('A');

  // @for
  public frameworks = signal(['Angular', 'Vue', 'Spring', 'React']);
}
