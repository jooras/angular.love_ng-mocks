export interface SetOfUnits {
    speed: string;
    temperature: string;
}

export const UNITS: { [name: string]: SetOfUnits } = {
    metric: { speed: 'kph', temperature: 'C' },
    imperial: { speed: 'mph', temperature: 'F' }
};

export class Environment {
	public apiUrl: string;
	public system: 'metric' | 'imperial';
}
