import { Component, OnInit, OnChanges } from '@angular/core';
import { Course } from '../../shared/models/course-model';
import { CourseService } from '../../shared/services/course.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Store, select } from '@ngrx/store';
import { loadCourses, removeCourse } from '../../state/actions/courses.actions';
import { AuthorizacionService } from "../../shared/services/authorization_service"
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  public courseItems: Course[] = [];
  courses$ = new Observable<Course[]>();
  course$: Observable<Course[]>;
  isAuthenticated = false;
  constructor(
    private store: Store<{courses: Object}>,
    private courseService: CourseService, 
    private router: Router, 
    private httpClient: HttpClient,
    private authorizacionService: AuthorizacionService) {
    console.log("Here is the constructor.");
    this.isAuthenticated = this.authorizacionService.isAuthenticated();
    if (!this.isAuthenticated) {
      this.router.navigate(['login']);
    }
    
    this.store.dispatch(loadCourses());
    // this.courses$ = this.courseService.getFirstsCourses();
    // this.courses$ = store.pipe(select('courses'));

    this.course$ = store.pipe(select('courses'), map((courses: any) => courses.courses));
    this.course$.subscribe((courses) => {this.courseItems = courses});

    // this.courses$.subscribe((courses) => this.courseItems = courses);
   }

  ngOnInit() {
    // this.courses$ = this.courseService.getFirstsCourses();
    // this.courses$.subscribe((courses) => this.courseItems = courses);
    console.log("Here is OnInit method.");
  }
  
  ngOnChanges() {
    // this.courseService.getCourses().subscribe((courses) => this.courseItems = courses);
    console.log("Here is the OnChanges method.");
  }

  showDeleteMessage(event) {
    console.log(event);
    const courseId = event;
    if (window.confirm('Are sure you want to delete this item ?')){
      // this.courseService.removeItem(event);
      this.store.dispatch(removeCourse({courseId}));
    }
  }

  editCourse(event) {
    console.log(event);
    this.router.navigate(['courses/',event]);
  }

  LoadMore() {
    // this.httpClient.get<Course[]>('http://localhost:3004/courses/')
    // .subscribe((courses) => {
    //   this.courseItems = courses;
    //   console.log(courses);
    // });
    // this.courseService.getCourses().subscribe((courses) => this.courseItems = courses);
  }

  search(event) {
    // this.httpClient.get<Course[]>('http://localhost:3004/courses/',
    // {params: {textFragment: event}})
    // .subscribe((courses) => {
    //   this.courseItems = courses;
    // });
    this.courseItems = event;
  }
}
