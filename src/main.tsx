import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { queryClient } from "./lib/queryClient";
import "./index.css";
import "./App.css";
import App from "./App.tsx";


createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ToastContainer />
    </QueryClientProvider>
  </StrictMode>
);
/* ============================================================
   PRÉ-CARREGAMENTO (prefetch) DOS DADOS ESSENCIAIS
   Dispara as requisições de produtos/posts em paralelo logo no
   bootstrap, antes mesmo das seções montarem. Não depende de
   consentimento de cookies (endpoints públicos). Usa os mesmos
   serviços e queryKeys dos hooks (useProducts/useBlogPosts),
   então os componentes reutilizam o cache aquecido.
============================================================ */
import { getProducts } from "./services/api/products";
import { getPosts } from "./services/blogApi";

const IDLE_CALLBACK: (cb: () => void) => void =
  typeof window !== "undefined" && "requestIdleCallback" in window
    ? (cb) =>
        (
          window as unknown as { requestIdleCallback: (cb: () => void) => void }
        ).requestIdleCallback(cb)
    : (cb) => setTimeout(cb, 0);

IDLE_CALLBACK(() => {
  // Mesma queryKey de useProducts({ active: true, commercialType: 'ECOMMERCE' })
  void queryClient.prefetchQuery({
    queryKey: ["products", { active: true, commercialType: "ECOMMERCE" }],
    queryFn: () => getProducts({ active: true, commercialType: "ECOMMERCE" }),
  });

  // Mesma queryKey de useBlogPosts({ page: 1, limit: 5, featured: true })
  void queryClient.prefetchQuery({
    queryKey: [
      "blog-posts",
      { page: 1, limit: 5, category: undefined, tag: undefined, featured: true },
    ],
    queryFn: ({ signal }) =>
      getPosts(
        { page: 1, limit: 5, status: true, featured: true },
        { signal }
      ),
  });
});
