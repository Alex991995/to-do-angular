import { Pipe, PipeTransform } from '@angular/core';
import { ITask } from '@interface/index';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(tasks: ITask[], value: string): ITask[] {
    if (value) {
      return tasks.filter((item) => item.todo.startsWith(value));
    } else {
      return tasks;
    }
  }
}
