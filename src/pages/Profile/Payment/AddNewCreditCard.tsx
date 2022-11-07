import { useEffect, useState } from 'react';
import { VStack, HStack, Box, Icon, useTheme } from 'native-base';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { User, DotsThree, CalendarBlank, Lock } from 'phosphor-react-native';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

import { NewCreditCard } from '../../../types/user';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { normalizeNumberCreditCard } from '../../../utils/formatStrings';
import { useCreditCardContext } from '../../../hooks/useCreditCardContex';
import { maskDateValidityCreditCard, maskValidityCreditCard } from '../../../utils/masks';

import { Header } from '../../../components/ui/Header';
import { Input } from '../../../components/form/Input';
import { Button } from '../../../components/ui/Button';
import { CardCreditCard, createNewCreditCard } from '../../../features/payments';

const addNewCreditCardForm: yup.SchemaOf<NewCreditCard> = yup.object({
    id: yup.number().nullable(),
    number: yup.string().required("Número obrigatório"),
    holder: yup.string().required("Nome obrigatório"),
    validity: yup.string().required("Validade obrigatória"),
    cvv: yup.string().required("CVV obrigatório"),
})

export function AddNewCreditCard() {
    const { colors } = useTheme();
    const navigation = useNavigation();
    const { user } = useAuthContext();
    const [cvv, setCvv] = useState("");
    const [number, setNumber] = useState("");
    const [holder, setHolder] = useState("");
    const [validity, setValidty] = useState("");
    const queryClient = useQueryClient();
    const creditCardContext = useCreditCardContext();

    useEffect(() => {
        if (creditCardContext.isEditing) {
            setValue("id", creditCardContext.creditCard.id);
            setValue("holder", creditCardContext.creditCard.holder);
            setValue("number", creditCardContext.creditCard.number);
            setValue("validity", maskDateValidityCreditCard(creditCardContext.creditCard.validity));
            setValue("cvv", creditCardContext.creditCard.cvv);
        }
    }, []);

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        formState: { errors }
    } = useForm<NewCreditCard>({
        resolver: yupResolver(addNewCreditCardForm)
    });

    const numberValue = watch("number");
    const holderValue = watch("holder");
    const validityValue = watch("validity");
    const cvvValue = watch("cvv");

    useEffect(() => {
        setNumber(numberValue);
        if (!creditCardContext.isEditing) setValue("number", normalizeNumberCreditCard(numberValue));
    }, [numberValue]);

    useEffect(() => { setHolder(holderValue); }, [holderValue]);
    useEffect(() => {
        setValidty(validityValue);
        if (!creditCardContext.isEditing) setValue("validity", maskValidityCreditCard(validityValue));
    }, [validityValue]);
    useEffect(() => { setCvv(cvvValue); }, [cvvValue]);

    const {
        isLoading: isLoadingCreateNewCreditCard,
        mutate: mutateCreateNewCreditCard,
    } = useMutation((data: NewCreditCard) => createNewCreditCard(data, user.id), {
        onSuccess: () => {
            queryClient.invalidateQueries("creditCards");
            navigation.goBack();
        }
    });

    return (
        <VStack flex={1}>

            <Header title="Pagamentos" />

            <VStack flex={1} px={8} justifyContent="center" bg="background">

                <CardCreditCard
                    data={{
                        number: number,
                        holder: holder,
                        validity: validity,
                        cvv: cvv
                    }}
                />

                <Controller
                    control={control}
                    name="holder"
                    render={({ field: { value, onChange } }) => (
                        <Input
                            mt={5}
                            placeholder="Nome do titular"
                            InputLeftElement={<Icon as={<User color={colors.secondary[700]} />} ml={4} />}
                            value={value}
                            onChangeText={onChange}
                            errorMessage={errors.holder?.message}
                            isDisabled={creditCardContext.isEditing}
                        />
                    )}
                />

                <Controller
                    control={control}
                    name="number"
                    render={({ field: { value, onChange } }) => (
                        <Input
                            mt={5}
                            placeholder="Número do cartão"
                            InputLeftElement={<Icon as={<DotsThree color={colors.secondary[700]} />} ml={4} />}
                            value={value}
                            onChangeText={onChange}
                            errorMessage={errors.number?.message}
                            keyboardType="numeric"
                            maxLength={19}
                            isDisabled={creditCardContext.isEditing}
                        />
                    )}
                />

                <HStack mt={6} justifyContent="space-between">
                    <Box flex={1}>
                        <Controller
                            control={control}
                            name="validity"
                            render={({ field: { value, onChange } }) => (
                                <Input
                                    placeholder="Validade"
                                    InputLeftElement={<Icon as={<CalendarBlank color={colors.secondary[700]} />} ml={4} />}
                                    value={value}
                                    onChangeText={onChange}
                                    errorMessage={errors.validity?.message}
                                    keyboardType="numeric"
                                    maxLength={5}
                                    isDisabled={creditCardContext.isEditing}
                                />
                            )}
                        />
                    </Box>

                    <Box flex={1} pl={2}>
                        <Controller
                            control={control}
                            name="cvv"
                            render={({ field: { value, onChange } }) => (
                                <Input
                                    placeholder="CVV"
                                    InputLeftElement={<Icon as={<Lock color={colors.secondary[700]} />} ml={4} />}
                                    value={value}
                                    onChangeText={onChange}
                                    errorMessage={errors.cvv?.message}
                                    keyboardType="numeric"
                                    maxLength={3}
                                    isDisabled={creditCardContext.isEditing}
                                />
                            )}
                        />
                    </Box>
                </HStack>

                <Button
                    mt={8}
                    title="Cadastrar"
                    variant="sucess"
                    isLoadingText="Salvando"
                    isLoading={isLoadingCreateNewCreditCard}
                    onPress={handleSubmit((value) => { mutateCreateNewCreditCard(value) })}
                    isDisabled={creditCardContext.isEditing}
                />
            </VStack>
        </VStack>
    );
}