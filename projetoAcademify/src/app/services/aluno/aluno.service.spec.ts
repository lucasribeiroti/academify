import { TestBed } from '@angular/core/testing';
import { AlunoService } from './aluno.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('AlunoService', () => {
  let service: AlunoService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:5432/academify';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AlunoService],
    });
    service = TestBed.inject(AlunoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('deve criar o serviço', () => {
    expect(service).toBeTruthy();
  });

  it('deve recuperar todos os alunos (findAll)', () => {
    const alunosMock = [
      { matricula: '123', nome: 'João Silva', nascimento: '2000-01-01' },
      { matricula: '456', nome: 'Maria Souza', nascimento: '1999-05-15' },
    ];

    service.findAll().subscribe((alunos) => {
      expect(alunos.length).toBe(2);
      expect(alunos).toEqual(alunosMock);
    });

    const req = httpMock.expectOne(`${apiUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush(alunosMock);
  });

  it('deve recuperar um aluno pelo ID (findById)', () => {
    const alunoMock = { matricula: '123', nome: 'João Silva', nascimento: '2000-01-01' };

    service.findById('123').subscribe((aluno) => {
      expect(aluno).toEqual(alunoMock);
    });

    const req = httpMock.expectOne(`${apiUrl}/123`);
    expect(req.request.method).toBe('GET');
    req.flush(alunoMock);
  });

  it('deve criar um novo aluno (save)', () => {
    const novoAluno = { matricula: '789', nome: 'Pedro Alves', nascimento: '2001-08-20' };

    service.save(novoAluno).subscribe((aluno) => {
      expect(aluno).toEqual(novoAluno);
    });

    const req = httpMock.expectOne(`${apiUrl}`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(novoAluno);
    req.flush(novoAluno);
  });

  it('deve atualizar um aluno existente (update)', () => {
    const alunoAtualizado = { matricula: '123', nome: 'João Silva', nascimento: '2000-01-01' };

    service.update(alunoAtualizado).subscribe((aluno) => {
      expect(aluno).toEqual(alunoAtualizado);
    });

    const req = httpMock.expectOne(`${apiUrl}`);
    expect(req.request.method).toBe('PUT');
    expect(req.request.body).toEqual(alunoAtualizado);
    req.flush(alunoAtualizado);
  });

  it('deve excluir um aluno (delete)', () => {
    service.delete('123').subscribe((response) => {
      expect(response).toBeNull();
    });

    const req = httpMock.expectOne(`${apiUrl}/123`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('deve recuperar o total de alunos (count)', () => {
    const totalAlunos = 10;

    service.count().subscribe((total) => {
      expect(total).toBe(totalAlunos);
    });

    const req = httpMock.expectOne(`${apiUrl}/total`);
    expect(req.request.method).toBe('GET');
    req.flush(totalAlunos);
  });

  it('deve lidar com erros ao buscar alunos (findAll)', () => {
    const errorMessage = 'Erro ao buscar alunos';
    service.findAll().subscribe({
      next: () => fail('Deveria ter dado erro'),
      error: (error) => {
        expect(error).toBeTruthy();
        expect(error.status).toBe(500);
      },
    });

    const req = httpMock.expectOne(`${apiUrl}`);
    expect(req.request.method).toBe('GET');
    req.flush({ message: errorMessage }, { status: 500, statusText: 'Server Error' });
  });
});
