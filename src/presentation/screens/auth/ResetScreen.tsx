import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { Alert, Image, ScrollView, StyleSheet } from 'react-native';
import { CustomKittenIcon } from '../../components/ui/CustomKittenIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { RootStackParams } from '../../navigation/StackNavigation';
import { StackScreenProps } from '@react-navigation/stack';
import { CustomConfirmDialog } from '../../components/ui/CustomConfirmDialog';
import { resetPasswordAction } from '../../../actions/auth/auth';
import { useState } from 'react';

interface Props extends StackScreenProps<RootStackParams, 'ResetScreen'> {}

export const ResetScreen = ( { navigation } : Props) => {

  const { top } = useSafeAreaInsets();
  const [showModal, setShowModal] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [correoForm, setCorreoForm] = useState('');
  
  const resetPasswordFunction = async (correo: string) =>{

    setShowProgress(true);
    const result = await resetPasswordAction(correo);

    if ( result.code === '1' ){
      navigation.goBack();
      return;
    }else{
      Alert.alert(result.messages);
      setShowModal(false);
      setShowProgress(false);
    }

  }

  return (
    <Layout style={{ flex: 1, paddingTop:top}} >

      <ScrollView style={{ marginHorizontal: 25 }} showsVerticalScrollIndicator={false}>

        <Layout style={styles.containerLogo}>
          <Image source={require('../../../assets/logo.png')} style={styles.logo} />
        </Layout>

        <Layout style={{marginBottom:30}}>
          <Text category='h2' status='info' style={{textAlign:'center'}} >Acilo Esperanza de Santa Ana</Text>
        </Layout>

        <Layout >

          <Text category='h3' >Olvido de Contraseña</Text>
          <Text category='p2' >Por favor, ingrese su correo para realizar un reset a la contraseña</Text>

        </Layout>

        {/* Inputs*/}

        <Layout style={{ marginTop: 20 }}>

          <Input label='Correo Electrónico' placeholder='Correo Electrónico' style={{ marginBottom: 10 }}
            keyboardType='email-address' autoCapitalize='none' value={correoForm}
            onChangeText={(value) => setCorreoForm(value)}
            accessoryLeft={<CustomKittenIcon name='email-outline' />} 
          />

        </Layout>

        <Layout style={{ height: 20 }} />

        <Layout>
          <Button accessoryRight={<CustomKittenIcon name='repeat' white />}
            onPress={() => { setShowModal(true) }} status='warning' disabled={ !(correoForm.length > 3) }>
            Reiniciar
          </Button>
        </Layout>

        <Layout style={{ height: 80 }} />

        <Layout style={{ justifyContent: 'center', alignItems: 'center' }}>

          <Button appearance='ghost' onPress={() => { navigation.goBack() }} status='danger' size='giant'
            accessoryLeft={<CustomKittenIcon name='arrow-back' color='color-danger-500' />} >
            Regresar
          </Button>
        </Layout>

      </ScrollView>

      <CustomConfirmDialog
          showAlert={showModal}
          showProgress={showProgress}
          title='¿Esta seguro de reiniciar la contraseña?'
          message='Le llegara un correo con la nueva contraseña temporal para realizar proceso de reinicio.'
          textConfirmButton='Si, Reiniciar'
          showCancelButton
          textCancelButton='Cancelar'
          onPressConfirm={ () => resetPasswordFunction(correoForm) }
          onPressCancel={ () => setShowModal(false)}
        />


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
  }
});