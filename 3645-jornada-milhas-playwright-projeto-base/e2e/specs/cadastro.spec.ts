import { gerarPerfil } from 'e2e/operacoes/gerarPerfils';
import {test} from '../setup/fixtures';

test.describe('Página Cadastro', () => {
    test('deve conseguir fazer cadastro', async ({paginaCadastro}) => {
        const cadastroObj = gerarPerfil();
        console.log(cadastroObj);

        await paginaCadastro.definirNome(cadastroObj.nome);
        await paginaCadastro.definirDataNascimento('');
    });
});