import { Button, Input, Text } from 'react-native-elements';
import React, { useState } from 'react';

import { Picker } from '@react-native-picker/picker';
import { View } from 'react-native';

const ButtonComponent = () => {
  const [buttonColor, setButtonColor] = useState('');
  const [buttonText, setButtonText] = useState('');
  const [numBatteries, setNumBatteries] = useState(0);
  const [indicator, setIndicator] = useState('');
  const [instructions, setInstructions] = useState('');
  const [stripColor] = useState('');
  const [show, setShow] = useState(false);

  const handleSubmit = (e) => {

    
    const relacher = () =>{
      if (stripColor === 'bleu') {
        return '4';
      } else if (stripColor === 'jaune') {
        return '5';
      } else {
        return '1 ';
      }
    }
    
    e.preventDefault();
    let tempInstructions = '';

    if (
      (numBatteries > 1 && buttonText === 'Exploser') ||
      (numBatteries > 2 && indicator === 'FRK') ||
      (buttonColor === 'rouge' && buttonText === 'Maintenir')
    ) {
      tempInstructions = 'Appuyer et immédiatement relâcher le bouton.';
    } else {
      if(!show){
        setShow(true);
      }else{
        tempInstructions = 'Maintenir le bouton appuyé et Relâcher lorsque le compte à rebours affiche un'+ relacher();
      }
  
    }

    

    setInstructions(tempInstructions);
  };
  
  return (
    <View>
       <Text h4 style={styles.title}>Module du Bouton</Text>
           <View>
        <Text>Couleur du bouton:</Text>
        <Picker selectedValue={buttonColor} onValueChange={setButtonColor}>
          <Picker.Item label="Sélectionner une couleur" value="" />
          <Picker.Item label="Bleu" value="bleu" />
          <Picker.Item label="Blanc" value="blanc" />
          <Picker.Item label="Jaune" value="jaune" />
          <Picker.Item label="Rouge" value="rouge" />
        </Picker>
      </View>
      <View>
        <Text>Texte du bouton:</Text>
        <Picker selectedValue={buttonText} onValueChange={setButtonText}>
          <Picker.Item label="Sélectionner un texte" value="" />
          <Picker.Item label="Annuler" value="Annuler" />
          <Picker.Item label="Exploser" value="Exploser" />
          <Picker.Item label="Maintenir" value="Maintenir" />
        </Picker>
      </View>
      {show ? (
        <View>
          <View>
            <Text>Nombre de piles:</Text>
            <Input value={numBatteries.toString()} onChangeText={(value) => setNumBatteries(parseInt(value, 10))} />
          </View>
          <View>
            <Text>Indicateur :</Text>
            <Picker selectedValue={indicator} onValueChange={setIndicator}>
              <Picker.Item label="Sélectionner un indicateur" value="" />
              <Picker.Item label="Autre" value="AUTRE" />
              <Picker.Item label="FRK" value="FRK" />
            </Picker>
          </View>
        </View>
      ) : null}
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

export default ButtonComponent;
