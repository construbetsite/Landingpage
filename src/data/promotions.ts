import type { Promotion } from "../types/sections";
import { ECOMMERCE_URL } from "../config/constants";

export const promotions: Promotion[] = [
  {
    id: "promo-1",
    name: "Tijolo 08 furos 29X19X09 - Braunas",
    oldPrice: "R$ 1,82",
    price: "R$ 1,64",
    discount: "10%",
    badge: "Oferta",
    externalLink: `${ECOMMERCE_URL}/tijolo-08-furos-29x19x09---braunas-19808/p`,
    limitedStock: true,
    image:
      "https://tb0426.vteximg.com.br/arquivos/ids/159716-1000-1000/ved_9x19x29.jpg?v=638851745994300000",
  },
  {
    id: "promo-2",
    name: "Telha pvc Colonial Cerâmica Terracota",
    oldPrice: "R$ 235,96",
    price: "R$ 212,36",
    discount: "10%",
    badge: "Oferta",
    externalLink: `${ECOMMERCE_URL}/telha-pvc-colonial-ceramica-terracota-328x86-cm-afortlev---p3010001-23098/p`,
    limitedStock: true,
    image:
      "https://tb0426.vteximg.com.br/arquivos/ids/158950-1000-1000/Telha-colonial-PVC-328x86-Terracota---Afort---23098.jpg?v=638315048118500000",
  },

  {
    id: "promo-3",
    name: "Piso 57x57 Fuji Brilhante Lef - Cx 2,30m²",
    oldPrice: "R$ 29,89",
    price: "R$ 26,90",
    discount: "10%",
    badge: "Super Oferta",
    externalLink: `${ECOMMERCE_URL}/piso-57x57-fuji-brilhante-lef---cx-2-30m%C2%B2-19426/p`,
    limitedStock: true,
    image:
      "https://tb0426.vteximg.com.br/arquivos/ids/160554-1000-1000/lf-59019-fuji-face-1-6798fb6b65de4.jpg?v=639131714673730000",
  },
  {
    id: "promo-4",
    name: "Cooktop a Gas 5 Bocas Glass Brasil 5GG TRI 70 - Tramontina",
    oldPrice: "R$ 1.726,67",
    price: "R$ 1.554,00",
    discount: "10%",
    badge: "Oferta",
    externalLink: `${ECOMMERCE_URL}/cooktop-a-gas-5-bocas-glass-brasil-5gg-tri-70---tramontina-94708-502-19252/p`,
    limitedStock: false,
    image:
      "https://tb0426.vteximg.com.br/arquivos/ids/160173-1000-1000/4bf3b768ec0236ac240d1b79597e47fc.webp?v=638977777187500000",
  },
];

