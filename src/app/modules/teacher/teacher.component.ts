import { Component, OnInit } from '@angular/core';

import { BackendService } from 'src/app/core/services/backend.service';
import { BaseModel } from 'src/app/shared/models/base.model';
import { FiltersModel } from 'src/app/shared/models/filters.model';

@Component({
  selector: 'app-teacher',
  templateUrl: './teacher.component.html',
  styleUrls: ['./teacher.component.css']
})
export class TeacherComponent implements OnInit {
  filters: FiltersModel;
  classes: BaseModel[];
  degrees: BaseModel[];

  constructor(
    private backendService: BackendService
  ) {
    this.filters = new FiltersModel();
   }

  ngOnInit(): void {
    this.getClasses();
    this.getDegrees();
  }

  getClasses(): void {
    this.classes = this.backendService.getClasses();
    this.classes.unshift({ id: 0, name: 'Todos' } as BaseModel);
  }

  getDegrees(): void {
    this.degrees = this.backendService.getDegrees();
    this.degrees.unshift({ id: 0, name: 'Todos' } as BaseModel);
  }

}
