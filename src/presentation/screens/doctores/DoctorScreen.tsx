import { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, useColorScheme, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Card, Input, Layout, Modal, Text } from '@ui-kitten/components';

import RNPickerSelect, { Item } from 'react-native-picker-select';

import * as eva from '@eva-design/eva';
import { Formik } from 'formik';
import * as Yup from 'yup';

import type { RootStackParams } from '../../navigation/StackNavigation';
import { CustomKittenIcon } from '../../components/ui/CustomKittenIcon';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { LabelErrorForm } from '../../components/ui/LabelErrorForm';
import { MainLayoutDoctor } from '../../layouts/MainLayoutDoctor';
import { createOrUpdateDoctorAction, emptyDoctor, getDoctorByIdAction } from '../../../actions/get-doctores';
import type { Doctor } from '../../../domain/entities/Doctor';
import { getSelectEspecialidadesAction } from '../../../actions/get-especialidades';

interface Props extends StackScreenProps<RootStackParams, 'DoctorScreen'> { }

const doctorFormSchema = Yup.object().shape({

    correo: Yup.string()
        .required('Correo es requerido')
        .email('Por favor ingrese una dirección de correo electrónico válida'),
    dui: Yup.string().required('Dui es requerido')
        .matches(/^\d{8}-\d$/, 'El dui debe de tener formato 00000000-0'),
    nombres: Yup.string()
        .min(3, ({ min }) => `El nombre debe de tener ${min} caracteres minimos`)
        .required('El nombre es requerido'),
    apellidos: Yup.string()
        .min(3, ({ min }) => `El Apellido debe de tener ${min} caracteres minimos`)
        .required('El Apellido es requerido'),
    telefono: Yup.string()
        .matches(/^\d{4}-\d{4}$/, 'El Telefono debe de tener formato 0000-0000'),
    especialidadId: Yup.number().required('Especialidad es Requerida')
});

const useDoctor = (id: string) => {

    const [doctor, setDoctor] = useState<Doctor>(emptyDoctor);
    const [especialidades, setEspecialidades] = useState<Item[]>([]);
    const [cargaOpciones, setCargaOpciones] = useState<boolean>(false);

    useEffect(() => {

        const fechData = async () => {
            const dataReturn = await getDoctorByIdAction(id);
            setDoctor(dataReturn);

            const dataEspecialidades = await getSelectEspecialidadesAction();
            setEspecialidades(dataEspecialidades);
            setCargaOpciones(true);
        }

        fechData();

    }, []);

    return {
        doctor,
        especialidades,
        cargaOpciones
    }
}


