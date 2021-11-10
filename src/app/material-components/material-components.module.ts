import { NgModule } from '@angular/core';

import { MatCardModule } from "@angular/material/card";
import { MatInputModule } from "@angular/material/input";
import { MatTableModule } from "@angular/material/table";
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonToggleModule} from '@angular/material/button-toggle';



@NgModule({
  declarations: [],
  exports: [
    MatCardModule,
    MatInputModule,
    MatTableModule,
    MatDialogModule,
    MatButtonToggleModule,
  ]
})
export class MaterialComponentsModule { }