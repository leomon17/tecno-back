import { connectDB, closeDB, query } from '../../../config/db';

import { Units } from "../entities/unidad";
import { unitRepository } from "../use-case/repository/unit.repository";
import { Consult } from "../../../config/addition/advance";
import { SearchConsult } from "../use-case/file_dtos/search-unit";



export class UnidadStorage implements unitRepository {
    
    async searchUnit(unisearc: SearchConsult): Promise<Consult<Units>> {
        let response: Consult<Units> = {
            unidades: [],
            total: 0,
        };
        const connection = await connectDB();

        try{
            const result = await query('SELECT * FROM unidades');
            if (Array.isArray(result)){
                if (result.length > 0){
                    //Busqueda por YEAR
                    let search;

                    if(unisearc.id_gps === '0' || unisearc.id_gps === ''){
                        search = await query(
                            'SELECT * FROM unidades WHERE anio BETWEEN ? AND ?',
                            [unisearc.fechaini, unisearc.fechaend]
                        );
                    }else{
                        search = await query(
                            'SELECT * FROM unidades WHERE gps_id = ? AND anio BETWEEN ? AND ? ',
                            [ unisearc.id_gps,unisearc.fechaini, unisearc.fechaend]
                        );
                    }

                
                    if(Array.isArray(search)){
                        search.forEach(data => {
                            response.unidades.push({
                                idgps:data.gps_id,
                                model:data.modelo,
                                serie:data.serie,
                                year:data.anio,
                                color:data.color,
                                line:data.linea,
                                unit_name:data.nombre_unidad,
                                group_name:data.nombre_grupo
                            });
                        });
                        response.total = search.length;
                    }
                }
            }

            return response;

        }catch (error) {
            console.log("Error en la petición")
        }
        finally {
            await closeDB();
        }
        return response;

    }


    async registerUnit(unit: Units): Promise<boolean> {
        let response : boolean = false;
        const connection = await connectDB();

        try{
            const insertResult = await query(
                'INSERT INTO unidades (gps_id, modelo, serie, anio, color, linea, nombre_unidad, nombre_grupo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    unit.idgps,
                    unit.model,
                    unit.serie,
                    unit.year,
                    unit.color,
                    unit.line,
                    unit.unit_name,
                    unit.group_name,
                ]
            );
            if ('affectedRows' in insertResult && insertResult.affectedRows > 0) {
                response = true;
            } else {
                console.error('Error al insertar datos o no se modificaron filas.');
            }
        } catch (error) {
            console.log(error)
        }
        await closeDB();
        return response;
    }
}