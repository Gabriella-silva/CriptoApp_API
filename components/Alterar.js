import React, { useState} from 'react';
import {View, TextInput, Button, Alert } from "react-native";
import {updateCripto} from './Api';

export default function Alterar({ route, navigation }) {
    const {cripto } = route.params;
    const [nomeCripto, setNomeCripto]= useState(cripto.nomeCripto);
    const [siglaCripto, setSiglaCripto]= useState(cripto.nomeCripto);

    const handleUpdate = () => {
        const updateData = {
            nomeCripto,
            siglaCripto
        };

        Alert.alert(
            'Confirmação',
            'Tem certeza de que deseja alterar esta Cripto?',
            [
                {text:'Cancelar', style:'cancel'},
                {
                    text:'Alterar',
                    onPress:( ) => updateCripto(cripto.codigo, updateData, navigation),
                },
            ]
        );
    };

    return (
        <View>
            <TextInput
            placeholder="Nome da Cripto"
            value={nomeCripto}
            />
        <TextInput
        placeholder="Sigla da Cripto"
        value={siglaCripto}
        onChangeText={setSiglaCripto}
        />
        <Button title="Alterar" onPress={handleUpdate} />
        </View>
    );
}