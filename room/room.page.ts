import { Component, ElementRef, OnInit, ViewChildren ,Directive, Output, Input, EventEmitter, NgZone} from '@angular/core';
import { RoomServiceService } from '../room-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GestureController } from '@ionic/angular';

declare const ColorPicker: any

@Directive({
  selector: "[long-press]"
})

@Component({
  selector: 'app-room',
  templateUrl: './room.page.html',
  styleUrls: ['./room.page.scss'],
})
export class RoomPage implements OnInit {
  @Output() press = new EventEmitter<any>();
    @Input("delay") delay =  200;
    action: any; //not stacking actions

  room = [];
  onOff = false;
  slider: any;
  colorPickerPopup= "none";
  sliderValue = 0;
  myObj
  buttonClick=true;

  @ViewChildren('device') device:ElementRef
  longPressActive=false ;
  constructor(private roomService: RoomServiceService, private router: Router, private route: ActivatedRoute,
  private gestureCrl: GestureController, private zone: NgZone, private el: ElementRef) { }

  ngOnInit() {
    ColorPicker();
    this.myObj = {
      "color": "white",
      "background-color": "coral",
      "font-size": "60px",
      "padding": "50px"
    }

    let id = this.route.snapshot.paramMap.get('id');
    this.room = this.roomService.getRoomDetails(id)
 }
 ngAfterViewChecked() {
  let id = this.route.snapshot.paramMap.get('id');
  this.room = this.roomService.getRoomDetails(id)
   //console.log(this.device);
   const devices = this.device;
   this.pressed(devices)
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
  dbclicked(device){
    console.log('dbclicked', device)
  }
  released(){
    console.log('working');
  }
  pressed(devices){
    // console.log(devices._results[0]);
    const data =document.getElementsByClassName('elements');
    for(let i=0; i<data.length; i++){
     const device =data[i];
       console.log();

      const gesture = this.gestureCrl.create({
        el:device,
        threshold: 0,
        gestureName:'long-press',
        onMove: ev =>{
          this.longPressActive = false; 
          this.buttonClick =false;
         // console.log('onmove')
        },
        onStart: ev =>{
          this.longPressActive = true;
          this.buttonClick =true;
                this.longPressAction(device);
                console.log("start");
                this.buttonClick =true;
        },
        onEnd: ev =>{
          this.longPressActive=false;
          //console.log(ev)
        }
        
      });
      gesture.enable(true)
    }
  //  console.log('working');
  }
  longPressAction(e) {
    if (this.action) {
      clearInterval(this.action);
  }
  this.action = setTimeout(() => {
      this.zone.run(() => {
          if (this.longPressActive === true) {
              console.log(this.longPressActive)
              this.longPressActive = false;
              var x =document.getElementsByClassName('roomsDropdown')[0].children[2]['defaultValue']
              console.log(e.children[0].id,x);
              this.press.emit('hello');
              this.buttonClick=false;
          }
      });
  }, 1000);
  }
  active(){
    console.log('working');
  }
  roomChange(e, i) {
    console.log(e, i);
    this.room[2].forEach((element, index) => {
      if (e.detail.value === element) {
        this.room = this.roomService.getRoomDetails(index);
        //this.room[0]=element;
        this.router.navigate([`/room/${index}`]);
      }
    });
  }
 
  filterDevice(e) {
    var value = e.target.value;
    requestAnimationFrame(() => {
      this.room[1].forEach(item => {
        const shouldShow = item.device.toLowerCase().indexOf(value) > -1;
        item.display = shouldShow ? 'block' : 'none';
      });
    });

  }
  colorPickerShow(e, device, room){
    this.colorPickerPopup=e;
    console.log()
  }
  openProfile(){
    this.router.navigate(['/setting']);
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
  //  slider = document.getElementById("slider");
  //  output = document.getElementById("light2Per");



  // onslide(){
  //   console.log("")
  //   console.log("h")
  // }

}
