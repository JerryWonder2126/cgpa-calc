import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CourseModalComponent } from '../course-modal/course-modal.component';
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
  @Input() id!: number;
  @Input() dialogRef!: MatDialogRef<CourseModalComponent>;
  isNew: boolean = true;
  @Output() onAlter: EventEmitter<any> = new EventEmitter<any>();

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    if(!this.formItem) {
      this.formItem = new FormItem('', 1, 0);
    }else{
      this.isNew = false;
    }
  }

  courseCodeExists(courseCode: string): boolean {
    let exists = this.courseService.courses.find((course) => course.code === courseCode)
    return exists ? true : false;
  }

  onSubmit(form: NgForm) {
    let form_item: FormItem = form.value;
    if(this.isNew) {
      if (!this.courseCodeExists(form_item.code)){
        this.courseService.add(form_item);
        form.reset();
      }
    }else{
      this.courseService.update(this.id, form_item);
      this.dialogRef.close();
    }
    this.onAlter.emit();
  }

}
