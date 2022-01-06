import { iUnit } from '../Unit';
import { multiply, divide } from './safeMath';

export default combineUnitMultipliers
export function combineUnitMultipliers(units: iUnit[], inverse: boolean = false) {
    let result = 1;


    if (units.length) {
        let multipliers = units.map(unit => unit.multiplier);
        if (inverse)
            result = multiply(...multipliers);
        else
            result = divide(...multipliers);
    }

    return result;
}
