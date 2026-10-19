import './style.css';
import { CATEGORIAS, LABELS_CATEGORIA, type Categoria, type Despesa } from './types.ts';

const despesas: Despesa[] = [];

const form = document.getElementById('form-despesa') as HTMLFormElement;
const inputTitulo = document.getElementById('titulo') as HTMLInputElement;
const inputValor = document.getElementById('valor') as HTMLInputElement;
const selectCategoria = document.getElementById('categoria') as HTMLSelectElement;
const erroFormulario = document.getElementById('erro-formulario') as HTMLParagraphElement;
const totalGeralEl = document.getElementById('total-geral') as HTMLParagraphElement;
const listaVaziaEl = document.getElementById('lista-vazia') as HTMLParagraphElement;
const listaDespesasEl = document.getElementById('lista-despesas') as HTMLUListElement;

function formatarMoeda(valor: number): string {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function calcularTotalGeral(): number {
  return despesas.reduce((total, despesa) => total + despesa.valor, 0);
}

function calcularTotalPorCategoria(categoria: Categoria): number {
  return despesas
    .filter((despesa) => despesa.categoria === categoria)
    .reduce((total, despesa) => total + despesa.valor, 0);
}

function atualizarSidebar(): void {
  totalGeralEl.textContent = formatarMoeda(calcularTotalGeral());

  for (const categoria of CATEGORIAS) {
    const el = document.querySelector(
      `[data-total-categoria="${categoria}"]`,
    ) as HTMLSpanElement; 
    el.textContent = formatarMoeda(calcularTotalPorCategoria(categoria));
  }
}

function criarItemLista(despesa: Despesa): HTMLLIElement {      
  const item = document.createElement('li');
  item.className = 'despesa-item';
  item.dataset.id = despesa.id;

  const titulo = document.createElement('span');
  titulo.className = 'despesa-item__titulo';
  titulo.textContent = despesa.titulo;

  const valor = document.createElement('span');
  valor.className = 'despesa-item__valor';
  valor.textContent = formatarMoeda(despesa.valor);

  const categoria = document.createElement('span');
  categoria.className = 'despesa-item__categoria';
  categoria.textContent = LABELS_CATEGORIA[despesa.categoria];

  item.append(titulo, valor, categoria);
  return item;
}

function atualizarEstadoVazio(): void {
  const vazia = despesas.length === 0;
  listaVaziaEl.hidden = !vazia;
  listaDespesasEl.hidden = vazia;
}

function limparErros(): void {
  erroFormulario.hidden = true;
  erroFormulario.textContent = '';
  inputTitulo.classList.remove('campo__input--invalido');
  inputValor.classList.remove('campo__input--invalido');
  selectCategoria.classList.remove('campo__input--invalido');
}

function mostrarErro(mensagem: string, campos: HTMLElement[]): void {
  erroFormulario.textContent = mensagem;
  erroFormulario.hidden = false;
  for (const campo of campos) {
    campo.classList.add('campo__input--invalido');
  }
}

function isCategoria(valor: string): valor is Categoria {
  return (CATEGORIAS as readonly string[]).includes(valor);
}

function validarFormulario(): { valido: true; dados: Omit<Despesa, 'id'> } | { valido: false } {
  limparErros();

  const titulo = inputTitulo.value.trim();
  const valor = Number(inputValor.value);
  const categoria = selectCategoria.value;

  const camposInvalidos: HTMLElement[] = [];
  const erros: string[] = [];

  if (!titulo) {
    erros.push('informe um título');
    camposInvalidos.push(inputTitulo);
  }

  if (!inputValor.value || Number.isNaN(valor) || valor <= 0) {
    erros.push('informe um valor positivo');
    camposInvalidos.push(inputValor);
  }

  if (!isCategoria(categoria)) {
    erros.push('selecione uma categoria');
    camposInvalidos.push(selectCategoria);
  }

  if (erros.length > 0) {
    mostrarErro(`Por favor, ${erros.join(', ')}.`, camposInvalidos);
    return { valido: false };
  }

  const categoriaValida = categoria as Categoria;

  return {
    valido: true,
    dados: { titulo, valor, categoria: categoriaValida },
  };
}

function adicionarDespesa(dados: Omit<Despesa, 'id'>): void {
  const despesa: Despesa = { id: crypto.randomUUID(), ...dados };
  despesas.push(despesa);
  listaDespesasEl.append(criarItemLista(despesa));
  atualizarSidebar();
  atualizarEstadoVazio();
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  
  const resultado = validarFormulario();
  if (!resultado.valido) return;

  adicionarDespesa(resultado.dados);
  form.reset();
  limparErros();
});

