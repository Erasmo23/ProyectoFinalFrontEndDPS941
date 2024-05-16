
import { Button, Card, Input, Layout, Modal, Text } from '@ui-kitten/components';
import { Image, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { CustomKittenIcon } from '../../components/ui/CustomKittenIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigation';
import { useState } from 'react';
import { useAuthStore } from '../../store/auth/useAuthStore';


interface Props extends StackScreenProps<RootStackParams, 'LoginScreen'> { }

export const LoginScreen = ({ navigation }: Props) => {

  const { login } = useAuthStore();

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [isSendLogin, setIsSendLogin] = useState(false);

  const [visibleModal, setVisibleModal] = useState(false);

  const onLogin = async () => {

    if (form.email.length === 0 || form.password.length === 0) {
      return;
    }

    setIsSendLogin(true);

    const isSuccess = await login(form.email, form.password);

    setIsSendLogin(false);

    if (isSuccess) return;

    setVisibleModal(true);

  }


  const { height } = useWindowDimensions();
  const { top } = useSafeAreaInsets();

  return (
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

          <Text category='h3' >Ingresar</Text>
          <Text category='p2' >Por favor, ingrese credenciales para continuar</Text>

        </Layout>

        {/* Inputs*/}

        <Layout style={{ marginTop: 20 }}>

          <Input
            placeholder='Correo Electrónico'
            keyboardType='email-address'
            autoCapitalize='none'
            value={form.email}
            onChangeText={(email) => setForm({ ...form, email })}
            accessoryLeft={<CustomKittenIcon name='email-outline' />}
            style={{ marginBottom: 10 }}
          />

          <Input
            placeholder='Password'
            secureTextEntry
            autoCapitalize='none'
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
            accessoryLeft={<CustomKittenIcon name='lock-outline' />}
            style={{ marginBottom: 10 }}
          />

        </Layout>

        <Layout style={{ height: 20 }} />

        <Layout>
          <Button accessoryRight={<CustomKittenIcon name='log-in' white />}
            onPress={onLogin} disabled={isSendLogin}>
            Ingresar
          </Button>
        </Layout>


        <Layout style={{ height: 80 }} />

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