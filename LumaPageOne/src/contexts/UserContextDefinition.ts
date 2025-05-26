import React, { createContext } from "react";

export interface UserData {
  id: string;
  nome: string;
  name: string;
  saida: number;
  username: string;
  email: string;
  descricao: string;
  avatar: string;
  entradas: number;
  saidas: number;
  faltas: number;
}

export interface UserContextType {
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  loadingUser: boolean;
  errorUser: string | null;
  // eslint-disable-next-line no-unused-vars
  updateUserCounts: (type: "entrada" | "saida") => Promise<void>;
  logout: () => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);
