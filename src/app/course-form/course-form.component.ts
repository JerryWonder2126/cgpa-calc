import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { CourseService } from '../course.service';
import { IFormItem } from '../shared/interface/form-item.interface.';
import { FormItem } from '../shared/models/form-item';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  @Input() formItem!: IFormItem;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.formItem = new FormItem('', 1, 0);
  }

  coureCodeExists(courseCode: string): boolean {
    let exists = this.courseService.courses.find((course) => course.code === courseCode)
    return exists ? true : false;
  }

  onSubmit(form: NgForm) {
    let new_course_item: FormItem = form.value;
    if (!this.coureCodeExists(new_course_item.code)){
      this.courseService.add(new_course_item);
      form.reset();
    }
  }

}
