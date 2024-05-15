import { Alert } from 'react-native';
import { useAuthStore } from '../store/auth/useAuthStore';
import { useState } from 'react';
import { getOneConsultorioAction, saveOrEditConsultorioAction } from '../../actions/get-consultorios';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/StackNavigation';

export const useConsultorioForm = () => {

    const { logout } = useAuthStore();
    const [stateInputCodigo, setStateInputCodigo] = useState('basic');
    const [stateInputDescripcion, setStateInputDescripcion] = useState('basic');
    const [isSendHttpAction, setIsSendHttpAction] = useState(false)

    const [form, setForm] = useState({
        id: 0,
        codigo: '',
        descripcion: ''
    });

    const validateForm = (): boolean => {

        let validate = true;

        if (form.codigo.length <= 3) {
            setStateInputCodigo('danger');
            validate = false;
        } else {
            setStateInputCodigo('basic');
        }

        if (form.descripcion.length <= 3) {
            setStateInputDescripcion('danger');
            validate = false;
        } else {
            setStateInputDescripcion('basic');
        }

        return validate;

    }

    const onSubmit = async (isCreate: boolean, navigate: StackNavigationProp<RootStackParams, "ConsultorioScreen", undefined>) => {

        if (!validateForm()) return;

        setIsSendHttpAction(true);

        const responseData = await saveOrEditConsultorioAction({ ...form, fechaCreacion: '' }, isCreate);

        if (responseData.code === '1') {
            Alert.alert('Resultado', responseData.messages, [
                { text: 'Aceptar', onPress: () => { navigate.push('ConsultoriosScreen') } }
            ]);
        }

        setIsSendHttpAction(false);

    }

    const fectchData = async (id: number) => {
        const data = await getOneConsultorioAction(id);
        setForm({
            id: id,
            codigo: data.codigo,
            descripcion: data.descripcion
        });
        setStateInputDescripcion('basic');
        setStateInputCodigo('basic');
    }

    const handleChange = (key: string, value: string) => {
        setForm({ ...form, [key]: value });
    };

    return {

        form,
        stateInputCodigo,
        stateInputDescripcion,
        isSendHttpAction,

        //method
        logout,
        fectchData,
        onSubmit,
        handleChange

    }
}