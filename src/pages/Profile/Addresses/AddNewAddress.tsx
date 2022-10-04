import { useEffect, useState } from 'react';
import { HStack, VStack, Button as NativeBaseButton, ScrollView, Collapse } from 'native-base';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { AddressBook } from 'phosphor-react-native';

import { NewAddress } from '../../../types/user';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { useAddressContext } from '../../../hooks/useAddressContext';

import { Header } from '../../../components/ui/Header';
import { Input } from '../../../components/form/Input';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/form/Modal';
import { Checkbox } from '../../../components/form/Checkbox';
import { Alert } from '../../../components/form/Alert';
import { createNewAdress, searchAddressViaCep, alterAddress, deleteAddress } from '../../../features/addNewAddress';

const addNewAddressForm: yup.SchemaOf<NewAddress> = yup.object({
    id: yup.number().nullable(),
    state: yup.string().required("Estado obrigatório"),
    city: yup.string().required("Cidade obrigatório"),
    district: yup.string().required("Bairro obrigatório"),
    street: yup.string().required("Rua obrigatório"),
    numberStreet: yup.string().required("Número obrigatório"),
    postCode: yup.string().required("Cep obrigatório"),
    complement: yup.string().nullable(),
    isMainAddress: yup.string().nullable()
});

export function AddNewAddress() {
    const addressContext = useAddressContext();
    const navigation = useNavigation();
    const queryClient = useQueryClient();
    const { user } = useAuthContext();
    const [disable, setDisable] = useState<boolean>(true);
    const [searchPostalCode, setSearchPostalCode] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>();

    useEffect(() => {
        if (addressContext.isEditing) {
            setValue("id", addressContext.address.id);
            setValue("isMainAddress", addressContext.address.isMainAddress);
            setValue("postCode", addressContext.address.postCode);
            setValue("street", addressContext.address.street);
            setValue("district", addressContext.address.district);
            setValue("city", addressContext.address.city);
            setValue("state", addressContext.address.state);
            setValue("numberStreet", addressContext.address.numberStreet);
            setValue("complement", addressContext.address.complement);
            setDisable(false);
        }
    }, []);

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        getValues,
        formState: { errors }
    } = useForm<NewAddress>({
        resolver: yupResolver(addNewAddressForm)
    });

    useQuery('address', () => searchAddressViaCep(getValues("postCode")), {
        enabled: searchPostalCode,
        onSuccess: (data) => {
            setValue("postCode", data.postCode);
            setValue("street", data.street);
            setValue("district", data.district);
            setValue("city", data.city);
            setValue("state", data.state);
            setDisable(false);
        }
    });

    const postalCodeValue = watch("postCode");

    useEffect(() => {
        if (addressContext.isEditing || postalCodeValue === undefined || postalCodeValue.length < 8) {
            setSearchPostalCode(false);
        } else {
            setSearchPostalCode(true);
        }
    }, [postalCodeValue]);

    function handleOnSucessAddress() {
        addressContext.setIsModalOpen(true);
        queryClient.invalidateQueries("myAddresses");
        navigation.goBack();
    }

    const {
        isLoading: isLoadingMutation,
        mutate: mutateCreateNewAddress,
    } = useMutation((data: NewAddress) => createNewAdress(data, user), {
        onSuccess: (response) => {
            addressContext.setModalMessage(response);
            handleOnSucessAddress();
        },
        onError: () => {
            setErrorMessage("Erro ao criar endereço, contate o suporte ou tente mais tarde");
            setShowAlert(true);
        }
    });

    const {
        isLoading: isLoadingAlterAddress,
        mutate: mutateAlterAddress
    } = useMutation((data: NewAddress) => alterAddress(data), {
        onSuccess: (response) => {
            addressContext.setModalMessage(response);
            handleOnSucessAddress();
        },
        onError: () => {
            setErrorMessage("Erro ao alterar endereço, contate o suporte ou tente mais tarde");
            setShowAlert(true);
        }
    });

    const {
        isLoading: isLoadingDeleteAddress,
        mutate: mutateDeleteAddress
    } = useMutation((data: NewAddress) => deleteAddress(data.id), {
        onSuccess: (response) => {
            addressContext.setModalMessage(response);
            handleOnSucessAddress();
        },
        onError: () => {
            setErrorMessage("Erro ao excluir endereço, contate o suporte ou tente mais tarde");
            setShowAlert(true);
        }
    });

    return (
        <VStack flex={1} bg="background">

            <Header title={addressContext.isEditing ? "Editar Endereço" : "Castrar novo Endereço"} />

            <Collapse mt={2} isOpen={showAlert}>
                <Alert
                    status="error"
                    header={errorMessage}
                    onPress={() => setShowAlert(false)}
                />
            </Collapse>

            <VStack flex={1} mt={5} mx={8}>
                <ScrollView showsVerticalScrollIndicator={false}>

                    <Controller
                        control={control}
                        name="isMainAddress"
                        render={({ field: { value, onChange } }) => (
                            <Checkbox
                                title="Endereço principal?"
                                value={value}
                                onChange={onChange}
                                isChecked={!!value}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="postCode"
                        render={({ field: { value, onChange } }) => (
                            <Input
                                mt={4}
                                placeholder="CEP"
                                value={value}
                                onChangeText={onChange}
                                keyboardType="numeric"
                                errorMessage={errors.postCode?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="street"
                        render={({ field: { value, onChange } }) => (
                            <Input
                                mt={4}
                                isDisabled={disable}
                                placeholder="Rua"
                                value={value}
                                onChangeText={onChange}
                                errorMessage={errors.street?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="district"
                        render={({ field: { value, onChange } }) => (
                            <Input
                                mt={4}
                                isDisabled={disable}
                                placeholder="Bairro"
                                value={value}
                                onChangeText={onChange}
                                errorMessage={errors.district?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="numberStreet"
                        render={({ field: { value, onChange } }) => (
                            <Input
                                mt={4}
                                isDisabled={disable}
                                placeholder="Número"
                                value={value}
                                onChangeText={onChange}
                                keyboardType="numeric"
                                errorMessage={errors.numberStreet?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="state"
                        render={({ field: { value, onChange } }) => (
                            <Input
                                mt={4}
                                isDisabled={disable}
                                placeholder="Estado"
                                value={value}
                                onChangeText={onChange}
                                errorMessage={errors.state?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="city"
                        render={({ field: { value, onChange } }) => (
                            <Input
                                mt={4}
                                isDisabled={disable}
                                placeholder="Cidade"
                                value={value}
                                onChangeText={onChange}
                                errorMessage={errors.city?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="complement"
                        render={({ field: { value, onChange } }) => (
                            <Input
                                mt={4}
                                isDisabled={disable}
                                placeholder="Complemento"
                                value={value}
                                onChangeText={onChange}
                                errorMessage={errors.complement?.message}
                            />
                        )}
                    />

                    <HStack mt={5} mb={3} space={4}>
                        {
                            addressContext.isEditing &&
                            <Button
                                flex={1}
                                title="Excluir"
                                variant="danger"
                                onPress={() => setShowModal(true)}
                            />
                        }

                        <Button
                            flex={1}
                            title="Salvar"
                            variant="sucess"
                            isLoading={isLoadingMutation || isLoadingAlterAddress}
                            isLoadingText="Salvando"
                            onPress={handleSubmit((value) => {
                                if (addressContext.isEditing) {
                                    mutateAlterAddress(value)
                                } else {
                                    mutateCreateNewAddress(value)
                                }
                            })}
                        />
                    </HStack>

                    <Modal
                        header="Exclusão"
                        body="Você tem certeza que quer excluir esse endereço?"
                        icon={AddressBook}
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
                                isLoading={isLoadingDeleteAddress}
                                isLoadingText="Deletando"
                                onPress={handleSubmit((value) => mutateDeleteAddress(value))}
                            />
                        </NativeBaseButton.Group>
                    </Modal>
                </ScrollView>
            </VStack>
        </VStack >
    );
}