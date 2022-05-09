import { Pipe, PipeTransform } from '@angular/core';

import { Environment } from './models';
import { UNITS } from './models';

@Pipe({
    name: 'speedUnit'
})
export class SpeedUnitPipe implements PipeTransform {
    readonly defaultUnit: string;

    constructor(
        private environment: Environment
    ) {
        this.defaultUnit = UNITS[environment.system]?.speed;
    }

    transform(value: string, ...args: string[]): string | null {
        if (!value)
            return null;

        return `${value} ${args[0] || this.defaultUnit}`;
    }

}
