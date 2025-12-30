import { AfterViewInit, Component, ElementRef, inject, viewChild } from '@angular/core';
import { GifService } from '../../services/gifs.service';
import { ScrollStateService } from 'src/app/shared/scroll-state.service';

/*
const imageUrls: string[] = [
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-6.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-7.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-8.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-9.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-10.jpg",
  "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-11.jpg"
];
*/

@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if(!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollPosition();
  }
  //gifs = signal(imageUrls);

  gifService = inject(GifService);
  scrollStateService = inject(ScrollStateService);

  // viewChildren obtiene todos los elementos del DOM que coinciden con el selector
  // viewChild obtiene el primer elemento del DOM que coincide con el selector
  //scrollDivRef = viewChildren('groupDiv');
  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  onScroll(event: Event){
    const scrollDiv = this.scrollDivRef()?.nativeElement;

    if(!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop; //px antes de llegar al final
    const clientHeight = scrollDiv.clientHeight; //px visibles
    const scrollHeight = scrollDiv.scrollHeight; //px totales

    //console.log({scrollTop, clientHeight, scrollHeight});

    const isFinalScrolled = scrollTop + clientHeight + 300 >= scrollHeight;
    this.scrollStateService.trendingScrollPosition.set(scrollTop); // guardar la posicion del scroll, no recomendado hacerlo en cada pixel

    //debugger;
    if(isFinalScrolled){
      //console.log('llegaste al final del scroll');
      this.gifService.loadTrendingGifs();
    } 
  }
}
