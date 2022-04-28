module.exports = {
    // estou pedindo para ignorar as pastas abaixo 
    testPathIgnorePatterns: ["/node_modules", "/.next"],
    // ARQUIVOS QUE EU QUERO QUE O JEST EXECUTE ANTES DOS TESTES
    setupFilesAfterEnv: [
        "<rootDir>/src/tests/setupTests.ts"
    ],
    // arquvivos dessas extenções abaixo, arquivos de teste em typescript que preciso converter ele para babel, pro jest entender os arquivos.
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
    },
    // identifica o ambiente de teste, 
    testEnvironment: '@testing-library/jest-dom'
};
