import { Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl, { Marker } from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { environment } from '../../../environments/environment.development';

mapboxgl.accessToken = environment.mapboxKey;

@Component({
  selector: 'app-marker-page',
  standalone: true,
  imports: [],
  templateUrl: './marker-page.html',
})
export class MarkerPage { 
  divElement = viewChild<ElementRef>('map');
  map = signal<mapboxgl.Map | null>(null);
  zoom = signal(15);
  markers = signal<Marker[]>([]);
  coordinates = signal({
    lat: 36.7052,
    lng: -4.4319
  });

  async ngAfterViewInit(): Promise<void> {
    if(!this.divElement()?.nativeElement) return;

    //await new Promise((resolve) => setTimeout(() =>resolve, 80));

    const element = this.divElement()!.nativeElement;
    const {lat, lng} = this.coordinates(); 

    const map = new mapboxgl.Map({
      container: element, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [lng, lat], // starting position [lng, lat]
      zoom: this.zoom(), // starting zoom
    });

    // marcadores
    const marker = new mapboxgl.Marker({draggable: true, color: 'red'})
      .setLngLat(this.coordinates())
      .addTo(map);
  }
}
