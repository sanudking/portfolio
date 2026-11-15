import { createContext, useContext } from "react";

export const ScrollPhysicsContext = createContext(null);

export function useScrollPhysics() {
  const context = useContext(ScrollPhysicsContext);

  if (!context) {
    throw new Error(
      "useScrollPhysics must be used inside a ScrollPhysicsProvider"
    );
  }

  return context;
}
