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


## Diseño Masonry
* Ir a flowbite.com y buscar masonry 
```
  // diseño masonry
  trendingGifGroup = computed<Gif[][]>(() => {
    const groupSize = 3;
    const groups: Gif[][] = [];
    const gifs = this.trendingGifs();

    for (let i = 0; i < gifs.length; i += groupSize) {
      groups.push(gifs.slice(i, i + groupSize));
    }

    return groups;
  });

  .......

  <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-5">
  @for (group of gifService.trendingGifGroup(); track $index) {
    <div class="grid gap-4">
      @for (gif of group; track gif.id) {
        <div>
          <img
            class="w-full h-auto rounded-lg shadow-lg"
            src="{{ gif.url }}"
            alt="{{ gif.title }}"
          />
        </div>
      }
    </div>
  }
  </div>
```

### InfiniteScroll
```
<div class="h-screen overflow-y-scroll grid grid-cols-2 md:grid-cols-4 gap-4 pt-5"
  (scroll)="onScroll($event)"
  #groupDiv>

  ...
</div>

....................
// en el service
private currentPage = signal(0);

loadTrendingGifs() {
  if(this.trendingGifsLoading()) return;
  this.trendingGifsLoading.set(true);

  this.http
    .get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        offset: this.currentPage() * 20,
      },
    })
    .subscribe((resp) => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
      this.trendingGifs.update(currentGifs =>[...currentGifs, ...gifs]);
      this.trendingGifsLoading.set(false);
      //console.log({ gifs });
    });
}


scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('scrollDiv');

  onScroll(event: Event){
    const scrollDiv = this.scrollDivRef()?.nativeElement;

    if(!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop; //px antes de llegar al final
    const clientHeight = scrollDiv.clientHeight; //px visibles
    const scrollHeight = scrollDiv.scrollHeight; //px totales

    //console.log({scrollDiv});

    const isFinalScrolled = scrollTop + clientHeight + 300 >= scrollHeight;
    if(isFinalScrolled){
      console.log('llegaste al final del scroll');
      this.gifService.loadTrendingGifs();
    } 
  }
```

#### Preservar posición scroll navegando entre páginas
* crear nuevo servicio
```
@Injectable({providedIn: 'root'})
export class ScrollStateService {
    trendingScrollPosition = signal(0);
}
```
* cambiar el componente
```
export default class TrendingPageComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollPosition();
  }

  scrollStateService = inject(ScrollStateService);

  this.scrollStateService.trendingScrollPosition.set(scrollTop);
}
```

### DevTools
* Dentro de la terminal click en F5 y se abre en modo debbug
* O escribir dentro del código ```debugger;```

## Country App 
#### Con tailwindcss y daisyui
* Iniciar proyecto ```05-CountrySPA-estructura``` y N para SSR y SSG
* usar los recursos:
  - https://tailwindcss.com/docs/installation/framework-guides/angular
    - Para la versión del curso solo ha funcionado haaciendo lo siguiente: ```npm install daisyui@latest tailwindcss@latest @tailwindcss/postcss@latest postcss@latest --force```
  - https://daisyui.com/docs/install/
    - ```npm i -D daisyui@latest```
  - https://icon-sets.iconify.design/
* levantar aplicación ```ng serve -o```
* seguir los pasos para tailwindcss: instalar, crear fichero .postcssrc.json, importar y recargar la aplicación
* seguir los pasos para daisyui: instalar e importar
* Add Tailwind CSS plugin for PostCSS to a new .postcssrc.json file at root

```
{
  "plugins": {
    "@tailwindcss/postcss": {}
  }
}
```
Añadir a src/styles.css y cambiar tema
```
@import "tailwindcss";
/* @plugin "daisyui"; */
@plugin "daisyui" {
  themes: light --default, dark --prefersdark, cupcake;
}
```

### Tener varios routes
```
/* app.routes.ts */
export const routes: Routes = [
    {
        path: '',
        component: HomePage,
    },
    {
        path: 'country',
        loadChildren: () => import('./country/country.routes'),

    },
    {
        path: '**',
        redirectTo: '',
    }
];

/* country.routes.ts */
export const countryRoutes: Routes = [
    {
        path: '',
        component: ByCapitalPage,
    }
];

export default countryRoutes;
```

