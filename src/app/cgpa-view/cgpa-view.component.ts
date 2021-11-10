import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-cgpa-view',
  templateUrl: './cgpa-view.component.html',
  styleUrls: ['./cgpa-view.component.scss']
})
export class CgpaViewComponent implements OnInit, OnChanges {

  @Input() cgpaScale!: string;
  @Output() scaleChange: EventEmitter<string> = new EventEmitter<string>();
  cgpa!: number;
  private WEIGHT = {
    four: {
      scale: 4,
      weight: { seventy: 4, sixty: 3, fifty: 2, forty_five: 1}
    },
    five: {
      scale: 5,
      weight: { seventy: 4, sixty: 3, fifty: 2, forty: 1}
    },
    seven: {
      scale: 7,
      weight: { seventy: 7, sixty_five: 6,  sixty: 5, fifty_five: 4, fifty: 3, fourty_five: 2, forty: 1}
    }
  }
  

  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    this.updateCGPA();
  }

  updateCGPA() {
    this.cgpa = this.calculate();
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
    let courses = this.courseService.courses;
    if(courses.length) {
      courses.forEach((course) => {
        totalUnit += course.unit;
        setScore = this.getScoreString(weight.weight, course.grade);
        totalWeight += course.unit * setScore;
        // console.log(weight.scale * setScore);
        
      });
    }
    let cgpa = totalWeight/totalUnit;
    console.log(cgpa);
    // return Math.floor(totalWeight/totalUnit);
    return cgpa ? Number(cgpa.toPrecision(3)) : 0;
  }

  changeScale(scale: MatButtonToggleChange) {
    this.cgpaScale = scale.value;
    this.scaleChange.emit(scale.value);
  }

}
