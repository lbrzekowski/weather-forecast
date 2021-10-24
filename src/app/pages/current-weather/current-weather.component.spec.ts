import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentWeatherComponent } from './current-weather.component';
import { WeatherApiService } from '../../shared/weather-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent;
  let fixture: ComponentFixture<CurrentWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      declarations: [ CurrentWeatherComponent ],
      providers: [ WeatherApiService ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should property cityIds with 5 elements', () => {
    expect(component.cityIds).toHaveSize(5);
  });
});
