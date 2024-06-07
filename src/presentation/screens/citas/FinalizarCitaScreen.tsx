import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Card, Input, Layout, Modal, Text } from '@ui-kitten/components';

import { Formik } from 'formik';
import * as Yup from 'yup';

import type { RootStackParams } from '../../navigation/StackNavigation';
import { CustomKittenIcon } from '../../components/ui/CustomKittenIcon';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { LabelErrorForm } from '../../components/ui/LabelErrorForm';
import { MainLayoutDoctor } from '../../layouts/MainLayoutDoctor';
import type { Cita } from '../../../domain/entities/Cita';
import { emptyCita, finalizarCitaAction, getCitaByIdAction } from '../../../actions/get-citas';
import type { FinalizarCita } from '../../../domain/entities/FinalizarCita';

interface Props extends StackScreenProps<RootStackParams, 'FinalizarCitaScreen'> { }

const reprogramacionCitaFormSchema = Yup.object().shape({
    origen: Yup.string().required('Origen de la cita es requerido'),
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


export const FinalizarCitaScreen = ({ navigation, route }: Props) => {

    const { id } = route.params;
    const { logout } = useAuthStore();
    const { top } = useSafeAreaInsets();
    const { cita } = useCita(id);

    const [isSendForm, setIsSendForm] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const [textModalResult, setTextModalResult] = useState('');

    const finalizarCita : FinalizarCita = {
       citaId: id,
       origen: '',
       medicinas: '',
       tratamiento:''
    }

    const onSubmitFormFinalizarCita = async (data: FinalizarCita) => {
        setIsSendForm(true);

        const responseApi = await finalizarCitaAction(data);

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

        <Formik initialValues={finalizarCita} onSubmit={onSubmitFormFinalizarCita}
            validationSchema={reprogramacionCitaFormSchema} enableReinitialize validateOnMount>

            {({ handleChange, handleBlur, handleSubmit, values, isValid, errors, touched, setFieldValue }) => (

                <MainLayoutDoctor title={'Finalizar Cita'} rightAction={logout} rightActionIcon='log-out'>

                    <Layout style={{ flex: 1, paddingTop: top }} >

                        <ScrollView style={{ marginHorizontal: 25 }} showsVerticalScrollIndicator={false}>

                            <Layout style={{ marginBottom: 30 }}>
                                <Text category='h4' status='danger' style={{ textAlign: 'center' }} >
                                    Finalizar de Cita del paciente {cita.paciente}
                                </Text>
                            </Layout>

                            {/* Inputs*/}

                            <Layout style={{ marginTop: 20 }}>
                                <Text>Doctor: {cita.doctor}</Text>
                                <Text>Consultorio: {cita.consultorio}</Text>
                                <Text status='warning'>Fecha Actual de Cita: {cita.fechacita}</Text>
                            </Layout>

                            <Layout style={{ marginTop: 20 }}>

                                <Input label='Origen de la cita'
                                    placeholder='Origen de la cita'
                                    maxLength={300}
                                    numberOfLines={5}
                                    multiline
                                    autoCapitalize='none'
                                    value={values.origen}
                                    onChangeText={handleChange('origen')}
                                    onBlur={handleBlur('origen')}
                                    accessoryLeft={<CustomKittenIcon name='text' />}
                                    style={{ marginBottom: 10 }}
                                    caption={(errors.origen && touched) &&
                                        <LabelErrorForm text={errors.origen} />}
                                />

                                <Input label='Tratamiento'
                                    placeholder='Tratamiento'
                                    maxLength={300}
                                    numberOfLines={5}
                                    multiline
                                    autoCapitalize='none'
                                    value={values.tratamiento}
                                    onChangeText={handleChange('tratamiento')}
                                    onBlur={handleBlur('tratamiento')}
                                    accessoryLeft={<CustomKittenIcon name='text' />}
                                    style={{ marginBottom: 10 }}
                                    caption={(errors.tratamiento && touched) &&
                                        <LabelErrorForm text={errors.tratamiento} />}
                                />


                                <Input label='Medicinas recetadas'
                                    placeholder='Medicinas recetadas'
                                    maxLength={300}
                                    numberOfLines={5}
                                    multiline
                                    autoCapitalize='none'
                                    value={values.medicinas}
                                    onChangeText={handleChange('medicinas')}
                                    onBlur={handleBlur('medicinas')}
                                    accessoryLeft={<CustomKittenIcon name='text' />}
                                    style={{ marginBottom: 10 }}
                                    caption={(errors.medicinas && touched) &&
                                        <LabelErrorForm text={errors.medicinas} />}
                                />

                            </Layout>

                            <Layout style={{ height: 20 }} />

                            <Layout>
                                <Button accessoryRight={<CustomKittenIcon name='checkmark-circle-outline' white />}
                                    onPress={() => handleSubmit()} disabled={!isValid && !isSendForm}>
                                    Finalizar Cita
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

