import * as bundle from './index';
window.measurement = bundle.measurement;
Object.keys(bundle).forEach((key) => {
    window.measurement[key] = bundle[key];
});
// measurement.library.unitsList.forEach((unit) => {
//     let m = (<any>measurement);
//     if (!m[unit.name]) m[unit.name] = unit;
//     if (!m[unit.abbr]) m[unit.abbr] = unit;
// });
