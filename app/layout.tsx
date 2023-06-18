import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
interface Metadata {
  title: string;
  description: string;
}

export const metadata: Metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

import React from "react";

type Props = {
  children: React.ReactNode;
};

const RootLayout = (props: Props) => {
  return (
    <html lang="en">
      <body>
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">
            <Nav />
            {props.children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
