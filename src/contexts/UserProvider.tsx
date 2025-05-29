// src/contexts/UserContexts.tsx
import React, { useState, useEffect, useCallback } from "react";
import {
  UserContext,
  UserData,
  RawPontoData,
  PontoRecord,
} from "./UserContextDefinition";

interface UserProviderProps {
  children: React.ReactNode;
  userId: string;
}

const getMonthRange = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  return { first: firstDayOfMonth, last: lastDayOfMonth };
};

const toIso = (d: Date) => d.toISOString().slice(0, 10);

export function UserProvider({ children, userId }: UserProviderProps) {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [errorUser, setErrorUser] = useState<string | null>(null);

  const fetchUserDataAndCalculateFaltas = useCallback(async () => {
    setLoadingUser(true);
    setErrorUser(null);
    try {
      const userResponse = await fetch(`http://localhost:3001/users/${userId}`);
      if (!userResponse.ok) {
        throw new Error(
          `Erro ao buscar dados do usuário: ${userResponse.status} - ${userResponse.statusText}`
        );
      }
      const userDataFromBackend: UserData = await userResponse.json();

      const currentMonth = new Date();
      const { first: firstDateObj, last: lastDateObj } =
        getMonthRange(currentMonth);
      const startDate = toIso(firstDateObj);
      const endDate = toIso(lastDateObj);

      const pontosResponse = await fetch(
        `http://localhost:3001/pontos?userId=${userId}`
      );
      if (!pontosResponse.ok) {
        throw new Error(`Erro ao buscar pontos: ${pontosResponse.status}`);
      }
      const pontos: RawPontoData[] = await pontosResponse.json();

      const filteredPontos = pontos.filter((ponto) => {
        const pontoDate = ponto.date;
        return pontoDate >= startDate && pontoDate <= endDate;
      });

      const mapdosDias: Record<string, PontoRecord> = {};
      filteredPontos.sort((a, b) => a.timestamp - b.timestamp);

      filteredPontos.forEach(({ date, dataHora, type }) => {
        const hora = dataHora.split("|")[1].replace(/\s/g, "").trim();
        const [, m, d] = date.split("-");
        const label = `${d}/${m}`;

        if (!mapdosDias[label]) {
          mapdosDias[label] = { date: label, entrada: "", saida: "" };
        }
        if (type === "entrada" && !mapdosDias[label].entrada) {
          mapdosDias[label].entrada = hora;
        } else if (type === "saida") {
          mapdosDias[label].saida = hora;
        }
      });

      const daysCount = lastDateObj.getDate();
      const arr: PontoRecord[] = [];
      for (let day = 1; day <= daysCount; day++) {
        const dd = String(day).padStart(2, "0");
        const mm = String(currentMonth.getMonth() + 1).padStart(2, "0");
        const key = `${dd}/${mm}`;
        const record = mapdosDias[key] || { date: key, entrada: "", saida: "" };
        arr.push(record);
      }

      const diasUteisDoMes = arr.filter((record) => {
        const [dia, mes] = record.date.split("/").map(Number);
        const dataCompleta = new Date(currentMonth.getFullYear(), mes - 1, dia);
        const diaDaSemana = dataCompleta.getDay();
        return diaDaSemana !== 0 && diaDaSemana !== 6;
      });
      const faltasCalculadas = diasUteisDoMes.filter(
        (record) => !record.entrada && !record.saida
      ).length;

      setUserData({
        ...userDataFromBackend,
        name: userDataFromBackend.nome,
        saida: userDataFromBackend.saidas,
        faltas: faltasCalculadas,
      });
    } catch (err: any) {
      setErrorUser(err instanceof Error ? err.message : String(err));
    } finally {
      setLoadingUser(false);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchUserDataAndCalculateFaltas();
    }
  }, [userId, fetchUserDataAndCalculateFaltas]);

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
        setUserData((prevData) => ({
          ...(prevData || {}),
          ...updatedUserFromBackend,
          name: updatedUserFromBackend.nome,
          saida: updatedUserFromBackend.saidas,
        }));
        fetchUserDataAndCalculateFaltas();
      } catch (error: any) {
        setErrorUser(error instanceof Error ? error.message : String(error));
      }
    },
    [userId, userData, fetchUserDataAndCalculateFaltas]
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
