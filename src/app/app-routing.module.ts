import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';
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
import { MoviesComponent } from './components/movies/movies.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { PaymentFormComponent } from './components/templates/payment-form/payment-form.component';
import { ScreenComponent } from './components/templates/screen/screen.component';
import { AdminGuard } from './guards/admin/admin.guard';
import { AuthGuard } from './guards/auth/auth.guard';
import { FromCloseGuard } from './guards/form/from-close.guard';

const routes: Routes = [
  {
    path: '', component: LayoutComponent, children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomePageComponent },
      { path: 'movies', component: MoviesComponent },
      { path: 'movie/:movieId', component: MovieComponent },
      { path: 'about', component: AboutUsComponent },
      { path: 'contact', component: ContactUsComponent },
      { path: 'select-seats', component: ScreenComponent, canActivate: [AuthGuard] },
      { path: 'payment', component: PaymentFormComponent, canActivate: [AuthGuard] },
      {
        path: 'my', children: [ //canActivate: [AuthGuard]
          { path: '', redirectTo: '/my/profile', pathMatch: 'full' },
          { path: 'profile', component: ProfileComponent },
          { path: 'bookings', component: MyBookingsComponent }
        ]
      },
    ]
  },
  {
    path: 'admin', component: LayoutComponent, canActivate: [AuthGuard, AdminGuard], children: [
      { path: '', redirectTo: '/admin/manage', pathMatch: 'full' },
      { path: 'manage', component: ManageComponent },
      { path: 'add-auditorium', component: AuditoriumFormComponent, canDeactivate: [FromCloseGuard] },
      { path: 'add-movie', component: MovieFormComponent, canDeactivate: [FromCloseGuard] }
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
