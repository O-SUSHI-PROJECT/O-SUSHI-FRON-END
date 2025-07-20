'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/Button';
import styles from './page.module.css';

export default function PedidoSucessoPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id');

  return (
    <div className={styles.container}>
      <div className={styles.successCard}>
        <div className={styles.icon}>
          ✅
        </div>
        
        <h1>Pedido Confirmado!</h1>
        <p className={styles.message}>
          Seu pedido foi recebido e está sendo processado.
        </p>
        
        {orderId && (
          <div className={styles.orderInfo}>
            <p><strong>Número do Pedido:</strong></p>
            <p className={styles.orderId}>{orderId}</p>
          </div>
        )}
        
        <div className={styles.info}>
          <h3>📞 O que acontece agora?</h3>
          <ul>
            <li>Você receberá uma confirmação por telefone</li>
            <li>Seu pedido será preparado com carinho</li>
            <li>Entregaremos no endereço informado</li>
            <li>Tempo estimado: 30-45 minutos</li>
          </ul>
        </div>
        
        <div className={styles.actions}>
          <Link href="/produtos">
            <Button size="large">
              Fazer Novo Pedido
            </Button>
          </Link>
          
          <div className={styles.contact}>
            <p>Dúvidas? Entre em contato:</p>
            <p className={styles.phone}>(11) 99999-9999</p>
          </div>
        </div>
      </div>
    </div>
  );
} 