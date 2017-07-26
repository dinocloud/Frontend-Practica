//@Framework
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
//@Pages
import { HomePage } from '../pages/home/home';
import { LoginPage } from "../pages/login/login";
//@Providers
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { UserTasksProvider } from '../providers/user-tasks/user-tasks';
import { TaskItemComponent } from '../components/task-item/task-item';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    TaskItemComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    UserTasksProvider
  ]
})
export class AppModule {}
