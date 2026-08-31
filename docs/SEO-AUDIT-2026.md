# Auditoria técnica de SEO — Construbet
**Data:** 2026-03-31  
**Escopo:** repositório frontend React/Vite, configuração Netlify e artefatos públicos.  
**Status:** auditoria estática; métricas de campo e backlinks exigem acesso às ferramentas externas.

## 1. Resumo executivo
A base técnica é funcional e já contém sinais importantes: `robots.txt` permite o crawling, o sitemap é gerado no build, as rotas usam URLs legíveis, há `react-helmet-async` por rota, JSON-LD para a loja, produtos e posts, e as páginas são carregadas por code-splitting.

Os maiores riscos atuais são:

1. **Rendering de SPA:** o HTML inicial é apenas o shell; títulos, conteúdo e JSON-LD chegam após JavaScript/hidratação. Google consegue renderizar, mas isso aumenta dependência de uma segunda etapa e pode reduzir cobertura em crawlers menos capazes.
2. **Sitemap:** a consulta de posts usa `limit=100`, sem paginação; sites com mais de 100 posts terão URLs omitidas. O script também usa `{ timeout: 5000 }` em `fetch` Node, opção que não implementa timeout real.
3. **Indexação de filtros:** a listagem agora usa canonical `/blog` e `noindex` para categoria/busca, evitando duplicatas. É correto se categorias não forem landing pages estratégicas; caso sejam, devem ganhar URLs próprias e conteúdo indexável.
4. **Dados estruturados incompletos:** há `HomeGoodsStore`, `Product` e `BlogPosting`; faltam `BreadcrumbList`, `WebSite`/`SearchAction` (se houver busca indexável), e FAQ só deve ser adicionado quando o FAQ realmente estiver visível no conteúdo.
5. **Performance:** existem bons chunks manuais e lazy loading, mas o shell inicial importa muitos componentes da home e ainda inclui terceiros. LCP/INP/CLS reais não podem ser declarados sem Lighthouse/PageSpeed e Search Console.

### Prioridade
- **P0 (1 sprint):** corrigir sitemap completo/timeout, validar canonical/noindex, testar renderização de rotas e validar schemas.
- **P1 (2–4 sprints):** prerender/SSG das páginas de blog/produto, breadcrumbs, melhoria de imagens/LCP e redução de terceiros.
- **P2 (contínuo):** conteúdo baseado em intenção, E-E-A-T, backlinks locais e monitoramento de CWV/GSC.

## 2. Auditoria técnica
### Crawlability, indexação e status
- `public/robots.txt`: `User-agent: *`, `Allow: /` e sitemap declarado. Não bloqueia CSS/JS, o que é adequado para SPA.
- Netlify usa rewrite `/* → /index.html` com status 200. Isso permite navegação client-side, mas páginas inexistentes podem receber o shell 200; adicionar uma rota 404 real/noindex ou tratamento de status no edge é recomendado.
- Não há evidência no repositório de SSR/prerender. O Googlebot deve aguardar renderização JS para obter conteúdo de posts/produtos.
- O sitemap atual contém rotas estáticas, produtos ativos e posts publicados. Deve ser paginado até consumir todas as páginas da API, deduplicado e validado contra 200/404 antes de publicar.
- `lastmod` deve ser uma data real de atualização; não usar data de geração. Validar o domínio canônico (`site.construbet.com.br`) com o domínio efetivamente usado no Search Console.

### URLs e canonical
- Rotas `/blog/:slug` e `/produto/:slug` são descritivas e adequadas.
- `/blog?categoria=...` e buscas agora apontam para `/blog` e recebem `noindex`; manter assim para filtros não estratégicos. Para SEO de categoria, criar `/blog/categoria/:slug` com conteúdo introdutório, canonical próprio e links internos.
- `SEO.tsx` gera canonical dinamicamente, robots, Open Graph e Twitter Card. Remover o fallback `window.location.href` de páginas que devem ter canonical determinístico, se houver parâmetros de tracking.
- Testar cadeias de redirect, trailing slash, HTTP→HTTPS e `www`/não-`www` no ambiente publicado.

### Rendering SPA
Recomendação: gerar HTML estático/prerender para `/`, `/blog`, cada `/blog/:slug`, `/produtos` e cada `/produto/:slug`. Alternativas: migrar rotas públicas para framework com SSG/ISR ou usar prerender no pipeline. Não é obrigatório para o Google, mas reduz dependência de renderização e melhora compartilhamento/social previews.

## 3. Performance e Core Web Vitals
Não há dados de Lighthouse/PageSpeed/GSC anexados; portanto LCP, INP e CLS atuais são **não medidos**, não “aprovados”. Medir mobile e desktop em URL publicada, 5 execuções por URL, registrando p75:

| Métrica | Alvo “bom” | Evidência necessária |
|---|---:|---|
| LCP | ≤ 2,5 s | PageSpeed/Lighthouse + CrUX/GSC |
| INP | ≤ 200 ms | PageSpeed/CrUX |
| CLS | ≤ 0,10 | Lighthouse/CrUX |

A referência operacional deve ser p75; `0,15` não é o limiar atual “bom” do CLS. Prioridades técnicas: identificar o elemento LCP e usar imagem dimensionada/preload apenas quando for realmente hero; manter imagens fora da viewport lazy; medir impacto de Framer Motion/AOS; adiar GTM, Elfsight e Maps; preservar code-splitting. `vite.config.ts` já separa React, Query, Motion e ícones.

