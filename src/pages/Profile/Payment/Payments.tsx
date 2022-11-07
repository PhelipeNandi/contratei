import { ListRenderItemInfo } from 'react-native';
import { Center, FlatList, Text, useTheme, VStack, Button as NativeBaseButton } from 'native-base';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigation } from '@react-navigation/native';
import { CreditCard as IconCreditCard, Warning } from 'phosphor-react-native';

import { CreditCard } from '../../../types/user';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { propsStack } from '../../../routes/Navigators/Models';

import { Header } from '../../../components/ui/Header';
import { Button } from '../../../components/ui/Button';
import { Loading } from '../../../components/ui/Loading';
import { ItemCreditCard, removeCreditCard, searchCreditCards } from '../../../features/payments';
import { useCreditCardContext } from '../../../hooks/useCreditCardContex';
import { Modal } from '../../../components/form/Modal';
import { useState } from 'react';

export function Payments() {
    const { colors } = useTheme();
    const navigation = useNavigation<propsStack>();
    const { user } = useAuthContext();
    const queryClient = useQueryClient();
    const creditCardContext = useCreditCardContext();
    const [idCreditCard, setIdCreditCard] = useState<number | null>(null);
    const [showModal, setShowModal] = useState<boolean>(false);

    const {
        data,
        isSuccess,
        isLoading,
        isError
    } = useQuery(["creditCards", user.id], () => searchCreditCards(user.id));

    const {
        isLoading: isLoadingRemoveCreditCard,
        mutate
    } = useMutation((idCreditCard: number) => removeCreditCard(idCreditCard), {
        onSuccess: () => {
            queryClient.invalidateQueries("creditCards");
            setIdCreditCard(null);
        }
    });

    function renderItemCreditCard({ item }: ListRenderItemInfo<CreditCard>) {
        return <ItemCreditCard
            number={item.number}
            onPress={() => {
                creditCardContext.setCreditCard(item);
                creditCardContext.setIsEditing(true);
                navigation.navigate("addNewCreditCard");
            }}
            onDeleteCreditCard={() => {
                setIdCreditCard(item.id);
                setShowModal(true);
            }}
        />
    }

    return (
        <VStack flex={1} background="background">

            <Header title="Pagamentos" />

            <VStack mt={5} flex={1} px={8}>

                {
                    isLoading &&
                    <Loading />
                }

                {
                    isError &&
                    <Center flex={1}>
                        <Warning color={colors.red[600]} size={32} />
                        <Text mt={4} textAlign="center" color="gray.300" fontFamily="body" fontSize="sm">
                            Aconteceu um erro ao buscar {"\n"}
                            seus cartões de crédito
                        </Text>
                    </Center>
                }

                {
                    isSuccess &&
                    <FlatList
                        data={data}
                        keyExtractor={(creditCard) => creditCard.id.toString()}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ flexGrow: 1 }}
                        renderItem={renderItemCreditCard}
                        ListEmptyComponent={() => (
                            <Center flex={1}>
                                <IconCreditCard color={colors.gray[300]} size={32} />
                                <Text mt={4} textAlign="center" color="gray.300" fontFamily="body" fontSize="sm">
                                    Você ainda não possui nenhum {"\n"}
                                    cartão de crédito cadastrado
                                </Text>
                            </Center>
                        )}
                    />
                }

            </VStack>

            <Button
                mx={5}
                my={5}
                title="Cadastrar"
                variant="primary"
                onPress={() => {
                    creditCardContext.setCreditCard(null);
                    creditCardContext.setIsEditing(false);
                    navigation.navigate("addNewCreditCard")
                }}
            />

            <Modal
                header="Excluir"
                body="Você tem certeza que quer excluir este cartão?"
                icon={IconCreditCard}
                isOpen={showModal}
                onClose={() => setShowModal(false)}
            >
                <NativeBaseButton.Group space={2}>
                    <Button
                        title="Cancelar"
                        variant="primary"
                        onPress={() => setShowModal(false)}
                    />
                    <Button
                        title="Excluir"
                        variant="danger"
                        isLoading={isLoadingRemoveCreditCard}
                        isLoadingText="Excluindo"
                        onPress={() => {
                            mutate(idCreditCard);
                            setShowModal(false);
                        }}
                    />
                </NativeBaseButton.Group>
            </Modal>

        </VStack>
    );
}