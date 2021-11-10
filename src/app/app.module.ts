import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialComponentsModule } from './material-components/material-components.module';
import { CourseFormComponent } from './course-form/course-form.component';
import { CourseListComponent } from './course-list/course-list.component';
import { CgpaViewComponent } from './cgpa-view/cgpa-view.component';
import { FormsModule } from '@angular/forms';
import { CourseItemCardComponent } from './course-list/course-item-card/course-item-card.component';
import { CourseModalComponent } from './course-modal/course-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CourseFormComponent,
    CourseListComponent,
    CgpaViewComponent,
    CourseItemCardComponent,
    CourseModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    MaterialComponentsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
