import { useEffect, useState } from 'react';
import { HStack, VStack } from 'native-base';
import { useQuery } from 'react-query';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup';

import { NewAdress } from '../../../types/user';

import { Header } from '../../../components/ui/Header';
import { Input } from '../../../components/form/Input';
import { Button } from '../../../components/ui/Button';
import { searchAdressViaCep } from '../../../features/addNewAdress';

const addNewAdressForm: yup.SchemaOf<NewAdress> = yup.object({
    state: yup.string().required("Estado obrigatório"),
    city: yup.string().required("Cidade obrigatório"),
    district: yup.string().required("Bairro obrigatório"),
    street: yup.string().required("Rua obrigatório"),
    numberStreet: yup.string().required("Número obrigatório"),
    postCode: yup.string().required("Cep obrigatório"),
});

export function AddNewAdress() {
    const [disable, setDisable] = useState<boolean>(true);
    const [searchPostalCode, setSearchPostalCode] = useState<boolean>(false);

    const {
        control,
        handleSubmit,
        watch,
        setValue,
        getValues,
        formState: { errors, isSubmitSuccessful }
    } = useForm<NewAdress>({
        resolver: yupResolver(addNewAdressForm)
    });

    const postalCodeValue = watch("postCode");

    const {
        data,
        isLoading
    } = useQuery('adress', () => searchAdressViaCep(getValues("postCode")), {
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
        if (postalCodeValue != undefined && postalCodeValue.length >= 8) {
            setSearchPostalCode(true);
        }
    }, [postalCodeValue]);

    return (
        <VStack flex={1} bg="background">

            <Header title="Castrar novo Endereço" />

            <VStack flex={1} mt={24} mx={8}>

                <Controller
                    control={control}
                    name="postCode"
                    render={({ field: { value, onChange } }) => (
                        <Input
                            placeholder="CEP"
                            value={value}
                            onChangeText={onChange}
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
                            errorMessage={errors.numberStreet?.message}
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

                <Button
                    mt={5}
                    title="Salvar"
                />

            </VStack>

        </VStack >
    );
}