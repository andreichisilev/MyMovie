import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  @Input() movie: any;
  @Output() clickedEdit = new EventEmitter<any>();
  constructor() {}

  ngOnInit(): void {}

  editMoviePage() {
    this.clickedEdit.emit();
  }
}
