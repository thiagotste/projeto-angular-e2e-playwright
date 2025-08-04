import { expect, Locator, Page } from '@playwright/test';

export default class {
  private readonly page: Page;
  private readonly campoDropdownOrigem: Locator;
  private readonly botaoSomenteIda: Locator;
  private readonly botaoAbrirModalPassageiros: Locator;
  private readonly botaoIncrementarAdulto: Locator;
  private readonly botaoIncrementarCriancas: Locator;
  private readonly botaoIncrementarBebes: Locator;
  private readonly campoDropdownDestino: Locator;
  private readonly campoDataDeIda: Locator;
  private readonly botaoBuscarPassagens: Locator;
  private readonly botaoFecharModalPassageiros: Locator;
  private readonly textoIdaVolta: Locator;
  private readonly containerOrigem: Locator;
  private readonly containerDestino: Locator;
  private readonly botaoComprar: Locator;
  private readonly campoBoxDataIda: Locator;

  constructor(page: Page) {
    this.page = page;
    this.campoDropdownOrigem = this.page
      .getByTestId('campo-dropdown-origem')
      .getByLabel('Origem');
    this.campoDropdownDestino = this.page
      .getByTestId('campo-dropdown-destino')
      .getByLabel('Destino');
    this.campoDataDeIda = this.page.getByTestId('campo-data-ida');
    this.botaoSomenteIda = this.page.getByTestId('botao-somente-ida');
    this.botaoBuscarPassagens = this.page.getByTestId('botao-buscar-passagens');
    this.botaoAbrirModalPassageiros = this.page.getByTestId(
      'abrir-modal-passageiros'
    );
    this.botaoIncrementarAdulto = page
      .getByTestId('seletor-passageiro-adultos')
      .getByRole('button', { name: 'adição' });
    this.botaoIncrementarCriancas = page
      .getByTestId('seletor-passageiro-criancas')
      .getByRole('button', { name: 'adição' });
    this.botaoIncrementarBebes = page
      .getByTestId('seletor-passageiro-bebes')
      .getByRole('button', { name: 'adição' });
    this.botaoFecharModalPassageiros = page.getByTestId(
      'fechar-modal-passageiros'
    );

    this.textoIdaVolta = page.getByTestId('texto-ida-volta');
    this.containerOrigem = page.getByTestId('container-origem');
    this.containerDestino = page.getByTestId('container-destino');
    this.botaoComprar = page.getByTestId('botao-comprar');
    this.campoBoxDataIda = page.getByTestId('campo-box-data-ida');
  }

  async visitar() {
    await this.page.goto('/');
  }

  async definirPassageirosCriancas(quantidade: number) {
    for (let i = 0; i < quantidade; i++) {
      await this.botaoIncrementarCriancas.click();
    }
  }
  async definirPassageirosBebes(quantidade: number) {
    for (let i = 0; i < quantidade; i++) {
      await this.botaoIncrementarBebes.click();
    }
  }
  async fecharModalPassageiros() {
    await this.botaoFecharModalPassageiros.click();
  }
  async definirPassageirosAdultos(quantidade: number) {
    for (let i = 1; i < quantidade; i++) {
      await this.botaoIncrementarAdulto.click();
    }
  }
  async abrirModalPassageiros() {
    await this.botaoAbrirModalPassageiros.click();
  }
  async definirSomenteIda() {
    await this.botaoSomenteIda.click();
  }

  async definirOrigemEDestino(origem: string, destino: string) {
    await this.campoDropdownOrigem.fill(origem);
    await this.campoDropdownOrigem.press('Enter');

    await this.campoDropdownDestino.fill(destino);
    await this.campoDropdownDestino.press('Enter');
  }

  async definirData(data: Date) {
    const dataFormatada = data.toLocaleString('en-US', { dateStyle: 'short' });
    await this.campoDataDeIda.fill(dataFormatada);
  }

  async buscarPassagens() {
    await this.botaoBuscarPassagens.click();
  }
  async estaMostrandoPassagem(
    tipoTrajeto: 'Somente ida' | 'Ida e volta',
    origem: string,
    destino: string,
    data: Date
  ) {
    const dataFormatada = this.formatarDataIda(data);

    await expect(this.textoIdaVolta).toHaveText(tipoTrajeto);
    await expect(this.containerOrigem).toContainText(origem);
    await expect(this.containerDestino).toContainText(destino);
    await expect(this.botaoComprar).toBeVisible();
    await expect(this.campoBoxDataIda).toHaveText(dataFormatada);
  }

  private formatarDataIda(data: Date) {
    return data.toLocaleString('pt-BR', {
      month: 'numeric',
      day: 'numeric',
    });
  }
}
