"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterInteractor = void 0;
class RegisterInteractor {
    constructor(unitRepository) {
        this.unitRepository = unitRepository;
    }
    execute(unidad) {
        if ((unidad === null || unidad === void 0 ? void 0 : unidad.idgps) === undefined || unidad.line === undefined || unidad.unit_name === undefined) {
            throw Error('Datos en Undefined');
        }
        else {
            console.log("INTERACTOR");
            console.log(unidad);
            return this.unitRepository.registerUnit(unidad);
        }
    }
}
exports.RegisterInteractor = RegisterInteractor;
//# sourceMappingURL=register-unit.interactor.js.map