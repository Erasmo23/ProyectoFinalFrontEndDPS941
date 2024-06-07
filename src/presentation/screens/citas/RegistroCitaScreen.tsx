import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, useColorScheme, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Card, Datepicker, Input, Layout, Modal, Text } from '@ui-kitten/components';

import RNPickerSelect, { Item } from 'react-native-picker-select';

import * as eva from '@eva-design/eva';
import { Formik } from 'formik';
import * as Yup from 'yup';

import type { RootStackParams } from '../../navigation/StackNavigation';
import { CustomKittenIcon } from '../../components/ui/CustomKittenIcon';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { LabelErrorForm } from '../../components/ui/LabelErrorForm';
import { MainLayoutDoctor } from '../../layouts/MainLayoutDoctor';
import type { Doctor } from '../../../domain/entities/Doctor';
import { createOrUpdateCitaAction, emptyRegistroCita, getRegistroCitaByIdAction, getSelectConsultoriosAction, getSelectDoctoresAction, getSelectPacientesAction } from '../../../actions/get-citas';
import type { RegistroCita } from '../../../domain/entities/RegistroCita';

interface Props extends StackScreenProps<RootStackParams, 'RegistroCitaScreen'> { }

const registroCitaFormSchema = Yup.object().shape({
    pacienteId: Yup.number().required('Paciente es Requerido'),
    doctorId: Yup.number().required('Doctor es Requerido'),
    consultorioId: Yup.number().required('Consultorio es Requerido'),
    fechaCita: Yup.date().required('Fecha de cita es Requerida')
});

const useRegistroCita = (id: string) => {

    const [registroCita, setRegistroCita] = useState<RegistroCita>(emptyRegistroCita);
    const [pacientes, setPacientes] = useState<Item[]>([]);
    const [doctores, setDoctores] = useState<Item[]>([]);
    const [consultorios, setConsultorios] = useState<Item[]>([]);

    useEffect(() => {

        const fechData = async () => {
            const dataReturn = await getRegistroCitaByIdAction(id);
            setRegistroCita(dataReturn);

            const dataPacientes = await getSelectPacientesAction();
            setPacientes(dataPacientes);

            const dataDoctores = await getSelectDoctoresAction();
            setDoctores(dataDoctores);

            const dataConsultorios = await getSelectConsultoriosAction();
            setConsultorios(dataConsultorios);
            
        }

        fechData();

    }, []);

    return {
        registroCita,
        pacientes,
        doctores,
        consultorios
    }
}


