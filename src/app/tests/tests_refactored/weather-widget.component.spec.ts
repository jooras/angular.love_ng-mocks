import { BehaviorSubject, of } from 'rxjs';
import { MockBuilder, MockRender, ngMocks } from 'ng-mocks';

import { WeatherWidgetComponent } from '../../weather-widget/weather-widget.component';
import { WeatherService } from '../../weather-widget/weather.service';
import { WeatherModule } from '../../weather-widget/weather.module';

describe('[REFACTORED] WeatherWidgetComponent', () => {
    async function setup() {
        const sampleWeather = [
            { timePoint: 1 }
        ];

        await MockBuilder(WeatherWidgetComponent, WeatherModule)
            .mock(WeatherService, {
				fetchCurrent: () => Promise.resolve(sampleWeather)
			});

        const fixture = MockRender(WeatherWidgetComponent, { current$: new BehaviorSubject(sampleWeather) });
        const component = fixture.point.componentInstance;

        return { sampleWeather, fixture, component };
    }

    it('should match current$ observable with proper weather service method', async () => {
        const { sampleWeather, component } = await setup();

        await component.ngOnInit();

        let value;
        component.current$.subscribe(val => value = val);

        expect(value).toEqual(sampleWeather as any);
    });

    // ... a few more tests here
});

