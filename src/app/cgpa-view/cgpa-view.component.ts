import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { CourseService } from '../course.service';

@Component({
  selector: 'app-cgpa-view',
  templateUrl: './cgpa-view.component.html',
  styleUrls: ['./cgpa-view.component.scss']
})
export class CgpaViewComponent implements OnInit {

  @Input() cgpaScale!: string;
  @Output() scaleChange: EventEmitter<string> = new EventEmitter<string>();
  @Input() cgpa!: number; 
  @Input() gradeRange!: string;

  constructor(private courseService: CourseService) { }

  ngOnInit(): void { }

  

  changeScale(scale: MatButtonToggleChange) {
    this.cgpaScale = scale.value;
    this.scaleChange.emit(this.cgpaScale);
  }

}
