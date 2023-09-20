import "~/styles/globals.css";
import type { Session } from "next-auth";
import type { NextComponentType } from "next";
import type { AppType } from "next/app";
import { getSession, SessionProvider } from "next-auth/react";
import { trpc } from "~/lib/trpc";

const App: AppType<{ session: Session | null }> = ({
  Component,
  pageProps,
}: { Component: NextComponentType<any, any, any>, pageProps: { session: Session | null } }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
};

App.getInitialProps = async ({ ctx }) => {
  const session = await getSession(ctx);
  return {
    session,
  };
};

export default trpc.withTRPC(App);