## Service
```
  // Inyección del HttpClient  
  private http = inject(HttpClient);

  // Inyección del servicio  
  countryService = inject(CountryService);

  // Configuración del HttpClient en el app.config
  provideHttpClient(withFetch())

  // cramos la funcionalidad
  searchByCapital( query: string ) {
    query = query.toLocaleUpperCase();
    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${ query }`);
  }

  // crear la interfaz rest-countries.interface
```

### Mapeo de datos
```
    this.isLoading.set(true);
    this.isError.set(null);

    this.countryService.searchByCapital( query ).subscribe( resp => {
      this.isLoading.set(false);
      this.countries.set(resp);
    });


...............
<country-list [countries]="countries()"></country-list>

...............
export class CountryMapper {
  // static RestCountry => Country
  static mapRestCountryToCountry(restCountry: RESTCountry): Country {
    return {
      capital: restCountry.capital.join(','),
      cca2: restCountry.cca2,
      flags: restCountry.flags.svg,
      name: restCountry.translations['spa'].common ?? 'No Spanish Name',
      population: restCountry.population,
      region: restCountry.region,
      subRegion: restCountry.subregion,
    };
  }

  // static RestCountry[] => Country[]
  static mapRestCountryArrayToCountryArray(restCountries: RESTCountry[]): Country[] {
    return restCountries.map(this.mapRestCountryToCountry);
  }
}
```

###  Pipes
```
...
  imports: [DecimalPipe],
...

  <span class="badge badge-secondary">
    {{ country.population | number }}
  </span>
```

## Manejo de excepciones
```
return this.http.get<RESTCountry[]>(`${API_URL}/capital/${ query }`).pipe(
  map(restCountries => CountryMapper.mapRestCountryArrayToCountryArray(restCountries)),
  catchError((error) => {
    console.log('Error en el servicio', error);
    return throwError(() => new Error('Error en el servicio', error));
}));

........
this.countryService.searchByCapital( query ).subscribe({
  next: (resp) =>{
  this.isLoading.set(false);
  this.countries.set(resp);

  console.log(resp);
  },
  error: (err) => {
    this.isLoading.set(false);
    this.isError.set(err.message);
    this.countries.set([]);
  }
});
```

## Reactividad con Resources
```
import { Component, inject, signal } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { of } from 'rxjs';

.....
export class ByCapitalPageComponent {
  countryService = inject(CountryService);
  query = signal('');

  countryResource = rxResource({
    params: this.query,
    stream: ({ params }) => {
      if (!params) return of([])
      return this.countryService.searchByCapital(params)
    }
  })
}
......  
<country-list
  [countries]="countryResource.value() ?? []"
  [errorMessage]="countryResource.error()"
  [isEmpty]="countryResource.value()?.length === 0"
  [isLoading]="countryResource.isLoading()"
/>
```

## Debounce - búsquedas autómaticas
```
<input
    type="text"
    class="input input-bordered w-full max-w-xs"
    [placeholder]="placeholder()"
    autofocus
    #txtSearchCapital
    (keyup.enter)="value.emit( txtSearchCapital.value )"
    (keyup)="inputValue.set( txtSearchCapital.value )"
/> 

.....
placeholder = input("Buscar país ..."); // establece un valor por defecto
value = output<string>();
debounceTime = input(300); // tiempo de espera por defecto, reutilizable en otros componentes

inputValue = signal<string>(''); // tener la última cadena ingresada
debouncedEffct = effect((onCleanup) => {
  const val = this.inputValue();

  const timeout = setTimeout(() => {
    this.value.emit(val);
  }, this.debounceTime());

  onCleanup(() => {
    clearTimeout(timeout);
  });
});
```

## Cache
```
// cache de países buscados
private queryCacheCapital = new Map<string, Country[]>();

if( this.queryCacheCapital.has( query ) ) {
  return of( this.queryCacheCapital.get( query )! );
}

