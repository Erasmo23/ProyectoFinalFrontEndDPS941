import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Card, Datepicker, Input, Layout, Modal, Text } from '@ui-kitten/components';

import { Formik } from 'formik';
import * as Yup from 'yup';

import type { RootStackParams } from '../../navigation/StackNavigation';
import { CustomKittenIcon } from '../../components/ui/CustomKittenIcon';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { LabelErrorForm } from '../../components/ui/LabelErrorForm';
import { MainLayoutDoctor } from '../../layouts/MainLayoutDoctor';
import type { Cita } from '../../../domain/entities/Cita';
import { emptyCita, getCitaByIdAction, updateReprogramacionCitaAction } from '../../../actions/get-citas';
import type { ReprogramacionCita } from '../../../domain/entities/ReprogramacionCita';

interface Props extends StackScreenProps<RootStackParams, 'ReprogramarCitaScreen'> { }

const reprogramacionCitaFormSchema = Yup.object().shape({
    comentariosAdicionales: Yup.string().required('Comentarios Adiccionales son Requeridos'),
    fechaReprogramacion: Yup.date().required('Fecha de cita es Requerida')
});

const useCita = (id: number) => {

    const [cita, setCita] = useState<Cita>(emptyCita);

    useEffect(() => {

        const fechData = async () => {
            const dataReturn = await getCitaByIdAction(id);
            setCita(dataReturn);
        }

        fechData();

    }, []);

    return {
        cita,
    }
}


export const ReprogramarCitaScreen = ({ navigation, route }: Props) => {

    const { id } = route.params;
    const { logout } = useAuthStore();
    const { top } = useSafeAreaInsets();
    const { cita } = useCita(id);

    const [isSendForm, setIsSendForm] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const [textModalResult, setTextModalResult] = useState('');

    const reprogramacionCita : ReprogramacionCita = {
       citaId: id,
       fechaReprogramacion: new Date(),
       comentariosAdicionales: ''
    }

    const onSubmitFormRegistroCita = async (data: ReprogramacionCita) => {
        setIsSendForm(true);

        const responseApi = await updateReprogramacionCitaAction(data);

        if (responseApi.code === '1') {

            Alert.alert('Resultado',
                responseApi.messages,
                [{ text: 'Aceptar', onPress: () => navigation.push('CitasPendientesScreen') }]
            );

        } else {
            setIsSendForm(false);
            setTextModalResult(responseApi.messages);
            setVisibleModal(true);
        }

    }


    return (

        <Formik initialValues={reprogramacionCita} onSubmit={onSubmitFormRegistroCita}
            validationSchema={reprogramacionCitaFormSchema} enableReinitialize validateOnMount>

            {({ handleChange, handleBlur, handleSubmit, values, isValid, errors, touched, setFieldValue }) => (

                <MainLayoutDoctor title={'ReProgramar Cita'} rightAction={logout} rightActionIcon='log-out'>

                    <Layout style={{ flex: 1, paddingTop: top }} >

                        <ScrollView style={{ marginHorizontal: 25 }} showsVerticalScrollIndicator={false}>

                            <Layout style={{ marginBottom: 30 }}>
                                <Text category='h4' status='danger' style={{ textAlign: 'center' }} >
                                    Reprogramación de Cita del paciente {cita.paciente}
                                </Text>
                            </Layout>

                            {/* Inputs*/}

                            <Layout style={{ marginTop: 20 }}>
                                <Text>Doctor: {cita.doctor}</Text>
                                <Text>Consultorio: {cita.consultorio}</Text>
                                <Text status='warning'>Fecha Actual de Cita: {cita.fechacita}</Text>
                            </Layout>

                            <Layout style={{ marginTop: 20 }}>

                                <Datepicker
                                    label='Fecha de ReProgramacion'
                                    accessoryRight={<CustomKittenIcon name='calendar' />}
                                    //max={new Date()}
                                    min={new Date(1920, 0, 1)}
                                    date={values.fechaReprogramacion}
                                    onSelect={nextDate => setFieldValue('fechaReprogramacion', nextDate)}
                                    caption={(errors.fechaReprogramacion && touched) &&
                                        <LabelErrorForm text={'Error Fecha de Cita'} />}
                                />

                                <Input label='Comentarios Adiccionales'
                                    placeholder='Comentarios Adiccionales'
                                    maxLength={300}
                                    numberOfLines={5}
                                    multiline
                                    autoCapitalize='none'
                                    value={values.comentariosAdicionales}
                                    onChangeText={handleChange('comentariosAdicionales')}
                                    onBlur={handleBlur('comentariosAdicionales')}
                                    accessoryLeft={<CustomKittenIcon name='text' />}
                                    style={{ marginBottom: 10 }}
                                    caption={(errors.comentariosAdicionales && touched) &&
                                        <LabelErrorForm text={errors.comentariosAdicionales} />}
                                />

                            </Layout>

                            <Layout style={{ height: 20 }} />

                            <Layout>
                                <Button accessoryRight={<CustomKittenIcon name='edit-2' white />}
                                    onPress={() => handleSubmit()} disabled={!isValid && !isSendForm}>
                                    ReProgramar Cita
                                </Button>
                            </Layout>

                            <Layout style={{ height: 180 }} />

                        </ScrollView>

                    </Layout>
                    <Modal visible={visibleModal} backdropStyle={styles.backdrop} onBackdropPress={() => setVisibleModal(false)} >
                        <Card disabled={true}>
                            <Text>{textModalResult}</Text>
                            <Button onPress={() => setVisibleModal(false)} appearance='ghost' size='giant' status='danger' accessoryRight={<CustomKittenIcon name='close' color='color-danger-600' />} />
                        </Card>
                    </Modal>
                </MainLayoutDoctor>
            )}
        </Formik>
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

