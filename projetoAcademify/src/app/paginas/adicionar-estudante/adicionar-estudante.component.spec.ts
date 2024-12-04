import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AdicionarEstudanteComponent } from './adicionar-estudante.component';

describe('AdicionarEstudanteComponent', () => {
  let component: AdicionarEstudanteComponent;
  let fixture: ComponentFixture<AdicionarEstudanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdicionarEstudanteComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AdicionarEstudanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log the aluno object when onSubmit() is called', () => {
    spyOn(console, 'log');
    component.aluno = { matricula: '123', nome: 'João Silva', nascimento: '2000-01-01' };
    component.onSubmit();
    expect(console.log).toHaveBeenCalledWith('Aluno adicionado:', component.aluno);
  });
});
