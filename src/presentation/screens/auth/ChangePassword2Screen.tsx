import { Button, Card, Input, Layout, Modal, Text } from '@ui-kitten/components';
import { Image, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { CustomKittenIcon } from '../../components/ui/CustomKittenIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParams } from '../../navigation/StackNavigation';
import { useState } from 'react';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { changePasswordUsuarioAction } from '../../../actions/get-usuariosSistema';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { LabelErrorForm } from '../../components/ui/LabelErrorForm';


interface Props extends StackScreenProps<RootStackParams, 'ChangePasswordScreen'> { }


const resetFormSchema = Yup.object().shape({
  passwordTemp: Yup.string()
    .min(6, 'Caracteres minimos son 6!')
    .required('Password Temporal es requerida'),
  passwordNew: Yup.string()
    .min(6, ({ min }) => `La nueva contraseña debe de tener ${min} caracteres minimos`)
    .required('La nueva contraseña es requerida')
  /*.matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    "Debe contener 8 caracteres, una mayúscula, una minúscula, un número y un carácter de caso especial"
  )*/
  ,
  passwordConfirm: Yup.string()
    .min(6, ({ min }) => `La nueva contraseña debe de tener ${min} caracteres minimos`)
    .required('La contraseña de confirmación es requerida')
    .oneOf([Yup.ref('passwordNew')], "Contraseñas (nueva y confirmacion) deben de coincidir")
});

interface Formulario {
  email: string,
  passwordTemp: string,
  passwordNew: string,
  passwordConfirm: string
}

export const ChangePassword2Screen = ({ navigation, route }: Props) => {

  const { user } = useAuthStore();
  const { correo } = route.params;
  const [isSendForm, setIsSendForm] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [textResult, setTextResult] = useState('');

  const onSendChangePassword = async (data: Formulario) => {

    setIsSendForm(true);

    const isSuccess = await changePasswordUsuarioAction(
      data.email, data.passwordTemp, data.passwordNew
    );

    setIsSendForm(false);

    if (isSuccess.code === '1') {

      if (user?.codigoRol === 'ADMIN_USER') {

        navigation.reset({
          index: 0,
          routes: [{ name: 'HomeScreen' }],
        });
      } else if (user?.codigoRol === 'DOCTOR_USER') {
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomeDoctorScreen' }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'HomePacienteScreen' }],
        });
      }

      return;

    } else {
      setTextResult(isSuccess.messages);
      setVisibleModal(true);
    }

  }

  const { height } = useWindowDimensions();
  const { top } = useSafeAreaInsets();

  let data: Formulario = {
    email: correo,
    passwordConfirm: '',
    passwordNew: '',
    passwordTemp: ''
  }

  return (

    <Formik initialValues={data} onSubmit={(values) => { onSendChangePassword(values); }}
      validationSchema={resetFormSchema} >

      {({ handleChange, handleBlur, handleSubmit, values, isValid, errors, touched,  }) => (
        <Layout style={{ flex: 1, paddingTop: top }} >

          <ScrollView style={{ marginHorizontal: 25 }} showsVerticalScrollIndicator={false}>

            <Layout style={styles.containerLogo}>
              <Image source={require('../../../assets/logo.png')} style={styles.logo} />
            </Layout>

            <Layout style={{ marginBottom: 30 }}>
              <Text category='h2' status='info' style={{ textAlign: 'center' }} >Acilo Esperanza de Santa Ana</Text>
            </Layout>

            <Layout style={{
              //paddingTop: height * 0.35
            }}>

              <Text category='h3' >Cambio de contraseña</Text>
              <Text category='p2' >Por favor, ingrese la nueva contraseña con la cual ingresara al sistema</Text>

            </Layout>

            {/* Inputs*/}

            <Layout style={{ marginTop: 20 }}>

              <Input label='Password Temporal'
                placeholder='Password Temporal'
                secureTextEntry
                autoCapitalize='none'
                value={values.passwordTemp}
                onChangeText={handleChange('passwordTemp')}
                onBlur={handleBlur('passwordTemp')}
                accessoryLeft={<CustomKittenIcon name='lock-outline' />}
                style={{ marginBottom: 10 }}
                caption={(errors.passwordTemp && touched) &&
                  <LabelErrorForm text={errors.passwordTemp} />}

              />

              <Input label='Contraseña nueva'
                placeholder='Contraseña nueva'
                secureTextEntry
                autoCapitalize='none'
                value={values.passwordNew}
                onChangeText={handleChange('passwordNew')}
                onBlur={handleBlur('passwordNew')}
                accessoryLeft={<CustomKittenIcon name='lock-outline' />}
                style={{ marginBottom: 10 }}
                caption={(errors.passwordNew && touched) &&
                  <LabelErrorForm text={errors.passwordNew} />}
              />

              <Input label='Confirmar Contraseña'
                placeholder='Confirmar Contraseña'
                secureTextEntry
                autoCapitalize='none'
                value={values.passwordConfirm}
                onChangeText={handleChange('passwordConfirm')}
                onBlur={handleBlur('passwordConfirm')}
                accessoryLeft={<CustomKittenIcon name='lock-outline' />}
                style={{ marginBottom: 10 }}
                caption={(errors.passwordConfirm && touched) &&
                  <LabelErrorForm text={errors.passwordConfirm} />}
              />

            </Layout>

            <Layout style={{ height: 20 }} />

            <Layout>
              <Button accessoryRight={<CustomKittenIcon name='flip-2-outline' white />}
                onPress={() => handleSubmit()} disabled={!isValid && !isSendForm}>
                Cambiar contraseña
              </Button>
            </Layout>

            <Layout style={{ height: 80 }} />

          </ScrollView>

          <Modal visible={visibleModal} backdropStyle={styles.backdrop} onBackdropPress={() => setVisibleModal(false)} >
            <Card disabled={true}>
              <Text>{textResult}</Text>
              <Button onPress={() => setVisibleModal(false)} appearance='ghost' size='giant' status='danger' accessoryRight={<CustomKittenIcon name='close' color='color-danger-600' />} />
            </Card>
          </Modal>

        </Layout>
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
  }
});