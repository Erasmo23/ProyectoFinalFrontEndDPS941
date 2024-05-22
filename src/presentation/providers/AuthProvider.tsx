import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/StackNavigation';
import { PropsWithChildren, useEffect } from 'react';
import { useAuthStore } from '../store/auth/useAuthStore';

export const AuthProvider = ({ children }: PropsWithChildren) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParams>>();

    const { checkStatus, status, user } = useAuthStore();

    useEffect(() => {
        checkStatus();
    }, []);

    useEffect(() => {
        
        if (status !== 'checking') {

            if (status === 'authenticated') {

                if (!user!.needResetPassword){
                    navigation.navigate("ChangePasswordScreen", {correo: user!.correo});
                    return;
                }

                if (user?.codigoRol === 'ADMIN_USER'){
            
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'HomeScreen' }],
                    });
                }else if (user?.codigoRol === 'DOCTOR_USER'){
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'HomeDoctorScreen' }],
                    });
                }else{
                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'HomePacienteScreen' }],
                    });
                }
                
            } else {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'LoginScreen' }],
                });
            }
        }
    }, [status]);

    return (
        <>{children}</>
    )
}