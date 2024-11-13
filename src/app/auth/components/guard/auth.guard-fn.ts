import { inject } from "@angular/core"
import { AuthServiceService } from "../../../service/auth-service.service"

export const authGuardFn = () => {

    const authService = inject(AuthServiceService)

    if(authService.estoyLogeado || localStorage.getItem('token')){
        localStorage.setItem('token','123.abc.!#$');
        return true;
    }else{
        return false;
    }

    
}