import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEditCourseComponent } from './add-edit-course.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DateComponent } from './date/date.component';



@NgModule({
  declarations: [AddEditCourseComponent, DateComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  exports: [
    AddEditCourseComponent,
    DateComponent,
  ]
})
export class AddEditCourseModule { }