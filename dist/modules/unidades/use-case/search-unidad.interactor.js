"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SearchUnits = void 0;
class SearchUnits {
    constructor(unitRepository) {
        this.unitRepository = unitRepository;
    }
    execute(search) {
        console.log(search);
        if ((search === null || search === void 0 ? void 0 : search.fechaini) == undefined || search.fechaend == undefined) {
            throw new Error("Method not implemented.");
        }
        else {
            console.log("ENTRA INTERACTOR 1");
            console.log(search);
            return this.unitRepository.searchUnit(search);
        }
    }
}
exports.SearchUnits = SearchUnits;
//# sourceMappingURL=search-unidad.interactor.js.map