import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { appConfig } from './app.config';

describe('AppConfig', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [appConfig.providers]
    });
  });

  it('should create the app config', () => {
    const config = TestBed.inject(ApplicationConfig);
    expect(config).toBeTruthy();
  });
});
