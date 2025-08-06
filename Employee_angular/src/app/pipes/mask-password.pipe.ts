import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'maskPassword'
})
export class MaskPasswordPipe {
  // export class MaskPasswordPipe implements PipeTransform {

  // First Sinario
  // transform(pass: string): string {
  //   const size = pass.length;
  //   let maskedPass = '';
  //   for (let i = 0; i < size; i++) {
  //     maskedPass = maskedPass + "*";
  //   }
  //   return maskedPass;
  // }

  // Second Sinario
  // transform(pass: string): string {
  //   const last2 = pass.slice(pass.length - 2, pass.length);
  //   console.log(last2);

  //   const size = pass.length - 2;
  //   let maskedPass = '';
  //   for (let i = 0; i < size; i++) {
  //     maskedPass = maskedPass + "*";
  //   }
  //   maskedPass += last2;
  //   return maskedPass;
  // }
}
