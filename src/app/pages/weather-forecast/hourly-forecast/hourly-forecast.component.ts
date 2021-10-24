import { Component, Input } from '@angular/core';

type HourlyInfo = {
  dt: number;
  temp: number;
  wind_speed: number;
}

@Component({
  selector: 'app-hourly-forecast',
  templateUrl: './hourly-forecast.component.html',
  styleUrls: ['./hourly-forecast.component.scss']
})
export class HourlyForecastComponent {
  @Input() hourlyInfo: HourlyInfo;
}
