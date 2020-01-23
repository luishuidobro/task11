import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, mergeMap, catchError, exhaustMap } from 'rxjs/operators';
import { CourseService } from '../../shared/services/course.service';
import {  createCourse, loadCoursesSuccess, loadCourses, loadCoursesFailure, removeCourse, updateCourse } from '../actions/courses.actions';

@Injectable()
export class CourseEffects {

  loadCourses$ = createEffect(() => 
    this.actions$.pipe(
      ofType(loadCourses),
      mergeMap(() => this.courseService.getCourses().pipe(
        map((courses) => {
          return loadCoursesSuccess({courses});
        }),
        catchError(error => of(loadCoursesFailure({error})))
      ))
    )
  );

  createCourse$ = createEffect(() =>
        this.actions$.pipe(
          ofType(createCourse),
          mergeMap(action =>
            this.courseService.createCourse(action.course).pipe(
              map(() => { 
                return loadCourses(); 
              }),
              catchError(error => of(loadCoursesFailure({ error})))  
            )
          )
        )
  );

  removeCourse$ = createEffect(() =>
          this.actions$.pipe(
            ofType(removeCourse),
            mergeMap(action => 
              this.courseService.removeItem(action.courseId).pipe(
                map(() => {
                  return loadCourses();
                }),
                catchError(error => of(loadCoursesFailure({error})))
              )
            )
          )
  );

  updateCourse$ = createEffect(() =>
        this.actions$.pipe(
          ofType(updateCourse),
          mergeMap(action =>
            this.courseService.updateCourse(action.course).pipe(
              map(() => { 
                return loadCourses(); 
              }),
              catchError(error => of(loadCoursesFailure({ error})))  
            )
          )
        )
  );
  

  constructor(
    private actions$: Actions,
    private courseService: CourseService
  ) {}
}