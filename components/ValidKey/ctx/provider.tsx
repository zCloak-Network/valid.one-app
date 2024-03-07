import React, { createContext, useEffect, useState } from "react";

export type State = {
  modalOpened: boolean;
  open: () => void;
  close: () => void;
};

export const Context = createContext<State>({} as unknown as State);

export function Provider({ children }: { children: React.ReactNode }) {
  const [modalOpened, setModal] = useState<boolean>(false);

  return (
    <Context.Provider
      value={{
        modalOpened,
        open: () => setModal(true),
        close: () => setModal(false),
      }}
    >
      {children}
      {/* Modal */}
    </Context.Provider>
  );
}
