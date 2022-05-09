import { TestBed } from '@angular/core/testing';
import { MockPipe, MockProvider, MockRender } from 'ng-mocks';

import { WeatherWidgetComponent } from '../../weather-widget/weather-widget.component';
import { SpeedUnitPipe } from '../../weather-widget/speed-unit.pipe';
import { TemperatureUnitPipe } from '../../weather-widget/temperature-unit.pipe';
import { Environment } from '../../weather-widget/models';
import { WeatherService } from '../../weather-widget/weather.service';

describe('[BETTER] WeatherWidgetComponent', () => {
    async function setup() {
        const sampleWeather = [
            { timePoint: 1 }
        ];

        await TestBed
            .configureTestingModule({
                declarations: [
					WeatherWidgetComponent,
					MockPipe(SpeedUnitPipe),
					MockPipe(TemperatureUnitPipe)
				],
                providers: [
					MockProvider(Environment),
					MockProvider(WeatherService, { fetchCurrent: () => Promise.resolve(sampleWeather) })
				]
            })
            .compileComponents();

        const fixture = MockRender(WeatherWidgetComponent);
        const component = fixture.point.componentInstance;

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

