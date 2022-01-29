import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AppComponent } from '../app.component';
import { WeatherService } from '../weather.service';
import { SpeedUnitPipe } from '../speed-unit.pipe';
import { TemperatureUnitPipe } from '../temperature-unit.pipe';
import { Environment } from '../app.module';

describe('AppComponent', () => {
    async function setup() {
        const sampleWeather = [
            { timePoint: 1 }
        ];

        await TestBed
            .configureTestingModule({
                declarations: [ AppComponent, SpeedUnitPipe, TemperatureUnitPipe ],
                providers: [ Environment, WeatherService ]
            })
            .overrideProvider(Environment, { useValue: { } })
            .overridePipe(SpeedUnitPipe, { })
            .overridePipe(TemperatureUnitPipe, { })
            .overrideProvider(WeatherService, {
                useValue: { getCurrent: () => of(sampleWeather) }
            })
            .compileComponents();

        const fixture = TestBed.createComponent(AppComponent);
        const component = fixture.componentInstance;

        return { sampleWeather, fixture, component };
    }

    it('should match current$ observable with proper weather service method', async (done) => {
        const { sampleWeather, component } = await setup();

        component.current$
            .subscribe(value => {
                expect(value).toEqual(sampleWeather as any);

                done();
            });
    });

    // ... a few more tests here
});
