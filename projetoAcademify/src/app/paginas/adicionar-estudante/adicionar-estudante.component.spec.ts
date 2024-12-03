import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // Import necessário para suporte ao ngModel
import { AdicionarEstudanteComponent } from './adicionar-estudante.component';
import { By } from '@angular/platform-browser';

describe('AdicionarEstudanteComponent', () => {
  let component: AdicionarEstudanteComponent;
  let fixture: ComponentFixture<AdicionarEstudanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdicionarEstudanteComponent],
      imports: [FormsModule] // Necessário para o uso de ngModel
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarEstudanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an empty student object initially', () => {
    expect(component.student).toEqual({ name: '', birthDate: '' });
  });

  it('should update the student object when form inputs change', () => {
    const nameInput = fixture.debugElement.query(By.css('#name')).nativeElement;
    const birthDateInput = fixture.debugElement.query(By.css('#birthDate')).nativeElement;

    nameInput.value = 'João Silva';
    nameInput.dispatchEvent(new Event('input'));
    birthDateInput.value = '2000-01-01';
    birthDateInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    expect(component.student.name).toBe('João Silva');
    expect(component.student.birthDate).toBe('2000-01-01');
  });

  it('should call onSubmit() when the form is submitted', () => {
    spyOn(component, 'onSubmit');

    const form = fixture.debugElement.query(By.css('form')).nativeElement;
    form.dispatchEvent(new Event('submit'));

    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('should log the student object when onSubmit() is called', () => {
    spyOn(console, 'log');

    component.student = { name: 'João Silva', birthDate: '2000-01-01' };
    component.onSubmit();

    expect(console.log).toHaveBeenCalledWith('Student added:', component.student);
  });
});
