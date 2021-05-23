import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ViewMoviesComponent } from './components/view-movies/view-movies.component';
import { MovieComponent } from './components/movie/movie.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { GlobalConstants } from './commons/global-constants';
import { RegisterComponent } from './components/register/register.component';
import { LoginLayoutComponent } from './components/login-layout/login-layout.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AuditoriumFormComponent } from './components/auditorium-form/auditorium-form.component';
import { MovieFormComponent } from './components/movie-form/movie-form.component';
import { ManageComponent } from './components/manage/manage.component';

import { ScreenComponent } from './components/templates/screen/screen.component';
import { ShowFormComponent } from './components/templates/show-form/show-form.component';
import { SelectMembersComponent } from './components/templates/select-members/select-members.component';
import { PaymentFormComponent } from './components/templates/payment-form/payment-form.component';
import { AddMovieToShowFormComponent } from './components/templates/add-movie-to-show-form/add-movie-to-show-form.component';
import { TicketComponent } from './components/templates/ticket/ticket.component';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './services/auth/auth.service';
import { GlobalService } from './services/global/global.service';
import { ApplicationService } from './services/application/application.service';


const materialModules: any[] = [
  MatButtonModule,
  MatCardModule,
  MatIconModule,
  MatMenuModule,
  MatExpansionModule,
  MatInputModule,
  MatToolbarModule,
  MatCheckboxModule,
  MatDividerModule,
  MatListModule,
  MatFormFieldModule,
  MatSelectModule,
  MatBottomSheetModule,
  MatStepperModule,
  MatTableModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatDialogModule,
  MatChipsModule,
  MatAutocompleteModule
]

const templates: any[] = [
  SelectMembersComponent,
  ShowFormComponent,
  ScreenComponent,
  PaymentFormComponent,
  AddMovieToShowFormComponent,
  TicketComponent
]

const components: any[] = [
  AppComponent,
  HeaderComponent,
  FooterComponent,
  HomePageComponent,
  ViewMoviesComponent,
  MovieComponent,
  LoginComponent,
  LayoutComponent,
  RegisterComponent,
  LoginLayoutComponent,
  ForgotPasswordComponent,
  AboutUsComponent,
  ContactUsComponent,
  AuditoriumFormComponent,
  MovieFormComponent,
  ManageComponent,
  templates
]

const angularModules: any[] = [
  BrowserModule,
  AppRoutingModule,
  BrowserAnimationsModule,
  FormsModule,
  ReactiveFormsModule,
  HttpClientModule,
  CommonModule
]

const services: any[] = [
  AuthService,
  ApplicationService,
  GlobalService
]

const providers: any[] = [
  GlobalConstants,
  // MatDatepickerModule,
  services
];

@NgModule({
  declarations: [components],
  imports: [angularModules, materialModules],
  providers: [providers],
  bootstrap: [AppComponent],
  entryComponents: [templates]
})
export class AppModule { }
