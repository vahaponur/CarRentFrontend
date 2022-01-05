import { User } from "./user/user";

export class UserSingleton{
    public static USER:User = new User();
    
}