import { Pipe } from '@angular/core';

@Pipe({
  name: 'canFly',
})
export class CanFlyPipe {
  transform(fly: boolean): string {
    return fly ? 'puede volar' : 'no puede volar';
  }
}