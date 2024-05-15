import { create } from "zustand";
import type { AuthStatus } from "../../../infrastructure/interfaces/auth.status";
import type { User } from "../../../domain/entities/user";
import { authCheckStatusAction, authLoginAction } from "../../../actions/auth/auth";
import { StorageAdapter } from "../../../config/adapters/storage-adapter";


export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;

    login: (email: string, password: string) => Promise<boolean>;
    checkStatus: () => Promise<void>;
    logout: () => Promise<void>;

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
        set({ status: "unauthenticated", token: undefined, user: undefined });
    },

}));