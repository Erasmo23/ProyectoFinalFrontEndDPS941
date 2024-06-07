import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { Button,  Card,  Input, Layout, List, Spinner, Text } from '@ui-kitten/components';
import { useAuthStore } from '../../store/auth/useAuthStore';
import { FullScreenLoader } from '../../components/ui/FullScreenLoader';
import { FAB } from '../../components/ui/FAB';
import type { RootStackParams } from '../../navigation/StackNavigation';
import { MainLayoutDoctor } from '../../layouts/MainLayoutDoctor';
import { CustomKittenIcon } from '../../components/ui/CustomKittenIcon';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { useDoctores } from '../../hooks/useDoctores';
import type { Doctor } from '../../../domain/entities/Doctor';
import { MainLayoutAdmin } from '../../layouts/MainLayoutAdmin';

export const DoctoresScreen = () => {

    const navigation = useNavigation<NavigationProp<RootStackParams>>();
    const { logout } = useAuthStore();

    const { isLoading, doctores, doctoresNextPage, searchByDui } = useDoctores();
    const [term, setTerm] = useState('');
    const {debouncedValue, loading : debouncedLoading} = useDebouncedValue(term);


    useEffect(() => {
        searchByDui(debouncedValue);
    }, [debouncedValue])

    const renderItem = ({ item, index }: { item: Doctor; index: number }): React.ReactElement => (

        <Card style={styles.item} status='basic' 
            header={ ( <Text category='h6' status='warning'> {item.dui} </Text> )}
            footer={( 
               <Button size='tiny' appearance='ghost'
                    accessoryLeft={<CustomKittenIcon name='edit' color='color-success-500' />}
                onPress={() => {navigation.navigate('DoctorScreen', {id: item.doctorId.toString()})}}  />
            )}
            >
            <Text>
                Nombre: {item.nombres} {item.apellidos} 
            </Text>
            <Text>
                Especialidad : {item.especialidad} 
            </Text>

            <Text>
                {item.telefono ? 'Télefono:' + item.telefono  : ''}
            </Text>

        </Card>

    );

    return (
        <>
            <MainLayoutAdmin title='Listado de Doctores del Acilo' isListPage
                subTitle='Mantenimiento de l@s Doctores/as disponibles'
                rightAction={logout}
                rightActionIcon='log-out'
            >

                {

                    isLoading
                        ? (<FullScreenLoader />)
                        :
                        (
                            <>
                                <Layout style={[styles.container, { marginTop: 25 }]}>

                                    <Input placeholder='Busqueda por Dui'
                                        accessoryLeft={<CustomKittenIcon name='search-outline' />}
                                        autoCapitalize='none'
                                        value={term}
                                        onChangeText={setTerm}
                                        style={{ marginHorizontal: 15 }} />

                                    <Layout style={{ height: 10 }} />

                                    
                                    {
                                        (debouncedLoading)
                                            ? (
                                                <Layout style={{ justifyContent: 'center', alignItems: 'center' }}>
                                                    <Spinner size="giant" />
                                                </Layout>
                                            )
                                            : null
                                    }

                                <List style={{ maxHeight: '72%' }}
                                    data={doctores}
                                    contentContainerStyle={styles.contentContainer}
                                    keyExtractor={(item, index) => `${item.doctorId}-${index}`}
                                    renderItem={renderItem}
                                    onEndReachedThreshold={0.7}
                                    onEndReached={doctoresNextPage}
                                />

                                </Layout>


                            </>

                        )

                }

            </MainLayoutAdmin>

            <FAB status='info' iconName="plus-outline"
                onPress={() => navigation.navigate('DoctorScreen', { id: 'create' })}
                style={{
                    position: 'absolute',
                    bottom: 30,
                    right: 20,
                }}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingHorizontal: 5,
      paddingBottom: 50
    },
    contentContainer: {
        paddingHorizontal: 8,
        paddingVertical: 4,
      },
      item: {
        marginVertical: 4,
      },
  });