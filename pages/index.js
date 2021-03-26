import Head from "next/head";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Viber Clone</title>
        <link rel="icon" href="/viber_favicon.ico" />
      </Head>

      <main style={{ display: "flex", flexDirection: "row" }}>
        <Sidebar />
      </main>
    </>
  );
}
