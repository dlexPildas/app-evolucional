import { BaseModel } from './base.model';
export class FiltersModel {
  degreeId?: number;
  classId?: number;

  constructor() {
    this.classId = 0;
    this.degreeId = 0;
  }
}
