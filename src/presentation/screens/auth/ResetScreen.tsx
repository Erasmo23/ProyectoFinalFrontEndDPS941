
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { Image, ScrollView, StyleSheet, useWindowDimensions } from 'react-native';
import { CustomKittenIcon } from '../../components/ui/CustomKittenIcon';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackParams } from '../../navigation/StackNavigation';
import { StackScreenProps } from '@react-navigation/stack';

interface Props extends StackScreenProps<RootStackParams, 'ResetScreen'> {}

export const ResetScreen = ( { navigation } : Props) => {

  const { height } = useWindowDimensions();
  const { top } = useSafeAreaInsets();

  return (
    <Layout style={{ flex: 1, paddingTop:top}} >


      <ScrollView style={{ marginHorizontal: 25 }} showsVerticalScrollIndicator={false}>


        <Layout style={styles.containerLogo}>
          <Image source={require('../../../assets/logo.png')} style={styles.logo} />
        </Layout>

        <Layout style={{marginBottom:30}}>
          <Text category='h2' status='info' style={{textAlign:'center'}} >Acilo Esperanza de Santa Ana</Text>
        </Layout>

        <Layout style={{
          //paddingTop: height * 0.35
         }}>

          <Text category='h3' >Olvido de Contraseña</Text>
          <Text category='p2' >Por favor, ingrese su correo para realizar un reset a la contraseña</Text>

        </Layout>

        {/* Inputs*/}

        <Layout style={{ marginTop: 20 }}>

          <Input
            placeholder='Correo Electrónico'
            keyboardType='email-address'
            autoCapitalize='none'
            accessoryLeft={<CustomKittenIcon name='email-outline' />}
            style={{ marginBottom: 10 }}
          />

        </Layout>

        <Layout style={{ height: 20 }} />

        <Layout>
          <Button accessoryRight={<CustomKittenIcon name='repeat' white />}
            onPress={() => { }}
            status='warning'  
          >
            Reiniciar
          </Button>
        </Layout>


        <Layout style={{ height: 80 }} />

        <Layout style={{ justifyContent: 'center', alignItems: 'center' }}>

          <Button appearance='ghost' onPress={() => { navigation.goBack() }} status='danger' size='giant'
            accessoryLeft={<CustomKittenIcon name='arrow-back' color='color-danger-500' />}
          >
            Regresar
          </Button>
        </Layout>


      </ScrollView>


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