export const DoctorScreen = ({ navigation, route }: Props) => {

    const { id } = route.params;
    const { logout } = useAuthStore();
    const { top } = useSafeAreaInsets();
    const colorScheme = useColorScheme();
    const { doctor, especialidades : opcionesEspecialidades, cargaOpciones } = useDoctor(id);

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

    const onSubmitFormDoctor = async (data: Doctor) => {
        setIsSendForm(true);

        const responseApi = await createOrUpdateDoctorAction(data, id);

        if (responseApi.code === '1') {

            Alert.alert('Resultado',
                responseApi.messages,
                [{ text: 'Aceptar', onPress: () => navigation.push('DoctoresScreen') }]
            );

        } else {
            setIsSendForm(false);
            setTextModalResult(responseApi.messages);
            setVisibleModal(true);
        }

    }


    return (

        <Formik initialValues={doctor} onSubmit={onSubmitFormDoctor}
            validationSchema={doctorFormSchema} enableReinitialize validateOnMount>

            {({ handleChange, handleBlur, handleSubmit, values, isValid, errors, touched, setFieldValue }) => (

                <MainLayoutDoctor title={(isCreate) ? 'Creación de Doctor' : 'Modificación de Doctor'}
                    rightAction={logout} rightActionIcon='log-out'>

                    <Layout style={{ flex: 1, paddingTop: top }} >

                        <ScrollView style={{ marginHorizontal: 25 }} showsVerticalScrollIndicator={false}>

                            <Layout style={{ marginBottom: 30 }}>
                                <Text category='h2' status='info' style={{ textAlign: 'center' }} >
                                    {(isCreate) ? 'Crear Doctor' : 'Edición Doctor'}
                                </Text>
                            </Layout>

                            {/* Inputs*/}

                            <Layout style={{ marginTop: 20 }}>

                                { isCreate && 

                                    <Input label='Correo Electrónico'
                                            placeholder='Correo Electrónico'
                                            keyboardType='email-address'
                                            autoCapitalize='none'
                                            value={values.correo}
                                            onChangeText={handleChange('correo')}
                                            accessoryLeft={<CustomKittenIcon name='email-outline' />}
                                            onBlur={handleBlur('correo')}
                                            style={{ marginBottom: 10 }}
                                            caption={(errors.correo && touched) &&
                                            <LabelErrorForm text={errors.correo} />}
                                            status={touched.correo && Boolean(errors.correo) ? 'danger' : 'basic'}
                                    />
                                }

                                <Input label='Dui'
                                    placeholder='Dui'
                                    autoCapitalize='none'
                                    maxLength={10}
                                    keyboardType='number-pad'
                                    value={values.dui}
                                    onChangeText={handleChange('dui')}
                                    onBlur={handleBlur('dui')}
                                    accessoryLeft={<CustomKittenIcon name='person-outline' />}
                                    readOnly={!isCreate}
                                    style={{ marginBottom: 10 }}
                                    caption={(errors.dui && touched) &&
                                        <LabelErrorForm text={errors.dui} />}
                                    status={touched.dui && Boolean(errors.dui) ? 'danger' : 'basic'}
                                />

                                <Input label='Nombres'
                                    placeholder='Nombres'
                                    autoCapitalize='words'
                                    maxLength={150}
                                    value={values.nombres}
                                    onChangeText={handleChange('nombres')}
                                    onBlur={handleBlur('nombres')}
                                    accessoryLeft={<CustomKittenIcon name='text' />}
                                    style={{ marginBottom: 10 }}
                                    caption={(errors.nombres && touched) &&
                                        <LabelErrorForm text={errors.nombres} />}
                                    status={touched.nombres && Boolean(errors.nombres) ? 'danger' : 'basic'}
                                />

                                <Input label='Apellidos'
                                    placeholder='Apellidos'
                                    autoCapitalize='words'
                                    maxLength={150}
                                    value={values.apellidos}
                                    onChangeText={handleChange('apellidos')}
                                    onBlur={handleBlur('apellidos')}
                                    accessoryLeft={<CustomKittenIcon name='text' />}
                                    style={{ marginBottom: 10 }}
                                    caption={(errors.apellidos && touched) &&
                                        <LabelErrorForm text={errors.apellidos} />}
                                    status={touched.apellidos && Boolean(errors.apellidos) ? 'danger' : 'basic'}
                                />

                                <Input label='Telefono'
                                    placeholder='Telefono'
                                    autoCapitalize='none'
                                    keyboardType='number-pad'
                                    value={values.telefono}
                                    maxLength={9}
                                    onChangeText={handleChange('telefono')}
                                    onBlur={handleBlur('telefono')}
                                    accessoryLeft={<CustomKittenIcon name='text' />}
                                    style={{ marginBottom: 10 }}
                                    caption={(errors.telefono && touched) &&
                                        <LabelErrorForm text={errors.telefono} />}
                                    status={touched.telefono && Boolean(errors.telefono) ? 'danger' : 'basic'}
                                />


                                <Text category='label' appearance='hint' style={{ paddingTop: 10, margin: 2, marginBottom: 10 }}>Especialidad</Text>

                                <RNPickerSelect
                                    placeholder={{ label: 'Seleccione Especialidad', value: null, color: '#0095FF' }}
                                    useNativeAndroidPickerStyle={true}
                                    value={values.especialidadId}

                                    onValueChange={(value) => {
                                        if (value) {
                                            setFieldValue('especialidadId',value)
                                        }else{
                                            setFieldValue('especialidadId',null);
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
                                    items={opcionesEspecialidades}
                                />

                                {(errors.especialidadId && touched) && <LabelErrorForm text={errors.especialidadId} />}

                            </Layout>

                            <Layout style={{ height: 20 }} />

                            <Layout>
                                <Button accessoryRight={<CustomKittenIcon name='person-add' white />}
                                    onPress={() => handleSubmit()} disabled={!isValid && !isSendForm}>
                                    {(isCreate) ? 'Crear Doctor' : 'Modificar Doctor'}
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

