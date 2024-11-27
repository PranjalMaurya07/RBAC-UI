import React from "react";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";
import Header from "./header";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <title>{title}</title>
      </Helmet>
      <header className="fixed-header">
        <Header />
      </header>
      <main style={{ minHeight: `100vh` }} className="main-content">
        <Toaster />
        {children}
      </main>
    </>
  );
};

export default Layout;