## 4. Conteúdo e on-page
- `BlogPage` possui um H1 único e cards com H2/H3; `BlogPostDetail` possui H1 do título. Validar posts reais para garantir hierarquia H2/H3 e evitar HTML enviado pelo painel com múltiplos H1.
- Descrições do blog são atualmente fixas na listagem; detalhes usam descrição do post. Criar validação editorial para títulos únicos, descriptions entre ~150–160 caracteres quando natural, slug, autor, data publicada/atualizada e imagem social.
- Não depender de `meta keywords`; o componente ainda as emite, mas não têm valor de ranking e podem ser removidas em uma limpeza futura.
- E-E-A-T: manter autor, avatar, data, Sobre, Contato, endereço/telefone e política; adicionar página de autor com experiência e revisão editorial quando houver pessoas responsáveis.
- Linkagem interna existente: blog → produto via `PostProductsGrid`, navegação blog/produtos e categorias. Auditar páginas órfãs por crawl e adicionar links contextuais entre posts relacionados.

## 5. Structured data / GEO
Existem JSON-LD para `HomeGoodsStore`, `Product` e `BlogPosting`, injetados no `<head>` via Helmet. Próximas ações:
- adicionar `BreadcrumbList` nas páginas de produto e post, coerente com breadcrumbs visíveis;
- completar `Product` somente com preço/disponibilidade verdadeiros; não inventar `AggregateRating`/`Review` do Elfsight;
- adicionar `Organization`/`LocalBusiness` com endereço completo, horário e `sameAs` quando disponíveis;
- usar `FAQPage`/`HowTo` apenas quando a seção correspondente estiver visível, completa e útil ao usuário;
- validar em Rich Results Test e Schema Markup Validator, além de conferir JSON-LD no HTML renderizado.

Para GEO/AI: responder perguntas concretas, usar headings semânticos, definições, passos, tabelas comparativas, fontes e dados/experiências próprias. Não há garantia de AI Overview por usar schema; qualidade, rastreabilidade e utilidade são prioritárias.

## 6. Autoridade, concorrência e palavras-chave
Backlinks, domínios de referência, posições, CTR e concorrentes não são observáveis no código. Extrair no mínimo 16 meses de GSC e cruzar com Ahrefs/Semrush/Ubersuggest antes de classificar links como tóxicos ou definir metas.

### Pesquisa sugerida
| Cluster | Intenção | Exemplos a validar por volume/localidade |
|---|---|---|
| Materiais em Betim | local/transacional | loja de material de construção em Betim, materiais para obra Betim |
| Pisos e revestimentos | comercial/informacional | porcelanato ou cerâmica, como calcular piso |
| Calculadoras de obra | informacional/conversão | calculadora de argamassa, calculadora de rejunte, quantidade de tinta |
| Reforma e economia | informacional | como planejar reforma, como economizar na obra |
| Iluminação e hidráulica | informacional/comercial | lâmpada por ambiente, materiais hidráulicos para reforma |

Produzir páginas somente após validar SERP, volume, dificuldade, cobertura concorrente e capacidade de oferecer informação nova (fotos reais, medições, casos locais, comparativos de produto). Backlinks prioritários: parceiros/fornecedores, associações comerciais locais, imprensa regional e perfis empresariais consistentes; evitar compra de links e disavow sem evidência.

## 7. Backlog priorizado
| Prioridade | Ação | Impacto | Esforço | Responsável | Evidência de aceite |
|---|---|---|---|---|---|
| P0 | Paginar sitemap de posts/produtos; usar `AbortController` no script; falhar build quando sitemap dinâmico ficar incompleto | Alto | M | Frontend/Backend | Contagem sitemap = registros públicos API |
| P0 | Validar domínio, sitemaps, cobertura, canonicals e redirects no GSC | Alto | P | SEO | Cobertura sem erros críticos |
| P0 | Auditoria Lighthouse/PSI mobile/desktop das URLs `/`, `/blog`, post e produto | Alto | P | Frontend | Baseline e plano CWV versionados |
| P0 | Criar tratamento real para rota não encontrada / status 404 | Médio | M | Frontend/Netlify | URL inválida não indexável |
| P1 | Prerender/SSG para home, listagens e detalhes públicos | Alto | G | Frontend/Plataforma | HTML inicial contém conteúdo/meta/schema |
| P1 | Breadcrumbs visíveis + `BreadcrumbList` | Médio | M | Frontend/SEO | Rich Results/Schema Validator sem erros |
| P1 | Revisar imagem LCP, dimensões, formatos e terceiros | Alto | M | Frontend | LCP p75 ≤ 2,5 s |
| P1 | Padronizar briefing editorial: intenção, H2/H3, autor, atualização, links internos e FAQ visível | Alto | M | Conteúdo/SEO | Checklist em 100% dos novos posts |
| P2 | Implementar clusters e hubs de conteúdo | Alto | G | Conteúdo/SEO | Cobertura/CTR dos clusters no GSC |
| P2 | Programa de citações e backlinks locais qualificados | Médio | G | Marketing | Domínios de referência relevantes crescem |

## 8. Monitoramento contínuo
- **Semanal:** GSC (indexação, sitemap, consultas, páginas, CTR) e erros 404.
- **Mensal:** PageSpeed/CrUX, tamanho de bundle, schema validation, novos conteúdos e links internos.
- **Trimestral:** concorrência, content gap, backlinks, auditoria de URLs e atualização de conteúdos de maior tráfego.
- Configurar alertas para queda de impressões/CTR, aumento de páginas excluídas, CWV “Ruim” e sitemap com URLs inesperadamente reduzidas.

## Limites desta auditoria
O repositório não fornece credenciais ou exportações de GSC, Analytics, CrUX, PageSpeed, Ahrefs/Semrush/Ubersuggest, nem crawling do ambiente publicado. Por isso este relatório não declara posições, backlinks, tráfego, Core Web Vitals ou screenshots inexistentes. Esses dados devem complementar a baseline antes de priorizar metas numéricas.
