import { UnitType } from '../UnitType';
export default getUnitTypeName;
export function getUnitTypeName(unit) {
    if (unit.unitType !== UnitType.Compound)
        return `${unit.unitType}`;
    const compound = unit;
    const subUnitTypes = compound.subUnits
        .map(su => getUnitTypeName(su))
        .join('.');
    return `${unit.unitType}:${subUnitTypes}`;
}
