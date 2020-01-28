import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AddEditCourseComponent } from './add-edit-course.component';



@NgModule({
  declarations: [AddEditCourseComponent],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports: [
    AddEditCourseComponent,
  ]
})
export class AddEditCourseModule { }