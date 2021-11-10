import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataSource } from "@angular/cdk/collections";
import { Observable, ReplaySubject } from 'rxjs';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  displayedColumns: string[] = ['position', 'course title', 'grade'];
  dataToDisplay = [...ELEMENT_DATA];

  dataSource = new ExampleDataSource(this.dataToDisplay);

  cgpaScale!: string;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.loadAll();
    this.cgpaScale = 'four';
  }

  updateScale = (updatedScale: string) => {
    this.cgpaScale = updatedScale;
  };

}

export interface PeriodicElement {
  title: string;
  position: number;
  grade: number;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, title: 'Hydrogen', grade: 1.0079},
  {position: 2, title: 'Helium', grade: 4.0026},
  {position: 3, title: 'Metrology Mechanical Laboratory Studies', grade: 6.941},
  {position: 4, title: 'Beryllium', grade: 9.0122},
  {position: 5, title: 'Boron', grade: 10.811},
  {position: 6, title: 'Carbon', grade: 12.0107},
  {position: 7, title: 'Nitrogen', grade: 14.0067},
  {position: 8, title: 'Oxygen', grade: 15.9994},
  {position: 9, title: 'Fluorine', grade: 18.9984},
];

class ExampleDataSource extends DataSource<PeriodicElement> {
  private _dataStream = new ReplaySubject<PeriodicElement[]>();

  constructor(initialData: PeriodicElement[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<PeriodicElement[]> {
    return this._dataStream;
  }

  disconnect() {}

  setData(data: PeriodicElement[]) {
    this._dataStream.next(data);
  }
}
