import { Button, Input, Text } from 'react-native-elements';
import React, { useState } from 'react';

import { Picker } from '@react-native-picker/picker';
import { View } from 'react-native';

const WireModuleComponent = () => {
  const [numWires, setNumWires] = useState(4);
  const [wires, setWires] = useState(Array(numWires).fill(''));
  const [serialNumber, setSerialNumber] = useState('');
  const [instructions, setInstructions] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
let tempInstructions = '';
const numRed = wires.filter((color) => color === 'rouge').length;
const lastDigitSerial = parseInt(serialNumber.slice(-1), 10);
const lastColor = wires[wires.length - 1];

if (numWires === 3) {
  if (wires.indexOf('rouge') === -1) {
    tempInstructions = 'Couper le deuxième fil.';
  } else if (wires.filter((color) => color === 'bleu').length > 1) {
    tempInstructions = 'Couper le dernier fil bleu.';
  } else {
    tempInstructions = 'Couper le dernier fil.';
  }
} else if (numWires === 4) {
  if (numRed > 1 && lastDigitSerial % 2 === 1) {
    tempInstructions = 'Couper le dernier fil rouge.';
  } else if (lastColor === 'jaune' && wires.indexOf('rouge') === -1) {
    tempInstructions = 'Couper le premier fil.';
  } else if (wires.indexOf('bleu') !== -1) {
    tempInstructions = 'Couper le premier fil.';
  } else if (wires.indexOf('jaune') !== -1) {
    tempInstructions = 'Couper le dernier fil.';
  } else {
    tempInstructions = 'Couper le deuxième fil.';
  }
} else if (numWires === 5) {
  if (lastColor === 'noir' && lastDigitSerial % 2 === 1) {
    tempInstructions = 'Couper le quatrième fil.';
  } else if (wires.indexOf('noir') === -1) {
    tempInstructions = 'Couper le deuxième fil.';
  } else {
    tempInstructions = 'Couper le premier fil.';
  }
} else if (numWires === 6) {
  if (wires.indexOf('jaune') === -1 && lastDigitSerial % 2 === 1) {
    tempInstructions = 'Couper le troisième fil.';
  } else if (numRed === 0) {
    tempInstructions = 'Couper le dernier fil.';
  } else {
    tempInstructions = 'Couper le quatrième fil.';
  }
}

setInstructions(tempInstructions);
  };

  const onWiresNbChange = (value) => {
    setNumWires(parseInt(value, 10));
    setWires(Array(parseInt(value, 10)).fill(''));
  };

  return (
    <View>
      <Text h4 style={styles.title}>Module de fils</Text>
      <View>
        <Text>Nombre de fils:</Text>
        <Picker selectedValue={numWires} onValueChange={onWiresNbChange}>
          <Picker.Item label="3" value="3" />
          <Picker.Item label="4" value="4" />
          <Picker.Item label="5" value="5" />
          <Picker.Item label="6" value="6" />
        </Picker>
      </View>
      {wires.map((wire, index) => (
        <View key={index}>
          <Text>Fil {index + 1} :</Text>
          <Picker selectedValue={wire} onValueChange={(value) => setWires([...wires.slice(0, index), value, ...wires.slice(index + 1)])}>
            <Picker.Item label="Sélectionner une couleur" value="" />
            <Picker.Item label="Bleu" value="bleu" />
            <Picker.Item label="Rouge" value="rouge" />
            <Picker.Item label="Noir" value="noir" />
            <Picker.Item label="Jaune" value="jaune" />
            <Picker.Item label="Blanc" value="blanc" />
          </Picker>
        </View>
      ))}
      <View>
        <Text>Numéro de série :</Text>
        <Input value={serialNumber} onChangeText={(value) => setSerialNumber(value)} />
      </View>
      <Button title="Vérifier" onPress={handleSubmit} />
      <View>
        <Text>Instructions:</Text>
        <Text>{instructions}</Text>
      </View>
    </View>
  );
};

const styles = {
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
  },
  // Other styles...
};
export default WireModuleComponent;
