import { DataResponseModel } from "./dataResponseModel"

export interface ListResponseModel<T> extends Omit<DataResponseModel<T>,"data">{
    data:T[];
}