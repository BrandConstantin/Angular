import { afterNextRender, afterEveryRender, Component, OnInit, effect, signal } from '@angular/core';
import { Title } from '../../components/title/title';


const log = (...messages: string[]) => {
  console.log(
    `${messages[0]} %c${messages.slice(1).join(', ')}`,
    'color: rgba(223, 206, 55, 0.67)'
  );
}

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [Title],
  templateUrl: './home-page.html',
})
export class HomePage implements OnInit{ 
  traditionalProperty = 'Constantin';
  signalProperty = signal('Constantin');

  constructor(){
    log('Constructor llamado');
  }

  changeTraditional(){
    this.traditionalProperty = 'Constantin B.L.';
  }

  changeSignal(){
    this.signalProperty.set('constantin b.l.');
  }

  ngOnInit(){ 
    log('Se dispara una vez cuando Angular ha inicializado todos sus componentes inputs, el método: ngOnInit'); 
  }
  
  ngOnChanges(){
    log('Se dispara cuando hay un cambio en un componente, el método: ngOnChanges');
  }
  
  ngDoCheck(){
    log('Se dispara cada vez que se comprueba si algún componente ha cambiado, el método: ngDoCheck');
  }
  
  ngAfterContentInit(){
    log('Se dispara una vez cuando los contenidos de los componentes se han inicializado, el método: ngAfterContentInit');
  }
  
  ngAfterContentChecked(){
    log('Se dispara cada vez que se ha comprobado si un componente ha sido chequeado por cambios, el método: ngAfterContentChecked');
  }
  
  ngAfterViewInit(){
    log('Se dispara una vez, una vez que el componente view ha sido inicializado, el método: ngAfterViewInit');
  }
  
  ngAfterViewChecked(){
    log('Se dispara cada vez que el componente view ha comprobado por cambios, el método: ngAfterViewChecked');
  }

  ngOnDestroy(){
    log('Se dispara una vez cuando el componente es destruido, el método: ngOnDestroy');
  }

  afterNextRenderEffect = afterNextRender(() => {
    log('Se dispara una vez cuando todos los compenentes han sido renderizados en el DOM, el método: afterNextRenderEffect');
  });

  afterEveryRender = afterEveryRender(() => {
    log('Se dispara cada vez cuando todos los compenentes han sido renderizados en el DOM, el método: afterEveryRender');
  });

  basicEffect = effect(() => {
    log('Disparar efectos secundarios con el método: basicEffect');
  });
  
}
