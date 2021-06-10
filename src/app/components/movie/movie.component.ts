import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Util } from 'src/app/classes/util/util';
import { Actor, Movie } from 'src/app/interfaces/application';
import { GlobalService } from 'src/app/services/global/global.service';
import { UserService } from 'src/app/services/user/user.service';
import { SelectMembersComponent } from '../templates/select-members/select-members.component';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class MovieComponent implements OnInit {

  selectedMovie$!: Observable<Movie>;

  actors!: Actor[];
  casts = new BehaviorSubject<Actor[]>(this.actors);
  cast$ = this.casts.asObservable();

  crews = new BehaviorSubject<Actor[]>(this.actors);
  crew$ = this.crews.asObservable();
  movieId!: number;

  constructor(private _mbs: MatBottomSheet,
    private _globalService: GlobalService,
    private _userService: UserService,
    private _router: Router,
    private _activeRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.movieId = this._activeRoute.snapshot.params.movieId;

    this._globalService.getAllMovies()
      .subscribe(movies => {
        const movie = movies.find(movie => movie.id == this.movieId)!
        this.selectedMovie$ = of(movie);
        this.casts.next(movie?.casts?.filter(cast => cast.isCast == 'yes')!);
        this.crews.next(movie?.crews?.filter(cast => cast.isCast == 'no')!);
      });
  }

  openBottomSheet(): void {
    if (!this._userService.isLoggedIn()) {
      this._router.navigate(['/user/login'], { state: { redirect: this._router.url }, queryParams: { 'booking': true } });
      return;
    }
    else {
      let sheet = this._mbs.open(SelectMembersComponent, { data: { movieId: this.movieId, movie: this.selectedMovie$ } });
      sheet.afterDismissed().subscribe(data => {
        if (data?.tempSelectMembers) {
          this._globalService.setTempSelectMembers(data.tempSelectMembers);
          this._router.navigate(['/select-seats']);
        }
      });
    }
  }

  formatRelease(release: any): string {
    if (new Date(release) > new Date())
      return 'Releasing on ' + Util.formatDate(release);
    return 'Now Playing';
  }

}
