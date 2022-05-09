import { TestBed } from '@angular/core/testing';

import { WeatherWidgetComponent } from '../../weather-widget/weather-widget.component';
import { SpeedUnitPipe } from '../../weather-widget/speed-unit.pipe';
import { TemperatureUnitPipe } from '../../weather-widget/temperature-unit.pipe';
import { Environment } from '../../weather-widget/models';
import { WeatherService } from '../../weather-widget/weather.service';


describe('[OLD] WeatherWidgetComponent', () => {
    async function setup() {
        const sampleWeather = [
            { timePoint: 1 }
        ];

        await TestBed
            .configureTestingModule({
                declarations: [
					WeatherWidgetComponent,
					SpeedUnitPipe,
					TemperatureUnitPipe
				],
                providers: [
					{ provide: Environment, useValue: { } },
					{ provide: WeatherService, useValue: { fetchCurrent: () => Promise.resolve(sampleWeather) } }
				]
            })
            .overridePipe(SpeedUnitPipe, { })
            .overridePipe(TemperatureUnitPipe, { })
            .compileComponents();

        const fixture = TestBed.createComponent(WeatherWidgetComponent);
        const component = fixture.componentInstance;

        return { sampleWeather, fixture, component };
    }

    it('should match current$ observable with proper weather service method', async () => {
        const { sampleWeather, component } = await setup();

        await component.ngOnInit();

        let value;
        component.current$.subscribe(val => value = val);

        expect(value).toEqual(sampleWeather);
    });

    // ... a few more tests here
});

