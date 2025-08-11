import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { DisneyCharacter } from '../models/disney-character.model';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCharacters(): Observable<DisneyCharacter[]> {
    return this.http
      .get<any>(this.apiUrl)
      .pipe(map((response) => response.data as DisneyCharacter[]));
  }
}