.....
tap( countries => this.queryCacheCapital.set( query, countries ) ),
```

## ActivatedRoute
Para preservar los resultados
```
// tomar la información de la ruta activa
activatedRoute = inject(ActivatedRoute);
queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? '';
query = linkedSignal(() => this.queryParam);

countryResource = rxResource({
  params: this.query,
  stream: ({ params }) => {
    if (!params) return of([])

    this.router.navigate(['/country/by-capital'], {
      queryParams: { 
        query: params,
        saludo: 'hola' 
      },
    });

    return this.countryService.searchByCapital(params)
  },
});

.....
initialValue = input<string>();
// inicializar una señal con un proceso de entrada
inputValue = linkedSignal<string>(() => this.initialValue() ?? ''); // tener la última cadena ingresada

.....
<input
    type="text"
    class="input input-bordered w-full max-w-xs"
    [placeholder]="placeholder()"
    autofocus
    #txtSearchCapital
    (keyup.enter)="value.emit( txtSearchCapital.value )"
    (keyup)="inputValue.set( txtSearchCapital.value )"
    [value]="inputValue()"
/> 
```

## Pipes
### UpperCasePipe, LowerCasePipe, TitleCasePipe
```
import { LowerCasePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';

nameLower = signal('constantin');
nameUpper = signal('CONSTANTIN');
fullName = signal('bRANd CONstanTIN');
.....

<div class="stat-value">{{ nameUpper() | lowercase }}</div>
<div class="stat-value">{{ nameLower() | uppercase }}</div>
<div class="stat-value">{{ fullName() | titlecase }}</div>
```

### CurrencyPipe, DecimalPipe, PercentPipe
```
import { CurrencyPipe, DecimalPipe, PercentPipe } from '@angular/common';

totalSells = signal(2_567_789.5567);
percent = signal(0.4856);
.....
<div class="stat-value">{{ totalSells() | number : "1.2-2" }}</div>
<div class="stat-value">{{ totalSells() + 1234 | number : "1.0-0" }}</div>
<div class="stat-value"> {{ totalSells() | currency : "EUR" : "symbol-narrow" : "1.4-4" }}</div>
<div class="stat-value">{{ percent() | percent : "1.2-2" }}</div>
```

### DatePipe
```
import { DatePipe } from '@angular/common';

customDate = signal(new Date());

tickingDateEffect = effect((onCleanup) => {
  const interval = setInterval(() => {
    this.customDate.set(new Date());
  }, 1_000);

  onCleanup(() => {
    clearInterval(interval);
  });
});
.....

<div class="stat-value">{{ customDate() | date }}</div>
<div class="stat-value">{{ customDate() | date : "long" : "GMT-6" }}</div>
<div class="stat-value">{{ customDate() | date : "EEEE d, MMMM" }}</div>
```

### Configuraciones de internacionalización de Pipes y Aplicación
##### Cambiar idioma aplicación en la configuarción aplicación
```
import localEs from '@angular/common/locales/es';
import localRo from '@angular/common/locales/ro';
import { LocalService } from './service/local.service';

registerLocaleData(localRo, 'ro');
registerLocaleData(localEs, 'es');

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),

    {
      provide: LOCALE_ID,
      //useValue: 'es-ES',
      deps: [LocalService],
      useFactory: (localService: LocalService) => localService.getLocale,
    }
  ]
};

.....

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

.....
currentLocal = signal(inject(LOCALE_ID));

changeLocale(locale: AvailableLocale) {
  this.localService.changeLocale(locale);
}

.....

<div class="flex flex-roww gap-2">
  <h1 class="text-2xl font-bold">
    Locale Actual:
    <span class="badge badge-secondary">{{ currentLocal() }}</span>
  </h1>

  <button (click)="changeLocale('ro')" class="btn btn-primary">
    Schimbă în română
  </button>
  <button (click)="changeLocale('en')" class="btn btn-primary">
    Change to English
  </button>
  <button (click)="changeLocale('es')" class="btn btn-primary">
    Cambiar a español
  </button>
</div>
```

### i18nPluralPipe
```
<p>
  Actualmente
  {{ clients().length | i18nPlural : clientsMap() }}
</p>

