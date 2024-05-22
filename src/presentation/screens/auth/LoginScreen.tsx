import { useState } from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Card, Input, Layout, Modal, Text } from '@ui-kitten/components';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { CustomKittenIcon } from '../../components/ui/CustomKittenIcon';
import { RootStackParams } from '../../navigation/StackNavigation';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { LabelErrorForm } from '../../components/ui/LabelErrorForm';

interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> { }

interface Formulario {
  email: string;
  password: string;
}

const loginFormSchema = Yup.object().shape({
  email: Yup.string()
    .required('Correo es requerido')
    .email('Por favor ingrese una dirección de correo electrónico válida'),
  password: Yup.string()
    .min(6, ({ min }) => `La contraseña debe de tener ${min} caracteres minimos`)
    .required('La contraseña es requerida')
  /*.matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
    "Debe contener 8 caracteres, una mayúscula, una minúscula, un número y un carácter de caso especial"
  )*/
});

export const LoginScreen = ({ navigation }: Props) => {

  const { login } = useAuthStore();

  const [isSendLogin, setIsSendLogin] = useState(false);

  const [visibleModal, setVisibleModal] = useState(false);

  const onLogin = async (data: Formulario) => {

    setIsSendLogin(true);

    const isSuccess = await login(data.email, data.password);

    setIsSendLogin(false);

    if (isSuccess) return;

    setVisibleModal(true);

  }

  const { top } = useSafeAreaInsets();

  let data: Formulario = {
    email: '',
    password: ''
  }

  return (

    <Formik initialValues={data} onSubmit={(values) => { onLogin(values); }}
      validationSchema={loginFormSchema} >


      {({ handleChange, handleBlur, handleSubmit, values, isValid, errors, touched, }) => (


        <Layout style={{ flex: 1, paddingTop: top }} >

          <ScrollView style={{ marginHorizontal: 25 }} showsVerticalScrollIndicator={false}>

            <Layout style={styles.containerLogo}>
              <Image source={require('../../../assets/logo.png')} style={styles.logo} />
            </Layout>

            <Layout style={{ marginBottom: 30 }}>
              <Text category='h2' status='info' style={{ textAlign: 'center' }} >Acilo Esperanza de Santa Ana</Text>
            </Layout>

            <Layout>
              <Text category='h3' >Ingresar</Text>
              <Text category='p2' >Por favor, ingrese credenciales para continuar</Text>
            </Layout>

            {/* Inputs*/}

            <Layout style={{ marginTop: 20 }}>

              <Input
                label='Correo Electrónico'
                placeholder='Correo Electrónico'
                keyboardType='email-address'
                autoCapitalize='none'
                value={values.email}
                onChangeText={handleChange('email')}
                accessoryLeft={<CustomKittenIcon name='email-outline' />}
                onBlur={handleBlur('email')}
                style={{ marginBottom: 10 }}
                caption={(errors.email && touched) &&
                  <LabelErrorForm text={errors.email} />}
                status={touched.email && Boolean(errors.email) ? 'danger' : 'basic'}
              />

              <Input 
                label='Contraseña'
                placeholder='Contraseña'
                secureTextEntry
                autoCapitalize='none'
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                accessoryLeft={<CustomKittenIcon name='lock-outline' />}
                style={{ marginBottom: 10 }}
                caption={(errors.password && touched) &&
                  <LabelErrorForm text={errors.password} />}
                status={touched.password && Boolean(errors.password) ? 'danger' : 'basic'}
              />

            </Layout>

            <Layout style={{ height: 20 }} />

            <Layout>
              <Button accessoryRight={<CustomKittenIcon name='log-in' white />}
                onPress={() => handleSubmit()} disabled={ !isValid && !isSendLogin}>
                Ingresar
              </Button>
            </Layout>

            <Layout style={{ height: 40 }} />

            <Layout style={{ justifyContent: 'center', alignItems: 'center' }}>

              <Text status='primary' category='s1' onPress={() => { navigation.navigate('ResetScreen') }}>
                ¿Has olvidado tu contraseña?
              </Text>
            </Layout>

          </ScrollView>

          <Modal visible={visibleModal} backdropStyle={styles.backdrop} onBackdropPress={() => setVisibleModal(false)} >
            <Card disabled={true}>
              <Text>Usuario o Contraseña Incorrectos</Text>
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