import {UseInterceptors,NestInterceptor, ExecutionContext, CallHandler} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { plainToClass } from 'class-transformer'

export class SerializeInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any>{
        //run something before the handled
        console.log('before handled',context)

        //after request being handled
        return next.handle().pipe(
            map((data:any)=>{
                console.log('sata after request being handled', data)
            }
        )
        )
    }
}