.....
clientsMap = signal({
  '=0': 'no tenemos ningún cliente esperando',
  '=1': 'tenemos un cliente esperano',
  '=2': 'tenemos 2 clientes esperando',
  other: 'tenemos # clientes esperando'
})
```

### i18nSelectPipe
```
<p>
  Saludos {{ client().name }}, es un placer
  {{ client().gender | i18nSelect : invitationMap }} a nuestro evento
</p>

.....
invitationMap ={
  male: 'invitado',
  famale: 'invitada'
}
```

### SlicePipe, JsonPipe, KeyValuePipe
```
<ul>
  @for (item of profile | keyvalue; track $index) {
  <li>
    <strong class="text-primary">{{ item.key | titlecase }}:</strong>
    <span>
      {{ item.value }}
    </span>
  </li>

  }
</ul>

.....
...
  imports: [Card, I18nSelectPipe, I18nPluralPipe, SlicePipe, UpperCasePipe, JsonPipe, KeyValuePipe, TitleCasePipe],
...

profile = {
  name: 'Jesús',
  gender: 'none',
  age: 56,
  address: 'Ottawa, Canada'
}
```

### AsyncPipe
```
promiseValue: Promise<string> = new Promise((resolve, reject) => {
  setTimeout(() =>{
    resolve('Tenemos data en la promesa')
    console.log('Promesa finalizada');
  }, 2500);
})

.....
<p>{{ promiseValue | async }}</p>

@if( promiseValue | async; as value ) {
  <p class="text-primary">{{ value }}</p>
}
```

## Pipes personalizados y transformar strings
```
<span
  class="text-xs w-44"
  [class.text-success]="hero.canFly"
  [class.text-secondary]="!hero.canFly"
>
  {{ hero.canFly | canFly | uppercase}}
  <!-- Puede volar | No puede volar -->
</span>

.....
import { Pipe } from '@angular/core';

@Pipe({
  name: 'canFly',
})
export class CanFlyPipe {
  transform(fly: boolean): string {
    return fly ? 'puede volar' : 'no puede volar';
  }
}

.....
imports: [ToggleCasePipe, CanFlyPipe, HeroColorPipe, TitleCasePipe, HeroTextColorPipe, UpperCasePipe],
```

### Pipes dentro de propiedades computadas
```
<span class="text-xs w-44" [style.color]="hero.color | heroTextColor">
  {{ hero.color | heroColor | titlecase}}
</span>

......
import { Pipe, PipeTransform } from '@angular/core';
import { Color, ColorMap } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroTextColor',
})
export class HeroTextColorPipe implements PipeTransform{

  transform(textColor: Color): string {
    return ColorMap[textColor];
  }

}

.....
export enum Color {
  red,
  black,
  blue,
  green,
}

export enum Creator {
  DC,
  Marvel,
}

export interface Hero {
  id: number;
  name: string;
  canFly: boolean;
  color: Color;
  creator: Creator;
}

export const ColorMap = {
  [Color.red]: '#E57373',
  [Color.black]: '#424242',
  [Color.blue]: '#64B5F6',
  [Color.green]: '#81C784',
};
```

### Ordenar arreglos
```
@for (hero of heroes() | heroSortBy: sortBy(); track hero.id; let i = $index) {}

.....
sortBy = signal<keyof Hero | null>(null);

.....
@Pipe({
  name: 'heroSortBy',
})
export class HeroSortByPipe implements PipeTransform{
    transform(value: Hero[], sortBy: keyof Hero | null): Hero[] {
        if(!sortBy) return value;

        switch(sortBy){
            case 'name': return value.sort((a,b) => a.name.localeCompare(b.name));
            case 'canFly': return value.sort((a,b) => (a.canFly ? 1 : -1) - (b.canFly ? 1 : -1));
            case 'color': return value.sort((a,b) => a.color - b.color);
            case 'creator': return value.sort((a,b) => a.creator - b.creator);
            default: return value;
        }
    }
}
```

### Filtrar arreglos
```
<input
    type="text"
    class="input input-bordered w-full max-w-xs"
    placeholder="Buscar héroe"
    (input)="searchQuery.set(txtSearch.value)"
    #txtSearch
