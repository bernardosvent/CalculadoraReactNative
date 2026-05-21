import React, { useState } from 'react';
import { StyleSheet, View, Dimensions, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { PaperProvider, Text, Button, MD3DarkTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;
const buttonGap = 12;
const paddingHorizontal = 20;
const buttonSize = Math.floor((screenWidth - (paddingHorizontal * 2) - (buttonGap * 3)) / 4);

const theme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    background: '#12131C',
    surface: '#1B1C26',
    primary: '#6C5CE7', // Roxo elétrico para operadores
    error: '#FF5252',   // Vermelho suave para limpar
  },
};

export default function App() {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState(null);
  const [operator, setOperator] = useState(null);
  const [equation, setEquation] = useState('');
  const [resetOnNext, setResetOnNext] = useState(false);

  const calculate = (a, b, op) => {
    const numA = parseFloat(a);
    const numB = parseFloat(b);
    if (isNaN(numA) || isNaN(numB)) return 0;

    let res = 0;
    switch (op) {
      case '+':
        res = numA + numB;
        break;
      case '-':
        res = numA - numB;
        break;
      case '*':
        res = numA * numB;
        break;
      case '/':
        if (numB === 0) return 'Erro';
        res = numA / numB;
        break;
      default:
        return numB;
    }
    // Tratamento de precisão de ponto flutuante
    return parseFloat(res.toFixed(10));
  };

  const handlePress = (type, value) => {
    if (type === 'number') {
      if (display === '0' || display === 'Erro' || resetOnNext) {
        setDisplay(value);
        setResetOnNext(false);
      } else {
        setDisplay(display + value);
      }
    } else if (type === 'decimal') {
      if (resetOnNext || display === 'Erro') {
        setDisplay('0.');
        setResetOnNext(false);
        return;
      }
      if (!display.includes('.')) {
        setDisplay(display + '.');
      }
    } else if (type === 'operator') {
      if (operator && !resetOnNext) {
        const result = calculate(prevValue, display, operator);
        setDisplay(String(result));
        setPrevValue(String(result));
        setEquation(`${result} ${value}`);
      } else {
        setPrevValue(display);
        setEquation(`${display} ${value}`);
      }
      setOperator(value);
      setResetOnNext(true);
    } else if (type === 'equal') {
      if (operator && prevValue !== null) {
        const result = calculate(prevValue, display, operator);
        setEquation(`${prevValue} ${operator} ${display} =`);
        setDisplay(String(result));
        setPrevValue(null);
        setOperator(null);
        setResetOnNext(true);
      }
    } else if (type === 'clear') {
      setDisplay('0');
      setPrevValue(null);
      setOperator(null);
      setEquation('');
      setResetOnNext(false);
    } else if (type === 'sign') {
      if (display !== '0' && display !== 'Erro') {
        if (display.startsWith('-')) {
          setDisplay(display.slice(1));
        } else {
          setDisplay('-' + display);
        }
      }
    } else if (type === 'backspace') {
      if (resetOnNext || display === 'Erro') {
        setDisplay('0');
      } else if (display.length > 1) {
        setDisplay(display.slice(0, -1));
      } else {
        setDisplay('0');
      }
    }
  };

  // Determinar estilos de botão customizados
  const getButtonStyles = (type, value) => {
    if (type === 'clear') {
      return {
        bg: '#FF5252',
        text: '#FFFFFF',
      };
    }
    if (type === 'operator') {
      const isActive = operator === value && resetOnNext;
      return {
        bg: isActive ? '#FFFFFF' : '#6C5CE7',
        text: isActive ? '#6C5CE7' : '#FFFFFF',
      };
    }
    if (type === 'equal') {
      return {
        bg: '#FF9F43',
        text: '#FFFFFF',
      };
    }
    if (type === 'sign' || type === 'backspace') {
      return {
        bg: '#3E3E4A',
        text: '#FFFFFF',
      };
    }
    // Numéricos normais
    return {
      bg: '#242533',
      text: '#FFFFFF',
    };
  };

  const renderButton = (label, type, value = label, flexValue = 1) => {
    const colors = getButtonStyles(type, value);
    const isDouble = flexValue === 2;

    return (
      <Button
        mode="contained"
        compact={true}
        uppercase={false}
        onPress={() => handlePress(type, value)}
        style={[
          styles.button,
          isDouble ? styles.buttonDouble : null,
          { backgroundColor: colors.bg }
        ]}
        contentStyle={isDouble ? styles.buttonContentDouble : styles.buttonContent}
        labelStyle={[styles.buttonLabel, { color: colors.text }]}
      >
        {label}
      </Button>
    );
  };

  return (
    <SafeAreaProvider>
      <PaperProvider theme={theme}>
        <View style={styles.container}>
          <StatusBar style="light" />
          <SafeAreaView style={styles.safeArea}>
            
            {/* Display da Calculadora */}
            <View style={styles.displayContainer}>
              <Text variant="titleMedium" style={styles.equationText} numberOfLines={1}>
                {equation}
              </Text>
              <Text 
                variant="displayLarge" 
                style={styles.displayText} 
                numberOfLines={1}
                adjustsFontSizeToFit
              >
                {display}
              </Text>
            </View>

            {/* Grade de Botões */}
            <View style={styles.gridContainer}>
              
              {/* Linha 1 */}
              <View style={styles.row}>
                {renderButton('C', 'clear')}
                {renderButton('±', 'sign')}
                {renderButton('⌫', 'backspace')}
                {renderButton('÷', 'operator', '/')}
              </View>

              {/* Linha 2 */}
              <View style={styles.row}>
                {renderButton('7', 'number')}
                {renderButton('8', 'number')}
                {renderButton('9', 'number')}
                {renderButton('×', 'operator', '*')}
              </View>

              {/* Linha 3 */}
              <View style={styles.row}>
                {renderButton('4', 'number')}
                {renderButton('5', 'number')}
                {renderButton('6', 'number')}
                {renderButton('−', 'operator', '-')}
              </View>

              {/* Linha 4 */}
              <View style={styles.row}>
                {renderButton('1', 'number')}
                {renderButton('2', 'number')}
                {renderButton('3', 'number')}
                {renderButton('+', 'operator', '+')}
              </View>

              {/* Linha 5 */}
              <View style={styles.row}>
                {renderButton('0', 'number', '0', 2)}
                {renderButton('.', 'decimal')}
                {renderButton('=', 'equal')}
              </View>

            </View>
          </SafeAreaView>
        </View>
      </PaperProvider>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#12131C',
  },
  safeArea: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: paddingHorizontal,
    paddingBottom: 24,
  },
  displayContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: '#1B1C26',
    borderRadius: 24,
    padding: 24,
    marginTop: 40,
    marginBottom: 24,
    // Efeito de elevação leve para visual premium
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  equationText: {
    color: '#8A8A9E',
    marginBottom: 8,
    textAlign: 'right',
    fontSize: 20,
    minHeight: 28,
  },
  displayText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'right',
    fontSize: 54,
  },
  gridContainer: {
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: buttonGap,
  },
  button: {
    width: buttonSize,
    height: buttonSize,
    borderRadius: buttonSize / 2,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    padding: 0,
    margin: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  buttonDouble: {
    width: (buttonSize * 2) + buttonGap,
    borderRadius: buttonSize / 2,
    padding: 0,
    margin: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  buttonContent: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    margin: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  buttonContentDouble: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    paddingLeft: buttonSize / 2 - 10,
    alignItems: 'center',
    paddingVertical: 0,
    margin: 0,
  },
  buttonLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 0,
    padding: 0,
    marginVertical: 0,
    marginHorizontal: 0,
    paddingVertical: 0,
    paddingHorizontal: 0,
    lineHeight: 28, // Resolve o problema de clipping definindo altura de linha explícita compatível com a fonte
    textAlign: 'center',
    alignSelf: 'center',
    width: '100%', // Força o elemento Text a expandir em 100% do container e alinhar perfeitamente no centro
  },
});
