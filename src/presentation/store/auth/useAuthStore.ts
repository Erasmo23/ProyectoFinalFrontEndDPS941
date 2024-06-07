import { create } from "zustand";
import type { AuthStatus } from "../../../infrastructure/interfaces/auth.status";
import type { User } from "../../../domain/entities/user";
import { authCheckStatusAction, authLoginAction, authLoginGoogleAction } from "../../../actions/auth/auth";
import { StorageAdapter } from "../../../config/adapters/storage-adapter";
import { GOOGLE_API_WEB_CLIENT_ID } from "@env";
import { GoogleSignin } from "@react-native-google-signin/google-signin";


export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;

    login: (email: string, password: string) => Promise<boolean>;
    checkStatus: () => Promise<void>;
    logout: () => Promise<void>;

    loginGoogle : (tokenGoogle : string) => Promise<Boolean>;

}


export const useAuthStore = create<AuthState>()((set, get) => ({
    status: 'checking',
    token: undefined,
    user: undefined,

    login: async (email: string, password: string) => {

        await StorageAdapter.removeItem('tokenSecurity');
        const response = await authLoginAction(email, password);

        if (!response) {
            set({ status: "unauthenticated", token: undefined, user: undefined });
            return false;
        }

        //guardando el token en el storage
        await StorageAdapter.setItem('tokenSecurity', response.token);
        await StorageAdapter.setItem('rolSession', response.user.codigoRol);
        await StorageAdapter.setItem('TypeSession', 'Password');

        set({ status: "authenticated", token: response.token, user: response.user });

        return true;
    },

    checkStatus: async () => {

        const response = await authCheckStatusAction();

        if (!response) {
            set({ status: "unauthenticated", token: undefined, user: undefined });
            return;
        }

        //guardando el token en el storage
        await StorageAdapter.setItem('tokenSecurity', response.token);
        await StorageAdapter.setItem('rolSession', response.user.codigoRol);

        set({ status: "authenticated", token: response.token, user: response.user });

    },
    logout: async () => {
        await StorageAdapter.removeItem('tokenSecurity');
        await StorageAdapter.removeItem('rolSession');

        const tipoInicioSesion = await StorageAdapter.getItem('TypeSession');

        if (tipoInicioSesion === 'Google'){
            GoogleSignin.configure({
                webClientId: GOOGLE_API_WEB_CLIENT_ID,
                offlineAccess: false,
            });
            GoogleSignin.signOut();
        }

        await StorageAdapter.removeItem('TypeSession');

        set({ status: "unauthenticated", token: undefined, user: undefined });
    },

    loginGoogle: async (tokenGoogle : string) => {
        await StorageAdapter.removeItem('tokenSecurity');
        const response = await authLoginGoogleAction(tokenGoogle);

        if (!response) {
            set({ status: "unauthenticated", token: undefined, user: undefined });
            return false;
        }

        await StorageAdapter.setItem('tokenSecurity', response.token);
        await StorageAdapter.setItem('rolSession', response.user.codigoRol);
        await StorageAdapter.setItem('TypeSession', 'Google');

        set({ status: "authenticated", token: response.token, user: response.user });


        return true;
    },

}));