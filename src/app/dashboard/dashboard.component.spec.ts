import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule} from '@angular/router/testing';
import { By } from '@angular/platform-browser';
import { Component, OnInit } from '@angular/core';

import { DashboardComponent } from './dashboard.component';
import { NavTopComponent } from './nav-top/nav-top.component';
import { NavLeftComponent } from './nav-left/nav-left.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { StorageService } from '../_services/storage.service';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
 


describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ RouterTestingModule, NgbModule ],
      providers:[ StorageService, NgbDropdownConfig ],
      declarations: [ DashboardComponent, NavTopComponent, NavLeftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
