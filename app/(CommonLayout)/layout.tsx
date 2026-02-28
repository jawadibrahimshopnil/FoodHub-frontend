import Navbar from "@/components/shared/Navbar";
import Footer from './../../components/shared/Footer';
export default function CommonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Global Navbar */}
      <Navbar />
      
      {/* Main Content Area */}
      <main className="grow">
        {children}
      </main>

      {/* Global Footer */}
      {/* <Footer /> */}
      <Footer />
    </div>
  );
}