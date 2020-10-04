import { Component, OnInit,Input,Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import { Input } from 'hammerjs';
import { RoomServiceService } from '../room-service.service';
declare const ColorPicker: any

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
})
export class DevicesComponent implements OnInit {

  @Input() parentRoom: any;
  constructor(private roomService: RoomServiceService, private route: ActivatedRoute, private router: Router) { }
  room = [];
  onOff = false;
  slider: any;
  colorPickerPopup= "none";
  sliderValue = 0;
  myObj
  buttonClick=true;

  ngOnInit() {
    ColorPicker();
    this.myObj = {
      "color": "white",
      "background-color": "coral",
      "font-size": "60px",
      "padding": "50px"
    }
    this.room = this.parentRoom
    let id = this.route.snapshot.paramMap.get('id');
  }
  ngAfterViewChecked() {
    // 
     //document.getElementById("row").click
     this.room = this.parentRoom
     console.log(this.parentRoom);
     if (<HTMLInputElement>document.getElementById("slider") != null) {
       //var sliderPointer = document.getElementsByName("input[type=range]::-webkit-slider-thumb");
       var slider = <HTMLInputElement>document.getElementById("slider");
       var Light2output = <HTMLInputElement>document.getElementById("light2Per");
       Light2output.innerHTML = slider.value + "%";      
       slider.parentElement.parentElement.style.gridRow = 'span 3'
       
       slider.oninput = function () {
         Light2output.innerHTML = slider.value + "%";
         if (parseInt(slider.value) >= 50) {
           var x = parseInt(slider.value) - (parseInt(slider.value) / 13);
         } else if (parseInt(slider.value) >= 12 && parseInt(slider.value) <= 50) {
           var x = parseInt(slider.value) + (parseInt(slider.value) / 13)
         } else {
           var x = parseInt(slider.value) + 3
         }
 
         var color = `linear-gradient(90deg, #e6c991 ${x}%, #999999 ${x}%)`;
         //sliderPointer.style.width = slider.value;
         slider.style.background = color;
 
       }
     }
     if(<HTMLInputElement>document.getElementById("AC-slider") != null){
       var ACSlider = <HTMLInputElement>document.getElementById("AC-slider");
       var ACoutput = <HTMLInputElement>document.getElementById("ACPer");
       ACSlider.parentElement.parentElement.style.gridColumn = 'span 2'
       ACoutput.innerHTML = ACSlider.value + ".C";
       ACSlider.oninput = function () {
         ACoutput.innerHTML = ACSlider.value + ".C";
         if (parseInt(ACSlider.value) >= 22 ) {
           var x = (parseInt(ACSlider.value)+10)/50*100-5
         }
         else {
           var x = (parseInt(ACSlider.value)+10)/50*100
         }
         //var x =(parseInt(ACSlider.value)+10)/50*100
         var color = `linear-gradient(90deg, #90cce6 ${x}%, #999999 ${x}%)`;
         //sliderPointer.style.width = slider.value;
         ACSlider.style.background = color;
 
       }
     }
     if(<HTMLInputElement>document.getElementById("chandelier") != null){
       var chandelier = <HTMLInputElement>document.getElementById("chandelier");
       chandelier.parentElement.style.gridRow = 'span 3'
     }
     
   }
   colorPickerShow(e, device, room){
    this.colorPickerPopup=e;
    console.log()
  }
  alter(device, room) {
    if(this.buttonClick ==true){
    if (device.payload == 0) {
      this.roomService.deviceOnOff(device.topic, 1).subscribe(data => {
      })
      device.payload = 1
    }
    else {
      this.roomService.deviceOnOff(device.topic, 0).subscribe(data => {
      })
      device.payload = 0
    }
  }
  }


}
