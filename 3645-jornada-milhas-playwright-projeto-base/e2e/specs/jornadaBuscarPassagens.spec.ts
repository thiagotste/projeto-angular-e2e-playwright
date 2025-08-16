import { test } from '../setup/fixtures';

test.describe('Buscar Passagens', () => {
  test('deve buscar passagem de somente ida, economica', async ({
    paginaPrincipal,
  }) => {
    await paginaPrincipal.visitar();
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

  test('deve buscar passagem de somente ida, executiva', async ({
    page,
    paginaPrincipal,
  }) => {
    const dataIda = new Date();
    await page.route('*/**/passagem/search*', async (rota) => {
      const json = {
        paginaAtual: '1',
        ultimaPagina: 1,
        total: 1,
        precoMin: 20,
        precoMax: 5000,
        resultado: [
          {
            id: 2,
            tipo: 'Executiva',
            precoIda: 3000,
            precoVolta: 2700,
            taxaEmbarque: 175,
            conexoes: 2,
            tempoVoo: 6,
            origem: {
              id: 11,
              nome: 'Paraíba',
              sigla: 'PB',
            },
            destino: {
              id: 19,
              nome: 'Roraima',
              sigla: 'RR',
            },
            companhia: {
              id: 4,
              nome: 'Latam',
            },
            dataIda: dataIda.toISOString(),
            dataVolta: null,
            orcamento: [
              {
                descricao: '1 adulto, executiva',
                preco: 3000,
                taxaEmbarque: 175,
                total: 3175,
              },
            ],
            total: 3175,
          },
        ],
      };

      await rota.fulfill({ json });
    });

    await paginaPrincipal.visitar();
    await paginaPrincipal.definirSomenteIda();

    await paginaPrincipal.abrirModalPassageiros();
    await paginaPrincipal.definirPassagemExecutiva();
    await paginaPrincipal.fecharModalPassageiros();

    await paginaPrincipal.definirOrigemEDestino('paraíba', 'roraima');
    await paginaPrincipal.definirData(dataIda);
    await paginaPrincipal.buscarPassagens();

    await paginaPrincipal.estaMostrandoPassagem(
      'Somente ida',
      'Paraíba',
      'Roraima',
      new Date()
    );
  });
});
