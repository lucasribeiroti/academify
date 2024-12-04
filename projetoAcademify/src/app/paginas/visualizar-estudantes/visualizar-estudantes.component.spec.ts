import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { VisualizarEstudantesComponent } from './visualizar-estudantes.component';
import { AlunoService } from '../../services/aluno/aluno.service';
import { of } from 'rxjs';

describe('VisualizarEstudantesComponent', () => {
  let component: VisualizarEstudantesComponent;
  let fixture: ComponentFixture<VisualizarEstudantesComponent>;
  let alunoServiceMock: jasmine.SpyObj<AlunoService>;

  beforeEach(async () => {
    const alunoServiceSpy = jasmine.createSpyObj('AlunoService', ['findById']);

    await TestBed.configureTestingModule({
      declarations: [VisualizarEstudantesComponent],
      providers: [
        { provide: AlunoService, useValue: alunoServiceSpy },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '123' } } },
        },
      ],
    }).compileComponents();

    alunoServiceMock = TestBed.inject(AlunoService) as jasmine.SpyObj<AlunoService>;
    fixture = TestBed.createComponent(VisualizarEstudantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load student details on init', () => {
    const mockStudent = { matricula: '123', nome: 'João Silva', nascimento: '2000-01-01' };
    alunoServiceMock.findById.and.returnValue(of(mockStudent));

    component.ngOnInit();

    expect(component.student).toEqual(mockStudent);
    expect(alunoServiceMock.findById).toHaveBeenCalledWith('123');
  });
});
