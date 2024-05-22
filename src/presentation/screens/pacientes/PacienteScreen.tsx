import { useEffect, useMemo, useState } from 'react';
import { StyleSheet, ScrollView, useColorScheme, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { Button, Card, Datepicker, Input, Layout, Modal, Text } from '@ui-kitten/components';
import { RadioGroup } from 'react-native-radio-buttons-group';
import RNPickerSelect from 'react-native-picker-select';

import * as eva from '@eva-design/eva';
import { Formik } from 'formik';
import * as Yup from 'yup';

import type { RootStackParams } from '../../navigation/StackNavigation';
import { CustomKittenIcon } from '../../components/ui/CustomKittenIcon';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { LabelErrorForm } from '../../components/ui/LabelErrorForm';
import { createOrUpdatePacienteAction, emptyPaciente, getPacienteByIdAction } from '../../../actions/get-pacientes';
import { Paciente } from '../../../domain/entities/Paciente';
import { MainLayoutDoctor } from '../../layouts/MainLayoutDoctor';

//import Picker from 'react-native-picker-select';

interface Props extends StackScreenProps<RootStackParams, 'PacienteScreen'> { }

const TIPO_SANGRE_OPTIONS = [
    { label: 'A+', value: 'A+', color: '#0095FF' },
    { label: 'A-', value: 'A-', color: '#0095FF' },
    { label: 'B+', value: 'B+', color: '#0095FF' },
    { label: 'B-', value: 'B-', color: '#0095FF' },
    { label: 'AB+', value: 'AB+', color: '#0095FF' },
    { label: 'AB-', value: 'AB-', color: '#0095FF' },
    { label: 'O+', value: 'O+', color: '#0095FF' },
    { label: 'O-', value: 'O-', color: '#0095FF' }
];

const pacienteFormSchema = Yup.object().shape({

    dui: Yup.string().required('Dui es requerido')
        .matches(/^\d{8}-\d$/, 'El dui debe de tener formato 00000000-0'),
    nombres: Yup.string()
        .min(3, ({ min }) => `El nombre debe de tener ${min} caracteres minimos`)
        .required('El nombre es requerido'),
    apellidos: Yup.string()
        .min(3, ({ min }) => `El Apellido debe de tener ${min} caracteres minimos`)
        .required('El Apellido es requerido'),
    fechaNacimiento: Yup.date().required('La fecha de Nacimiento es requerida'),

    telefono: Yup.string()
        .matches(/^\d{4}-\d{4}$/, 'El Telefono debe de tener formato 0000-0000'),

    peso: Yup.number()
        .typeError('Error formato decimal, ocupar . en su lugar de , siguiendo formato ###.##')
        .nullable()
        .moreThan(0, 'Solo se permiten números positivos')
        .transform((_, val) => (val !== "" ? Number(val) : null)),
    altura: Yup.number()
        .typeError('Error formato decimal, ocupar . en su lugar de , siguiendo formato ###.##')
        .nullable()
        .moreThan(0, 'Solo se permiten números positivos')
        .transform((_, val) => (val !== "" ? Number(val) : null))
});

const usePaciente = (id: string) => {

    const [paciente, setPaciente] = useState<Paciente>(emptyPaciente);

    useEffect(() => {

        const fechData = async () => {
            const dataReturn = await getPacienteByIdAction(id);
            setPaciente(dataReturn);
        }

        fechData();

    }, []);

    return {
        paciente
    }
}


export const PacienteScreen = ({ navigation, route }: Props) => {

    const radioGeneroButtons = useMemo(() => ([
        {
            id: 'Masculino', // acts as primary key, should be unique and non-empty string
            label: 'Masculino',
            value: 'Masculino',
            color: '#598BFF',
            size: 30
        },
        {
            id: 'Femenino',
            label: 'Femenino',
            value: 'Femenino',
            color: '#598BFF',
            size: 30
        }
    ]), []);

    const { id } = route.params;
    const { logout } = useAuthStore();
    const { top } = useSafeAreaInsets();
    const colorScheme = useColorScheme();
    const { paciente } = usePaciente(id);

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

    const onSubmitFormPaciente = async (data: Paciente) => {
        setIsSendForm(true);

        const responseApi = await createOrUpdatePacienteAction(data, id);

        if (responseApi.code === '1') {

            Alert.alert('Resultado',
                responseApi.messages,
                [{ text: 'Aceptar', onPress: () => navigation.push('PacientesScreen') }]
            );

        } else {
            setIsSendForm(false);
            setTextModalResult(responseApi.messages);
            setVisibleModal(true);
        }

    }


    return (

        <Formik initialValues={paciente} onSubmit={onSubmitFormPaciente}
            validationSchema={pacienteFormSchema} enableReinitialize validateOnMount>

            {({ handleChange, handleBlur, handleSubmit, values, isValid, errors, touched, setFieldValue }) => (

                <MainLayoutDoctor title={(isCreate) ? 'Creación de Paciente' : 'Modificación de Paciente'}
                    rightAction={logout} rightActionIcon='log-out'>

                    <Layout style={{ flex: 1, paddingTop: top }} >

                        <ScrollView style={{ marginHorizontal: 25 }} showsVerticalScrollIndicator={false}>

                            <Layout style={{ marginBottom: 30 }}>
                                <Text category='h2' status='info' style={{ textAlign: 'center' }} >
                                    {(isCreate) ? 'Crear Paciente' : 'Edición Paciente'}
                                </Text>
                            </Layout>

                            {/* Inputs*/}

                            <Layout style={{ marginTop: 20 }}>

                                <Input label='Dui'
                                    placeholder='Dui'
                                    autoCapitalize='none'
                                    maxLength={10}
                                    keyboardType='number-pad'
                                    value={values.dui}
                                    onChangeText={handleChange('dui')}
                                    onBlur={handleBlur('dui')}
                                    accessoryLeft={<CustomKittenIcon name='person-outline' />}
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

                                <Datepicker
                                    label='Fecha de Nacimiento'
                                    accessoryRight={<CustomKittenIcon name='calendar' />}
                                    max={new Date()}
                                    min={new Date(1920, 0, 1)}
                                    date={values.fechaNacimiento}
                                    onSelect={nextDate => setFieldValue('fechaNacimiento', nextDate)}
                                    caption={(errors.fechaNacimiento && touched) &&
                                        <LabelErrorForm text={'Error Fecha de Nacimiento'} />}
                                />

                                <Text category='label' appearance='hint' style={{ paddingTop: 10, margin: 2 }}>Género</Text>

                                <RadioGroup layout='row' containerStyle={{ marginVertical: 5, justifyContent: 'center' }}
                                    radioButtons={radioGeneroButtons}
                                    onPress={handleChange('genero')}
                                    selectedId={values.genero}
                                />

                                <Text category='label' appearance='hint' style={{ paddingTop: 10, margin: 2, marginBottom: 10 }}>Tipo Sanguineo</Text>

                                <RNPickerSelect
                                    onValueChange={handleChange('tipoSangre')}
                                    placeholder={{ label: 'Seleccione Tipo Sanguineo', value: null, color: '#0095FF' }}
                                    useNativeAndroidPickerStyle={true}
                                    value={values.tipoSangre}

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
                                    items={TIPO_SANGRE_OPTIONS}
                                />

                                <Input label='Altura'
                                    placeholder='Altura'
                                    autoCapitalize='none'
                                    maxLength={4}
                                    keyboardType='number-pad'
                                    value={(values.altura) ? values.altura.toString() : ''}
                                    onChangeText={handleChange('altura')}
                                    onBlur={handleBlur('altura')}
                                    accessoryLeft={<CustomKittenIcon name='clipboard-outline' />}
                                    style={{ marginBottom: 10, paddingTop: 10 }}
                                    caption={(errors.altura && touched) &&
                                        <LabelErrorForm text={errors.altura} />}
                                    status={touched.dui && Boolean(errors.altura) ? 'danger' : 'basic'}
                                />

                                <Input label='Peso'
                                    placeholder='Peso'
                                    autoCapitalize='none'
                                    maxLength={6}
                                    keyboardType='number-pad'
                                    value={(values.peso) ? values.peso.toString() : ''}
                                    onChangeText={handleChange('peso')}
                                    onBlur={handleBlur('peso')}
                                    accessoryLeft={<CustomKittenIcon name='clipboard-outline' />}
                                    style={{ marginBottom: 10 }}
                                    caption={(errors.peso && touched) &&
                                        <LabelErrorForm text={errors.peso} />}
                                    status={touched.dui && Boolean(errors.peso) ? 'danger' : 'basic'}
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

                                <Input label='Dirección'
                                    placeholder='Dirección'
                                    maxLength={300}
                                    numberOfLines={5}
                                    multiline
                                    autoCapitalize='none'
                                    value={values.direccion}
                                    onChangeText={handleChange('direccion')}
                                    onBlur={handleBlur('direccion')}
                                    accessoryLeft={<CustomKittenIcon name='text' />}
                                    style={{ marginBottom: 10 }}
                                    caption={(errors.direccion && touched) &&
                                        <LabelErrorForm text={errors.direccion} />}
                                />

                            </Layout>

                            <Layout style={{ height: 20 }} />

                            <Layout>
                                <Button accessoryRight={<CustomKittenIcon name='person-add' white />}
                                    onPress={() => handleSubmit()} disabled={!isValid && !isSendForm}>
                                    {(isCreate) ? 'Crear Paciente' : 'Modificar Paciente'}
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

