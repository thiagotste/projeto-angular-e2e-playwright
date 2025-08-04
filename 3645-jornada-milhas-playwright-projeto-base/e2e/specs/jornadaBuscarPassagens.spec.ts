import { test } from '../setup/fixtures';

test.describe('Buscar Passagens', () => {
  test('deve buscar passagem de somente ida', async ({ paginaPrincipal }) => {
    await paginaPrincipal.definirSomenteIda();

    await paginaPrincipal.abrirModalPassageiros();
    await paginaPrincipal.definirPassageirosAdultos(3);
    await paginaPrincipal.definirPassageirosCriancas(1);
    await paginaPrincipal.definirPassageirosBebes(1);
    await paginaPrincipal.fecharModalPassageiros();

    await paginaPrincipal.definirOrigemEDestino(
      'minas gerais',
      'rio de janeiro'
    );
    await paginaPrincipal.definirData(new Date());
    await paginaPrincipal.buscarPassagens();

    await paginaPrincipal.estaMostrandoPassagem(
      'Somente ida',
      'Minas Gerais',
      'Rio de Janeiro',
      new Date()
    );
  });
});
