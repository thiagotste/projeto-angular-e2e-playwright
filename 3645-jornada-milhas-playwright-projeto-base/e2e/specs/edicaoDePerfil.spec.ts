import { gerarPerfil } from 'e2e/operacoes/gerarPerfils';
import { PaginaPerfil } from 'e2e/page-objects/PaginaPerfil';
import { testeLogado } from 'e2e/setup/testeLogado';

testeLogado.describe('Página de Perfil', () => {
  testeLogado('Deve conseguir editar o perfil', async ({ paginaPerfil }) => {
    const novosDados = gerarPerfil();
    await paginaPerfil.visitar();
    const emailAtual = await paginaPerfil.formBase.obterValorInputEmail();

    await paginaPerfil.atualizarUsuario({ ...novosDados, email: emailAtual });
    await paginaPerfil.atualizadoComSucesso();

    await paginaPerfil.visitar();
    await paginaPerfil.dadosEstaoCorretos({ ...novosDados, email: emailAtual });
  });

  testeLogado('Deve conseguir fazer logout', async ({ paginaPerfil }) => {
    await paginaPerfil.visitar();
    await paginaPerfil.deslogar();
    await paginaPerfil.delogadoComSucesso();
  });
});