export const RegistroCitaScreen = ({ navigation, route }: Props) => {

    const { id } = route.params;
    const { logout } = useAuthStore();
    const { top } = useSafeAreaInsets();
    const colorScheme = useColorScheme();
    const { registroCita, pacientes, consultorios, doctores } = useRegistroCita(id);

    const theme = colorScheme === 'dark' ? eva.dark : eva.light;
    const backgroundColor = colorScheme === 'dark' ? theme['color-basic-900'] : theme['color-basic-200'];
    const borderColor = colorScheme === 'dark' ? theme['color-basic-1100'] : theme['color-basic-400'];
    const colorText = colorScheme === 'dark' ? theme['color-basic-400'] : theme['color-basic-600'];

    let isCreate = false;

    if (id === 'create') {
        isCreate = true;
    }

    const [isSendForm, setIsSendForm] = useState(false);
    const [visibleModal, setVisibleModal] = useState(false);
    const [textModalResult, setTextModalResult] = useState('');

    const onSubmitFormRegistroCita = async (data: RegistroCita) => {
        setIsSendForm(true);

        const responseApi = await createOrUpdateCitaAction(data, id);

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

        <Formik initialValues={registroCita} onSubmit={onSubmitFormRegistroCita}
            validationSchema={registroCitaFormSchema} enableReinitialize validateOnMount>

            {({ handleChange, handleBlur, handleSubmit, values, isValid, errors, touched, setFieldValue }) => (

                <MainLayoutDoctor title={(isCreate) ? 'Creación de Cita' : 'Modificación de Cita'}
                    rightAction={logout} rightActionIcon='log-out'>

                    <Layout style={{ flex: 1, paddingTop: top }} >

                        <ScrollView style={{ marginHorizontal: 25 }} showsVerticalScrollIndicator={false}>

                            <Layout style={{ marginBottom: 30 }}>
                                <Text category='h2' status='info' style={{ textAlign: 'center' }} >
                                    {(isCreate) ? 'Crear Cita' : 'Edición Cita'}
                                </Text>
                            </Layout>

                            {/* Inputs*/}

                            <Layout style={{ marginTop: 20 }}>

                                <Text category='label' appearance='hint' style={{ paddingTop: 10, margin: 2, marginBottom: 10 }}>Paciente</Text>

                                <RNPickerSelect
                                    placeholder={{ label: 'Seleccione Paciente', value: null, color: '#0095FF' }}
                                    useNativeAndroidPickerStyle={true}
                                    value={values.pacienteId}

                                    onValueChange={(value) => {
                                        if (value) {
                                            setFieldValue('pacienteId',value)
                                        }else{
                                            setFieldValue('pacienteId',null);
                                        }
                                    }}

                                    style={{
                                        viewContainer: {
                                            borderWidth: 1,
                                            borderRadius: 5,
                                            borderColor: borderColor,
                                            backgroundColor: backgroundColor
                                        },
                                        placeholder: {
                                            color: colorText
                                        }
                                    }}
                                    items={pacientes}
                                />

                                {(errors.pacienteId && touched) && <LabelErrorForm text={errors.pacienteId} />}


                                <Text category='label' appearance='hint' style={{ paddingTop: 10, margin: 2, marginBottom: 10 }}>Doctor</Text>

                                <RNPickerSelect
                                    placeholder={{ label: 'Seleccione Doctor', value: null, color: '#0095FF' }}
                                    useNativeAndroidPickerStyle={true}
                                    value={values.doctorId}

                                    onValueChange={(value) => {
                                        if (value) {
                                            setFieldValue('doctorId',value)
                                        }else{
                                            setFieldValue('doctorId',null);
                                        }
                                    }}

                                    style={{
                                        viewContainer: {
                                            borderWidth: 1,
                                            borderRadius: 5,
                                            borderColor: borderColor,
                                            backgroundColor: backgroundColor
                                        },
                                        placeholder: {
                                            color: colorText
                                        }
                                    }}
                                    items={doctores}
                                />

                                {(errors.doctorId && touched) && <LabelErrorForm text={errors.doctorId} />}


                                <Text category='label' appearance='hint' style={{ paddingTop: 10, margin: 2, marginBottom: 10 }}>Consultorio</Text>

                                <RNPickerSelect
                                    placeholder={{ label: 'Seleccione Consultorio', value: null, color: '#0095FF' }}
                                    useNativeAndroidPickerStyle={true}
                                    value={values.consultorioId}

                                    onValueChange={(value) => {
                                        if (value) {
                                            setFieldValue('consultorioId',value)
                                        }else{
                                            setFieldValue('consultorioId',null);
                                        }
                                    }}

                                    style={{
                                        viewContainer: {
                                            borderWidth: 1,
                                            borderRadius: 5,
                                            borderColor: borderColor,
                                            backgroundColor: backgroundColor
                                        },
                                        placeholder: {
                                            color: colorText
                                        }
                                    }}
                                    items={consultorios}
                                />

                                {(errors.consultorioId && touched) && <LabelErrorForm text={errors.consultorioId} />}

                                <Datepicker
                                    label='Fecha de Cita'
                                    accessoryRight={<CustomKittenIcon name='calendar' />}
                                    //max={new Date()}
                                    min={new Date(1920, 0, 1)}
                                    date={values.fechaCita}
                                    onSelect={nextDate => setFieldValue('fechaCita', nextDate)}
                                    caption={(errors.fechaCita && touched) &&
                                        <LabelErrorForm text={'Error Fecha de Cita'} />}
                                />

                            </Layout>

                            <Layout style={{ height: 20 }} />

                            <Layout>
                                <Button accessoryRight={<CustomKittenIcon name='person-add' white />}
                                    onPress={() => handleSubmit()} disabled={!isValid && !isSendForm}>
                                    {(isCreate) ? 'Crear Cita' : 'Editar Cita'}
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
    containerLogo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: 325,
        height: 300
    },
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

