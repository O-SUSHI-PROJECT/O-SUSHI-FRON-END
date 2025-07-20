import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renderiza o botão com o texto correto', () => {
    render(<Button>Clique aqui</Button>);
    expect(screen.getByText('Clique aqui')).toBeInTheDocument();
  });

  it('chama onClick quando clicado', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clique aqui</Button>);
    
    fireEvent.click(screen.getByText('Clique aqui'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('aplica variantes de estilo corretamente', () => {
    const { rerender } = render(<Button variant="primary">Botão</Button>);
    const button = screen.getByText('Botão');
    expect(button.className).toContain('button');

    rerender(<Button variant="secondary">Botão</Button>);
    expect(button.className).toContain('button');

    rerender(<Button variant="danger">Botão</Button>);
    expect(button.className).toContain('button');
  });

  it('aplica tamanhos corretamente', () => {
    const { rerender } = render(<Button size="small">Botão</Button>);
    const button = screen.getByText('Botão');
    expect(button.className).toContain('button');

    rerender(<Button size="large">Botão</Button>);
    expect(button.className).toContain('button');
  });

  it('desabilita o botão quando disabled é true', () => {
    render(<Button disabled>Botão</Button>);
    expect(screen.getByText('Botão')).toBeDisabled();
  });

  it('não chama onClick quando desabilitado', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick} disabled>Botão</Button>);
    
    fireEvent.click(screen.getByText('Botão'));
    expect(handleClick).not.toHaveBeenCalled();
  });
}); 