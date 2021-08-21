import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'testTry'
})
export class TestTryPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
