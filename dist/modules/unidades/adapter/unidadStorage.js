"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnidadStorage = void 0;
const db_1 = require("../../../config/db");
class UnidadStorage {
    async searchUnit(unisearc) {
        let response = {
            unidades: [],
            total: 0,
        };
        const connection = await (0, db_1.connectDB)();
        try {
            const result = await (0, db_1.query)('SELECT * FROM unidades');
            if (Array.isArray(result)) {
                if (result.length > 0) {
                    let search;
                    console.log(unisearc);
                    if (unisearc.id_gps === '0' || unisearc.id_gps === '') {
                        search = await (0, db_1.query)('SELECT * FROM unidades WHERE anio BETWEEN ? AND ?', [unisearc.fechaini, unisearc.fechaend]);
                    }
                    else {
                        search = await (0, db_1.query)('SELECT * FROM unidades WHERE gps_id = ? AND anio BETWEEN ? AND ? ', [unisearc.id_gps, unisearc.fechaini, unisearc.fechaend]);
                    }
                    console.log(search);

                    if (Array.isArray(search)) {
                        search.forEach(data => {
                            response.unidades.push({
                                idgps: data.gps_id,
                                model: data.modelo,
                                serie: data.serie,
                                year: data.anio,
                                color: data.color,
                                line: data.linea,
                                unit_name: data.nombre_unidad,
                                group_name: data.nombre_grupo
                            });
                        });
                        response.total = search.length;
                    }
                }
            }
            return response;
        }
        catch (error) {
            console.log("Error en la petición 2");
        }
        finally {
            await (0, db_1.closeDB)();
        }
        return response;
    }
    async registerUnit(unit) {
        let response = false;
        const connection = await (0, db_1.connectDB)();
        try {
            const insertResult = await (0, db_1.query)('INSERT INTO unidades (gps_id, modelo, serie, anio, color, linea, nombre_unidad, nombre_grupo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', [
                unit.idgps,
                unit.model,
                unit.serie,
                unit.year,
                unit.color,
                unit.line,
                unit.unit_name,
                unit.group_name,
            ]);
            if ('affectedRows' in insertResult && insertResult.affectedRows > 0) {
                response = true;
            }
            else {
                console.error('Error al insertar datos o no se modificaron filas.');
            }
        }
        catch (error) {
            console.log(error);
        }
        await (0, db_1.closeDB)();
        return response;
    }
}
exports.UnidadStorage = UnidadStorage;
//# sourceMappingURL=unidadStorage.js.map