/>

.....
  searchQuery = signal('');

.....
@Pipe({
  name: 'heroFilter',
})
export class HeroFilterPipe implements PipeTransform{
    transform(value: Hero[], search: string): Hero[] {
        if(!search) return value;

        search = search.toLowerCase();

        return value.filter(
            hero => hero.name.toLowerCase().includes(search)
        );
    }
}
```

# Angular Schematics
Para desativar, cuando se crea componentes, la opción de "changeDetection: ChangeDetectionStrategy.OnPush," y "standalone: true,":
* View -> Command Pallete
* Angular Schematics: Configuration Helper
* Marcamos Configuration -> Configuration Helper
* Copy Settings from Angular json -> Yes, use HTML external file -> Yes, disbled for components and pages


# Formulario Reactivos
## Reactive Forms Module en Standalone components
```
imports: [JsonPipe, ReactiveFormsModule],

.....
myForm = new FormGroup({
  name: new FormControl(''),
  price: new FormControl(0),
  inStorage: new FormControl(0)
})

.....
<input type="text"
        class="form-control"
        placeholder="Nombre del producto"
        formControlName="name">

<span>Valid</span>
<pre>{{ 'myForm.valid' | json }}</pre>

<span>Pristine</span>
<pre>{{ 'myForm.pristine' | json }}</pre>
```

## Form Builder
```
private fb = inject(FormBuilder);
myForm = this.fb.group({
  name: [''],
  price: [0],
  inStorage: [0]
})
```

## Validadores
```
private fb = inject(FormBuilder);
myForm: FormGroup = this.fb.group({
  //name: ['', /** validadores sincronos */, /** validadores asincronos */],
  name: ['', [Validators.required, Validators.minLength(3)], []],
  price: [0, [Validators.required, Validators.min(10)]],
  inStorage: [0, [Validators.required, Validators.min(0)]]
})
```
Mostrar los errores:
```
@if (isValidField('name')){
    <span class="form-text text-danger">
        <!-- Debe de ser de 3 letras -->
        {{getFieldError("name")}}
    </span>
}

.....
isValidField(fieldName: string): boolean | null{
  return !!this.myForm.controls[fieldName].errors;
}

getFieldError(fieldName: string): string | null {
  if(!this.myForm.controls[fieldName]) return null;

  const errors = this.myForm.controls[fieldName].errors ?? {};

  for(const hey of Object.keys(errors)){
    switch(hey){
      case 'required':
        return 'Este campo es requerido';

      case 'minlength':
        return `Mínimo de ${errors['minlength'].requiredLength} caracteres`;
      
      case 'min':
        return `Vallor mínimo de ${errors['min'].min}`;
    }
  }

  return null;
}
```

## Guardar formulario
```
<form autocomplete="off" [formGroup]="myForm" (ngSubmit)="onSave()">...</form>

.....
isValidField(fieldName: string): boolean | null{
  return (this.myForm.controls[fieldName].errors && this.myForm.controls[fieldName].touched);
}

onSave(){
  if(this.myForm.invalid){
    this.myForm.markAllAsTouched();
    return;
  }

  this.myForm.reset({ // resetear el form una vez enviado
    price: 0, // establecer un valor
    inStorage: -1
  });
}
```

## Controles dinámicos con arreglos
```
<div class="col-sm-9" formArrayName="favoriteGames">
    @for (favoriteGame of favoriteGames.controls; track $index; let i = $index){
        <div class="mb-1">

            <div class="input-group">
                <input class="form-control"
                [formControlName]="i">

                <button class="btn btn-outline-danger"
                        type="button">
                Eliminar
            </button>
            </div>
            @if (formUtils.isValidFieldInArray(favoriteGames, i)){
                <span class="form-text text-danger">
                    {{formUtils.getFieldErrorInArray(favoriteGames, i)}}
                </span>
            }

        </div>
    }
</div>
.....

private fb = inject(FormBuilder);

myForm: FormGroup = this.fb.group({
  name: ['', [Validators.required, Validators.minLength(3)]],
  favoriteGames: this.fb.array(
    [
      ['Metal Gear', Validators.required],
      ['Death Stranding', Validators.required]
    ],
    Validators.minLength(3)
  ),
})

