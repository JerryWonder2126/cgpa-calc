import { Injectable } from '@angular/core';
import { CourseItem } from './shared/models/course-item';
import { ICourseItem } from './shared/interface/course-item.interface';
import { IFormItem } from './shared/interface/form-item.interface.';
import { FormItem } from './shared/models/form-item';

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

  taken_names = () => {
    let names: string[] = [];
    this._courses.forEach((course) => {
      names.push(course.code);
    });
    return names;
  }

  add(formItem: IFormItem): void {
    let newCourse: ICourseItem = {id: this.nextID(), ...formItem};
    this._courses.push(newCourse);
    this.save();
  }

  update(id: number, updatedItem: FormItem): boolean{
    let courseItem = this.getCourseById(id) ? {id, ...updatedItem} : false;
    if(courseItem) {
      this._courses = this._courses.map((course) => {
        if((course.id === id) && (this.taken_names().indexOf(updatedItem.code) === -1)) {
            course = {id, ...updatedItem};
        }
        return course;
      });
      return this.save();
    }else{
      return false;
    }
  }

  delete(id: number) {
    let itemToDelete = this.getCourseById(id);
    if(!itemToDelete) {
      return false;
    }
    let index = this._courses.indexOf(itemToDelete);
    this._courses.splice(index, 1);
    return this.save();
  }

  getCourseById(id: number) {
    return this._courses.find((course) => course.id === id);
  }

  getCourseByCode(code: string) {
    return this._courses.find((course) => course.code === code);
  }

  save() {
    let stringified_courses = JSON.stringify(this._courses);
    window.localStorage.setItem('courses', stringified_courses);
    return true;
  }

  reset() {
    this._courses = [];
    this.save();
  }
}
