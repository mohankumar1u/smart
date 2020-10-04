import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent implements OnInit {
  @Output('colorPickerShow') colorPickerShow: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {}
  moveTouch(){
    console.log("hello");
  }
  apply(){
    this.colorPickerShow.emit("none");
    var color = document.getElementById('pickedColor').style.backgroundColor
    console.log(color)
  }

}
