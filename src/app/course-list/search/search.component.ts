import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Course } from '../../shared/models/course-model';
import { CourseService } from '../../shared/services/course.service';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { searchCourse } from '../../state/actions/courses.actions';
import { HttpClient } from '@angular/common/http';
import { Observable, fromEvent, BehaviorSubject } from 'rxjs';
import { map, filter, distinctUntilChanged, debounceTime, switchMap, delay } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  mySearch$ = new BehaviorSubject('..');
  @Output() filteredCourses = new EventEmitter();
  public search ="";

  constructor(private store: Store<{courses: Object}>,
    private readonly router: Router,
    private courseService: CourseService,) {
      this.mySearch$.pipe(
      filter(text => !text || text.length > 3),
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((search) => {
        this.store.dispatch(searchCourse({search}));
        // return this.courseService.searchCourse(search);
        return store.pipe(select('courses'), map((courses: any) => courses!.courses));
      })).subscribe(this.filteredCourses);
    }

  ngOnInit() {
  }

  addCourse() {
    this.router.navigate(['courses/','new']);
  }

}
