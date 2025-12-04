import { AfterViewInit, Component, ElementRef, input, viewChild } from '@angular/core';
import mapboxgl, { LngLatLike } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { environment } from '../../../environments/environment.development';

mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-mini-map',
  imports: [],
  templateUrl: './mini-map.html',
})
export class MiniMap implements AfterViewInit{
  divElement = viewChild<ElementRef>('map');
  lngLat = input.required<{lng: number, lat: number}>();
  zoom = input<number>(14);
  
 async ngAfterViewInit(): Promise<void> {
        if(!this.divElement()?.nativeElement) return;

    //await new Promise((resolve) => setTimeout(() =>resolve, 80));

    const element = this.divElement()!.nativeElement;

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat(), // starting position [lng, lat]
      zoom: this.zoom(), // starting zoom
      interactive: false
    });

    // marcadores
    const marker = new mapboxgl.Marker({}).setLngLat(this.lngLat()).addTo(map);
  }
}
