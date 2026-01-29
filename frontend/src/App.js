import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from '@/components/ui/sonner';
import Header from '@/components/Layout/Header';
import Footer from '@/components/Layout/Footer';
import AuthDiagnostic from '@/components/AuthDiagnostic';
import { useScrollToTop } from '@/hooks/useScrollToTop';
import '@/App.css';

// Lazy load pages
const Home = lazy(() => import('@/pages/Home'));
const Capabilities = lazy(() => import('@/pages/Capabilities'));
const CNCMachining = lazy(() => import('@/pages/capabilities/CNCMachining'));
const CNCMilling = lazy(() => import('@/pages/capabilities/CNCMilling'));
const CNCTurning = lazy(() => import('@/pages/capabilities/CNCTurning'));
const SheetMetals = lazy(() => import('@/pages/capabilities/SheetMetals'));
const LaserCutting = lazy(() => import('@/pages/capabilities/LaserCutting'));
const FormingBending = lazy(() => import('@/pages/capabilities/FormingBending'));
const Punching = lazy(() => import('@/pages/capabilities/Punching'));
const FabricatedAssemblies = lazy(() => import('@/pages/capabilities/FabricatedAssemblies'));
const ThreeDPrinting = lazy(() => import('@/pages/capabilities/ThreeDPrinting'));
const SpecialProcess = lazy(() => import('@/pages/capabilities/SpecialProcess'));
const QualityCompliance = lazy(() => import('@/pages/QualityCompliance'));
const Industries = lazy(() => import('@/pages/Industries'));
const Blog = lazy(() => import('@/pages/Blog'));
const BlogPost = lazy(() => import('@/pages/BlogPost'));
const InstantQuote = lazy(() => import('@/pages/InstantQuote'));
const Contact = lazy(() => import('@/pages/Contact'));
const Login = lazy(() => import('@/pages/Login'));
const Teamspace = lazy(() => import('@/pages/Teamspace'));
const Admin = lazy(() => import('@/pages/Admin'));

const LoadingFallback = () => (
  <div className="min-h-screen bg-[#151515] flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#910A67]"></div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ConditionalLayout />
      </BrowserRouter>
    </AuthProvider>
  );
}

const ConditionalLayout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  useScrollToTop();

  return (
    <div className="App min-h-screen bg-[#151515] text-white">
      {!isAdminRoute && <Header />}
      <main>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/capabilities" element={<Capabilities />} />
            <Route path="/capabilities/cnc-machining" element={<CNCMachining />} />
            <Route path="/capabilities/cnc-milling" element={<CNCMilling />} />
            <Route path="/capabilities/cnc-turning" element={<CNCTurning />} />
            <Route path="/capabilities/sheet-metals" element={<SheetMetals />} />
            <Route path="/capabilities/sheet-metals/laser-cutting" element={<LaserCutting />} />
            <Route path="/capabilities/sheet-metals/forming-bending" element={<FormingBending />} />
            <Route path="/capabilities/sheet-metals/punching" element={<Punching />} />
            <Route path="/capabilities/sheet-metals/fabricated-assemblies" element={<FabricatedAssemblies />} />
            <Route path="/capabilities/3d-printing" element={<ThreeDPrinting />} />
            <Route path="/capabilities/special-process" element={<SpecialProcess />} />
            <Route path="/quality" element={<QualityCompliance />} />
            <Route path="/industries" element={<Industries />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/instant-quote" element={<InstantQuote />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/teamspace" element={<Teamspace />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </Suspense>
      </main>
      {!isAdminRoute && <Footer />}
      <Toaster position="top-right" />
      {process.env.NODE_ENV === 'development' && <AuthDiagnostic />}
    </div>
  );
}

export default App;
