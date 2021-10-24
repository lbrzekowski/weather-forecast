import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityBasicInfoComponent } from './city-basic-info.component';
import { CityWeatherInfo, WeatherApiService } from '../../../shared/weather-api.service';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CityBasicInfoComponent', () => {
  let component: CityBasicInfoComponent;
  let fixture: ComponentFixture<CityBasicInfoComponent>;
  let service: WeatherApiService;

  const currentWeather: CityWeatherInfo = {
    id: 111,
    name: 'Krakow',
    temp: 12.67,
    windSpeed: 3.40,
    coord: {
      lat: 50,
      lon: 20,
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [ CityBasicInfoComponent ],
      providers: [ WeatherApiService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CityBasicInfoComponent);
    service = fixture.debugElement.injector.get(WeatherApiService);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fill the template with data from service', () => {
    component.cityId = 111;
    spyOn(service, 'getWeatherInfo').and.returnValue(of(currentWeather));
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('.title'));
    expect(title.nativeElement.innerText).toEqual(currentWeather.name);
  });

  it('should print error msg when service throws error', () => {
    component.cityId = 111;
    spyOn(service, 'getWeatherInfo').and.returnValue(throwError('test handling error'))
    fixture.detectChanges();

    const title = fixture.debugElement.query(By.css('.card'));
    expect(title.nativeElement.innerText).toEqual('Could not load data');
  });
});
