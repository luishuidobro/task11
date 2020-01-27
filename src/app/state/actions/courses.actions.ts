import { createAction, props } from '@ngrx/store';
import { Course } from 'src/app/shared/models/course-model';

export const createCourse = createAction('[Course Component] CreateCourse', props<{ course: Course }>());
export const updateCourse = createAction('[Course Component] UpdateCourse', props<{ course: Course }>());
export const removeCourse = createAction('[Course Component] RemoveCourse', props<{courseId: number}>());
export const loadCourses = createAction('[Course Component] LoadCourses');
export const loadCoursesSuccess = createAction('[Course Component] LoadCoursesSuccess', props<{ courses: Course[] }>());
export const loadCoursesFailure = createAction('[Course Component] LoadCoursesFailure', props<{ error: string }>());
export const searchCourse = createAction('[Course Component] SearchCourse', props<{search: string}>());