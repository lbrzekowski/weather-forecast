import { Component, OnInit } from '@angular/core';
import { WeatherApiService } from '../../shared/weather-api.service';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss']
})
export class CurrentWeatherComponent implements OnInit {
  cityIds: number[];

  constructor(private weatherApiService: WeatherApiService) { }

  ngOnInit(): void {
    this.cityIds = this.weatherApiService.CITY_IDS;
  }

}
