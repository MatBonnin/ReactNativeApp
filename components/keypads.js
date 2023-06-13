import { Button, Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';

import Dialog from 'react-native-dialog';

// Ordre des colonnes
const columnsOrder = [
  [15, 18, 13, 21, 7, 11, 22],
  [17, 15, 22, 4, 10, 11, 28],
  [1, 2, 4, 3, 27, 13, 10],
  [5, 8, 25, 7, 3, 28, 23],
  [20, 23, 25, 24, 8, 6, 26],
  [5, 17, 19, 16, 20, 12, 14],
];
const images = {
  1: require('../images/1.png'),
  2: require('../images/2.png'),
  3: require('../images/3.png'),
  4: require('../images/4.png'),
  5: require('../images/5.png'),
  6: require('../images/6.png'),
  7: require('../images/7.png'),
  8: require('../images/8.png'),
  9: require('../images/9.png'),
  10: require('../images/10.png'),
  11: require('../images/11.png'),
  12: require('../images/12.png'),
  13: require('../images/13.png'),
  14: require('../images/14.png'),
  15: require('../images/15.png'),
  16: require('../images/16.png'),
  17: require('../images/17.png'),
  18: require('../images/18.png'),
  19: require('../images/19.png'),
  20: require('../images/20.png'),
  21: require('../images/21.png'),
  22: require('../images/22.png'),
  23: require('../images/23.png'),
  24: require('../images/24.png'),
  25: require('../images/25.png'),
  26: require('../images/26.png'),
  27: require('../images/27.png'),
  28: require('../images/28.png'),
};

// Création des symboles
let symbols = Array.from({ length: 28 }, (_, i) => i + 1);

console.log(symbols)


const KeypadComponent = () => {
  const [selectedSymbols, setSelectedSymbols] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [instructions, setInstructions] = useState('');

  const handleOpenDialog = () => setDialogVisible(true);

  const handleCloseDialog = () => setDialogVisible(false);

  const handleSubmit = () => {
    if (selectedSymbols.length !== 4) {
      alert('Veuillez sélectionner exactement quatre symboles.');
      return;
    }
    sortedSymbols = []
    const foundColumn = columnsOrder.find(column => 
      selectedSymbols.every(val => column.includes(val))
    );
    console.log(foundColumn)
    sortedSymbols = foundColumn.filter(val => selectedSymbols.includes(val));
    console.log(sortedSymbols)
   
    
      
    
    instructions =`Appuyer sur les symboles dans cet ordre : ${sortedSymbols.join(', ')}`

    setInstructions(instructions);

  }

  const handleSymbolSelection = (symbol) => {
    console.log("ok")
    if (selectedSymbols.find(s => s === symbol)) {
     
      setSelectedSymbols(selectedSymbols.filter(s => s !== symbol));
     
    } else {
  
      if (selectedSymbols.length < 4){
        setSelectedSymbols([...selectedSymbols, symbol]);
      
      }
     
    }
    console.log(selectedSymbols)
    
  }

  return (
    <View style={styles.view}>
     <Text h4 style={styles.title}> Module du Clavier</Text>

      <Button title="Sélectionner les symboles" onPress={handleOpenDialog} />

      <Button title="Vérifier" onPress={handleSubmit} />

      <View>
        <Text>Instructions :</Text>
        <Text>{instructions}</Text>
      </View>


      <Dialog.Container visible={dialogVisible}>
        <Dialog.Title>Sélectionnez les symboles qui apparaissent sur le clavier :</Dialog.Title>
        
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {symbols.map((symbol, index) => (
            <TouchableOpacity key={index} onPress={() => handleSymbolSelection(symbol)}>
            <Image
              
              style={[
                { width: 60, height: 60,borderWidth:2 },
                selectedSymbols.findIndex(s => s === symbol) !== -1 ? { borderColor:'red'} : { borderColor:'black' }
              ]}
            
              source={images[symbol]}
              onPress={() => handleSymbolSelection(symbol)}
            />
            </TouchableOpacity>
          ))}
        </View>

        <Dialog.Button label="Fermer" onPress={handleCloseDialog} />
    </Dialog.Container>
   
  
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
  view:{
    paddingBottom:40
  }
  // Other styles...
};

export default KeypadComponent;
