'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type AuthView = 'login' | 'register';

interface AuthContextType {
    isOpen: boolean;
    view: AuthView;
    openAuth: (view?: AuthView) => void;
    closeAuth: () => void;
    toggleView: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);
    const [view, setView] = useState<AuthView>('login');

    const openAuth = (initialView: AuthView = 'login') => {
        setView(initialView);
        setIsOpen(true);
    };

    const closeAuth = () => {
        setIsOpen(false);
    };

    const toggleView = () => {
        setView((prev) => (prev === 'login' ? 'register' : 'login'));
    };

    return (
        <AuthContext.Provider value={{ isOpen, view, openAuth, closeAuth, toggleView }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
