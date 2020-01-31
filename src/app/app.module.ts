import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CourseListModule } from './course-list/course-list.module';
import { CoreModule } from './core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from './login/login.module';
import { AddEditCourseModule } from './add-edit-course/add-edit-course.module';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderInterceptor } from './shared/interceptors/loader.interceptor';
import { LoaderService } from './shared/services/loader.service';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './state';
import { loginReducer } from './state/reducers/login.reducer'
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
// import { AppEffects } from './app.effects';
import { LoginEffects } from './state/effects/login.effects';
import { CourseEffects } from './state/effects/courses.effects';
import { coursesReducer } from './state/reducers/courses.reducer';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    CourseListModule,
    FormsModule,
    LoginModule,
    BrowserAnimationsModule,
    AddEditCourseModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forRoot(
      // reducers,
      {
      // metaReducers,
      login: loginReducer,
      courses: coursesReducer,
      // runtimeChecks: {
      //   strictStateImmutability: true,
      //   strictActionImmutability: true
      // }
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([CourseEffects, LoginEffects])
  ],
  providers: [
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
