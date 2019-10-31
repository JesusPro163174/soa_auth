import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoverPasswrdComponent } from './recover-passwrd.component';

describe('RecoverPasswrdComponent', () => {
  let component: RecoverPasswrdComponent;
  let fixture: ComponentFixture<RecoverPasswrdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecoverPasswrdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecoverPasswrdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
