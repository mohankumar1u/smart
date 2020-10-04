import {Component, Injector, ViewChild, ElementRef, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { timeout } from 'rxjs-compat/operator/timeout';
import { RoomServiceService } from '../room-service.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-tutorial',
  templateUrl: './tutorial.page.html',
  styleUrls: ['./tutorial.page.scss'],
})
export class TutorialPage implements OnInit {
  @ViewChild('slides') slides: IonSlides;
  scannedCode= null;
  rooms=[];
  scancompleted=false;

  constructor(
    private roomService: RoomServiceService,
    private storage:Storage,
    private router: Router
  ) { }

  ngOnInit() {
  }
  // Method that shows the next slide
 slideNext() {
  console.log('slidenext', this.slides.getActiveIndex())
  this.slides.slideNext();
  }
  
  // Method that shows the previous slide
 slidePrev(){
  console.log('slideprev')
  this.slides.slidePrev();
  }
 async scan(){
      // this.barcodeScanner.scan().then(barcodeData => {
    //   this.scannedCode = barcodeData.text;
   
    this.scannedCode = `'/livingroom/light1'
      '/livingroom/light2'
      '/livingroom/fan1' 
      '/livingroom/fan2' 
      '/livingroom/RGB'
      '/livingroom/TV'
      '/livingroom/Power1'
      '/livingroom/AC'
      '/livingroom/chandelier'
      '/bedroom/AC'
      '/bedroom/RGB'
      '/bedroom/fan1'`;
    var data = this.scannedCode.split("\n");
    let i = 0;
    data.forEach(element => {
      //console.log(element);
      var topic = element.split(" ").join("")
      topic = topic.slice(2, topic.length - 1);
      element = element.split("/");
      element[2] = element[2].split(" ").join("")
      element[2] = element[2].slice(0, -1);
      if (this.rooms[element[1]] != undefined) {
        let item = {
          device: element[2],
          payload: false,
          topic: topic,
          color: "rgb(250, 94, 242)",
          display:"block"
        }
        this.rooms[element[1]].push(item)
      } else {

        let item = {
          device: element[2], payload: false,
          topic: topic,
          color: "rgb(250, 94, 242)",
          display:"block"
        }
        this.rooms[element[1]] = [item];
      }
    });
    this.rooms = Object.entries(this.rooms);
    console.log(this.rooms);
    this.storage.set("tutorialShown", this.rooms);
   await this.roomService.createRooms(this.rooms);
   this.scancompleted=true
    //
  //});

    //setTimeout(function(){ alert("Hello"); }, 3000);
    }
    goToHome(){
      this.router.navigate([`/home`]);
    }

}
