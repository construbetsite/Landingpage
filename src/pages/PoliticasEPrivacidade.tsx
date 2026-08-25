import { Link } from "react-router-dom";
import { COMPANY_INFO } from "../config/constants";
import SEO from "../components/SEO/SEO";

export default function PoliticaEPrivacidade() {
  return (
    <main className="min-h-screen bg-white text-gray-800 pt-24 px-6 pb-12 max-w-4xl mx-auto">
      <SEO
        title="Política de Privacidade e Termos de Uso | Construbet"
        description="Política de privacidade da Construbet. Saiba como tratamos seus dados pessoais (nome, telefone, e-mail) em conformidade com a LGPD."
        canonical="/politicas"
      />

        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center text-[#1e3a5f]">
          Política de Privacidade e Termos de Uso
        </h1>
        <p className="text-sm text-gray-500 text-center mb-8">
          Última atualização: Fevereiro de 2026
        </p>

        <div className="prose prose-lg max-w-none text-justify text-gray-700 space-y-6">
          <p>
            A <strong className="text-[#F58220]">Construbet</strong> valoriza sua privacidade e está comprometida com a proteção dos seus dados pessoais, em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD – Lei nº 13.709/2018). Esta política explica como coletamos, usamos, armazenamos e protegemos seus dados ao acessar nosso site ou interagir conosco.
          </p>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-3 text-[#1e3a5f] border-b border-gray-200 pb-2">
              1. Dados que Coletamos
            </h2>
            <p>
              Coletamos dados de forma voluntária e automática para oferecer uma experiência personalizada e melhorar continuamente nossos serviços.
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>
                <strong>Dados fornecidos por você:</strong> em formulários de contato, agendamento ou solicitação de orçamento, podemos coletar <strong>nome, telefone e e-mail</strong>. Esses dados são usados exclusivamente para atender sua solicitação.
              </li>
              <li>
                <strong>Dados de navegação (monitoramento de experiência):</strong> coletamos informações sobre sua interação com o site, como páginas visitadas, cliques em botões, tempo de permanência, movimentos do mouse e eventos de formulário. Isso nos ajuda a entender como você usa o site e a identificar oportunidades de melhoria.
              </li>
              <li>
                <strong>Dados técnicos:</strong> endereço IP (anonimizado), tipo de dispositivo, navegador e sistema operacional, para garantir compatibilidade e segurança.
              </li>
            </ul>
            <p className="mt-2">
              Não coletamos dados sensíveis (como saúde, religião, origem racial) nem dados financeiros sem seu consentimento explícito.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-3 text-[#1e3a5f] border-b border-gray-200 pb-2">
              2. Finalidade do Tratamento de Dados
            </h2>
            <p>Utilizamos seus dados para:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Atender solicitações de contato, orçamentos ou agendamentos;</li>
              <li>
                <strong>Monitorar e analisar a experiência do usuário</strong> – eventos de sessão (cliques, scroll, navegação) são agregados de forma anônima para identificar padrões de uso, corrigir erros e otimizar a interface;
              </li>
              <li>Personalizar conteúdos e recomendações com base no comportamento (dentro do site);</li>
              <li>Realizar pesquisas de satisfação e feedback (quando autorizado);</li>
              <li>Garantir a segurança e integridade do site contra fraudes e ataques.</li>
            </ul>
            <p className="mt-2">
              O monitoramento de eventos é feito com ferramentas de analytics que não identificam individualmente os usuários, a menos que você tenha fornecido voluntariamente seus dados de contato – nesse caso, associamos a navegação ao perfil apenas para melhorar o atendimento, sempre com seu consentimento.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-3 text-[#1e3a5f] border-b border-gray-200 pb-2">
              3. Cookies e Tecnologias de Rastreamento
            </h2>
            <p>
              Utilizamos cookies próprios e de terceiros para:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Cookies essenciais: necessários para navegação e funcionamento do site;</li>
              <li>
                Cookies de análise/performance: registram eventos de interação (ex: cliques, tempo de página) para melhorar a experiência. Esses dados são anonimizados e não permitem identificação direta.
              </li>
            </ul>
            <p>
              Você pode gerenciar ou desativar cookies nas configurações do seu navegador, mas isso pode afetar algumas funcionalidades do site.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-3 text-[#1e3a5f] border-b border-gray-200 pb-2">
              4. Compartilhamento de Dados
            </h2>
            <p>
              Não vendemos nem alugamos seus dados. Compartilhamos apenas:
            </p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Com parceiros tecnológicos (plataformas de analytics, hospedagem) que atuam como operadores, mediante contratos que garantem a proteção dos dados;</li>
              <li>Com autoridades judiciais ou regulatórias, quando obrigados por lei;</li>
              <li>Com terceiros apenas com seu consentimento explícito.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-3 text-[#1e3a5f] border-b border-gray-200 pb-2">
              5. Armazenamento e Segurança
            </h2>
            <p>
              Seus dados são armazenados em servidores seguros no Brasil, com criptografia, controle de acesso e monitoramento contínuo. Mantemos os dados pelo tempo necessário para cumprir as finalidades descritas ou por exigência legal.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-3 text-[#1e3a5f] border-b border-gray-200 pb-2">
              6. Seus Direitos (LGPD)
            </h2>
            <p>Você pode, a qualquer momento:</p>
            <ul className="list-disc ml-6 space-y-1">
              <li>Confirmar a existência de tratamento dos seus dados;</li>
              <li>Acessar, corrigir ou solicitar a exclusão dos seus dados;</li>
              <li>Revogar consentimentos (ex: para monitoramento de comportamento);</li>
              <li>Solicitar portabilidade ou informações sobre compartilhamentos.</li>
            </ul>
            <p className="mt-2">
              Para exercer seus direitos, entre em contato pelo e-mail{" "}
              <a
                href="mailto:privacidade@construbet.com.br"
                className="text-[#F58220] hover:underline"
              >
                privacidade@construbet.com.br
              </a>{" "}
              ou pelo WhatsApp. Responderemos em até 15 dias.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-3 text-[#1e3a5f] border-b border-gray-200 pb-2">
              7. Links Externos
            </h2>
            <p>
              Nosso site pode conter links para sites de parceiros. Não nos responsabilizamos pelas práticas de privacidade deles – recomendamos a leitura das respectivas políticas.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-3 text-[#1e3a5f] border-b border-gray-200 pb-2">
              8. Termos de Uso
            </h2>
            <p>
              Todo o conteúdo do site (textos, imagens, logotipos) é propriedade da Construbet. É proibida a reprodução sem autorização. Ao utilizar nosso site, você concorda com esta política.
            </p>
          </section>

          <section>
            <h2 className="text-xl md:text-2xl font-semibold mt-8 mb-3 text-[#1e3a5f] border-b border-gray-200 pb-2">
              9. Alterações nesta Política
            </h2>
            <p>
              Podemos atualizar esta política periodicamente. Recomendamos revisá-la sempre que visitar o site. Alterações relevantes serão comunicadas em destaque.
            </p>
          </section>

          <div className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-600 not-italic">
            <p className="font-semibold text-[#1e3a5f]">{COMPANY_INFO.name}</p>
            <p>{COMPANY_INFO.address.full}</p>
            <p>
              Contato:{" "}
              <a href={COMPANY_INFO.phoneTel} className="text-[#F58220] hover:underline">
                {COMPANY_INFO.phoneFormatted}
              </a>
            </p>
          </div>

          <div className="flex justify-center mt-8">
            <Link
              to="/"
              className="inline-block px-8 py-3 bg-[#F58220] text-white font-medium rounded-full hover:bg-[#D96A0F] transition-all duration-300 shadow-lg shadow-[#F58220]/30 hover:shadow-[#F58220]/50 focus:outline-none focus:ring-2 focus:ring-[#F58220] focus:ring-offset-2"
            >
              ← Voltar para o início
            </Link>
          </div>
              </div>
            </main>
          );
        }