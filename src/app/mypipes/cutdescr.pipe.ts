import { Pipe, PipeTransform } from '@angular/core';

// fichier créé avec ng g pipe curdescr

@Pipe({
  name: 'cutdescr'
})
export class CutdescrPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value.substring(0,200)+'...';
  }

}
