import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToActivateComponent } from './to-activate.component';

describe('ToActivateComponent', () => {
  let component: ToActivateComponent;
  let fixture: ComponentFixture<ToActivateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToActivateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToActivateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
