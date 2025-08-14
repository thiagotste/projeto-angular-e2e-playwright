import { gerarPerfil } from 'e2e/operacoes/gerarPerfils';
import { test } from '../setup/fixtures';

test.describe('Página de login', () => {
  test('deve conseguir faxer com email e senha validos', async ({ paginaLogin, paginaCadastro }) => {
    const novoUsuario = gerarPerfil();
    await paginaCadastro.visitar();
    await paginaCadastro.cadastrarUsuario(novoUsuario);
    await paginaCadastro.cadasdtroFeitoComSucesso();

    await paginaLogin.visitar();
    await paginaLogin.fazerLogin(novoUsuario.email, novoUsuario.senha);
    await paginaLogin.loginFeitoComSucesso();

    

  });

  test('não deve conseguir fazer login com email inválido', async ({
    paginaLogin,
  }) => {
    await paginaLogin.visitar();
    await paginaLogin.fazerLogin('teste2@teste.com', '123456');
    await paginaLogin.estaMostrandoMensagemDeErro(
      'Você não está autorizado a acessar este recurso'
    );
  });

  test('deve mostrar mensagem de quando digitar email inválido', async ({
    paginaLogin,
  }) => {
    await paginaLogin.visitar();
    await paginaLogin.mostrarMensagemDeEmailInvalido(
      'testeteste.com',
      '123456',
      'E-mail inválido'
    );
  });

  test('deve mostrar mensagem de erro quando um dos campos for vazio', async ({
    paginaLogin,
  }) => {
    await paginaLogin.visitar();
    await paginaLogin.mostrarMensagemDeErroQaundoCampoVazio(
      '',
      '123456',
      'E-mail é obrigatório'
    );
    await paginaLogin.mostrarMensagemDeErroQaundoCampoVazio(
      'teste@teste.com',
      '',
      'Senha é obrigatória'
    );
    await paginaLogin.mostrarMensagemDeErroQaundoCampoVazio(
      '',
      '',
      'E-mail é obrigatório'
    );
    await paginaLogin.mostrarMensagemDeErroQaundoCampoVazio(
      '',
      '',
      'Senha é obrigatória'
    );
  });
});
