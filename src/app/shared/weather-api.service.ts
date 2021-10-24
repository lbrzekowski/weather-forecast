import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export type Coord = {
  lon: number,
  lat: number,
}

export type CityWeatherInfo = {
  id: number,
  name: string,
  temp: number,
  windSpeed: number,
  coord: Coord,
}

export type CityWeatherForecast = {
  dt: number,
  temp: number,
  wind_speed: number,
}

@Injectable({
  providedIn: 'root'
})
export class WeatherApiService {

  CITY_IDS: number[] = [
    3094802, // Kraków
    2735943, // Porto
    2775220, // Innsbruck
    3161732, // Bergen
    3177952, // Cortina d'Ampezzo
  ];

  constructor(private http: HttpClient) { }

  getWeatherInfo(cityId: number): Observable<CityWeatherInfo> {
    const params = {
      id: cityId,
      appid: environment.apiKey,
      units: 'metric',
    };
    return this.http.get(environment.apiUrl + '/data/2.5/weather', {params}).pipe(
      map((result: any) => {
        const cityInfo: CityWeatherInfo = {
          id: cityId,
          name: result.name,
          temp: result.main.temp,
          windSpeed: result.wind.speed,
          coord: result.coord,
        };
        return cityInfo;
      }),
    );
  }

  getWeatherForecast(lat: number, lon: number): Observable<CityWeatherForecast[]> {
    const params = {
      lat,
      lon,
      appid: environment.apiKey,
      units: 'metric',
      exclude: 'current,minutely,daily,alerts',
    };
    return this.http.get(environment.apiUrl + '/data/2.5/onecall', {params}).pipe(
      map((result: any) => {
        return result.hourly.slice(0, 8).map((h: any) => {
          const {dt, temp, wind_speed} = h;
          return {
            dt: dt * 1000,
            temp,
            wind_speed,
          };
        });
        }
      ),
    );
  }
}
