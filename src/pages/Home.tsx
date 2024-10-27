import { Header, Main, Footer } from "@/components/custom/Home";

export const Home = () => {
  return (
    <div className="h-screen flex flex-1 flex-col">
      <Header />
      <Main />
      <Footer />
    </div>
  );
};
