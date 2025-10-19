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
        * otras formas de actualizar npm 
        ```
        npm uninstall --save-dev @angular/cli
        npm install --save-dev @angular/cli@latest
        npm install
        ```
* Instalar Angular CLI 
  ```npm install -g @angular/cli@latest
     Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned```
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
Crar proyecto: ```ng new newNameapp --no-standalone``` -> y escribir no
Acceder directorio nuevo ```cd newNameapp```
Instalar dependencias ```npm i```
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

### RouterLink
Para componente hay que indicar la importación
```
@Component({
  ...
  imports: [RouterLink, RouterLinkActive]
})
```
Para el html crear la navegación:
```
<nav>
  <a routerLink="/" routerLinkActive="active">Contador</a>
  <a [routerLink]="['/hero']" [routerLinkActive]="'active'">Hero</a>
</nav>
```

### @for
HTML:
```
@for (character of characters(); track character.id; let idx = $index){
<li>
    <span>{{idx + 1}} - {{character.name}}</span>
    <strong class="text-danger"> ({{character.power}})</strong>
</li>
}
```
TS:
```
interface Character{
  id: number;
  name: string;
  power: number;
}

@Component({...})

export class DragonballComponent {
  characters = signal<Character[]>([
    {id: 1, name: 'Goku', power: 9001},
    {id: 1, name: 'Vegeta', power: 8060},
    {id: 1, name: 'Piccolo', power: 7993},
    {id: 1, name: 'Chi-Chi', power: 4002},
  ]);
}
```

### ngClass
```
<strong [class.text-danger]="character.power > 9000"
  [class.text-primary]="character.power < 9000">
  ({{character.power}})
</strong>
```

### @if - @else
```
@for (character of characters(); track character.id; let idx = $index){
  @if(character.power > 5000) {
  <li>
    <span>{{idx + 1}} - {{character.name}}</span>
    <strong [class.text-danger]="character.power > 9000"
      [class.text-primary]="character.power < 9000">
      ({{character.power}})
    </strong>
  </li>
  } @else {
    <strong>No se muestras los que tienen poder inferior a 5000</strong>
  }
}
```

### inputs
HTML:
```
<input type="text" class="form-control" placeholder="Nombre"
  [value]="name()" (change)="name.set(txtName.value)" (input)="name.set(txtName.value)" #txtName/>
<input type="number" class="form-control" placeholder="Poder"
  [value]="power()" (change)="power.set(+numberPower.value)" (input)="power.set(+numberPower.value)" #numberPower/>
```
TS:
```
  characters = signal<Character[]>([
    {id: 1, name: 'Goku', power: 9001},
    {id: 1, name: 'Vegeta', power: 8060},
    {id: 1, name: 'Piccolo', power: 7993},
    {id: 1, name: 'Chi-Chi', power: 4002},
  ]);

  addCharacter(){
    if(!this.name() || !this.power() || this.power() <= 0){
      return;
    }

    const newCharacter: Character = {
      id: this.characters().length + 1,
      name: this.name(),
      power: this.power()
    }

    this.characters.update(
      (list) => [...list, newCharacter]
    );
  }
```

### outputs
TS: 
```
newCharacter = output<Character>();
```
HTML:
```
<character-add (newCharacter="addCharacter($event)")></character-add>
```

### Servicios
HTML:
```
  <div class="col-12 col-sm-6">
    <character-add (newCharacter)="dragonballService.addCharacter($event)"></character-add>
  </div>



  <div class="col-12 col-sm-6">
    <dragonball-character-list listName="Listado de personajes" [characters]="dragonballService.characters()" />
  </div>
```
TS - injectar dependencias:
```
  public dragonballService = inject(DragonballService);
```
TS - el servicio:
```
@Injectable({providedIn: 'root'})
export class DragonballService {
  characters = signal<Character[]>([
    {id: 1, name: 'Goku', power: 9001},
    {id: 1, name: 'Vegeta', power: 8060},
  ]);

  addCharacter(character: Character){
    this.characters.update(
      (list) => [...list, character]
    );
  }
}
```

### Efectos y LocalStorage
Efectos:
```
  saveToLocalStorage = effect(() =>{
    console.log(`Character count ${this.characters().length}`);
  });
```
Almacenamiento local:
```
  saveToLocalStorage = effect(() =>{
    localStorage.setItem('characters', JSON.stringify(this.characters()))
  });
```

### LinkedSignal
Leer desde LocalStorage: 
```
  loadFromLocalStorage = (): Character[] => {
    const characters = localStorage.getItem('characters');
    return characters ? JSON.parse(characters) : [];
  }

  characters = signal<Character[]>(this.loadFromLocalStorage());
```

### Despliegue
Construir aplicación en modo producción:
```ng build```
Ir a servidor prueba: https://app.netlify.com/
Y subir la carpeta browser creada con ng build que se encuentra en projectName -> dist -> projectName -> browser
Ir a Netlify -> Sites -> click sobre el proyecto -> Site configuration -> cambiamos la url del proyecto -> click para abrir el proyecto -> https://angular-base02-cbl.netlify.app/#/
Si se modifica algo se sube otra vez la carpeta browser en Deploys 

