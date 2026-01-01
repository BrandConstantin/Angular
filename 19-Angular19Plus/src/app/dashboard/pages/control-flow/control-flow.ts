import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-control-flow',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './control-flow.html',
  styles: ``,
})
export default class ControlFlow { 
  public showContent = signal(false);

  public toggleContent(){
    this.showContent.update(value => !value);
  }
}
