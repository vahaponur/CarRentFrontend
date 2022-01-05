import { Rental } from "./rental/rental";

export  class RentSingleton{
    public static RENT:Rental = new Rental();
}