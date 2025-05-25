// src/contexts/UserContextDefinition.ts
import React, { createContext } from "react";

// Re-exporte a interface UserData se ela for usada em outros lugares fora do provedor
export interface UserData {
  id: string;
  nome: string;
  name: string; // Corrigido para number
  saida: number; // Corrigido para number
  username: string;
  email: string;
  descricao: string;
  avatar: string;
  entradas: number;
  saidas: number;
  faltas: number;
}

// Mantenha esta interface exportada para que o hook 'useUser' possa importá-la
export interface UserContextType {
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  loadingUser: boolean;
  errorUser: string | null;
  // eslint-disable-next-line no-unused-vars
  updateUserCounts: (type: "entrada" | "saida") => Promise<void>;
  logout: () => void;
}

// Mova a criação do contexto para cá e exporte-o
export const UserContext = createContext<UserContextType | undefined>(
  undefined
);
