import { inject } from "@angular/core"
import { AuthServiceService } from "../../../service/auth-service.service"

export const authGuardFnLogOut = () => {

    

    if(!localStorage.getItem('token')){
        return true;
    }else{
        return false;
    }

    
}