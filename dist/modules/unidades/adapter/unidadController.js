"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unitRouter = exports.UnidadController = void 0;
const register_unit_interactor_1 = require("../use-case/register-unit.interactor");
const search_unidad_interactor_1 = require("../use-case/search-unidad.interactor");
const unidadStorage_1 = require("./unidadStorage");
const express_1 = require("express");
class UnidadController {
    static async registerUnidad(req, res) {
        const { idgps, model, serie, year, color, line, unit_name, group_name } = req.body;
        const datosunidad = {
            idgps,
            model,
            serie,
            year,
            color,
            line,
            unit_name,
            group_name,
        };
        const repositorio = new unidadStorage_1.UnidadStorage();
        const unitInteractor = new register_unit_interactor_1.RegisterInteractor(repositorio);
        try {
            const response = await unitInteractor.execute(datosunidad);
            res.status(200).json({ resgistered: response });
        }
        catch (error) {
            console.log(error.message);
        }
    }
    static async SearchUnits(req, res) {
        const { fechaini, fechaend, id_gps } = req.params;
        const searchUni = {
            fechaini,
            fechaend,
            id_gps
        };
        const unitRepository = new unidadStorage_1.UnidadStorage();
        const searchUnit = new search_unidad_interactor_1.SearchUnits(unitRepository);
        try {
            const resp = await searchUnit.execute(searchUni);
            res.status(200).json(resp);
        }
        catch (error) {
            console.log(error.message);
        }
    }
}
exports.UnidadController = UnidadController;
exports.unitRouter = (0, express_1.Router)();
exports.unitRouter.post('/registerunidad', UnidadController.registerUnidad);
exports.unitRouter.post('/searchunidad/:fechaini/:fechaend/:id_gps', UnidadController.SearchUnits);
//# sourceMappingURL=unidadController.js.map