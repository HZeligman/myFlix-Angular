import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';

import { GenreComponent } from '../genre/genre.component';
import { DirectorComponent } from '../director/director.component';
import { SynopsisComponent } from '../synopsis/synopsis.component';

import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})

export class MovieCardComponent {
  movies: any[] = [];
  favorites: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getMovies();
    this.getFavorites(),
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  getFavorites(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favorites = resp.FavoriteMovies;
      console.log(this.favorites);
      return this.favorites;
    });
  }

  isFavorite(id: string): boolean {
    return this.favorites.includes(id);
  }

  addToFavorites(id: string): void {
    console.log(id);
    this.fetchApiData.addFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie added to favorites!', 'ok', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  deleteFromFavorites(id: string): void {
    console.log(id);
    this.fetchApiData.deleteFavoriteMovie(id).subscribe((result) => {
      this.snackBar.open('Movie deleted from favorites.', 'ok', {
        duration: 2000,
      });
      this.ngOnInit();
    });
  }

  openGenre(name: string, description: string): void {
    this.dialog.open(GenreComponent, {
      data: {
        Name: name,
        Description: description,
      },
    });
  }

  openDirector(name: string, bio: string, birthday: string): void {
    this.dialog.open(DirectorComponent, {
      data: {
        Name: name,
        Bio: bio,
        Birthday: birthday,
      },
    });
  }

  openSynopsis(title: string, description: string): void {
    this.dialog.open(SynopsisComponent, {
      data: {
        Title: title,
        Description: description,
      },
    });
  }
}