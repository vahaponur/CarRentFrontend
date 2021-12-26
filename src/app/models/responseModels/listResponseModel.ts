import { ResponseModel } from "./responseModel"

export interface ListResponseModel<T> extends Omit<ResponseModel<T>,"data">{
    data:T[];
}