get favoriteGames(){
  return this.myForm.get('favoriteGames') as FormArray;
}

isValidFieldInArray(formArray: FormArray, index: number){
  return (formArray.controls[index].errors && formArray.controls[index].touched)
}
```

## Añadir y eliminar controles de formulario
```
<div class="input-group">
    <input class="form-control"
            placeholder="Agregar favorito"
            [formControl]="newFavorite"
            (keydown.enter)="onAddToFavorites()"
            (keydown.enter)="$event.preventDefault()">


    <button class="btn btn-outline-primary"
            type="button"
            (click)="onAddToFavorites()">
        Agregar favorito
    </button>
</div>
.....

newFavorite = new FormControl('', Validators.required);

onAddToFavorites(){
  if(this.newFavorite.invalid) return;

  const newGame = this.newFavorite.value;

  this.favoriteGames.push(this.fb.control(newGame, Validators.required));

  this.newFavorite.reset();
}

onDeleteFavorite(index: number) {
  this.favoriteGames.removeAt(index);
}
```

## Switches, checks y radio buttos
```
export class SwitchesPage { 
  private fb = inject(FormBuilder);
  formUtils = FormUtils;

  myForm: FormGroup = this.fb.group({
    gender: [ , Validators.required],
    wantNotifications: [true],
    termAndCondition: [false, Validators.requiredTrue]
  })

  onSubmit(){
    this.myForm.markAllAsTouched();
  }
}

.....
<div 
    [class.text-danger]="formUtils.isValidField(myForm, 'termAndCondition')"
    class="form-check">
        <input class="form-check-input"
                type="checkbox"
                id="flexCheckDefault"
                formControlName="termAndCondition">
        <label class="form-check-label" for="flexCheckDefault">
          Términos y condiciones de uso
        </label>
      </div>
        @if (formUtils.isValidField(myForm, 'termAndCondition')){
            <span class="form-text text-danger">
                Debe de aceptar las condiciones de uso
            </span>
        }

</div>
```

## Validaciones expresiones regulares
```
static namePattern = '([a-zA-Z]+) ([a-zA-Z]+)';
static emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$';
static notOnlySpacesPattern = '^[a-zA-Z0-9]+$';

.....
formUtils = FormUtils;

myRegisterForm: FormGroup = this.fb.group({
  name: ['', Validators.required, Validators.pattern(FormUtils.namePattern)],
  email: ['', [Validators.required, Validators.email, Validators.pattern(this.formUtils.emailPattern)]],
  username: ['', [Validators.requiredTrue, Validators.minLength(6), Validators.pattern(this.formUtils.notOnlySpacesPattern)]],
  password: ['', [Validators.requiredTrue, Validators.minLength(6)]],
  confirmPassword: ['', [Validators.requiredTrue]]
})


```

## Validaciones asíncronas
```
static async checkingServerResponse(control: AbstractControl): Promise<ValidationErrors | null>{
    console.log("Validando correo en el servidor");

    await sleep(); // esperar 2.5 medio
    
    const formValue = control.value;

    if(formValue === "hola@mundo.com"){
        return {emailTaken : true}
    }

    return null;
}

async function sleep(){
    return new Promise(resolve => {
        setTimeout(() =>{
            resolve(true);
        }, 2500);
    });
}

.....
email: ['', [Validators.required, Validators.email, Validators.pattern(this.formUtils.emailPattern)], [FormUtils.checkingServerResponse]],
```

### Validaciones síncrona
```            
case 'notStrider':
  return `No se puede usar este valor como nickName`;  

.....
username: ['', [Validators.required, Validators.minLength(6), Validators.pattern(this.formUtils.notOnlySpacesPattern), FormUtils.notStrider]],

.....
static notStrider(control: AbstractControl): ValidationErrors | null{
    console.log("Validando nickname");
    
    const formValue = control.value;

    return formValue === 'strider' ? {notStrider : true} : null;
}
```

## Selectores
```
<select formControlName="country" class="form-control">
  <option value="">-- Seleccione País --</option>

  @for (country of countriesByRegion(); track country.cca3){
  <option [value]="country.cca3">
    {{ country.name.common }}
  </option>
  }

