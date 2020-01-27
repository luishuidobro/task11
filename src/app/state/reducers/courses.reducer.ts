import { createReducer, on } from '@ngrx/store';
import { createCourse, updateCourse, removeCourse, loadCourses, loadCoursesSuccess, searchCourse } from '../actions/courses.actions';

export const initialState = {};

const _coursesReducer = createReducer(initialState,
  on(createCourse, state => state),
  on(updateCourse, state => state),
  on(removeCourse, state => state),
  on(searchCourse, state => state),
  on(loadCourses, state => initialState),
  on(loadCoursesSuccess, (state, courses) => { return {...state, courses};
  }),
);

export function coursesReducer(state, action) {
  return _coursesReducer(state, action);
}