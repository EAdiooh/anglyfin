import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SerieEpisodeCardComponent } from './serie-episode-card.component';

describe('SerieEpisodeCardComponent', () => {
  let component: SerieEpisodeCardComponent;
  let fixture: ComponentFixture<SerieEpisodeCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SerieEpisodeCardComponent]
    });
    fixture = TestBed.createComponent(SerieEpisodeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
