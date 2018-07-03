import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule} from '@angular/router/testing';
import { LaravelDocComponent } from './laravel-doc.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MenuComponent } from '../menu/menu.component';
import { FooterComponent } from '../footer/footer.component';

describe('LaravelDocComponent', () => {
  let component: LaravelDocComponent;
  let fixture: ComponentFixture<LaravelDocComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ NgbModule, RouterTestingModule ],
      declarations: [ LaravelDocComponent, MenuComponent, FooterComponent  ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaravelDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
