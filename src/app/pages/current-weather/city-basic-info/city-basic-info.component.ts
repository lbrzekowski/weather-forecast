import { Component, Input, OnInit } from '@angular/core';
import { CityWeatherInfo, WeatherApiService } from '../../../shared/weather-api.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-city-basic-info',
  templateUrl: './city-basic-info.component.html',
  styleUrls: ['./city-basic-info.component.scss']
})
export class CityBasicInfoComponent implements OnInit {
  @Input() cityId: number;

  cityInfo$: Observable<CityWeatherInfo>;
  error: boolean = false;

  constructor(private weatherApi: WeatherApiService) { }

  ngOnInit(): void {
    this.error = false;
    this.cityInfo$ = this.weatherApi.getWeatherInfo(this.cityId).pipe(
      catchError(err => {
        console.error(err);
        this.error = true;
        return throwError(err);
      })
    );
  }
}
