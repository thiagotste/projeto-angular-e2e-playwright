import { gerarPerfil, Perfil } from 'e2e/operacoes/gerarPerfils';
import { test } from '../setup/fixtures';

test.describe('Página Cadastro', () => {
  let cadastroObj: Perfil;
  test.beforeEach( async ({paginaCadastro}) => {
    cadastroObj = gerarPerfil();
    await paginaCadastro.visitar();
  });
  
  test('deve conseguir fazer cadastro', async ({ paginaCadastro }) => {
    await paginaCadastro.cadastrarUsuario(cadastroObj);
    await paginaCadastro.cadasdtroFeitoComSucesso();
  });

  test('Não deve conseguir fazer cadastro com email duplicado', async ({paginaCadastro}) => {
    await paginaCadastro.cadastrarUsuario(cadastroObj);
    await paginaCadastro.cadasdtroFeitoComSucesso();
    await paginaCadastro.visitar();
    await paginaCadastro.cadastrarUsuario(cadastroObj);
    await paginaCadastro.estaMostrandoMensagemDeErro('E-mail já utilizado.');
  });
});
