import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EditarEstudantesComponent } from './editar-estudantes.component';
import { AlunoService } from '../../services/aluno/aluno.service';
import { of, throwError } from 'rxjs';

describe('EditarEstudantesComponent', () => {
  let component: EditarEstudantesComponent;
  let fixture: ComponentFixture<EditarEstudantesComponent>;
  let mockRouter: jasmine.SpyObj<Router>;
  let mockAlunoService: jasmine.SpyObj<AlunoService>;

  beforeEach(async () => {
    mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    mockAlunoService = jasmine.createSpyObj('AlunoService', ['findById', 'update']);

    await TestBed.configureTestingModule({
      declarations: [EditarEstudantesComponent],
      imports: [FormsModule],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: AlunoService, useValue: mockAlunoService },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '123' } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(EditarEstudantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load student details on init', () => {
    const mockStudent = { matricula: '123', nome: 'João Silva', nascimento: '2000-01-01' };
    mockAlunoService.findById.and.returnValue(of(mockStudent));

    component.ngOnInit();

    expect(component.student).toEqual(mockStudent);
    expect(mockAlunoService.findById).toHaveBeenCalledWith('123');
  });

  it('should handle error when loading student details', () => {
    mockAlunoService.findById.and.returnValue(throwError(() => new Error('Erro de carregamento')));

    component.ngOnInit();

    expect(mockAlunoService.findById).toHaveBeenCalledWith('123');
    expect(component.student).toEqual({ matricula: '', nome: '', nascimento: '' });
  });

  it('should update student and navigate to /estudantes on success', () => {
    const mockStudent = { matricula: '123', nome: 'João Silva', nascimento: '2000-01-01' };
    component.student = mockStudent;
    mockAlunoService.update.and.returnValue(of(mockStudent));

    component.onSubmit();

    expect(mockAlunoService.update).toHaveBeenCalledWith(mockStudent);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/estudantes']);
  });

  it('should handle validation errors when updating student', () => {
    const validationError = { nome: 'Nome é obrigatório' };
    mockAlunoService.update.and.returnValue(throwError(() => ({ error: validationError })));

    component.onSubmit();

    expect(component.validationErrors).toEqual(validationError);
  });

  it('should navigate to /estudantes on cancel', () => {
    component.onCancel();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/estudantes']);
  });
});
