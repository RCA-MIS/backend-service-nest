/* eslint-disable */ 
import { EGender } from "../Enum/EGender.enum";

export class UpdateUserDto{
    email : string;
    username : string;
    gender : EGender;
    registercode : string;
    nationalId : string;
    phonenumber : string;
    password : string;
}