import { Component, OnInit } from '@angular/core';
import { StorageService } from '../_services/storage.service'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less']
})
export class MenuComponent implements OnInit {
  isCollapsed:boolean;
  constructor(){ }

  ngOnInit() {
     
  }

  

}
