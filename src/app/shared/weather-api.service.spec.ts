import { TestBed } from '@angular/core/testing';

import { WeatherApiService } from './weather-api.service';
import { HttpClient } from '@angular/common/http';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';

describe('WeatherApiService', () => {
  let service: WeatherApiService;
  let httpSpy: Spy<HttpClient>;
  const fakeCityCurrentInfo = {
    1: {
      name: 'Krakow',
      main: {
        temp: 12.67,
      },
      wind: {
        speed: 3.40,
      },
      coord: {
        lat: 50,
        lon: 20,
      },
    }
  };
  const weatherForecastHourly = {
    hourly: [
      {dt: 1634995855, temp: 15.78, wind_speed: 2.98},
      {dt: 1634995855, temp: 15.78, wind_speed: 2.98},
      {dt: 1634995855, temp: 15.78, wind_speed: 2.98},
      {dt: 1634995855, temp: 15.78, wind_speed: 2.98},
      {dt: 1634995855, temp: 15.78, wind_speed: 2.98},
      {dt: 1634995855, temp: 15.78, wind_speed: 2.98},
      {dt: 1634995855, temp: 15.78, wind_speed: 2.98},
      {dt: 1634995855, temp: 15.78, wind_speed: 2.98},
      {dt: 1634995855, temp: 15.78, wind_speed: 2.98},
      {dt: 1634995855, temp: 15.78, wind_speed: 2.98},
    ]
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) },
      ]
    });
    service = TestBed.inject(WeatherApiService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return current weather info for given cityId', (done: DoneFn) => {
    const cityId = 1;
    httpSpy.get.and.nextWith(fakeCityCurrentInfo[cityId]);

    service.getWeatherInfo(cityId).subscribe(
      weatherInfo => {
        expect(weatherInfo).toBeDefined();
        expect(weatherInfo.name).toEqual('Krakow');
        done();
      },
      done.fail
    );
    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('should return weather forecast for given lat,lon', (done: DoneFn) => {
    httpSpy.get.and.nextWith(weatherForecastHourly);

    service.getWeatherForecast(50, 20).subscribe(
      weatherForecast => {
        expect(weatherForecast).toHaveSize(8);
        done();
      },
      done.fail
    );
    expect(httpSpy.get.calls.count()).toBe(1);
  });
});
