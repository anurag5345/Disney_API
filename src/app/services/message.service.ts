import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface DisneyCharacter {
  _id: number;
  name: string;
  films?: string[];
  shortFilms?: string[];
  tvShows?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private apiUrl = 'https://api.disneyapi.dev/character?page=2&pageSize=50';

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<DisneyCharacter[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => response.data as DisneyCharacter[])
    );
  }
}
