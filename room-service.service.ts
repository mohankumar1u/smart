import { Injectable, ɵEMPTY_ARRAY } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Observable} from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RoomServiceService {
  [x: string]: any;
  rooms =[];
  room=[];
  allRooms=[];

  constructor(private http: HTTP,private https: HttpClient, private router: Router, private storage:Storage) { }
  createRooms(data){
   this.rooms=data;
   console.log(this.rooms[0]);
  
  //  this.http.get('https://api.trello.com/1/boards/5ce8e2e82a761b7a70cad644/lists/?key=7e905c16c547dc4b2b3c08cafc47e3c7&token=be01ed7434db82cb66e8b1610a43aa7854aa9cff1c5a1b62f85ce76942357e1f',{},{})
  // .then(data => {

  //   alert(data+"--http");
  //   alert(data.data); // data received by server
  //   alert(data.headers);

  // })
  // .catch(error => {

  //   alert(error.status+"--error ");
  //   alert(error.error); // error message as string
  //   alert(error.headers);

  // });
  }
  getRoomDetails(data){
    this.room=this.rooms[data];
    for (let index = 0; index < this.rooms.length; index++) {
       this.allRooms[index] = this.rooms[index][0];
    }
  this.room[2]=this.allRooms
    return this.room
  }
  
  getAllData(): Observable<any>{
    return this.https.get(`http://127.0.0.1:1880/get/alldevices`);
  }
  deviceOnOff(topic, payload): Observable<any>{
    var data= {
      "topic":topic,
      "payload":payload
      }
    return this.https.post(`http://127.0.0.1:1880/deviceOnOff`,data);
  }
  getTest(){
    this.http.post('tachyon_mqtt.com',{},{headers: { 'Content-Type': 'application/json' }})
  .then(data => {
    alert("working");
  })
  .catch(error => {

    alert("--error ");
  });
  }
}
