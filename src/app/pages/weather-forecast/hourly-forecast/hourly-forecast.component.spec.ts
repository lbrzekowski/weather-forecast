import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourlyForecastComponent } from './hourly-forecast.component';
import { By } from '@angular/platform-browser';

describe('HourlyForecastComponent', () => {
  let component: HourlyForecastComponent;
  let fixture: ComponentFixture<HourlyForecastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourlyForecastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HourlyForecastComponent);
    component = fixture.componentInstance;
    component.hourlyInfo = {dt: 1635019200000, temp: 12.45, wind_speed: 1.56};
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render template with following value', () => {
    const time = fixture.debugElement.query(By.css('.title'));
    expect(time.nativeElement.innerText).toEqual('22:00');
  });
});
