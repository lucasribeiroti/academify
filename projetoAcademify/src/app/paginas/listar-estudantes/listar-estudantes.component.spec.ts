import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarEstudantesComponent } from './listar-estudantes.component';
import { AlunoService } from '../../services/aluno.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ListarEstudantesComponent', () => {
  let component: ListarEstudantesComponent;
  let fixture: ComponentFixture<ListarEstudantesComponent>;
  let alunoServiceMock: jasmine.SpyObj<AlunoService>;
  let routerMock: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const alunoServiceSpy = jasmine.createSpyObj('AlunoService', ['findAll', 'delete']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [ListarEstudantesComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: AlunoService, useValue: alunoServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    alunoServiceMock = TestBed.inject(AlunoService) as jasmine.SpyObj<AlunoService>;
    routerMock = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    fixture = TestBed.createComponent(ListarEstudantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load students on init', () => {
    const mockStudents = [
      { id: 1, nome: 'João Silva' },
      { id: 2, nome: 'Maria Souza' }
    ];
    alunoServiceMock.findAll.and.returnValue(of(mockStudents));

    component.carregarAlunos();

    expect(component.alunos).toEqual(mockStudents);
    expect(alunoServiceMock.findAll).toHaveBeenCalled();
  });

  it('should navigate to view student on visualizar', () => {
    const studentId = 1;
    component.visualizar(studentId);

    expect(routerMock.navigate).toHaveBeenCalledWith([`/estudantes/visualizar/${studentId}`]);
  });

  it('should navigate to edit student on editar', () => {
    const studentId = 2;
    component.editar(studentId);

    expect(routerMock.navigate).toHaveBeenCalledWith([`/estudantes/editar/${studentId}`]);
  });

  it('should call delete service and reload students on excluir', () => {
    const studentId = 3;
    alunoServiceMock.delete.and.returnValue(of({}));

    spyOn(component, 'carregarAlunos');
    component.excluir(studentId);

    expect(alunoServiceMock.delete).toHaveBeenCalledWith(studentId);
    expect(component.carregarAlunos).toHaveBeenCalled();
  });
});
