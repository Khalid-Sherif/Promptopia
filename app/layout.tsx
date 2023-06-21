import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import React from "react";

interface Metadata {
  title: string;
  description: string;
}

export const metadata: Metadata = {
  title: "Promptopia",
  description: "Discover & Share AI Prompts",
};

type Props = {
  children: React.ReactNode;
};

const RootLayout = (props: Props) => {
  return (
    <html lang="en">
      <head>
        <title>Promptopia</title>
        <meta
          name="description"
          content="A platform for creating and sharing writing prompts"
        />
        <meta
          name="keywords"
          content="writing, prompts, creative writing, inspiration"
        />
      </head>
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
