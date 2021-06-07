import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Util } from 'src/app/classes/util/util';
import { Movie } from 'src/app/interfaces/application';
import { AlertService } from 'src/app/services/alert/alert.service';
import { ApplicationService } from 'src/app/services/application/application.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  movies!: Movie[];

  carousel = new BehaviorSubject<Movie[]>(this.movies);
  carousel$ = this.carousel.asObservable();

  nowPlaying = new BehaviorSubject<Movie[]>(this.movies);
  nowPlaying$ = this.nowPlaying.asObservable();

  upComing = new BehaviorSubject<Movie[]>(this.movies);
  upComing$ = this.upComing.asObservable();

  constructor(private _appService: ApplicationService,
    private _activeRoute: ActivatedRoute,
    private _alertService: AlertService,
    private _userService: UserService) { }


  ngOnInit(): void {

    this._activeRoute.queryParams
      .subscribe(param => {
        if (param.login)
          this._alertService.postionAlert('Login Success');
        else if (param['logged-in'])
          this._alertService.postionAlert('You are already logged in', 'OK', 'danger-alert');
        else if (param['un-authorized'])
          this._alertService.postionAlert('You are Un-Authorized', 'OK', 'danger-alert');
        else if (param['payment'] == 'false')
          this._alertService.postionAlert('Payment failed', 'OK', 'danger-alert');
        else if (param['booking'] == 'false')
          this._alertService.postionAlert('Booking failed', 'OK', 'danger-alert');
      });

    console.log(this._userService.getUser()!);

    this._appService.getFewNowPlayingMovies().subscribe(movies => this.nowPlaying.next(movies));

    this._appService.getFewUpComingMovies().subscribe(movies => this.upComing.next(movies));

    this._appService.getAllNowPlayingAndUpComingMovies().subscribe(movies => this.carousel.next(movies));
  }

  formatRelease(release: any): string {
    if (new Date(release) > new Date())
      return 'Releasing on ' + Util.formatDate(release);
    return 'Now Playing';
  }


  // carouselList(): Observable<boolean> {
  //   return this.carouselBS.pipe(
  //     map(movies => movies?.length > 0 ? true : false)
  //   );
  // }

  // nowPlayingList(): Observable<boolean> {
  //   return this.nowPlayingBS.pipe(
  //     map(movies => movies?.length > 0 ? true : false)
  //   )
  // }

  // upComingList(): Observable<boolean> {
  //   return this.upComingBS.pipe(
  //     map(movies => movies?.length > 0 ? true : false)
  //   )
  // }

}
