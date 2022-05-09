import { TestBed } from '@angular/core/testing';
import { MockProvider } from 'ng-mocks';

import { Environment, UNITS } from '../../weather-widget/models';
import { SpeedUnitPipe } from '../../weather-widget/speed-unit.pipe';

describe('[BETTER] SpeedUnitPipe', () => {
    function setup({ customEnvironment } = { customEnvironment: { apiUrl: null, system: null } }) {
        TestBed.configureTestingModule({
            providers: [ MockProvider(Environment, customEnvironment) ]
        });

		const pipe = new SpeedUnitPipe(
			TestBed.inject(Environment)
		);

        return { pipe };
    }

    it('should return null for null value', () => {
        const { pipe } = setup();
        const result = pipe.transform(null);

        expect(result).toBe(null);
    });

    describe('default value when no argument passed', () => {
        it('should handle imperial system', () => {
            const sampleValue = 'SAMPLE';
            const { pipe } = setup({
                customEnvironment: { apiUrl: null, system: 'imperial' }
            });

            const result = pipe.transform(sampleValue);

            expect(result).toEqual(`${sampleValue} ${UNITS.imperial.speed}`);
        });

        it('should handle metric system', () => {
            const sampleValue = 'SAMPLE';
            const { pipe } = setup({
                customEnvironment: { apiUrl: null, system: 'metric' }
            });

            const result = pipe.transform(sampleValue);

            expect(result).toEqual(`${sampleValue} ${UNITS.metric.speed}`);
        });
    });

    it('should ignore default value when proper argument passed', () => {
        const { pipe } = setup();

        const [ value, unit ] = [ 'SAMPLE', 'UNIT' ];
        const result = pipe.transform(value, unit);

        expect(result).toEqual(`${value} ${unit}`);
    });
});
