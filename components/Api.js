const API_URL = 'http://criptptos.webapptech.cloud/api/cripto';
import { Alert } from "react-native";

export const fetchCripto = async ( setRegistros ) => {
    try {
        const response = await fetch(API_URL);
        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error('Error ao buscar Criptos:', error);
        return [];
    }
};

export const createCripto = async (CriptoData ) => {
    try{
        const response = await fetch('http://criptptos.webapptech.cloud/api/cripto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(CriptoData),
        });

        if (response.status ===204) {
            Alert.alert('Sucesso!', 'Cadastro realizado com sucesso!');
            return {};
        }

        const textResponse = await response.text();
        console.log('Resposta bruta bruta da API:', textResponse);

        let responseData;
        try {
            responseData = JSON.parse(textResponse);
        } catch (error) {
            console.warn('A responsta não é um JSON válido.');
            responseData = null;
        }

        if (!response.ok || !responseData) {
            throw new Error(responseData?.message || 'Erro desconhecido na API');
        }

        return responseData;
    } catch (error) {
        console.error('Error ao cadastrar Cripto:', error.message);
        Alert.alert('Erro ao cadastrar', 'Detalhes: ${error.message');
        return null;
    }
};

export const deleteCripto = async (CriptoId, setRegistros) => {
    try {
        const response = await fetch ('http://criptptos.webapptech.cloud/api/cripto${CriptoId}', {
            method: 'DELETE',
        });

        if (response.ok) {
            const responseData = await response.json();

            if (responseData.success) {
                Alert.alert('Sucesso !', responseData.message);

setRegistros((prevRegistros) => {
    const novaLista = prevRegistros.filter((Cripto) => Cripto.codigo != CriptoId);
    console.log('Nove lista de Criptos:', novaLista);
    return novaLista;
});
            } else {
                Alert.alert('Erro', responseData.message);
            }
        } else {

            const textResponse = await response.text();
            let responseData = null;

            try {
                responseData = JSON.parse(textResponse);
            } catch (error) {
                console.warn('A resposta não é um JSON válido.');
            }

            throw new Error(responseData?.message || 'Erro desconhecido ao exluir o Cripto');
        }
    }catch (error) {
        console.error('Erro ao excluir Cripto:', error.message);
        Alert.alert('Erro ao excluir', 'Detalhes: ${error.message');
    }
};

export const updateCripto = async (Cripto, updateData, navigation) => {
    try {
        const response = await fetch ('http://criptptos.webapptech.cloud/api/cripto${CriptoId}', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        });
        console.log('Dados enviados:', updatedData);
        if (response.status === 200 || response.status ===204) {
            Alert.alert('Sucesso!', 'Cripto atualizado com sucesso!');
            navigation.navigate('Home');
    } else {
        let responseData;
        try {
            responseData = JSON.parse(textResponse);
        } catch (error) {
            responseData = null;
            console.warn('A resposta não é um JSON válido.');
        }

        throw new Error(responseData?.message || 'Erro desconhecido ao atualizar o Cripto');
    }
} catch (error) {
    console.error('Erro ao atualizar Cripto:', error.message);
    Alert.alert('Erro ao atualizar', 'Detalhes: ${error.message}');
}
};