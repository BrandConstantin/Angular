import { Pipe, PipeTransform } from '@angular/core';
import { Creator } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroCreator',
})
export class heroCreatorPipe implements PipeTransform{

  transform(creator: Creator): string {
    //return Creator[creator];
    return creator === Creator.DC ? 'DC' : 'Marvel';
  }

}