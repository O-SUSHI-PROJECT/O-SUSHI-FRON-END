import styles from './Button.module.css';

// Componente de botão reutilizável
// Aceita 'children' para o texto/ícone e 'onClick' para a ação
export default function Button({ children, onClick, ...props }) {
  return (
    <button className={styles.button} onClick={onClick} {...props}>
      {children}
    </button>
  );
}