### HashRouter
A la hora de desplegar indicar la ruta principal:
```
    // HashStrategy
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy,
    },
```

Webs recomendada para la ayuda de crear una aplicación en Angular:
* https://tailwindcss.com/ -> ir a Framework Guides -> seleccionamos Angular -> instalamos en el terminal con ```npm install tailwindcss @tailwindcss/postcss postcss --force``` y creamos el archivo llamado ```.postcssrc.json``` en directorio de nuestro proyecto añadiendo la configuración 
```
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```
-> el último paso añadir en nuestro archivo ```./src/styles.css``` la importación ```@import "tailwindcss";```
* https://www.creative-tim.com/twcomponents/component/dashboard-navigation/ -> en Show Code copiar lo que  hay en el div para este ejemplo

### Rutas Hijas
```
export const routes: Routes = [
  {
    path: 'dashboard',
    loadComponent: () => import('./gifs/pages/dashboard-page/dashboard-page.component'),
    children:[
      {
        path: 'trending',
        loadComponent: () => import('./gifs/pages/trending-page/trending-page.component')
      },
      {
        path: 'search',
        loadComponent: () => import('./gifs/pages/search-page/search-page.component')
      },
      {
        path: '**',
        redirectTo: 'trending'
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];
```

### RouterLinks
```
  @for (item of menuOptions; track item.route){
  <a [routerLink]="item.route" routerLinkActive="bg-blue-800" class="w-full px-2 inline-flex space-x-2 items-center border-b border-slate-700 py-3 hover:bg-white/5 transition ease-linear duration-150">
      <div>
        <i [class]="item.icon"></i>
      </div>
      <div class="flex flex-col">
          <span class="text-lg font-bold leading-5 text-white">{{item.label}}</span>
          <span class="text-sm text-white/50 hidden md:block">{{item.subLabel}}</span>
      </div>
  </a>
  }
```
```
interface MenuOptions{
  icon: string;
  label: string;
  subLabel: string;
  route: string;
}
export class SideMenuOptionsComponent {
  menuOptions: MenuOptions[] = [
    {
      icon: 'fa-slid fa-chart-line',
      label: 'Trending',
      subLabel: 'Gifs Populares',
      route: '/dashboard/trending'
    },
    {
      icon: 'fa-slid fa-magnifying-glass',
      label: 'Buscador',
      subLabel: 'Buscar gifs',
      route: '/dashboard/search'
    },
  ];
}
```

### Angular Environments
```ng g environments```

### Path Alias
En tsconfig.json añadimos:
```
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@environments/*": ["src/evironments/*"]
    },
    ...
  }
```
Esto ayuda a facilitar el path de las importaciones cambiado el
```
import { environment } from '../../../../../environments/environment.development';
```
por
```
import { environment } from 'src/environments/environment';
```

### API GIPHY Developers
```
-> https://developers.giphy.com/dashboard/?create=true
-> API: iOSNo9IhwKM8YVRguelW88F7q614yw4l
-> en explorer: https://developers.giphy.com/explorer/
-> send request: https://api.giphy.com/v1/gifs/trending?api_key=iOSNo9IhwKM8YVRguelW88F7q614yw4l&limit=25&offset=0&rating=g&bundle=messaging_non_clips
-> response in giphy.interface.ts
-> Ver - Paste Json as code en el ts
```

### Buscador
* en el service.ts
```
  searchGifs(query: string){
    return this.http
      .get<GiphyResponse>(`${environment.urlGiphy}/gifs/search`, {
        params: {
          api_key: environment.apiKeyGiphy,
          limit: 20,
          q: query
        }
      }).pipe(
        map(({data}) => data),
        map((items) => GifMapper.mapGiphyItemsToGifArray(items))
      );
  }
```
* en el componente search-page.component
```
<section class="flex flex-col gap-4">
  <input type="text" placeholder="Buscar Gifs" class="mt-3 border-gray-300 rounded-md p-2"
    (keyup.enter)="onSearch(txtSearch.value)"
    #txtSearch/>
</section>

<section class="py-5">
  <gifs-list [gifs]="gifs()"></gifs-list>
</section>
```
* componente ts search-page.component
```
export default class SearchPageComponent {
  gifsSearch = inject(GifService)
  gifs = signal<Gif[]>([])

  onSearch(query: string){
    this.gifsSearch.searchGifs(query)
      .subscribe((resp) => {
        console.log(resp);
        this.gifs.set(resp)
      });
  }
}
```


### History y Cache
```
  // chache 
  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  // mostrar historial búsqueda
  getHistoryGifs(query: string): Gif[]{
    return this.searchHistory()[query] ?? [];
  }

  // mantener el historial en el local storage
  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem(GIF_KEY, historyString);
  });

  // cargar el historial del local storage
  const loadFromLocalStorage = () => {
    const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}'; //Record<string, gifs[]>
    const gifs = JSON.parse(gifsFromLocalStorage);
    console.log(gifs);
    return gifs;
  };
```

