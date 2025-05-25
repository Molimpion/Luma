// src/contexts/UserContexts.tsx (Exemplo, o seu pode ser ligeiramente diferente)
import React, { useState, useEffect, useCallback } from "react";
import { UserContext, UserData } from "./UserContextDefinition";

interface UserProviderProps {
  children: React.ReactNode;
  userId: string;
}

export function UserProvider({ children, userId }: UserProviderProps) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState<string | null>(null);

  const fetchUserData = useCallback(async () => {
    setLoadingUser(true);
    setErrorUser(null);
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}`);
      if (!response.ok) {
        throw new Error(
          `Erro ao buscar dados do usuário: ${response.status} - ${response.statusText} `
        );
      }
      const data: UserData = await response.json();
      setUserData({
        ...data,
        name: data.nome,
        saida: data.saidas,
      });
    } catch (err: any) {
      setErrorUser(err instanceof Error ? err.message : String(err));
      setUserData(null);
      console.error("Erro ao buscar dados do usuário", err);
    } finally {
      setLoadingUser(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchUserData();
    }
  }, [userId, fetchUserData]);

  const updateUserCounts = useCallback(
    async (type: "entrada" | "saida") => {
      if (!userData) return;

      let updatedData: Partial<UserData> = {};
      if (type === "entrada") {
        updatedData = { entradas: userData.entradas + 1 };
      } else {
        updatedData = { saidas: userData.saidas + 1 };
      }

      try {
        const response = await fetch(`http://localhost:3001/users/${userId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
          throw new Error("Falha ao atualizar contagem de pontos.");
        }

        const updatedUserFromBackend: UserData = await response.json();
        setUserData({
          ...updatedUserFromBackend,
          name: updatedUserFromBackend.nome,
          saida: updatedUserFromBackend.saidas,
        });
      } catch (error: any) {
        console.error("Erro ao atualizar contagem de pontos:", error);
        setErrorUser(error instanceof Error ? error.message : String(error));
      }
    },
    [userId, userData]
  );

  const logout = () => {
    localStorage.removeItem("loggedInUserId");
    localStorage.removeItem("loggedInUserName");
    setUserData(null);
  };

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        loadingUser,
        errorUser,
        updateUserCounts,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
