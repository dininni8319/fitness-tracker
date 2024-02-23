import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [AuthService]
    });
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.login() with correct email and password when onSubmit is called', () => {
    const email = 'test@example.com';
    const password = 'password123';
    component.loginForm.setValue({ email, password });
    spyOn(authService, 'login');
    component.onSubmit();
    expect(authService.login).toHaveBeenCalledWith({ email, password });
  });

  it('should call authService.login() with empty email and password when onSubmit is called with undefined values', () => {
    component.loginForm.setValue({ email: null, password: null });
    spyOn(authService, 'login');
    component.onSubmit();
    expect(authService.login).toHaveBeenCalledWith({ email: '', password: '' });
  });

  it('should call authService.login() with empty email and password when onSubmit is called with null values', () => {
    component.loginForm.setValue({ email: null, password: null });
    spyOn(authService, 'login');
    component.onSubmit();
    expect(authService.login).toHaveBeenCalledWith({ email: '', password: '' });
  });

  it('should call authService.login() with empty email and password when onSubmit is called with empty values', () => {
    component.loginForm.setValue({ email: '', password: '' });
    spyOn(authService, 'login');
    component.onSubmit();
    expect(authService.login).toHaveBeenCalledWith({ email: '', password: '' });
  });
});