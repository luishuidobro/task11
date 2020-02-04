import { Component, OnInit, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateComponent),
      multi: true
    }
  ]
})
export class DateComponent implements ControlValueAccessor, OnInit {
  @Input() disabled = false;
  value: string;

  onChange = (value: string) => {};

  onTouched = () => {};
  
  writeValue(value: string): void {
    // throw new Error("Method not implemented.");
    this.value = value ? value : '';
    this.onChange(this.value)
  }
  registerOnChange(fn: any): void {
    // throw new Error("Method not implemented.");
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    // throw new Error("Method not implemented.");
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
  // throw new Error("Method not implemented.");
  this.disabled = isDisabled;
  
  }

  constructor() { }

  ngOnInit() {
  }

}
