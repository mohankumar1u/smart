import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { RoomServiceService } from './room-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private storage:Storage,
    private router:Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private roomService: RoomServiceService,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    // this.storage.get("tutorialShown").then( result => {
    //   console.log(result);
    // });
    this.storage.get("tutorialShown").then( result => {
      console.log(result, "start");
      if (!result) {
          console.log(result);

         // this.storage.set("tutorialShown", true);
          this.router.navigate(['/tutorial']);
         // this.navCtrl.setRoot(TutorialPage);
      } else {
        this.roomService.createRooms(result);
        this.router.navigate(['/home']);
         console.log(result,"else");
      }
  })
  }
}
