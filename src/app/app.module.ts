import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CurrentWeatherComponent } from './pages/current-weather/current-weather.component';
import { CityBasicInfoComponent } from './pages/current-weather/city-basic-info/city-basic-info.component';
import { HttpClientModule } from '@angular/common/http';
import { WeatherForecastComponent } from './pages/weather-forecast/weather-forecast.component';
import { HourlyForecastComponent } from './pages/weather-forecast/hourly-forecast/hourly-forecast.component';

@NgModule({
  declarations: [
    AppComponent,
    CityBasicInfoComponent,
    CurrentWeatherComponent,
    WeatherForecastComponent,
    HourlyForecastComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
