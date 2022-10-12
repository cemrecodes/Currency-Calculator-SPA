import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Request } from '../Request';
import { Observable, throwError , finalize} from 'rxjs';
import { catchError,tap, retry, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseURL: string = "https://apigw.vakifbank.com.tr:8443/";
  public myData:any;
  token: any;

  constructor(private http: HttpClient) {
    this.getToken().pipe(
      map((res) =>{ 
        this.token = res;
      })
      
    )
    .subscribe();
  }

  getToken(): Observable<any>{
    const headers = { 'content-type': 'application/x-www-form-urlencoded'}
    // const body = JSON.stringify(this.info);
    const body = 
    "PUT YOUR INFO HERE";
    console.log("token body: ",body);
    return this.http.post(this.baseURL + 'auth/oauth/v2/token', body,{'headers':headers}).pipe(

      map((data: any) => {
        console.log("return" , data.access_token);
        console.log(data);
        return data.access_token;
      })

    );

    //console.log(response);
    // token = response.access_token;
    //return response;
  }

  getResponse ( req : Request ): Observable<any> {
      const header = new HttpHeaders({
      'Authorization': 'Bearer '+ this.token ,
      'Content-Type' : 'application/json'
    });
    console.log(this.token.toString() );
    const body=JSON.stringify(req);
    console.log("body",body)
    // console.log(this.http.post(this.baseURL,body,{'headers': header}))

    return this.http.post(this.baseURL+"currencyCalculator",body,{'headers': header}).pipe(

      map((data: any) => {
        console.log("return" , data.Data.Currency.SaleAmount);
        console.log(data);
        return data.Data;
      }),

      catchError((err) => throwError(err)),

      finalize(() => {

      })

    );

};

}

