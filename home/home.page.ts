import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { RoomServiceService } from '../room-service.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs/Observable';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  scannedCode = null;
  message = null;
  rooms = [];
  subscription = null;

  private _mqttClient: any;

  private TOPIC: string[] = [];

  constructor(
    private barcodeScanner: BarcodeScanner,
    private roomService: RoomServiceService,
    private router: Router,
    private storage:Storage
  ) {
    this.initializeApp();
  }
  initializeApp() {

    this.roomService.getAllData().subscribe(obj => {
      obj.forEach(element => {
        this.rooms.forEach(room =>{
          if(element.topic.includes(room[0])){
            console.log(element.topic);
            room[1].forEach(device => {
              if(device.topic == element.topic){
                console.log("topic",device.payload,element.payload)
                device.payload = element.payload
                console.log("topic",device.payload,element.payload)
              }
            });
          }
        });
      });
    });
    // this.barcodeScanner.scan().then(barcodeData => {
    //   this.scannedCode = barcodeData.text;
   
  //   this.scannedCode = `'/livingroom/light1'
  //     '/livingroom/light2'
  //     '/livingroom/fan1' 
  //     '/livingroom/fan2' 
  //     '/livingroom/RGB'
  //     '/livingroom/TV'
  //     '/livingroom/Power1'
  //     '/livingroom/AC'
  //     '/livingroom/chandelier'
  //     '/bedroom/AC'
  //     '/bedroom/RGB'
  //     '/bedroom/fan1'`;
  //   var data = this.scannedCode.split("\n");
  //   let i = 0;
  //   data.forEach(element => {
  //     //console.log(element);
  //     var topic = element.split(" ").join("")
  //     topic = topic.slice(2, topic.length - 1);
  //     element = element.split("/");
  //     element[2] = element[2].split(" ").join("")
  //     element[2] = element[2].slice(0, -1);
  //     if (this.rooms[element[1]] != undefined) {
  //       let item = {
  //         device: element[2],
  //         payload: false,
  //         topic: topic,
  //         color: "rgb(250, 94, 242)",
  //         display:"block"
  //       }
  //       this.rooms[element[1]].push(item)
  //     } else {

  //       let item = {
  //         device: element[2], payload: false,
  //         topic: topic,
  //         color: "rgb(250, 94, 242)",
  //         display:"block"
  //       }
  //       this.rooms[element[1]] = [item];
  //     }
  //   });
  //   this.rooms = Object.entries(this.rooms);
  //   this.roomService.createRooms(this.rooms);
  // //});

  this.storage.get("tutorialShown").then( result => {
    this.rooms =result;
    this.roomService.createRooms(result);
  });
  }

  openPage(i) {
    console.log(i);
    this.router.navigate([`/room/${i}`]);
  }

}

