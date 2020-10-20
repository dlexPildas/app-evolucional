import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {
  @Input() pageActual = 1;
  @Input() totalPages = 1;
  @Output() getStudent = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }

  advance(): void{
    if (this.pageActual === this.totalPages) {
      return;
    }
    this.pageActual++;
    this.getStudents();
  }

  back(): void {
    if (this.pageActual === 1) {
      return;
    }
    this.pageActual--;
    this.getStudents();
  }

  getStudents() {
    return this.getStudent.emit(this.pageActual);
  }

}
