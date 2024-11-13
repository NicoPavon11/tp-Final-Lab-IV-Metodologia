import { inject } from "@angular/core"
import { AuthServiceService } from "../../../service/auth-service.service"
import { Router } from "@angular/router";

export const authGuardFn = () => {

    const authService = inject(AuthServiceService)
    const router = inject(Router)

    if(authService.estoyLogeado || localStorage.getItem('token')){
        
        return true;
    }else{
        router.navigateByUrl('login');
        return false;
    }

    
}