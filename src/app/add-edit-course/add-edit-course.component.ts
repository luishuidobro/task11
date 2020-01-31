import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Course } from '../shared/models/course-model';
import { CourseService } from '../shared/services/course.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { createCourse, updateCourse } from '../state/actions/courses.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-edit-course',
  templateUrl: './add-edit-course.component.html',
  styleUrls: ['./add-edit-course.component.scss']
})
export class AddEditCourseComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    description: new FormControl('', [Validators.required, Validators.maxLength(500)]),
    length: new FormControl(0, [Validators.required, Validators.pattern('^[0-9]*$')]),
    date: new FormControl('', Validators.required),
    authors: new FormControl('', [Validators.required, Validators.pattern('^[0-9a-zA-Z]*$')]),
  });

  isEdition = false;
  currentId = 0;
  course$: Observable<Object>;

  constructor(
    private store: Store<{courses: Object}>,
    private courseService: CourseService,
    private route: ActivatedRoute, 
    private readonly router: Router) { 
      this.course$ = this.store.pipe(select('courses'));
    }

  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }

  get length() {
    return this.form.get('length');
  }

  get date() {
    return this.form.get('date');
  }

  get authors() {
    return this.form.get('authors');
  }

  ngOnInit() {
    this.currentId = parseInt(this.route.snapshot.paramMap.get('id'));
    if (this.currentId !== 0) {
      const updateCourse = this.courseService.getItemById(this.currentId);
      if (updateCourse) {
         this.form.get('name').setValue(updateCourse.name);
        this.form.get('description').setValue(updateCourse.description);
        this.form.get('length').setValue(updateCourse.length);
        this.form.get('date').setValue(updateCourse.date);
        this.isEdition = true;
      }
    }
  }

  AddNewCourse() {
    const course = {
      id: this.currentId > 0 ? this.currentId : 0,
       name: this.form.get('name').value,
      date: this.form.get('date').value,
      length: this.form.get('length').value,
      description: this.form.get('description').value,
      isTopRated: true,
      authors: [
        {
          id: 0,
          name: this.form.get('authors').value,
          lastName: ''
        }
      ]
    } as Course;
    if(this.isEdition) {
      this.store.dispatch(updateCourse({course}));
    } else {
      this.store.dispatch(createCourse({course}));
    }
    this.clearFields();
    this.router.navigate(['courses']);
  }

  Cancel() {
    this.clearFields();
    this.router.navigate(['courses']);
  }

  clearFields() {
      this.form.get('name').setValue("");
      this.form.get('description').setValue("");
      this.form.get('length').setValue(0);
      this.form.get('name').setValue("");
      this.form.get('authors').setValue("");
  }

}