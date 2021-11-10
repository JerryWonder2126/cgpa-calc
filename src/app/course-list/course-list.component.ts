import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { ICourseItem } from '../shared/interface/course-item.interface';
import { CourseItem } from '../shared/models/course-item';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {

  courseList!: ICourseItem[];

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseList = this.courseService.courses;
  }

  deleteCourse(course: CourseItem) {
    console.log('jh');
    this.courseService.delete(course);
    this.courseList = this.courseService.courses;
  }

}
