import * as measurement from './index';
window.measurement = measurement;
measurement.library.unitsList.forEach((unit) => {
    let m = measurement;
    if (!m[unit.name])
        m[unit.name] = unit;
    if (!m[unit.abbr])
        m[unit.abbr] = unit;
});
