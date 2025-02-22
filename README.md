# Angular
Angular de cero a experto
[Curso udemy](https://www.udemy.com/course/angular-fernando-herrera/)

Empezar con TypeScript [TypeScript](https://github.com/BrandConstantin/TypeScript)

Ver versiones:
* Node ```node -v```
    * Update node:
        * clean cache ```npm cache clean --force```
        * install packages ```npm install -g n```
* npm ```npm -v```
    * Update npm (porque mi versión de node era por debajo de 14):
        * ```npm install -g npm-windows-upgrade```
        * abrir PowerShell como administrador ```Set-ExecutionPolicy Unrestricted -Scope CurrentUser -Force```
        * subir de versión ```npm-windows-upgrade```
        * si la versión de node es por encima de 16 ```npm install -g npm```
* Angular CLI ```ng v```
* Git ```git -v```

Plugins para VSC:
| Plugins 1     | Plugins 2             | Plugins 3 |
|---------------|-----------------------|---------------------------|
| Versión Lens  | TypeScript Importer   | Paste JSON as Code        |
| JSON Crack    | Image preview         | Fluent Icons              |
| Error Lens    | Console Ninja         | Better Comments           |
| Auto Import   | Auto Close Tag        | Angular Language Service  |
| EditorConfig for VS Code              |

Desde Angular v17, por defecto los proyectos trabajan sin módulos (module-less)



Pero para trabajar de forma tradicional como lo vieron en el curso:
```ng new <nombre de la aplicación> --standalone false```

## Primer proycto
Crar proyecto: ```ng new bases --no-standalone``` -> y escribir no
Lanzar aplicación con: ```ng serve -o``` -> para abrir en navegador

Explicación de cada archivo:
* .editorconfig es la configuración de editor de texto
* .gitignore es un archivo propio de git donde se omiten los ficheros a subir a repositorio
* angular.json son las configuraciones de ejecución de nuestro proyecto
* package-lock.json se genera automaticamente cuando se instalan packetes
* package.json son las dependencias de node para el proyecto
* README.MD para explicar lo necesario para correr el proyecto o instalar, de ayuda a otras personas, es una documentación 
* tsconfig.app.json, tsconfig.json y tsconfig.spec.json son configuraciones de typescript, el .spec siendo para testing

Explicación de cada directorio:
* .angular ayuda a levantar el proyecto a angular y maneja el cache, se genera automaticamente y no se tocan casi nunca
* .vscode tiene archivos de configuración descargados por angular con recomendaciones
* .node-modules es directorio que se descarga con los modulos de node cuando se hace npm install 
* src es el directorio donde vamos a construir nuestra aplicación
    * index.html que contiene <app-root></app-root> que es el componente principal de toda la aplicación
    * app es el directorio donde se construye la aplicación
    * assets es el directorio que contiene el ficheros estaticos entre cual .gitkeep donde especificamos lo que si se debe subir a git

### Component
* app.component.html
```
<h1>{{title}}</h1>
<p>Un curso de {{counter}}</p>
<button (click)="this.increaseOrDecreaseBy(1)">+1</button>
<button (click)="this.increaseOrDecreaseBy(-1)">-1</button>
```
* app.component.ts
```
export class AppComponent {
  public title: string = 'SuperBest AngularApp';
  public counter: number = 10;

  // crear método
  increaseOrDecreaseBy(value: number): void{
    this.counter += value;
  }
}
```

### Crear componente manualmente
En la carpeta app se crea un nuevo directorio y exportamos el componente:
```
import { Component } from "@angular/core";

@Component({
  selector: 'app-counter',
  template: '<h3>Counter</h3>'
})
export class CounterComponent{ }
```
Y declararlo en el módulo principal:
```
@NgModule({
  declarations: [
    AppComponent,
    CounterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

```

Teniendo en VSC la extensión de 'Angular Snippets' de John Papa podemos crear snipets de forma automáticamente, entre cual el componente. 

### Componentes
Generar nuevo componente:
```ng g c heroes/hero```

### Señales
Fichero ts:
```
export class CounterComponent{
  public counter: number = 10;
  counterSignal = signal(10);

  // crear método
  increaseOrDecreaseBy(value: number): void{
    this.counter += value;
    this.counterSignal.update(currentValue => currentValue + value);
  }
  resetCounter():void{
    this.counter = 10;
    this.counterSignal.set(0);
  }
}
```
Fichero html:
```
Counter Signal: {{counterSignal()}}
```

### Zoneless
En este curso, para mejorar las performance de la aplicación, se usará [Zoneless](https://angular.dev/guide/experimental/zoneless).

### Señales computadas
```
  heroDescription = computed(() =>{
    const description = `${ this.name() } - ${ this.age() }`;
    return description;
  })
```