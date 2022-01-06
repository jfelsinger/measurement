import { UnitType } from '../UnitType';
import { iUnit } from '../Unit';
import { CompoundUnit } from '../CompoundUnit';

export default getUnitTypeName
export function getUnitTypeName(unit: iUnit): string {
    if (unit.unitType !== UnitType.Compound)
        return `${unit.unitType}`;

    const compound = <CompoundUnit> unit;
    const subUnitTypes: string = compound.subUnits
        .map(su => getUnitTypeName(su))
        .join('.');

    return `${unit.unitType}:${subUnitTypes}`;
}
