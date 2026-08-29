"use client";

import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "aos/dist/aos.css";
import "./App.css";

import ScrollingTicker from "./components/ScrollingTicker/ScrollingTicker";
import Header from "./components/Header/Header";
import HeaderBlog from "./components/Header/HeaderBlog";
import HeaderPolitica from "./components/Header/HeaderPolitica";
import Hero from "./components/Hero/Hero";
import Footer from "./components/Footer/Footer";
import ScrollTop from "./components/ScrollTop/ScrollTop";
import ScrollToTopOnRouteChange from "./components/ScrollToTopOnRouteChange/ScrollToTopOnRouteChange";
import ContactForm from "./components/ContactForm/ContactForm";
import { HelmetProvider } from "react-helmet-async";
import SEO from "./components/SEO/SEO";
import { COMPANY_INFO, SOCIAL_LINKS, SITE_URL } from "./config/constants";
import { useScrollToAnchor } from "./hooks/useScrollToAnchor";
import GTMScript from "./components/GTM/GTMScript";
import CookieBanner from "./components/CookieBanner/CookieBanner";

import GoogleMapsSection from "./components/GoogleMapsSection/GoogleMapsSection";
import FeaturesBar from "./components/FeatureBar/FeatureBar";
import FeaturedProducts from "./components/FeaturedProducts/FeaturedProducts";
import BlogSection from "./components/BlogSection/BlogSection";
import GoogleReviewsWidget from "./components/GoogleReviewsWidget/GoogleReviewsWidget";
import SocialMediaSection from "./components/SocialMediaSection/SocialMediaSection";
import CentralDaObra from "./components/CentralDaObra/CentralDaObra";
import PromocoesSemana from "./components/sections/PromocoesSemana";
import NossaHistoria from "./components/NossaHistoria/NossaHistoria";
import EcommerceBanner from "./components/EcommerceBanner/EcommerceBanner";
import { LandingCategoriesSlider } from "./components/blog/LandingCategoriesSlider";
import EcomeercePromoCategories from "./components/EcommercePromoCategories/EcommercePromoCategories"
// =====================================================
// CODE-SPLITTING: páginas carregadas sob demanda
// =====================================================
const PoliticaEPrivacidade = lazy(() => import("./pages/PoliticasEPrivacidade"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const BlogPostDetail = lazy(() => import("./pages/blog/BlogPostDetail"));

// 🆕 Páginas de Produtos
const ProductList = lazy(() => import("./pages/ProductList"));
const ProductDetail = lazy(() => import("./pages/ProductDetail")); // ou "./components/ProductDetail/ProductDetail"

const CalculadoraPiso = lazy(() => import("./pages/CalculadoraPiso"));
const CalculadoraTinta = lazy(() => import("./pages/CalculadoraTinta"));
const CalculadoraArgamassa = lazy(() => import("./pages/CalculadoraArgamassa"));
const CalculadoraRejunte = lazy(() => import("./pages/CalculadoraRejunte"));
const SolicitarOrcamento = lazy(() => import("./pages/SolicitarOrcamento"));
const Especialista = lazy(() => import("./pages/Especialista"));

/** Fallback de carregamento para rotas lazy. */
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 rounded-full border-4 border-gray-200 border-t-[#072B63] animate-spin" />
        <p className="text-sm text-gray-500">Carregando…</p>
      </div>
    </div>
  );
}

function AppContent() {
  const location = useLocation();
  const pathname = location.pathname.toLowerCase();

  // Ativa scroll suave para âncoras na mudança de rota e hash
  useScrollToAnchor();

  const isBlogPage = pathname.startsWith("/blog");
  const isPoliticaPage = pathname === "/politicas" || pathname === "/politica-de-privacidade" || pathname === "/termos";

  return (
    <div className="min-h-screen">
      <GTMScript />
      <CookieBanner />

      {/* HEADER CONTEXTUAL */}
      {isBlogPage ? (
        <HeaderBlog />
      ) : isPoliticaPage ? (
        <HeaderPolitica />
      ) : (
        <Header />
      )}

      <ScrollToTopOnRouteChange />
      <ScrollTop />

      <Routes>
        {/* ===================== HOME ===================== */}
        <Route
          path="/"
          element={
            <>
              <SEO
                title="Construbet | Materiais para Construção em Betim - MG"
                description="Há mais de 45 anos a Construbet oferece materiais para construção, acabamento, pisos, ferramentas e muito mais em Betim e região. Qualidade, tradição e entrega rápida."
                keywords={[
                  "materiais de construção betim",
                  "loja de construção betim",
                  "cimento betim",
                  "porcelanato betim",
                  "ferramentas betim",
                  "acabamento betim",
                  "construbet",
                  "materiais para obra betim",
                  "loja de materiais de construção mg",
                ]}
                canonical="/"
                jsonLd={{
                  "@context": "https://schema.org",
                  "@type": "HomeGoodsStore",
                  name: COMPANY_INFO.name,
                  image: `${SITE_URL}/logo.webp`,
                  description:
                    "Loja de materiais para construção em Betim - MG. Há mais de 45 anos oferecendo qualidade e tradição.",
                  address: {
                    "@type": "PostalAddress",
                    addressLocality: COMPANY_INFO.address.city,
                    addressRegion: COMPANY_INFO.address.state,
                    addressCountry: COMPANY_INFO.address.country,
                  },
                  telephone: COMPANY_INFO.phoneFormatted,
                  url: SITE_URL,
                  sameAs: [
                    SOCIAL_LINKS.instagram,
                    SOCIAL_LINKS.facebook,
                    SOCIAL_LINKS.youtube,
                  ],
                }}
              />

              <main className="pt-16 min-h-screen flex flex-col">
                <Hero />
                <ScrollingTicker />
                <EcomeercePromoCategories/>
                <LandingCategoriesSlider />
                <FeaturesBar />
                <FeaturedProducts />
                <EcommerceBanner />
                <section className="relative overflow-hidden bg-[linear-gradient(135deg,#071B46_0%,#0B2E73_100%)]">
                  <CentralDaObra />
                </section>
                <ScrollingTicker />
                <BlogSection />
                <PromocoesSemana />

                {/* 🔧 CORREÇÃO AQUI: adicionado className */}
                <div id="sobre" className="px-4 sm:px-6 lg:px-8">
                  <NossaHistoria />
                </div>

                <ScrollingTicker />
                {/* 🔧 CORREÇÃO AQUI: adicionado className */}
                <div id="mapa" className="px-4 sm:px-6 lg:px-8">
                  <GoogleMapsSection />
                </div>

                <GoogleReviewsWidget />
                <ScrollingTicker />
                <div id="contato" className="px-4 sm:px-6 lg:px-8">
                  <ContactForm />
                </div>
                <SocialMediaSection />

              </main>
            </>
          }
        />

        {/* ===================== POLÍTICAS ===================== */}
        <Route
          path="/politicas"
          element={
            <Suspense fallback={<PageLoader />}>
              <PoliticaEPrivacidade />
            </Suspense>
          }
        />
        <Route
          path="/politica-de-privacidade"
          element={
            <Suspense fallback={<PageLoader />}>
              <PoliticaEPrivacidade />
            </Suspense>
          }
        />
        <Route
          path="/termos"
          element={
            <Suspense fallback={<PageLoader />}>
              <PoliticaEPrivacidade />
            </Suspense>
          }
        />

        {/* ===================== BLOG ===================== */}
        <Route
          path="/blog"
          element={
            <Suspense fallback={<PageLoader />}>
              <BlogPage />
            </Suspense>
          }
        />
        <Route
          path="/blog/:slug"
          element={
            <Suspense fallback={<PageLoader />}>
              <BlogPostDetail />
            </Suspense>
          }
        />

        {/* ===================== 🆕 PRODUTOS ===================== */}
        <Route
          path="/produtos"
          element={
            <Suspense fallback={<PageLoader />}>
              <ProductList />
            </Suspense>
          }
        />
        <Route
          path="/produto/:slug"
          element={
            <Suspense fallback={<PageLoader />}>
              <ProductDetail />
            </Suspense>
          }
        />

        {/* ===================== CALCULADORAS ===================== */}
        <Route
          path="/calculadora/piso"
          element={
            <Suspense fallback={<PageLoader />}>
              <CalculadoraPiso />
            </Suspense>
          }
        />
        <Route
          path="/calculadora/tinta"
          element={
            <Suspense fallback={<PageLoader />}>
              <CalculadoraTinta />
            </Suspense>
          }
        />
        <Route
          path="/calculadora/argamassa"
          element={
            <Suspense fallback={<PageLoader />}>
              <CalculadoraArgamassa />
            </Suspense>
          }
        />
        <Route
          path="/calculadora/rejunte"
          element={
            <Suspense fallback={<PageLoader />}>
              <CalculadoraRejunte />
            </Suspense>
          }
        />
        <Route
          path="/orcamento"
          element={
            <Suspense fallback={<PageLoader />}>
              <SolicitarOrcamento />
            </Suspense>
          }
        />
        <Route
          path="/especialista"
          element={
            <Suspense fallback={<PageLoader />}>
              <Especialista />
            </Suspense>
          }
        />
      </Routes>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <AppContent />
      </Router>
    </HelmetProvider>
  );
}