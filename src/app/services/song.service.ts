import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; //Nos permite hacer conexiones con aplicaciones externas utilizando el protocolo http
import { Song } from '../models/Song'; //Cargamos el modelo
import { UserService } from './user.service';
import { GLOBAL } from './global';

@Injectable({
  providedIn: 'root',
})
export class SongService {
  apiURL: String;

  constructor(private http: HttpClient, private user: UserService) {
    this.apiURL = GLOBAL.url;
  }

  prepareHeaders() {
    return {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.user.getToken(),
      }),
    };
  }

  createSong(formData) {
    return this.http.post<Song>(
      `${this.apiURL}/create-song`,
      formData,
      this.prepareHeaders()
    );
  }

  getSongs(filter, page) {
    console.log('Esta es la ruta de page --> ', `${page}`);
    return this.http.get(
      `${this.apiURL}/getAll/${page}${filter}`,
      this.prepareHeaders()
    );
  }

  getTotalSongs() {
    return this.http.get(`${this.apiURL}/getTotalSongs`, this.prepareHeaders());
  }
}
