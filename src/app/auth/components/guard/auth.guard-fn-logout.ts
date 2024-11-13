import { inject } from "@angular/core"
import { AuthServiceService } from "../../../service/auth-service.service"
import { Router } from "@angular/router";

export const authGuardFnLogOut = () => {
    const auth = inject(AuthServiceService);
    const router = inject(Router)

    if(!localStorage.getItem('token')){
        
        return true;
    }else{
        router.navigateByUrl('home');
        return false;
    }

    
}