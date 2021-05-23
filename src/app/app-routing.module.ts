import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { AddMovieToShowFormComponent } from './components/templates/add-movie-to-show-form/add-movie-to-show-form.component';
import { AuditoriumFormComponent } from './components/auditorium-form/auditorium-form.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginLayoutComponent } from './components/login-layout/login-layout.component';
import { LoginComponent } from './components/login/login.component';
import { ManageComponent } from './components/manage/manage.component';
import { MovieFormComponent } from './components/movie-form/movie-form.component';
import { MovieComponent } from './components/movie/movie.component';
import { PaymentFormComponent } from './components/templates/payment-form/payment-form.component';
import { RegisterComponent } from './components/register/register.component';
import { ScreenComponent } from './components/templates/screen/screen.component';
import { ViewMoviesComponent } from './components/view-movies/view-movies.component';
import { TicketComponent } from './components/templates/ticket/ticket.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomePageComponent },
      { path: 'now-showing', component: ViewMoviesComponent },
      { path: 'up-comming', component: ViewMoviesComponent },
      { path: 'movie', component: MovieComponent },
      // { path: 'movie/:id', component: MovieComponent },
      // { path: ':id', component: MovieComponent },
      { path: 'about', component: AboutUsComponent },
      { path: 'contact', component: ContactUsComponent },
      { path: 'screen', component: ScreenComponent },
      { path: 'movie', component: MovieComponent },
      { path: 'add-auditorium', component: AuditoriumFormComponent },
      { path: 'add-movie', component: MovieFormComponent },
      { path: 'manage', component: ManageComponent },
      { path: 'show', component: AddMovieToShowFormComponent },
      { path: 'payment', component: PaymentFormComponent },
      { path: 'ticket', component: TicketComponent }
    ]
  },
  {
    path: 'user', component: LoginLayoutComponent, children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent }
    ]
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
