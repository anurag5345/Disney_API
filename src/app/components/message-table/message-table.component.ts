import { Component, OnInit } from '@angular/core';
import {
  MessageService,
  DisneyCharacter,
} from '../../services/message.service';

@Component({
  selector: 'app-message-table',
  templateUrl: './message-table.component.html',
  styleUrls: ['./message-table.component.css'],
  standalone: false,
})
export class MessageTableComponent implements OnInit {
  characters: DisplayCharacter[] = [];
  displayedCharacters: DisplayCharacter[] = [];
  currentPage = 1;
  itemsPerPage = 10;
  totalPages = 1;

  constructor(private messageService: MessageService) {}

  ngOnInit(): void {
    this.messageService.getCharacters().subscribe((data: DisneyCharacter[]) => {
      this.characters = data.map((character: DisneyCharacter) => {
        let type = '';
        let typeValue = '';
        if (character.films && character.films.length > 0) {
          type = 'films';
          typeValue = character.films.join(', ');
        } else if (character.shortFilms && character.shortFilms.length > 0) {
          type = 'shortFilms';
          typeValue = character.shortFilms.join(', ');
        } else if (character.tvShows && character.tvShows.length > 0) {
          type = 'tvShows';
          typeValue = character.tvShows.join(', ');
        }
        return { ...character, type, typeValue } as DisplayCharacter;
      });
      this.totalPages = Math.ceil(this.characters.length / this.itemsPerPage);
      this.updateDisplayedCharacters();
    });
  }

  updateDisplayedCharacters(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.displayedCharacters = this.characters.slice(startIndex, endIndex);
  }

  goToPage(page: number): void {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    this.updateDisplayedCharacters();
  }
}

interface DisplayCharacter extends DisneyCharacter {
  type: string;
  typeValue: string;
}
