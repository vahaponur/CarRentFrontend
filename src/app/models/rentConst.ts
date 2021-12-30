import { Rental } from "./rental/rental";

export  class Singleton{
    public static RENT:Rental = new Rental();
}