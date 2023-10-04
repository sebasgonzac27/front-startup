import { ClientHeader } from "../components/ClientHeader";

export function Client({ children }) {
  return (
    <>
      <ClientHeader />
      {children}
    </>
  );
}
