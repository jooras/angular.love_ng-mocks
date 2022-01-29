import { TemperatureUnitPipe } from '../temperature-unit.pipe';
import { UNITS } from '../models';

describe('TemperatureUnitPipe', () => {
    function setup({ customEnvironment } = { customEnvironment: { apiUrl: null, system: null } }) {
        const pipe = new TemperatureUnitPipe(customEnvironment);

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

            expect(result).toEqual(`${sampleValue} ${UNITS.imperial.temperature}`);
        });

        it('should handle metric system', () => {
            const sampleValue = 'SAMPLE';
            const { pipe } = setup({
                customEnvironment: { apiUrl: null, system: 'metric' }
            });

            const result = pipe.transform(sampleValue);

            expect(result).toEqual(`${sampleValue} ${UNITS.metric.temperature}`);
        });
    });

    it('should ignore default value when proper argument passed', () => {
        const { pipe } = setup();

        const [ value, unit ] = [ 'SAMPLE', 'UNIT' ];
        const result = pipe.transform(value, unit);

        expect(result).toEqual(`${value} ${unit}`);
    });
});
