import { Component, OnInit } from '@angular/core';
import { CityWeatherForecast, WeatherApiService } from '../../shared/weather-api.service';
import { ActivatedRoute } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Component({
  selector: 'app-weather-forecast',
  templateUrl: './weather-forecast.component.html',
  styleUrls: ['./weather-forecast.component.scss']
})
export class WeatherForecastComponent implements OnInit {
  cityForecast$: Observable<CityWeatherForecast[]>;
  cityName: string | null;
  error: boolean = false;

  constructor(private weatherApi: WeatherApiService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    const lat = Number(this.route.snapshot.paramMap.get('lat'));
    const lon = Number(this.route.snapshot.paramMap.get('lon'));
    this.cityName = this.route.snapshot.paramMap.get('city');

    this.cityForecast$ = this.weatherApi.getWeatherForecast(lat, lon).pipe(
      catchError(err => {
        console.error(err);
        this.error = true;
        return throwError(err);
      })
    );
  }

}
