import { UseCase } from "../../../config/addition/advance";
import { Units } from "../entities/unidad";
import { unitRepository } from "./repository/unit.repository";


export class RegisterInteractor implements UseCase<Units, boolean>
{
    constructor (private readonly unitRepository:unitRepository) {}

    execute(unidad?: Units | undefined): Promise<boolean> {
        
        if(unidad?.idgps === undefined || unidad.line === undefined || unidad.unit_name === undefined){
            throw  Error('Datos en Undefined');
        }else{
            console.log("INTERACTOR"); 
            console.log(unidad); 

            return this.unitRepository.registerUnit(unidad);
        }
    }
    
}