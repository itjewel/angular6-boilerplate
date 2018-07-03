import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavTopComponent } from './nav-top.component';

import { NgbModule, NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

import { StorageService } from '../../_services/storage.service';


describe('NavTopComponent', () => {
  let component: NavTopComponent;
  let fixture: ComponentFixture<NavTopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbModule, RouterTestingModule ],
      providers: [ StorageService , NgbDropdownConfig],
      declarations: [ NavTopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
