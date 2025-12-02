import { Component, ElementRef, signal, viewChild } from '@angular/core';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
import { environment } from '../../../environments/environment.development';
import { v4 as UUIDv4 } from 'uuid';

mapboxgl.accessToken = environment.mapboxKey;

interface Marker {
  id: string;
  mapboxMarker: mapboxgl.Marker;
}

@Component({
  selector: 'app-dinamic-marker-page',
  standalone: true,
  imports: [],
  templateUrl: './dinamic-marker-page.html',
})
export class DinamicMarkerPage { 
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
    const marker = new mapboxgl.Marker({draggable: false, color: 'green'})
      .setLngLat(this.coordinates())
      .addTo(map);

    // información marcador
    marker.on('dragend', (event) => {
      console.log(event);
    })

    this.mapListener(map);
  }

  mapListener(map: mapboxgl.Map){
    map.on('click', (event) => this.mapClick(event));
    this.map.set(map);
  }

  mapClick(event: mapboxgl.MapMouseEvent){
    if(!this.map()) return;
    const map = this.map()!;

    const color = '#f54f23'.replace(/x/g, (y) => ((Math.random() * 16) | 0).toString(16));

    console.log(event.lngLat);

    const mapboxMarker = new mapboxgl.Marker({draggable: false, color: color})
      .setLngLat(event.lngLat)
      .addTo(map);

    const newMarker: Marker = {
      id: UUIDv4(),
      mapboxMarker: mapboxMarker,
    };

    this.markers.update((markers) => [newMarker, ...markers]);
  }
}
