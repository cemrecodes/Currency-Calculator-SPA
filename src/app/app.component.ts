import { Component, Input, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import { Request } from './Request';
import { filter, map } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'apiProje';
  public amount: number = 0;
  public currency: string | undefined;
  public ress:any;
  req: any;

  constructor(private apiService:ApiService) {}
  @Input()
  public moneyAmount!: number;
  public curr: string ="EUR";
  public curr2: string = "EUR";
  
  getRes() {
    this.req = new Request(this.curr, this.moneyAmount.toString(), this.curr2);
    this.apiService.getResponse(this.req).pipe(
      map(( (res: any) =>{ 
        this.amount = res.Currency.SaleAmount;
        this.currency = res.Currency.TargetCurrencyCode;
      }),)
      
    )
    .subscribe();
      
  }
  onUpdateFirstCurr(value : any){
    this.curr = value?.currency; 
  }

  onUpdateSecondCurr(value : any){
    this.curr2 = value?.currency; 
  }

}
