import { Component, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges, ViewChild } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit, OnChanges {
  @Input() labels: string[] = [];
  @Input() datas: number[] = [];

  isUpdating = false;

  type = 'bar';
  data = {
    labels: this.labels,
    datasets: [
      {
        label: 'Students',
        data: this.datas,
        backgroundColor: '#7159c1',
      }
    ]
  };
  options = {
    responsive: true,
  };

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.isUpdating = true;
    this.data.datasets[0].data = this.datas;
    this.data.labels = this.labels;

    setTimeout(() => {
      this.isUpdating = false;
    }, 500);
  }
}
