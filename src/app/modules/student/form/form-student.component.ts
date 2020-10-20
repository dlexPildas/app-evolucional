import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { StudentModel } from './../../../shared/models/student.model';
import { BackendService } from './../../../core/services/backend.service';
import { BaseModel } from 'src/app/shared/models/base.model';

@Component({
  selector: 'app-form-student',
  templateUrl: './form-student.component.html',
  styleUrls: ['./form-student.component.css']
})
export class FormStudentComponent implements OnInit {
  studentId: number;
  student: StudentModel;
  classes: BaseModel[];
  chart: any;


  studentForm = new FormGroup({
    name: new FormControl(null, Validators.required),
    classId: new FormControl(null, Validators.required)
  });

  constructor(
    public dialogRef: MatDialogRef<FormStudentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private backendService: BackendService
  ) {
    this.studentId = data.studentId as number;
  }

  ngOnInit(): void {
    this.getStudent();
    this.initializeForm();
    this.getClasses();
  }

  initializeForm(): void {
    this.studentForm.get('name').valueChanges.subscribe(value => this.student.name = value );
    this.studentForm.get('classId').valueChanges.subscribe(value => this.student.classId = +value );
  }

  getClasses(): void {
    this.classes = this.backendService.getClasses();
  }

  getStudent(): void {
    this.student = this.backendService.getStudentById(this.studentId);
    this.studentForm.patchValue({name: this.student.name});
    this.studentForm.patchValue({classId: this.student.classId});
  }

  saveStudent(): void {
    this.backendService.saveStudent(this.student);
    this.dialogRef.close();
  }


}
