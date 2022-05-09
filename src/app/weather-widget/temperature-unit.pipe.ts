import { Pipe, PipeTransform } from '@angular/core';

import { Environment } from './models';
import { UNITS } from './models';

@Pipe({
    name: 'temperatureUnit'
})
export class TemperatureUnitPipe implements PipeTransform {
    readonly defaultUnit: string;

    constructor(
        private environment: Environment
    ) {
        this.defaultUnit = UNITS[environment.system]?.temperature;
    }

    transform(value: string, ...args: string[]): string | null {
        if (!value)
            return null;

        return `${value} ${args[0] || this.defaultUnit}`;
    }

}
