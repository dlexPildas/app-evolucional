import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatTooltipModule} from '@angular/material/tooltip';

import { ChartModule } from 'angular2-chartjs';

import { ChartComponent } from './components/chart/chart.component';
import { PaginatorComponent } from './components/paginator/paginator.component';


@NgModule({
  declarations: [
    ChartComponent,
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    ChartModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatTooltipModule
  ],
  exports: [
    FormsModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    ChartModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    ReactiveFormsModule,
    ChartComponent,
    PaginatorComponent
  ]
})
export class SharedModule { }
