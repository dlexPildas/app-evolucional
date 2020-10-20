import { BaseModel } from '../../shared/models/base.model';
import { StudentModel } from '../../shared/models/student.model';
import { BackendService } from '../../core/services/backend.service';
import { Component, OnInit } from '@angular/core';
import { FiltersModel } from 'src/app/shared/models/filters.model';
import { MatDialog } from '@angular/material/dialog';
import { FormStudentComponent } from './form/form-student.component';
import { PageResponse } from 'src/app/shared/models/page-response.model';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  students: StudentModel[];
  classes: BaseModel[];
  degrees: BaseModel[];

  pageResponse: PageResponse;
  pageActual = 1;
  totalPages = 0;

  nameClasses: string[] = [];
  studentsPerClasses: number[] = [];

  filters: FiltersModel;

  constructor(
    public dialog: MatDialog,
    private backendService: BackendService
  ) {
    this.filters = new FiltersModel();
    this.pageResponse = new PageResponse();
  }

  ngOnInit(): void {
    this.getStudents();
    this.getClasses();
    this.getDegrees();
    this.getNameClassesToChart();
    this.getStudentsPerClasses();
  }

  getClasses(): void {
    this.classes = this.backendService.getClasses();
    this.classes.unshift({ id: 0, name: 'Todos' } as BaseModel);
  }

  getDegrees(): void {
    this.degrees = this.backendService.getDegrees();
    this.degrees.unshift({ id: 0, name: 'Todos' } as BaseModel);
  }

  getStudents(pageActual: number = 1): void {
    this.pageResponse = this.backendService.getStudents(this.filters, pageActual);
    // this.totalPages = this.students.length;
  }

  openFormStudent(id?: number): void {
    this.dialog.open(FormStudentComponent, {
      width: '500px',
      data: { studentId: id },
    })
      .afterClosed().subscribe(() => {
        this.getStudents();
        this.getNameClassesToChart();
        this.getStudentsPerClasses();
      });
  }

  getNameClassesToChart(): void {
    this.nameClasses = this.backendService.getNameClasses();
  }

  getStudentsPerClasses(): void {
    this.studentsPerClasses = this.backendService.getTest();
  }

  generateRadomStudents(event: Event): void {
    event.stopPropagation();
    this.backendService.generateRandomStudents();
    this.getStudents();
    this.getNameClassesToChart();
    this.getStudentsPerClasses();
  }



}
