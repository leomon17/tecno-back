import { Consult, UseCase } from "../../../config/addition/advance";
import { Units } from "../entities/unidad";

import { SearchConsult } from "./file_dtos/search-unit";
import { unitRepository } from "./repository/unit.repository";



export class SearchUnits implements UseCase<SearchConsult, Consult<Units>>
{
    constructor (private readonly unitRepository:unitRepository){ }


    execute(search?: SearchConsult): Promise<Consult<Units>> {
        console.log(search);
       if(search?.fechaini == undefined || search.fechaend == undefined){
            throw new Error("Method not implemented.");
        }else{
            console.log("ENTRA INTERACTOR");
            console.log(search);
           return this.unitRepository.searchUnit(search);
        }
    }

  
    
}