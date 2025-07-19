// jest.config.mjs
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Forneça o caminho para seu app Next.js para carregar next.config.mjs e .env em seu ambiente de teste
  dir: './',
})

// Adicione qualquer configuração customizada a ser passada para o Jest
/** @type {import('jest').Config} */
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  
  // Adicionando um mapeador de módulos para ajudar o Jest a encontrar seus arquivos
  moduleNameMapper: {
    // Lida com CSS Modules
    '^.+\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Lida com aliases de caminho (ajuste se você tiver outros)
    '^@/components/(.*)$': '<rootDir>/src/components/$1',
    '^@/context/(.*)$': '<rootDir>/src/context/$1',
    '^@/data/(.*)$': '<rootDir>/src/data/$1',
  },
}

// createJestConfig é exportado desta forma para garantir que next/jest possa carregar a configuração do Next.js que é assíncrona
export default createJestConfig(customJestConfig)