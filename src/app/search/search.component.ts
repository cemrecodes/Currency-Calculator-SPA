import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatSelect } from '@angular/material/select';
import { ReplaySubject, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { Option, OPTIONS } from '../option';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, AfterViewInit, OnDestroy{
@Output() onUpdate = new EventEmitter<any>();

 /** list of banks */
 protected options: Option[] = OPTIONS;
 /** control for the selected Option */
 public optionCtrl: UntypedFormControl = new UntypedFormControl();

 selectedCurr!: string;
  
 /** control for the MatSelect filter keyword */
 public optionFilterCtrl: UntypedFormControl = new UntypedFormControl();

 /** list of banks filtered by search keyword */
 public filteredOptions: ReplaySubject<Option[]> = new ReplaySubject<Option[]>(1);

 @ViewChild('singleSelect', { static: true })
  singleSelect!: MatSelect;
 /** Subject that emits when the component has been destroyed. */
 protected _onDestroy = new Subject<void>();


 constructor() { }

 ngOnInit() {
   // set initial selection
   this.optionCtrl.setValue(this.options[0]);

   // load the initial Option list
   this.filteredOptions.next(this.options.slice());

   // listen for search field value changes
   this.optionFilterCtrl.valueChanges
     .pipe(takeUntil(this._onDestroy))
     .subscribe((result) => {
      this.selectedCurr = result;
       this.filterBanks();
     });
 }


//  send(value: any) {
//   console.log(value)
//   if (value) {
//     this.onUpdate.emit(value);
//   }
//  }

 // gets the selected option
 selectedOpt = this.options[1];
  onChangeObj(newObj: Option) {
    console.log(newObj);
    this.onUpdate.emit(newObj);
    this.selectedOpt = newObj;
  }

 ngAfterViewInit() {
   this.setInitialValue();
 }

 ngOnDestroy() {
   this._onDestroy.next();
   this._onDestroy.complete();
 }

 /**
  * Sets the initial value after the filteredBanks are loaded initially
  */
 protected setInitialValue() {
   this.filteredOptions
     .pipe(take(1), takeUntil(this._onDestroy))
     .subscribe(() => {
       // setting the compareWith property to a comparison function
       // triggers initializing the selection according to the initial value of
       // the form control (i.e. _initializeSelection())
       // this needs to be done after the filteredBanks are loaded initially
       // and after the mat-option elements are available
       this.singleSelect.compareWith = (a: Option, b: Option) => a.currency == b.currency ;
     });
 }

 protected filterBanks() {
   if (!this.options) {
     return;
   }
   // get the search keyword
   let search = this.optionFilterCtrl.value;
   if (!search) {
     this.filteredOptions.next(this.options.slice());
     return;
   } else {
     search = search.toLowerCase();
   }
   // filter the banks
   this.filteredOptions.next(
     this.options.filter(Option => Option.currency.toLowerCase().indexOf(search) > -1)
   );
 }
 
}
