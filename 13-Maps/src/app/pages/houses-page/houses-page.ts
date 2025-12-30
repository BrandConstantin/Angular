import { Component, signal } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { MiniMap } from '../../maps/mini-map/mini-map';

interface HouseProperty {
  id: string;
  name: string;
  description: string;
  price: number;
  lngLat: { lng: number; lat: number };
  tags: string[];
}

@Component({
  selector: 'app-houses-page',
  imports: [MiniMap],
  templateUrl: './houses-page.html',
})
export class HousesPage { 
  houses = signal<HouseProperty[]>([
    {
      id: uuid(),
      name: 'Villa Serenidad',
      description:
        'Un refugio tranquilo con vistas panorámicas al mar y jardines exuberantes.',
      price: 500_000,
      lngLat: { lat: 36.7052, lng: -4.4319 },
      tags: ['Villa', 'Mar', 'Jardines'],
    },
    {
      id: uuid(),
      name: 'Casa del Sol',
      description:
        'Una casa luminosa y acogedora con amplias terrazas y piscina privada.',
      price: 750_000,
      lngLat: {lat: 36.7082, lng: -4.4332 },
      tags: ['Casa', 'Sol', 'Terrazas'],
    },
    {
      id: uuid(),
      name: 'Residencia Esmeralda',
      description:
        'Elegante propiedad con acabados de lujo y un diseño arquitectónico moderno.',
      price: 1_200_000,
      lngLat: { lat: 36.7252, lng: -4.4519 },
      tags: ['Casa', 'Esmeralda', 'Acabados'],
    },
    {
      id: uuid(),
      name: 'Hacienda del Lago',
      description:
        'Encantadora hacienda con acceso directo al lago y un entorno natural impresionante.',
      price: 950_000,
      lngLat: { lat: 36.7452, lng: -4.4377 },
      tags: ['Casa', 'Lago', 'Hacienda'],
    },
  ]);
}
