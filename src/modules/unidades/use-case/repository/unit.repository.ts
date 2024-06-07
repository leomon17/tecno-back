import { Consult } from "../../../../config/addition/advance";
import { Units } from "../../entities/unidad";
import { SearchConsult } from "../file_dtos/search-unit";



export interface unitRepository{
    registerUnit(unit:Units): Promise<boolean>;
    searchUnit(unisearc:SearchConsult):Promise<Consult<Units>>;
}