</select>

.....
export class CountryPageComponent { 
  fb = inject(FormBuilder);
  countryService = inject(CountryService);

  regions = signal(this.countryService.regions);

  countriesByRegion = signal<Country[]>([]);
  borders = signal<Country[]>([]);

  myForm = this.fb.group({
    region: ['', Validators.required],
    country: ['', Validators.required],
    border: ['', Validators.required],
  });

  onFormChanged = effect((onCleanup) => {
    const formRegionChanged = this.onRegionChanged();

    onCleanup(() => { 
      formRegionChanged.unsubscribe();
    });
  });

  onRegionChanged(){
    return this.myForm.get('region')!.valueChanges
    .pipe(
      tap(() => this.myForm.get('country')!.setValue('')),
      tap(() => this.myForm.get('border')!.setValue('')),
      tap(() => {
        this.borders.set([]);
        this.countriesByRegion.set([]);
      }),
      switchMap(region => this.countryService.getCountriesByRegions(region! ?? '')) // transforma el observable en otro diferente
    )
    .subscribe(countries => {
      this.countriesByRegion.set(countries);
      console.log(countries);
    })
  }
}
```

## Life Cycle Hooks
Documentación: https://angular.dev/guide/components/lifecycle

## Generar environments
```
ng g environments
```
1. Crear un token: https://console.mapbox.com/account/access-tokens
2. Crear con ng g environments los envirnonments
3. Crear el archivo .env y su copia
4. Añadirlos a .gitignore para que nadie coja el token
5. En el directorio raíz crear el archivo set-envs.js dentro de la carpeta scripts
6. Instalar paquete dotenv: ```npm i -D dotenv```
7. En terminal ejecutamos ```node ./scripts/set-envs.js``` o añadir el comando en scripts de package.json y ejecutar ```npm run set-envs``` (set-envs nombre de la variable)
8. Si existe el error en cmd "[dotenv@17.2.3] injecting env (0) from ..\src\.env -- tip: 🔐 prevent committing .env to code: https://dotenvx.com/precommit", se debe
  modificar el require de env con ```require( 'dotenv' ).config({path: __dirname + './../src/.env'});```
9. Vamos a https://docs.mapbox.com/mapbox-gl-js/guides/ y copiamos para instalar ```npm install --save mapbox-gl```
10. Resultado
```
export class FullscreenMapPage implements AfterViewInit{ 
  divElement = viewChild<ElementRef>('map');

  async ngAfterViewInit(): Promise<void> {
    if(!this.divElement()?.nativeElement) return;

    await new Promise((resolve) => setTimeout(() =>resolve, 100));

    const element = this.divElement()!.nativeElement;

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9, // starting zoom
    });
  }
}

.....
<div #map></div>
```
11. ```npm i uuid``` para generar id de forma aleatoria

### Marcadores
```
// marcadores
const marker = new mapboxgl.Marker({draggable: true, color: 'red'})
  .setLngLat(this.coordinates())
  .addTo(map);

// información marcador
marker.on('dragend', (event) => {
  console.log(event);
})
```

## Construir y Desplegar
* Hacemos la construcción de la aplicación: ````ng build```
* Tenemos los siguientes problemas que vamos a solucionar:
```
▲ [WARNING] bundle initial exceeded maximum budget. Budget 500.00 kB was not met by 1.47 MB with a total of 1.97 MB.

▲ [WARNING] Module 'mapbox-gl' used by 'src/app/pages/fullscreen-map-page/fullscreen-map-page.ts' is not ESM

  CommonJS or AMD dependencies can cause optimization bailouts.
  For more information see: https://angular.dev/tools/cli/build#configuring-commonjs-dependencies

X [ERROR] bundle initial exceeded maximum budget. Budget 1.00 MB was not met by 974.33 kB with a total of 1.97 MB.
```
* Vamos a angular.json y dentro de build -> options añadimos ```"allowedCommonJsDependencies": ["mapbox-gl"],```
* Vamos a angular.json y dentro de production -> budgets -> incrementamos en 
```
"maximumWarning": "1MB",
"maximumError": "3MB"
```
* Si todo va bien está construida la carpeta dist -> nombre del proyecto -> browser
* Vamos a https://www.netlify.com/ -> Add new project -> Deploy manually -> meter toda la carpeta browser
* Proyecto subido a https://fancy-pudding-02c4fe.netlify.app/
* Añadimos HashStrategy al proyecto en app.config.ts
```
{
  provide: LocationStrategy,
  useClass: HashLocationStrategy
}
```
* Realizamos un nuevo ng build y la nueva carpeta la desplegamos en Deploy

