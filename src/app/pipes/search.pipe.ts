import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '../interfaces/application';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(movies: Movie[] | null, search?: string, genre?: string, language?: string): Movie[] {
    // return value.pipe(
    //   map(movies => {
    //     if (search)
    //       movies = movies.filter(movie => movie.name.toLowerCase == search.toLowerCase || movie.genres?.includes(search) || movie.language?.toLowerCase == search.toLowerCase);
    //     if (genre)
    //       movies = movies.filter(movie => movie.genres?.includes(genre));
    //     if (language)
    //       movies = movies.filter(movie => movie.language?.toLowerCase == language.toLowerCase);
    //     return movies;
    //   })
    // return [];
    // );
    if (movies?.length! > 0) {
      if (search) {
        const s = search.toLowerCase()
        movies = movies?.filter(movie => movie.name.toLowerCase().indexOf(s) > -1 || movie.genres?.includes(search) || movie.language?.toLowerCase().indexOf(s)! > -1)!;
      }
      if (genre)
        movies = movies?.filter(movie => movie.genres?.includes(genre))!;
      if (language)
        movies = movies?.filter(movie => movie.language?.toLowerCase() == language.toLowerCase())!;
    }
    return movies!;
  }

}
