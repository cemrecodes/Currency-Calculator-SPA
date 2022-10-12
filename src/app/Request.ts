export class Request{
    public SourceCurrencyCode: string;
    public SourceAmount:string;
    public TargetCurrencyCode: string;
    
    constructor(SourceCurrencyCode: string, SourceAmount: string, TargetCurrencyCode: string ) {
        this.SourceCurrencyCode = SourceCurrencyCode;
        this.SourceAmount = SourceAmount;
        this.TargetCurrencyCode = TargetCurrencyCode;
    }

}

// interface PostToken {
//     SourceCurrencyCode: string;
//     SourceAmount: string;
//     TargetCurrencyCode: string;
// }

   /* public set srcCur (cur: string){
        this._srcCur = cur
    }

    public set srcAmount (SourceAmount: number){
        this._srcAmount = SourceAmount
    }

    public set TargetCurrencyCode (cur: string){
        this._targetCur = cur
    } */



/* const token = new PostToken();
token.srcCur = "USD";
token.srcAmount = 10000;
token.TargetCurrencyCode = "TL"; */
