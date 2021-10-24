import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherForecastComponent } from './weather-forecast.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { WeatherApiService } from '../../shared/weather-api.service';

describe('WeatherForecastComponent', () => {
  let component: WeatherForecastComponent;
  let fixture: ComponentFixture<WeatherForecastComponent>;
  let service: WeatherApiService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ WeatherForecastComponent ],
      providers: [ WeatherApiService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherForecastComponent);
    service = fixture.debugElement.injector.get(WeatherApiService);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should print error msg when service throws error', () => {
    spyOn(service, 'getWeatherForecast').and.returnValue(throwError('test handling error'))
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('.error'));
    expect(title.nativeElement.innerText).toEqual('Could not load data');
  });
});
