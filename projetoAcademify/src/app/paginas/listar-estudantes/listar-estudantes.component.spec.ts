import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListarEstudantesComponent } from './listar-estudantes.component';
import { AlunoService } from '../../services/aluno/aluno.service';
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
        { provide: Router, useValue: routerSpy },
      ],
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
      { matricula: '123', nome: 'João Silva' },
      { matricula: '456', nome: 'Maria Souza' },
    ];
    alunoServiceMock.findAll.and.returnValue(of(mockStudents));

    component.carregarEstudantes();

    expect(component.dataSource.data).toEqual(mockStudents);
    expect(alunoServiceMock.findAll).toHaveBeenCalled();
  });

  it('should navigate to view student on visualizar', () => {
    const studentMatricula = '123';
    component.visualizar(studentMatricula);

    expect(routerMock.navigate).toHaveBeenCalledWith([`/estudantes/visualizar/${studentMatricula}`]);
  });

  it('should navigate to edit student on editar', () => {
    const studentMatricula = '456';
    component.editar(studentMatricula);

    expect(routerMock.navigate).toHaveBeenCalledWith([`/estudantes/editar/${studentMatricula}`]);
  });

  it('should call delete service and reload students on excluir', () => {
    const studentMatricula = '789';
    alunoServiceMock.delete.and.returnValue(of({}));

    spyOn(component, 'carregarEstudantes');
    component.excluir(studentMatricula);

    expect(alunoServiceMock.delete).toHaveBeenCalledWith(studentMatricula);
    expect(component.carregarEstudantes).toHaveBeenCalled();
  });
});
