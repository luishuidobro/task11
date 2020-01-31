import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddEditCourseComponent } from './add-edit-course.component';
import { MatDialogModule } from '@angular/material/dialog';



@NgModule({
  declarations: [AddEditCourseComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
  ],
  exports: [
    AddEditCourseComponent,
  ]
})
export class AddEditCourseModule { }