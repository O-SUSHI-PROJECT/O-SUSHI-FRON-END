'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import styles from './page.module.css';

export default function AuthPage() {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!apiKey.trim()) {
      setError('Por favor, insira uma API key válida');
      setIsLoading(false);
      return;
    }

    try {
      const success = await login(apiKey.trim());
      if (success) {
        router.push('/produtos');
      } else {
        setError('API key inválida. Verifique e tente novamente.');
      }
    } catch (err) {
      setError('Erro ao conectar com a API. Verifique sua conexão.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.authCard}>
        <div className={styles.logo}>
          <h1>🍣 O Sushi</h1>
          <p>Delivery de Comida Japonesa</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>Autenticação</h2>
          <p className={styles.description}>
            Para acessar o sistema, você precisa de uma API key válida.
          </p>

          <div className={styles.inputGroup}>
            <label htmlFor="apiKey">API Key</label>
            <input
              type="password"
              id="apiKey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Digite sua API key"
              className={styles.input}
              disabled={isLoading}
            />
          </div>

          {error && <div className={styles.error}>{error}</div>}

          <button
            type="submit"
            className={styles.button}
            disabled={isLoading}
          >
            {isLoading ? 'Conectando...' : 'Entrar'}
          </button>
        </form>

        <div className={styles.footer}>
          <p>Não tem uma API key? Entre em contato com o administrador.</p>
        </div>
      </div>
    </div>
  );
} 