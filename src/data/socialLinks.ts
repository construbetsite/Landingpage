import { Facebook, Instagram, MessageCircle, Music4, Youtube } from "lucide-react";
import type { SocialLink } from "../types/socialLink";
import { SOCIAL_LINKS } from "../config/constants";

export const socialLinks: SocialLink[] = [
  {
    name: "Instagram",
    url: SOCIAL_LINKS.instagram,
    icon: Instagram,
    description: "Conteúdo, novidades e inspirações.",
  },
  {
    name: "Facebook",
    url: SOCIAL_LINKS.facebook,
    icon: Facebook,
    description: "Atualizações e produtos em destaque.",
  },
  {
    name: "WhatsApp",
    url: SOCIAL_LINKS.whatsapp,
    icon: MessageCircle,
    description: "Atendimento rápido e direto.",
  },
  {
    name: "YouTube",
    url: SOCIAL_LINKS.youtube,
    icon: Youtube,
    description: "Tendências e dicas de construção.",
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com",
    icon: Music4,
    description: "Conteúdos curtos e inspiradores.",
  },
];
