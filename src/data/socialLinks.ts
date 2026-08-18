import { Facebook, Instagram, MessageCircle, Music4, Youtube } from "lucide-react";
import type { SocialLink } from "../types/socialLink";

export const socialLinks: SocialLink[] = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/construbet",
    icon: Instagram,
    description: "Conteúdo, novidades e inspirações.",
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/construbet",
    icon: Facebook,
    description: "Atualizações e produtos em destaque.",
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/5531999999999",
    icon: MessageCircle,
    description: "Atendimento rápido e direto.",
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com",
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
