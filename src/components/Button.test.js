import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

// 1. Unidade sob teste: O componente Button
describe('Button Component', () => {
  // 2. Cenário + 3. Expectativa
  it('deve renderizar o texto filho corretamente', () => {
    // Arrange
    render(<Button>Clique Aqui</Button>);

    // Act: Nenhuma ação necessária.

    // Assert
    // Usamos getByRole para encontrar o botão e depois verificamos seu conteúdo.
    const buttonElement = screen.getByRole('button', { name: /clique aqui/i });
    expect(buttonElement).toBeInTheDocument();
  });

  // 2. Cenário + 3. Expectativa
  it('deve chamar a função onClick quando clicado', () => {
    // Arrange
    // Criamos uma função "espiã" (mock) para observar se ela é chamada.
    const onClickMock = jest.fn();
    render(<Button onClick={onClickMock}>Adicionar</Button>);
    const buttonElement = screen.getByRole('button', { name: /adicionar/i });

    // Act
    // Simulamos um evento de clique no elemento do botão.
    fireEvent.click(buttonElement);

    // Assert
    // Verificamos se nossa função mock foi chamada exatamente uma vez.
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });
});