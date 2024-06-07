import { Units } from "../entities/unidad";
import { SearchConsult } from "../use-case/file_dtos/search-unit";
import { RegisterInteractor } from "../use-case/register-unit.interactor";
import { unitRepository } from "../use-case/repository/unit.repository";
import { SearchUnits } from "../use-case/search-unidad.interactor";
import { UnidadStorage } from "./unidadStorage";

import express, { Request, response, Response, Router } from 'express';



export class UnidadController {

    static async registerUnidad (req:Request, res:Response){

        const { idgps,model,serie,year,color,line,unit_name,group_name} = req.body;

        const datosunidad : Units = {
            idgps,
            model,
            serie,
            year,
            color,
            line,
            unit_name,
            group_name,
        }

        const repositorio: unitRepository = new UnidadStorage();
        const unitInteractor : RegisterInteractor = new RegisterInteractor(repositorio);

        try{
            const response = await unitInteractor.execute(datosunidad)

            res.status(200).json({resgistered:response});
            
        }catch(error){
            console.log((<Error>error).message);
        }
    }


    static async SearchUnits(req:Request, res:Response){
        const {fechaini, fechaend, id_gps} = req.params;

        const searchUni:SearchConsult = {
            fechaini,
            fechaend,
            id_gps
        }


        const unitRepository : unitRepository = new UnidadStorage();
        const searchUnit: SearchUnits = new SearchUnits(unitRepository);

        try{
            const resp = await searchUnit.execute(searchUni);
            
            res.status(200).json(resp);

        }catch(error){
            console.log((<Error>error).message);
        }
    }
}

export const unitRouter = Router();

unitRouter.post(
    '/registerunidad',
    UnidadController.registerUnidad
);

unitRouter.post(
    '/searchunidad/:fechaini/:fechaend/:id_gps',
    UnidadController.SearchUnits
);