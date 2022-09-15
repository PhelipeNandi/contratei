import { VStack, Avatar, HStack, Box, ScrollView } from 'native-base';

import { Header } from '../../components/ui/Header';
import { Input } from '../../components/form/Input';
import { Button } from '../../components/ui/Button';
import { useAuthContext } from '../../hooks/useAuthContext';
import { TextArea } from '../../components/form/TextArea';

export function PersonalInformation() {
    const { user } = useAuthContext();

    return (
        <VStack flex={1}>

            <Header title="Informações Pessoais" />

            <ScrollView>

                <VStack flex={1} px={5} bg="background">

                    <Avatar
                        mt={8}
                        alignSelf="center"
                        bg="gray.500"
                        size="2xl"
                        source={{ uri: "https://avatars.githubusercontent.com/u/46757393?v=4" }}
                    />

                    <HStack mt={6} justifyContent="space-between">
                        <Box flex={1}>
                            <Input
                                placeholder="Nome"
                                value={user.firstName}
                            />
                        </Box>

                        <Box flex={1} pl={2}>
                            <Input
                                placeholder="Sobrenome"
                                value={user.lastName}
                            />
                        </Box>
                    </HStack>


                    <Input
                        mt={5}
                        placeholder="E-mail"
                        value={user.email}
                    />

                    <Input
                        mt={5}
                        placeholder="CPF"
                        value={user.cpf}
                    />

                    <Input
                        mt={5}
                        placeholder="Número de contato"
                        value={user.contactNumber}
                    />

                    {
                        user.type === "Fornecedor" &&
                        <TextArea
                            mt={5}
                            placeholder="Descrição"
                            value={user.description}
                        />
                    }

                    {
                        user.type === "Fornecedor" &&
                        <Input
                            mt={5}
                            placeholder="Distância de Trabalho"
                            value={user.kmWorkRange}
                        />
                    }

                    {
                        user.type === "Fornecedor" &&
                        <Input
                            mt={5}
                            placeholder="Valor por Hora"
                            value={user.hourValue}
                        />
                    }

                    <Button
                        mt={8}
                        title="Salvar"
                    />

                </VStack>

            </ScrollView>

        </VStack>
    );
}