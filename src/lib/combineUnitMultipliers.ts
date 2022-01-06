import { iUnit } from '../Unit';
import { divide } from './safeMath';

export default combineUnitMultipliers
export function combineUnitMultipliers(units: iUnit[]) {
    let result = 1;


    if (units.length) {
        let multipliers = units.map(unit => unit.multiplier);
        result = divide(...multipliers);
    }

    return result;
}
