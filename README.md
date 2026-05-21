# 📱 Calculadora Premium - React Native & Expo

Uma calculadora simples, extremamente moderna e de alta fidelidade visual, desenvolvida em **React Native** com **Expo** e estilizada com o framework visual **React Native Paper** (Material Design 3). 

O projeto conta com um layout responsivo que calcula dinamicamente o diâmetro dos botões para formar círculos perfeitos em qualquer tamanho de tela, além de possuir correções de alinhamento geométrico e caixas de texto adaptadas para **iOS** e **Android**.

---

## ✨ Funcionalidades

- **Lógica Matemática Robusta**:
  - Suporte completo às 4 operações básicas: soma (`+`), subtração (`−`), multiplicação (`×`) e divisão (`÷`).
  - Lógica especial de ponto flutuante que resolve erros clássicos de arredondamento de float em JavaScript (como `0.1 + 0.2`).
  - Tratamento de exceção de divisão por zero exibindo `"Erro"` de forma graciosa.
  - Função limpar display (`C`), apagar dígito por dígito (`⌫`) e inverter sinal positivo/negativo (`±`).
- **Visual & Tema Premium (Dark Mode)**:
  - Fundo ultra-escuro elegante (`#12131C`).
  - Display em cartão de alto contraste (`#1B1C26`) com sombra suave e exibição em tempo real da equação pendente.
  - Botões numéricos em tom slate escuro (`#242533`).
  - Operadores principais em roxo elétrico (`#6C5CE7`) com feedback ativo (inversão de cor quando selecionado).
  - Botão de limpar em vermelho rubi (`#FF5252`) e botão de igual em âmbar elétrico (`#FF9F43`).
- **Arquitetura Adaptativa**:
  - Diâmetro de botão dinâmico calculado com base na largura da tela (`Dimensions.get('window').width`).
  - Alinhamento horizontal e vertical perfeito no iOS e Android, contornando limitações de `lineHeight` herdadas do tema padrão do Material Design 3.

---

## 🛠️ Tecnologias Utilizadas

- **Core**: [React Native](https://reactnative.dev/)
- **Plataforma**: [Expo (SDK 54)](https://expo.dev/)
- **UI Framework**: [React Native Paper (v5+)](https://reactnativepaper.com/)
- **Safe Area**: [React Native Safe Area Context](https://github.com/th3rdwave/react-native-safe-area-context)

---

## 🚀 Como Executar o Projeto

### Pré-requisitos

Certifique-se de ter o **Node.js** e o **Git** instalados na sua máquina de desenvolvimento. Para testar em um aparelho real, baixe o aplicativo **Expo Go** na Google Play Store ou App Store.

### Passo 1: Clonar o Repositório

```bash
git clone https://github.com/bernardosvent/CalculadoraReactNative.git
cd CalculadoraReactNative
```

### Passo 2: Instalar Dependências

Instale os pacotes necessários especificados no `package.json`:

```bash
npm install
```

### Passo 3: Iniciar o Servidor Expo

Inicie a ferramenta de desenvolvimento do Expo:

```bash
npm start
```

### Passo 4: Rodar no Dispositivo ou Emulador

No console que se abre após iniciar o servidor:
- Escaneie o **código QR** exibido usando a câmera do seu celular (iOS) ou o aplicativo Expo Go (Android).
- Ou pressione `a` para emulador Android.
- Ou pressione `i` para simulador iOS (necessário macOS).
- Ou pressione `w` para rodar na web.

---

## 📐 Estrutura do Código

O projeto foi estruturado em um formato limpo e modular dentro do arquivo principal `App.js`:
- **Estado Geral (useState)**: Gerencia o fluxo de entrada (`display`, `prevValue`, `operator`, `equation` e controle de reinício `resetOnNext`).
- **Mecanismo de Cálculo**: Uma engine matemática contida que trata precisão de floats através de `.toFixed(10)` e `parseFloat`.
- **Custom Theme**: Injeção da paleta de cores personalizada no provedor global `PaperProvider`.
- **StyleSheet.create**: Estilos JSS otimizados de flexbox com resets absolutos de padding nas caixas de texto para evitar cortes geométricos.

---

Desenvolvido com 💜 por [bernardosvent](https://github.com/bernardosvent).
