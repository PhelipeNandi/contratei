import { useState } from 'react';
import { VStack, HStack, Text, IconButton, useTheme, Box, Pressable, ScrollView } from 'native-base';
import { FilePlus, FilePdf, TrashSimple, WhatsappLogo } from 'phosphor-react-native';

import { ProviderBudget } from '../../types/provider';
import { DocumentProposal } from '../../types/budget';
import { pickDocument } from '../../features/proposal';
import { useAuthContext } from '../../hooks/useAuthContext';

import { Header } from '../../components/ui/Header';
import { Button } from '../../components/ui/Button';
import { TextArea } from '../../components/form/TextArea';
import { CardProvider } from '../../features/budget';

export function Proposal() {
    const { colors } = useTheme();
    const { isConsumer } = useAuthContext();
    const [document, setDocument] = useState<DocumentProposal | null>();

    const provider: ProviderBudget =
    {
        id: 1,
        firstName: 'Fornecedor',
        lastName: '1',
        contactNumber: '(48) 99999-9999',
        profilePicture: null
    }

    async function pickProposalDocument() {
        await pickDocument()
            .then((document) => {
                setDocument(document);
            });
    }

    async function handleRemoveDocument() {
        setDocument(null);
    }

    async function handleOpenDocument() {

    }

    async function handleSendWhatsappMessageProvider() {

    }

    return (
        <VStack flex={1} justifyContent="center" bg="background">

            <Header title="Oferta" />

            <ScrollView>
                <VStack flex={1} mt={5} px={8} bg="background">

                    {
                        !isConsumer &&
                        <VStack>
                            <Text mb={3} fontFamily="body" fontSize="xs" color="gray.300">
                                Fornecedor
                            </Text>

                            <HStack mb={5} justifyContent="space-between" alignItems="center">
                                <CardProvider
                                    data={provider}
                                />

                                <IconButton
                                    icon={<WhatsappLogo color={colors.green[700]} size="40" weight='fill' />}
                                    onPress={handleSendWhatsappMessageProvider}
                                />
                            </HStack>
                        </VStack>
                    }

                    <TextArea
                        h={80}
                        p={6}
                        shadow={5}
                        title="Descrição"
                    />

                    <HStack mt={5} justifyContent="space-between" alignItems="center">
                        <Text mb={2} fontFamily="body" fontSize="xs" color="gray.300">
                            Documento de Proposta
                        </Text>

                        {
                            document &&
                            <IconButton
                                icon={<TrashSimple color={colors.red[700]} size="20" weight='fill' />}
                                onPress={handleRemoveDocument}
                            />
                        }
                    </HStack>

                    <Pressable
                        _pressed={{ backgroundColor: "white" }}
                        onPress={document ? handleOpenDocument : pickProposalDocument}
                    >
                        <Box
                            py={8}
                            bg="white"
                            shadow={1}
                            borderRadius="lg"
                            alignItems="center"
                        >
                            {
                                document
                                    ? <FilePdf color={colors.primary[700]} size={60} />
                                    : <FilePlus color={colors.primary[700]} size={60} />
                            }
                        </Box>
                    </Pressable>

                    {
                        !isConsumer &&
                        <Button
                            my={7}
                            variant="primary"
                            title="Enviar"
                        />
                    }

                    {
                        isConsumer &&
                        <Button
                            my={7}
                            variant="sucess"
                            title="Aceitar"
                        />
                    }

                </VStack>
            </ScrollView>

        </VStack>
    );
}