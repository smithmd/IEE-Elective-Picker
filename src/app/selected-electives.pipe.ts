import {Pipe, PipeTransform} from '@angular/core';
import {Elective} from "./classes/elective";

@Pipe({
  name: 'selectedElectives'
})
export class SelectedElectivesPipe implements PipeTransform {

  transform(electives: Elective[], type: String): Elective[] {
    return electives.filter(elective => {
      if (type === 'primary') {
        return elective.isPrimary;
      }
      if (type === 'alternate') {
        return elective.isAlternate;
      }
      return false;
    });
  }

}
