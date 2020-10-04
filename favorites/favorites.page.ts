import { Component, ElementRef, OnInit, ViewChildren ,Directive, Output, Input, EventEmitter, NgZone} from '@angular/core';
import { RoomServiceService } from '../room-service.service';
import { Router, ActivatedRoute } from '@angular/router';
import { GestureController } from '@ionic/angular';
declare const ColorPicker: any

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  constructor(private roomService: RoomServiceService, private route: ActivatedRoute, private router: Router) { }
  ngOnInit(){
    
  }
}
