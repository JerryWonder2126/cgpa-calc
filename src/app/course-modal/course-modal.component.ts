import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICourseItem } from '../shared/interface/course-item.interface';
import { IFormItem } from '../shared/interface/form-item.interface.';
import { CourseItem } from '../shared/models/course-item';
import { FormItem } from '../shared/models/form-item';

@Component({
  selector: 'app-course-modal',
  templateUrl: './course-modal.component.html',
  styleUrls: ['./course-modal.component.scss']
})
export class CourseModalComponent implements OnInit {
  formItem!: IFormItem;

  constructor(public dialogRef: MatDialogRef<CourseModalComponent>, @Inject(MAT_DIALOG_DATA) public data: ICourseItem) { }

  ngOnInit(): void {
    this.formItem = new FormItem(this.data.code, this.data.unit, this.data.grade);
  }

  save() {
    this.dialogRef.close('Saved');
  }

  close() {
      this.dialogRef.close();
  }

}
