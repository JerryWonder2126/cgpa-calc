import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CourseItem } from 'src/app/shared/models/course-item';

@Component({
  selector: 'app-course-item-card',
  templateUrl: './course-item-card.component.html',
  styleUrls: ['./course-item-card.component.scss']
})
export class CourseItemCardComponent implements OnInit {

  @Input() course!: CourseItem;
  isActive:boolean = false;
  @Output() xButtonClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  hd(){
    console.log('button clicked');
    
  }

}
