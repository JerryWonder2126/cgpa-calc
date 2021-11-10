import { Injectable } from '@angular/core';
import { CourseItem } from './shared/models/course-item';
import { ICourseItem } from './shared/interface/course-item.interface';
import { IFormItem } from './shared/interface/form-item.interface.';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private _courses: ICourseItem[] = [];

  constructor() { }

  nextID = (): number => this._courses.length;

  loadAll(): void {
    let courses = window.localStorage.getItem('courses');
    if(courses) {
      let parsed_courses: ICourseItem[] = JSON.parse(courses);
      this._courses = parsed_courses;
    }else{
      this._courses = [];
    }
  }

  get courses() {
    return this._courses;
  }

  add(formItem: IFormItem): void {
    let newCourse: ICourseItem = new CourseItem(this.nextID(), formItem.code, formItem.unit, formItem.grade)
    this._courses.push(newCourse);
    this.save();
  }

  private courseExists(courseItem: CourseItem) {
    return this._courses.find((value) => value.id === courseItem.id);
  }

  update(updatedItem: CourseItem): boolean{
    let courseItem = this.courseExists(updatedItem) ? updatedItem : false;
    return courseItem ? this.save() : courseItem;
  }

  delete(courseItem: CourseItem) {
    let itemToDelete = this.courseExists(courseItem);
    if(!itemToDelete) {
      return false;
    }
    let index = this._courses.indexOf(itemToDelete);
    this._courses.splice(index, 1);
    return this.save();
  }

  save() {
    let stringified_courses = JSON.stringify(this._courses);
    window.localStorage.setItem('courses', stringified_courses);
    return true;
  }
}
