<<<<<<< HEAD
# TODO - Correções TypeScript (front-end)

- [x] Revisar e corrigir import não usado/erro de tipagem no `src/components/Layout/Sidebar.tsx`
- [x] Corrigir caminho do hook `useAuth` no `src/components/PrivateRoute/AdminRoute.tsx`
- [x] Ajustar `ProvaForm.tsx`: remover `fetchProva` (não usado) e tratar carregamento de prova/questões apenas se existir endpoint
- [x] Rodar `npm run build` e confirmar que não há erros TypeScript



=======
# TODO - Otimização do Componente de Cards de Promoções

## Passos
- [x] 0. Analisar o task e ler os arquivos relevantes
- [x] 1. Criar plano e obter aprovação do usuário
- [x] 2. Atualizar `src/types/sections.ts` (adicionar `externalLink` e `limitedStock`)
- [x] 3. Reescrever `src/data/promotions.ts` (6 produtos, novos esquema com links externos)
- [x] 4. Reescrever `src/components/sections/PromotionCard.tsx` (imagem 1:1, hover, link externo)
- [x] 5. Atualizar `src/components/sections/PromocoesSemana.tsx` (grid responsivo - já estava correto)
- [x] 6. Atualizar `src/components/sections/PromotionTimer.tsx` (animações framer-motion)
- [x] 7. Rodar build/type-check para confirmação

## Carrossel Mobile (Feedback)
- [x] 8. Implementar carrossel com rolagem lateral no mobile em `PromocoesSemana.tsx`
- [x] 9. Adicionar utility `scrollbar-hide` em `src/index.css`
- [x] 10. Adicionar dots indicadores no mobile e setas de navegação no desktop
- [x] 11. Rodar type-check para confirmação
>>>>>>> a8a55d99a9d706255a0e22bc146868586279d6c4
