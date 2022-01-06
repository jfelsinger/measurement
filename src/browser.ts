import * as measurement from './index';
(<any>window).measurement = measurement;

measurement.library.unitsList.forEach((unit) => {
    let m = (<any>measurement);
    if (!m[unit.name]) m[unit.name] = unit;
    if (!m[unit.abbr]) m[unit.abbr] = unit;
});