## Path alias
Podemos simplificar las rutas, en tsconfig.json añadiendo en compilerOptions unos alias:
```
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["./src/app/*"],
      "@/auth/*": ["./src/app/auth/*"],
      "@/dashboard/*": ["./src/app/admin-dashboard/*"],
      "@/products/*": ["./src/app/products/*"],
      "@/shared/*": ["./src/app/shared/*"],
      "@/store-front/*": ["./src/app/store-front/*"],
    },
    ....
  }
```
Por esto la importación cambia la rutas y en vez del path completo muestra el alias:
```
// sin alias
import { ProductCard } from '../../../products/components/product-card';
// con alias
import { ProductCard } from '@/products/components/product-card';
```

## Carousel imagenes
https://swiperjs.com/get-started

## Paginación
```
<app-pagination [pages]="productsResource.value()?.pages ?? 0"
  [currentPage]="currentPage()" />


<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-2 gap-3" >
  @for (product of productsResource.value()?.products; track $index) {
  <product-card [product]="product" />
  }
</div>

.....

<div class="join flex justify-center items-center mt-4 mb-10">
   @for (page of getPagesList(); track page) {
     <button
       class="join-item btn"
       [class.btn-primary]="page === activePage()"
       [routerLink]="[]"
       [queryParams]="{ page: page }"
       (click)="activePage.set(page)"
     >
       {{ page }}
     </button>
   }
</div>

.....

export class HomePage { 
  productsService = inject(ProductsService);

  activatedRoute = inject(ActivatedRoute);
  currentPage = toSignal(this.activatedRoute.queryParamMap.pipe(
    map((params) => (params.get('page') ? +params.get('page')! : 1)),
    map((page) => (isNaN(page) || page < 1 ? 1 : page))
   ),
   { initialValue: 1 }
  );

  // Usando rxResource, ha cambiado de request por params y loader por stream a partir de Angular 20
  productsResource = rxResource({
    params: () => ({ page : this.currentPage() }),
    stream: ({ params }) => {
      return this.productsService.getProducts({
        offset: (params.page - 1) * 8,
        limit: 8,
      });
    }
  })
}

.....

export class Pagination { 
  pages = input<number>(0);
  currentPage = input<number>(1);

  activePage = linkedSignal(this.currentPage);

  getPagesList = computed(() => {
    return Array.from({ length: this.pages() }, (_, i) => i + 1);
  });
}
```

## Servicio de paginación
```
export class GenderPage { 
  route = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  paginationService = inject(PaginationService);
  
  gender = toSignal( this.route.params.pipe(map(({ gender }) => gender)) );

  // Usando rxResource, ha cambiado de request por params y loader por stream a partir de Angular 20
  productsResource = rxResource({
    params: () => ({gender: this.gender(), page : this.paginationService.currentPage() }),
    stream: ({ params }) => {
      return this.productsService.getProducts({
        gender: params.gender,
        offset: (params.page - 1) * 8,
        limit: 8,
      });
    }
  });
}
  .....

<app-pagination [pages]="productsResource.value()?.pages ?? 0"
  [currentPage]="paginationService.currentPage()" />  
```

## Cache servicio
```
private productsCache = new Map<string, ProductsResponse>();

getProducts(options: Options): Observable<ProductsResponse> {
  const key = `${limit}-${offset}-${gender}`;

  if (this.productsCache.has(key)) {
    return of(this.productsCache.get(key)!);
  }

  .....
```