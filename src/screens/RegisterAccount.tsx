import { useState, useEffect } from 'react';
import { VStack, ScrollView, Text } from 'native-base';

import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { RadioButton } from '../components/RadioButton';

export function RegisterAccount() {
    const [type, setType] = useState('');

    return (
        <VStack flex={1} bg="background">

            <Header title="Cadastrar-se" />

            <ScrollView mt={10} px={8}>

                <RadioButton
                    name="Tipo"
                    defaultValue="Consumidor"
                    onChange={setType}
                    optionOne="Consumidor"
                    optionTwo="Fornecedor"
                />

                <Input
                    mb={3}
                    placeholder='Nome'
                />

                <Input
                    mb={3}
                    placeholder='Sobrenome'
                />

                <Input
                    mb={3}
                    placeholder='CPF'
                />

                <Input
                    mb={3}
                    placeholder='Tipo'
                />

                <Input
                    mb={3}
                    placeholder='E-mail'
                />

                <Input
                    mb={3}
                    placeholder='Senha'
                />

                <Input
                    mb={3}
                    placeholder='Confirmar Senha'
                />

            </ScrollView>

        </VStack>
    );
}