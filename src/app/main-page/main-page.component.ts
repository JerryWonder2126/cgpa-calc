import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataSource } from "@angular/cdk/collections";
import { Observable, ReplaySubject } from 'rxjs';
import { CourseService } from '../course.service';
import { CourseItem } from '../shared/models/course-item';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  courseList!: CourseItem[];
  cgpaScale: string = 'four';
  cgpa!: number;
  gradeRange: string = 'pass';
  
  private WEIGHT = {
    four: {
      scale: 4,
      weight: { seventy: 4, sixty: 3, fifty: 2, forty_five: 1}
    },
    five: {
      scale: 5,
      weight: { seventy: 5,   sixty: 4, fifty: 3, fourty_five: 2, forty: 1}
    },
    seven: {
      scale: 7,
      weight: { seventy: 7, sixty_five: 6,  sixty: 5, fifty_five: 4, fifty: 3, fourty_five: 2, forty: 1}
    }
  }

  RANGES = {
    four: [[3.5, 'first class'], [3.0, 'second class upper'], [2.0, 'second class lower'], [1.0, 'third class']],
    five: [[4.5, 'first class'], [3.5, 'second class upper'], [2.5, 'second class lower'], [1.5, 'third class']],
    seven: [[6.0, 'first class'], [3.5, 'second class upper'], [2.4, 'second class lower'], [1.5, 'third class']],
  }

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.courseService.loadAll();
    this.courseList = this.courseService.courses;
    this.updateCGPA();
  }
  
  refreshCourseList() {
    this.courseList = this.courseService.courses;
    this.updateCGPA();
  }

  weight() {
    if(this.cgpaScale === 'four') {
      return this.WEIGHT['four'];
    }else if(this.cgpaScale === 'five'){
      return this.WEIGHT['five'];
    }else{
      return this.WEIGHT['seven'];
    }
  }

  getScoreString(weight: any, score: number): any {
    if(score >= 70) return weight.seventy;
    else if(score >= 65 && weight.sixty_five) return weight.sixty_five;
    else if(score >= 60) return weight.sixty;
    else if(score >= 55 && weight.fifty_five) return weight.fifty_five;
    else if(score >= 50) return weight.fifty;
    else if(score >= 45 && weight.forty_five) return weight.forty_five;
    else if(score >= 40 && weight.forty) return weight.forty;
    else return 0;
  }

  calculate() {
    let totalWeight: number = 0;
    let totalUnit: number = 0;
    let weight = this.weight();
    let setScore: number;
    
    if(this.courseList.length) {
      this.courseList.forEach((course) => {
        totalUnit += course.unit;
        setScore = this.getScoreString(weight.weight, course.grade);
        totalWeight += course.unit * setScore;
      });
    }
    let cgpa = totalWeight/totalUnit;
    return cgpa ? Number(cgpa.toPrecision(3)) : 0;
  }

  updateCGPA() {
    this.cgpa = this.calculate();
    this.setGradeRange(this.cgpa);
  }

  changeScale(scale: any) {
    this.cgpaScale = scale;
    this.updateCGPA();
  }

  clearCourseList() {
    this.courseService.reset();
    this.refreshCourseList();
  }

  getRange() {
    if(this.cgpaScale === 'four') {
      return this.RANGES.four;
    }else if(this.cgpaScale === 'five') {
      return this.RANGES.five;
    }else if(this.cgpaScale === 'seven') {
      return this.RANGES.seven;
    }else{
      return '';
    }
  }

  setGradeRange(cgpa: number) {
    let range: any = this.getRange();
    range = new Array(...range);
    range.some((element: any) => {
      if(cgpa >= element[0]) {
        this.gradeRange = element[1];
        return true;
      }
      return false;
    });
  }

}