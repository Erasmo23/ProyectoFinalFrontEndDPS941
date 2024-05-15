import { StackScreenProps } from '@react-navigation/stack';
import type { RootStackParams } from '../../navigation/StackNavigation';
import { MainLayout } from '../../layouts/MainLayout';
import { useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { CustomKittenIcon } from '../../components/ui/CustomKittenIcon';
import { StyleSheet } from 'react-native';
import { RenderCaptionInput } from '../../components/ui/RenderCaptionInput';
import { useConsultorioForm } from '../../hooks/useConsultorioForm';

interface Props extends StackScreenProps<RootStackParams, 'ConsultorioScreen'> { }

export const ConsultorioScreen = ({ navigation, route }: Props) => {

    const { top } = useSafeAreaInsets();
    const { 
        form,
        stateInputCodigo,
        stateInputDescripcion,
        isSendHttpAction,
        logout,
        fectchData,
        onSubmit,
        handleChange
     } = useConsultorioForm();

    const consultorioId = route.params.id;
    let isCreate = false;

    if (consultorioId === 'create') {
        isCreate = true;
    }

    useEffect(() => {

        if (!isCreate) {
            fectchData(parseInt(consultorioId));
        }

    }, []);

    return (
        <MainLayout title={(isCreate) ? 'Creación de Consultorio' : 'Modificación de Consultorio'}
            rightAction={logout} rightActionIcon='log-out' >

            <Layout style={{ flex: 1, paddingTop: top, marginHorizontal: 10 }} >

                <Layout style={{ marginBottom: 30 }}>
                    <Text category='h2' status='info' style={{ textAlign: 'center' }} >
                        {(isCreate) ? 'Crear Consultorio' : 'Edición Consultorio'}
                    </Text>
                </Layout>

                <Layout style={{ marginTop: 20 }}>

                    <Input
                        placeholder='Código'
                        autoCapitalize='characters'
                        value={form.codigo}
                        onChangeText={(codigo) => handleChange('codigo', codigo)}
                        accessoryLeft={<CustomKittenIcon name='archive-outline' />}
                        style={styles.input}
                        caption={<RenderCaptionInput text='Debe de escribir mas de 3 carácteres.' />}
                        status={stateInputCodigo}
                    />

                    <Input
                        placeholder='Descripción'
                        autoCapitalize='none'
                        value={form.descripcion}
                        onChangeText={(value) => handleChange('descripcion', value)}
                        accessoryLeft={<CustomKittenIcon name='text-outline' />}
                        multiline={true}
                        size='large'
                        style={[styles.input, { marginBottom: 10, minHeight: 64 }]}
                        caption={<RenderCaptionInput text='Debe de escribir mas de 3 carácteres.' />}
                        status={stateInputDescripcion}
                    />

                </Layout>

                <Layout style={{ height: 20 }} />

                <Layout>
                    <Button accessoryLeft={<CustomKittenIcon name={(isCreate) ? 'checkmark-square-outline' : 'edit-2-outline'} white />}
                        onPress={() => onSubmit(isCreate, navigation)} disabled={isSendHttpAction}>
                        {(isCreate) ? 'Crear' : 'Modificar'}
                    </Button>
                </Layout>


            </Layout>

        </MainLayout>
    )
}

const styles = StyleSheet.create({
    input: {
        marginVertical: 15
    }
});
