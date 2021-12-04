import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CourseModalComponent } from '../course-modal/course-modal.component';
import { CourseService } from '../course.service';
import { ICourseItem } from '../shared/interface/course-item.interface';
import { CourseItem } from '../shared/models/course-item';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  @Input() courseList!: ICourseItem[];
  @Output() onUpdate: EventEmitter<any> = new EventEmitter<any>();
  @Output() clear: EventEmitter<any> = new EventEmitter<any>();

  constructor(private courseService: CourseService, public dialog: MatDialog) { }

  ngOnInit(): void { }

  deleteCourse(course: CourseItem) {
    this.courseService.delete(course.id);
    this.updateCourseList();
  }

  updateCourseList() {
    this.onUpdate.emit();
  }

  courseClicked(course: CourseItem) {
    let dialogRef = this.dialog.open(CourseModalComponent, {
      data: course,
    });

    dialogRef.afterClosed().subscribe(() => { 
      this.updateCourseList();
    });

  }

}
