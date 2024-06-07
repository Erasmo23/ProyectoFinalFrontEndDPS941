import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Input, Layout, Text } from '@ui-kitten/components';

import type { RootStackParams } from '../../navigation/StackNavigation';
import { CustomKittenIcon } from '../../components/ui/CustomKittenIcon';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { MainLayoutDoctor } from '../../layouts/MainLayoutDoctor';
import { getCitaFullDataByIdAction } from '../../../actions/get-citas';
import type { CitaFullDataAPIResponse } from '../../../infrastructure/interfaces/citas.response';
import { LoadingScreen } from '../loading/LoadingScreen';

interface Props extends StackScreenProps<RootStackParams, 'VerCitaScreen'> { }

const useCita = (id: number) => {

    const [cita, setCita] = useState<CitaFullDataAPIResponse>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {

        const fechData = async () => {
            const dataReturn = await getCitaFullDataByIdAction(id);
            setCita(dataReturn);
            setIsLoading(true);
        }

        fechData();

    }, []);

    return {
        cita,
        isLoading
    }
}


export const VerCitaScreen = ({ navigation, route }: Props) => {

    const { id } = route.params;
    const { logout } = useAuthStore();
    const { top } = useSafeAreaInsets();
    const { cita, isLoading } = useCita(id);

    if (!cita) {
        return <LoadingScreen />
    }

    return (
        <MainLayoutDoctor title={'Consulta Cita'} rightAction={logout} rightActionIcon='log-out'>

            <Layout style={{ flex: 1, paddingTop: top }} >

                <ScrollView style={{ marginHorizontal: 25 }} showsVerticalScrollIndicator={false}>

                    <Layout style={{ marginBottom: 5 }}>
                        <Text category='h4' status='danger' style={{ textAlign: 'center' }} >
                            Consulta de Cita
                        </Text>
                    </Layout>


                    {/* Inputs*/}
                    <Layout style={{ marginTop: 20 }}>

                        <Input label='Paciente'
                            numberOfLines={2}
                            multiline
                            readOnly
                            value={cita.paciente}
                            accessoryLeft={<CustomKittenIcon name='person' />}
                            style={{ marginBottom: 10 }}
                        />

                        <Input label='Doctor que Atendio'
                            numberOfLines={2}
                            multiline
                            readOnly
                            value={cita.doctor}
                            accessoryLeft={<CustomKittenIcon name='person' />}
                            style={{ marginBottom: 10 }}
                        />

                        <Input label='Habitación donde fue atentido'
                            readOnly
                            value={cita.consultorio}
                            accessoryLeft={<CustomKittenIcon name='pin-outline' />}
                            style={{ marginBottom: 10 }}
                        />

                        <Input label='Fecha Cita'
                            readOnly
                            value={cita.fechacita}
                            accessoryLeft={<CustomKittenIcon name='calendar' />}
                            style={{ marginBottom: 10 }}
                        />

                        <Input label='Fecha Finalizada'
                            readOnly
                            value={cita.fechaFin}
                            accessoryLeft={<CustomKittenIcon name='calendar' />}
                            style={{ marginBottom: 10 }}
                        />

                        {
                            cita.fechaReprogramada &&

                            <>
                                <Input label='Fecha Reprogramación'
                                    readOnly
                                    value={cita.fechaReprogramada}
                                    accessoryLeft={<CustomKittenIcon name='calendar' />}
                                    style={{ marginBottom: 10 }}
                                />

                                <Input label='Motivo de ReProgramación'
                                    readOnly
                                    value={cita.comentariosAdiccionales}
                                    accessoryLeft={<CustomKittenIcon name='text' />}
                                    style={{ marginBottom: 10 }}
                                />
                            </>

                        }

                        <Input label='Estado'
                            readOnly
                            value={cita.estado}
                            accessoryLeft={<CustomKittenIcon name='pricetags-outline' />}
                            style={{ marginBottom: 10 }}
                        />

                        <Input label='Origen de la cita'
                            numberOfLines={5}
                            multiline
                            readOnly
                            value={cita.origen}
                            accessoryLeft={<CustomKittenIcon name='text' />}
                            style={{ marginBottom: 10 }}
                        />

                        <Input label='Tratamiento'
                            readOnly
                            numberOfLines={5}
                            multiline
                            value={cita.tratamiento}
                            accessoryLeft={<CustomKittenIcon name='text' />}
                            style={{ marginBottom: 10 }}

                        />

                        <Input label='Medicinas recetadas'
                            readOnly
                            numberOfLines={5}
                            multiline
                            value={cita.medicinas}
                            accessoryLeft={<CustomKittenIcon name='text' />}
                            style={{ marginBottom: 10 }}
                        />

                    </Layout>

                    <Layout style={{ height: 20 }} />

                    <Layout>
                        <Button status='success' accessoryLeft={<CustomKittenIcon name='undo-outline' white />}
                            onPress={() => { navigation.goBack() }} >
                            Regresar
                        </Button>
                    </Layout>

                    <Layout style={{ height: 180 }} />

                </ScrollView>

            </Layout>
        </MainLayoutDoctor>
    )
}

const styles = StyleSheet.create({
    containerModal: {
        minHeight: 192,
    },
    backdrop: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    inputAndroid: {
        fontSize: 14,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: 'blue',
        borderRadius: 8,
        color: 'black',
        paddingRight: 30, // to ensure the text is never behind the icon
    },
});

