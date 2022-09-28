import { useEffect, useState } from 'react';
import { HStack, VStack, Button as NativeBaseButton } from 'native-base';
import { useQuery } from 'react-query';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';
import { AddressBook } from 'phosphor-react-native';

import { NewAddress } from '../../../types/user';

import { Header } from '../../../components/ui/Header';
import { Input } from '../../../components/form/Input';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/form/Modal';
import { searchAddressViaCep } from '../../../features/addNewAddress';
import { useAddressContext } from '../../../hooks/useAddressContext';
import { useNavigation } from '@react-navigation/native';

const addNewAddressForm: yup.SchemaOf<NewAddress> = yup.object({
    state: yup.string().required("Estado obrigatório"),
    city: yup.string().required("Cidade obrigatório"),
    district: yup.string().required("Bairro obrigatório"),
    street: yup.string().required("Rua obrigatório"),
    numberStreet: yup.string().required("Número obrigatório"),
    postCode: yup.string().required("Cep obrigatório"),
});

export function AddNewAddress() {
    const addressContext = useAddressContext();
    const navigation = useNavigation();
    const [disable, setDisable] = useState<boolean>(true);
    const [searchPostalCode, setSearchPostalCode] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);

    useEffect(() => {
        if (addressContext.address) {
            setValue("postCode", addressContext.address.postCode);
            setValue("street", addressContext.address.street);
            setValue("district", addressContext.address.district);
            setValue("city", addressContext.address.city);
            setValue("state", addressContext.address.state);
            setValue("numberStreet", addressContext.address.numberStreet);
            setDisable(false);
        }
    }, []);

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        getValues,
        formState: { errors, isSubmitSuccessful }
    } = useForm<NewAddress>({
        resolver: yupResolver(addNewAddressForm)
    });

    const postalCodeValue = watch("postCode");

    const {
        data,
        isLoading
    } = useQuery('address', () => searchAddressViaCep(getValues("postCode")), {
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

    useEffect(() => {
        if (postalCodeValue === undefined || postalCodeValue.length < 8) {
            setSearchPostalCode(false);
        } else {
            setSearchPostalCode(true);
        }
    }, [postalCodeValue]);

    return (
        <VStack flex={1} bg="background">

            <Header title="Castrar novo Endereço" />

            <VStack flex={1} mt={16} mx={8}>

                <Controller
                    control={control}
                    name="postCode"
                    render={({ field: { value, onChange } }) => (
                        <Input
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

                <HStack mt={5} space={4}>
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
                        onPress={() => {
                            addressContext.setIsModalOpen(true);
                            navigation.goBack();
                        }}
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
                        />
                    </NativeBaseButton.Group>
                </Modal>

            </VStack>

        </VStack >
    );
}