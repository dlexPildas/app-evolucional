import { BaseModel } from './../../shared/models/base.model';
import { FiltersModel } from './../../shared/models/filters.model';
import { StudentModel } from './../../shared/models/student.model';
import { Injectable } from '@angular/core';
import { PageResponse } from 'src/app/shared/models/page-response.model';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  students: StudentModel[];
  classes: BaseModel[];
  degrees: BaseModel[];

  constructor() {
    this.students = [
      {
        id: 1,
        ra: 12346,
        name: 'Nome do aluno 1',
        degreeId: 1,
        classId: 1
      },
      {
        id: 2,
        ra: 456798,
        name: 'Nome do aluno 2',
        degreeId: 2,
        classId: 1
      },
      {
        id: 3,
        ra: 752156,
        name: 'Nome do aluno 3',
        degreeId: 3,
        classId: 2
      },
      {
        id: 4,
        ra: 852348,
        name: 'Nome do aluno 4',
        degreeId: 4,
        classId: 2
      },
      {
        id: 5,
        ra: 454643,
        name: 'Nome do aluno 5',
        degreeId: 6,
        classId: 2
      }
    ];
    this.classes = [
      { id: 1, name: 'A' },
      { id: 2, name: 'B' },
      { id: 3, name: 'C' },
      { id: 4, name: 'D' },
      { id: 5, name: 'E' },
      { id: 6, name: 'F' }
    ];
    this.degrees = [
      {
        id: 1,
        name: 'Ensino Fundamental'
      },
      {
        id: 2,
        name: '1° ano do ensino médio'
      },
      {
        id: 3,
        name: '2° ano ensino médio'
      },
      {
        id: 4,
        name: '3° ano do ensino médio'
      },
      {
        id: 5,
        name: 'Cursinho'
      },
      {
        id: 8,
        name: '4º ano do ensino fundamental'
      },
      {
        id: 9,
        name: '5º ano do ensino fundamental'
      },
      {
        id: 10,
        name: '6º ano do ensino fundamental'
      },
      {
        id: 11,
        name: '7º ano do ensino fundamental'
      },
      {
        id: 12,
        name: '8º ano do ensino fundamental'
      },
      {
        id: 13,
        name: '9º ano do ensino fundamental'
      },
      {
        id: 6,
        name: 'Estudo em casa'
      },
      {
        id: 7,
        name: 'Outros'
      }
    ];
  }

  saveStudent(data: StudentModel): void {
    this.students = this.students.filter(student => student.id !== data.id);
    this.students.push(data);
  }

  getStudents(filtersModel: FiltersModel, pageActual: number = 1): PageResponse {

    if (+filtersModel.classId && +filtersModel.degreeId) {
      const students = this.students.filter(student =>
        student.classId === +filtersModel?.classId && student.degreeId === +filtersModel?.degreeId
      );
      return this.paginator(students, pageActual);
    }

    if (+filtersModel.classId) {
      const students = this.students.filter(student =>
        student.classId === +filtersModel?.classId
      );
      return this.paginator(students, pageActual);
    }

    if (+filtersModel.degreeId) {
      const students = this.students.filter(student =>
        student.degreeId === +filtersModel?.degreeId
      );
      return this.paginator(students, pageActual);
    }

    return this.paginator(this.students, pageActual);
  }

  getStudentById(id): StudentModel {
    const STUDENT = this.students.find(student => student.id === id);
    return STUDENT;
  }

  getClasses(): BaseModel[] {
    return Object.assign([], this.classes);
  }

  getNameClasses(): string[] {
    const nameClasses = this.classes.map(student => student.name);
    return nameClasses;
  }

  getTest(): number[] {
    let data = 0;
    const datas = [];
    this.classes.map(classToStudent => {
      this.students.map(student => {
        if (classToStudent.id === student.classId) {
          data++;
        }
      });
      datas.push(data);
      data = 0;
    });

    return datas;
  }

  getDegrees(): BaseModel[] {
    return Object.assign([], this.degrees);
  }

  generateRandomStudents(): void {
    for (let index = 0; index < 300; index++) {
      this.students.push({
        classId: this.classes[this.getRandomInt(this.classes.length)].id,
        id: index,
        degreeId: this.degrees[this.getRandomInt(this.degrees.length - 1)].id,
        ra: this.getRandomInt(54354, 44444),
        name: `Aluno ${index}`
      } as StudentModel);
    }
  }

  private getRandomInt(max: number, min: number = 0): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  private paginator(items: any[], pageActual: number, limitItems: number = 10): any {
    const result = [];
    const totalPage = Math.ceil(items.length / limitItems);
    let count = (pageActual * limitItems) - limitItems;
    const delimiter = count + limitItems;

    if (pageActual <= totalPage) {
      for (let i = count; i < delimiter; i++) {
        if (items[i] != null) {
          result.push(items[i]);
        }
        count++;
      }
    }

    return {
      items: result,
      totalPages: totalPage
    } as PageResponse;
  }
}
