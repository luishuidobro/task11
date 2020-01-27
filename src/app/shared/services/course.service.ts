import { Injectable } from '@angular/core';
import { Course } from '../models/course-model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  courses: Course[] = [
    // {
    //   id: 1,
    //   title: "Course1",
    //   creationDate: new Date('2019/10/01'),
    //   duration: 88,
    //   description: "Description for course 1",
    //   topRated: true
    // },
    // {
    //   id: 2,
    //   title: "Course2",
    //   creationDate: new Date('2019/09/01'),
    //   duration: 92,
    //   description: "Description for course 2",
    //   topRated: false
    // },
    // {
    //   id: 3,
    //   title: "Course3",
    //   creationDate: new Date('2019/12/01'),
    //   duration: 74,
    //   description: "Description for course 3",
    //   topRated: true
    // },
    // {
    //   id: 4,
    //   title: "Course4",
    //   creationDate: new Date('2019/11/22'),
    //   duration: 146,
    //   description: "Description for course 4",
    //   topRated: false
    // }
  ];

  constructor(private httpClient: HttpClient) { }

  getFirstsCourses(): Observable<Course[]> {
    return this.httpClient.get<Course[]>('http://localhost:3004/courses/', 
    {params: {start: '0', count:'5'}});
    // .subscribe((courses) => {
    //   this.courses = courses;
    // });
    // return this.courses;
  }

  getCourses(): Observable <Course[]> {
    return this.httpClient.get<Course[]>('http://localhost:3004/courses/');
    // .subscribe((courses) => {
    //   this.courses = courses;
    // });
    // return this.courses;
  }

  createCourse(newCourse: Course) {
    if (newCourse.id === 0) {
      newCourse.id = this.courses.length + 1;
    }

    const courseRequest = {
      id: newCourse.id,
      name: newCourse.name,
      description: newCourse.description,
      date: newCourse.date,
      length: newCourse.length,
      authors: newCourse.authors,
      isTopRated: newCourse.isTopRated
    }
    // this.courses.push(newCourse);
    return this.httpClient.post<Course>('http://localhost:3004/courses',courseRequest)
    // .subscribe((course) => {console.log("Course created" + course.id)},
    // (err) => {console.log(err)});
  }

  getItemById(id: number) {
    return this.courses.find(item => item.id === id);
  }

  searchCourse(search: string) : Observable <Course[]> {
    return this.httpClient.get<Course[]>('http://localhost:3004/courses/',
        {params: {textFragment: search}});
  }

  updateCourse(newCourse: Course) {
    // let itemIndex = this.courses.findIndex(item => item.id === newCourse.id);
    // this.courses[itemIndex] = newCourse;
    const courseRequest = {
      id: newCourse.id,
      name: newCourse.name,
      description: newCourse.description,
      date: newCourse.date,
      length: newCourse.length,
      authors: newCourse.authors,
      isTopRated: newCourse.isTopRated
    }
    // this.courses.push(newCourse);
    const baseUrl = 'http://localhost:3004/courses';
    return this.httpClient.patch<Course>(`${baseUrl}/${newCourse.id}`,courseRequest);
    // .subscribe((course) => {console.log("Course updated" + newCourse.id)},
    // (err) => {console.log(err)});
  }

  removeItem(courseId: number) {
    // let itemIndex = this.courses.findIndex(item => item.id === courseId);
    // this.courses.splice(itemIndex, 1);
    // console.log("DELETE::"+courseId);
    const baseUrl = 'http://localhost:3004/courses';
    return this.httpClient.delete<void>(`${baseUrl}/${courseId}`);
    // .subscribe(() => { console.log('Course deleted: '+courseId)},
    // (error) => {console.log(error)});
    // this.courses = this.getCourses();
  }
}
