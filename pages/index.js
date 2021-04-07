import Head from "next/head";

import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <>
      <Head>
        <title>Viber Clone</title>
        <link rel="icon" href="/viber_favicon.ico" />
      </Head>
      <Header />
      <main style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ flexDirection: "column" }}>
          <Sidebar />
        </div>
        <div style={{ display: "flex", flex: 1 }}></div>
      </main>
    </>
  );
}
