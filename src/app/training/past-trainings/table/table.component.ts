import { Component, OnInit, ViewChild, Input, OnChanges } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { Exercise } from '../../exercise.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, OnChanges {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() exercises: Exercise[];

  // dataSource: TableDataSource;
  dataSource: MatTableDataSource<Exercise>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'duration', 'calories', 'date', 'state'];

  ngOnInit() {
    this.dataSource = new MatTableDataSource(this.exercises);
  }

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.exercises);
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
