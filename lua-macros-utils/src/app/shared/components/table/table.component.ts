import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

/**
 * columnsSchema must contain an element on the last position like
 * {
      key: 'isEdit',
      type: 'isEdit',
      label: '',
    },
 */
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent<T, U> implements AfterViewInit {
  @Input() dataSource!: MatTableDataSource<T>;
  @Input() columnsSchema!: {
    key: string;
    type: string;
    label: string;
  }[];
  @Input() selectValuesByColumn!: Map<string, U[]>;
  @Input() showAddButton: boolean = true;
  @Input() showEditButton: boolean = true;
  @Input() showDeleteButton: boolean = true;

  @Output() addRowEmitter = new EventEmitter<unknown>();
  @Output() dataChange = new EventEmitter<unknown>();
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  get displayedColumns() {
    return this.columnsSchema.map((e) => e.key);
  }

  constructor() {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  addRow() {
    this.addRowEmitter.emit();
  }

  deleteElement(element: T): void {
    const index = this.dataSource.data.indexOf(element, 0);
    if (index > -1) {
      this.dataSource.data.splice(index, 1);
    }
    this.dataSource.data = [...this.dataSource.data];
    this.dataChangeEmitter();
  }

  dataChangeEmitter(): void {
    this.dataChange.emit();
  }
}
