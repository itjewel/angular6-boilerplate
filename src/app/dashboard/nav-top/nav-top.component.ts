import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../../_services/storage.service';

@Component({
  selector: 'app-nav-top',
  templateUrl: './nav-top.component.html',
  styleUrls: ['nav-top.component.less']
})
export class NavTopComponent implements OnInit {

  public isCollapsed = true;
  public user: any;
  constructor(private _storageService: StorageService, private _router: Router) {
        this.user = this._storageService.read<string>('currentUser');       
  }
  ngOnInit() {
  }

  logout(){
    this._storageService.delete<string>('currentUser');
    this._router.navigate(['/login']);
  }


}
