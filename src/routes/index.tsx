import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Calculator,
  CheckCircle2,
  FileSearch,
  ListChecks,
  Mail,
  PlayCircle,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import metodoMockupAsset from "@/assets/metodo-cpa-chines-mockup.png.asset.json";
import topicoDentro2 from "@/assets/topico-dentro-2.png.asset.json";
import topicoDentro3 from "@/assets/topico-dentro-3.png.asset.json";
import topicoDentro4 from "@/assets/topico-dentro-4.png.asset.json";
import topicoDentro5 from "@/assets/topico-dentro-5.png.asset.json";
import topicoDentro6 from "@/assets/topico-dentro-6.png.asset.json";
import bonusVideoAulasAsset from "@/assets/bonus-video-aulas.png.asset.json";
import bonusPlanilhaAsset from "@/assets/bonus-planilha.png.asset.json";
import bonusGrupoVipAsset from "@/assets/bonus-grupo-vip.png.asset.json";
import bonusGuiaAntiSaqueAsset from "@/assets/bonus-guia-anti-saque.png.asset.json";
import depoimentoWhatsapp1 from "@/assets/depoimento-whatsapp-1.png.asset.json";
import depoimentoWhatsapp3 from "@/assets/depoimento-whatsapp-3.png.asset.json";
import depoimentoWhatsapp4 from "@/assets/depoimento-whatsapp-4.png.asset.json";
import depoimentoWhatsapp5 from "@/assets/depoimento-whatsapp-5.png.asset.json";
import garantia30Dias from "@/assets/garantia-30-dias.png.asset.json";
import { CTAButton } from "@/components/cpa/CTAButton";

/* ---------------- Conteúdo e links editáveis ---------------- */

const ESSENTIAL_CHECKOUT_URL = "https://pay.lowify.com.br/go.php?offer=77402ad4";
const COMPLETE_CHECKOUT_URL = "https://pay.lowify.com.br/checkout.php?product_id=DxA9Vj";

const CTA = {
  essential: "QUERO O PLANO ESSENCIAL",
  complete: "QUERO O PLANO COMPLETO",
};

const PLANS = [
  {
    name: "Plano Essencial",
    oldPrice: "R$ 177,90",
    price: "R$ 17,90",
    items: ["Guia principal", "Glossário", "Checklist de análise"],
    cta: CTA.essential,
    href: ESSENTIAL_CHECKOUT_URL,
    variant: "outline" as const,
    highlight: false,
  },
  {
    name: "Plano Completo",
    oldPrice: "R$ 227,90",
    price: "R$ 27,90",
    items: [
      "Tudo do Plano Essencial",
      "Vídeo aulas passo a passo completas do método",
      "Planilha de cálculo automática de ofertas",
      "Grupo VIP com atualizações e casas analisadas toda semana",
      "Guia anti-saque travado exclusivo",
      "Checklist de segurança ampliado",
      "4 bônus exclusivos desbloqueados",
    ],
    cta: CTA.complete,
    href: COMPLETE_CHECKOUT_URL,
    variant: "neon" as const,
    highlight: true,
  },
];

const BONUSES = [
  {
    icon: PlayCircle,
    title: "Vídeo aulas passo a passo",
    text: "Assista a aulas completas mostrando exatamente como aplicar o método do início ao fim.",
    image: bonusVideoAulasAsset.url,
  },
  {
    icon: Calculator,
    title: "Planilha de cálculo automática",
    text: "Coloque os números da oferta e veja na hora se vale a pena entrar.",
    image: bonusPlanilhaAsset.url,
  },
  {
    icon: Users,
    title: "Grupo VIP com atualizações",
    text: "Acesso ao grupo fechado com dicas novas e casas analisadas toda semana.",
    image: bonusGrupoVipAsset.url,
  },
  {
    icon: ShieldCheck,
    title: "Guia anti-saque travado",
    text: "Os erros que fazem travarem o seu saque e como evitar todos eles.",
    image: bonusGuiaAntiSaqueAsset.url,
  },
];

const TESTIMONIAL_SHOTS = [
  { src: depoimentoWhatsapp1.url, alt: "Depoimento de aluno em conversa sobre o método" },
  { src: depoimentoWhatsapp5.url, alt: "Depoimento de aluno com primeiro resultado aplicando o método" },
  { src: depoimentoWhatsapp3.url, alt: "Depoimento de aluno que aplicou o passo a passo do método" },
  { src: depoimentoWhatsapp4.url, alt: "Depoimento de aluno acompanhando os resultados do método" },
];

const PAIN_POINTS = [
  {
    emoji: "🎰",
    title: "Já perdeu dinheiro tentando a sorte em bets e cassinos",
    text: "Colocou o seu dinheirinho na esperança de multiplicar, viu a banca zerar em minutos na sorte e ficou com aquele sentimento horrível de ter rasgado dinheiro.",
  },
  {
    emoji: "💸",
    title: "Está cansado de chegar no final do mês sem um tostão no bolso",
    text: "Trabalha ou faz bicos, mas a grana nunca rende, você não consegue comprar o que quer e a conta no banco está sempre no vermelho.",
  },
  {
    emoji: "📉",
    title: "Já tentou de tudo na internet e só jogou tempo (e dinheiro) fora",
    text: "Comprou salas de sinais, cursinhos caros ou acreditou em promessas fáceis que só serviram para tirar o pouco que você tinha.",
  },
  {
    emoji: "📱",
    title: "Vê todo mundo da sua idade fazendo grana online e se sente estagnado",
    text: "Rolou o feed do Instagram ou TikTok vendo a galera da sua idade lucrando todo dia enquanto você continua preso na mesma rotina sem sair do lugar.",
  },
  {
    emoji: "🛑",
    title: "Tem medo de arriscar o pouco que tem e cair em mais uma furada",
    text: "Quer uma forma de ter renda de verdade, mas fica com o pé atrás porque não aguenta mais perder dinheiro em coisas que não funcionam.",
  },
];

const FAQ = [
  {
    q: "Vou conseguir sacar o bônus?",
    a: "Sim, desde que você cumpra todas as regras da promoção, passe pela verificação da conta e respeite os limites e as políticas da plataforma. O saque está sujeito às condições estabelecidas pela própria plataforma.",
  },
  {
    q: "Posso perder o dinheiro depositado?",
    a: "Não, com o nosso metodo, a taxa de perca é 0%.",
  },
  {
    q: "Preciso apostar para liberar o bônus?",
    a: "Em muitas promoções existem requisitos de rollover ou volume mínimo. O valor varia conforme as regras de cada oferta e deve ser conferido antes do depósito.",
  },
  {
    q: "Posso usar várias contas?",
    a: "Pode, mas com sabedoria pro seu saque nao ser travado.",
  },
];

const HOW_IT_WORKS = [

  {
    icon: FileSearch,
    title: "1️⃣ CRIANDO A CONTA MÃE",
    text: "Você cadastra a sua conta principal (Conta Mãe) na plataforma para extrair o seu link exclusivo de indicação",
  },
  {
    icon: ListChecks,
    title: "2️⃣ CADASTRANDO AS CONTAS FILHAS",
    text: "Acessando o seu próprio link, você cadastra as Contas Filhas (você convidando você mesmo para o sistema",
  },
  {
    icon: Calculator,
    title: "3️⃣ CUMPRINDO AS METAS DO SISTEMA",
    text: "Na Conta Filha, você realiza o depósito exigido (pode depositar o valor exato estipulado ou mais, mas nunca a menos) e movimenta o volume de apostas válidas que o site pede",
  },
  {
    icon: ShieldCheck,
    title: "4️⃣ ALTERANDO A CONEXÃO (IP)",
    text: "Para operar com tranquilidade e evitar que a plataforma identifique a mesma conexão, você altera o seu IP usando VPN no celular ou proxies no computador",
  },
];

/* ---------------- Rota ---------------- */

const TITLE = "Enriqueça Agora Com O Novo Método CPA Chinês";
const DESCRIPTION =
  "Guia prático para interpretar CPAs, bônus, rollover, prazos e limites de saque de plataformas de apostas antes de participar de qualquer promoção.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

/* ---------------- Blocos reutilizáveis ---------------- */

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 font-display text-xs tracking-widest text-primary">
      <Zap className="size-3.5" aria-hidden="true" />
      {children}
    </span>
  );
}

const MESES = [
  "JANEIRO",
  "FEVEREIRO",
  "MARÇO",
  "ABRIL",
  "MAIO",
  "JUNHO",
  "JULHO",
  "AGOSTO",
  "SETEMBRO",
  "OUTUBRO",
  "NOVEMBRO",
  "DEZEMBRO",
];

function TodayLabel() {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    const agora = new Date();
    setData(
      `${agora.getDate()} DE ${MESES[agora.getMonth()]} DE ${agora.getFullYear()}`,
    );
  }, []);

  return (
    <>
      ⏰ OFERTA VÁLIDA SOMENTE HOJE:{" "}
      <span className={data ? "" : "opacity-0"}>
        {data ?? "00 DE JANEIRO DE 0000"}
      </span>
    </>
  );
}

function Section({
  id,
  children,
  className = "",
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`px-5 py-16 sm:px-8 sm:py-24 ${className}`}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-3xl leading-[0.95] sm:text-5xl md:text-6xl">
      <span className="bg-neon-gradient bg-clip-text text-transparent">{children}</span>
    </h2>
  );
}

/* ---------------- Página ---------------- */

function Index() {
  return (
    <>
    <main className="min-h-screen overflow-x-hidden bg-background">
      {/* FAIXA - TOPO */}
      <div className="border-b border-primary/30 bg-primary/10 py-3">
        <p className="font-display text-center text-sm tracking-[0.2em] text-primary sm:text-base">
          <TodayLabel />
        </p>
      </div>

      {/* HERO */}
      <div className="relative bg-hero">
        <div className="absolute inset-0 grid-lines opacity-70" aria-hidden="true" />
        <Section className="relative">
          <div className="max-w-3xl">
            <Eyebrow>APRENDA CPA CHINES AGORA!</Eyebrow>
            <h1 className="mt-6 text-4xl leading-[0.92] sm:text-6xl md:text-7xl">
              Enriqueça Agora Com O Novo{" "}
              <span className="bg-neon-gradient bg-clip-text text-transparent">
                Método CPA Chinês
              </span>
            </h1>
            <img
              src={metodoMockupAsset.url}
              alt="Mockup do Método CPA Chinês"
                className="mt-8 w-full max-w-xl rounded-2xl border border-border shadow-neon"
              />
              <CTAButton href="#checkout-essencial" variant="red" size="lg" className="mt-8 w-fit">
                QUERO O ACESSO DO METODO POR 17,90
              </CTAButton>
              <div className="mt-6 max-w-xl rounded-2xl border border-destructive/40 bg-surface-2 p-6">
                <p className="font-display text-center text-base tracking-wide text-destructive">
                  COMO VOCÊ RECEBE O GUIA DIGITAL?
                </p>
                <ul className="mt-4 space-y-3">
                  {[
                    { icon: "📧", text: "Comprou? Você recebe o guia digital no seu e-mail em menos de 2 minutos" },
                    { icon: "📲", text: "Clica e abre o guia direto no celular — sem baixar nada na loja" },
                    { icon: "✅", text: "É só usar — funciona no seu celular, até sem sinal de internet" },
                  ].map((row) => (
                    <li
                      key={row.text}
                      className="flex items-center gap-3 rounded-lg bg-card/70 px-4 py-3"
                    >
                      <span aria-hidden="true" className="text-lg">
                        {row.icon}
                      </span>
                      <span className="text-sm font-semibold text-foreground">{row.text}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-center font-display text-xs tracking-wider text-destructive">
                  ✓ ACESSO IMEDIATO&nbsp;&nbsp;✓ FUNCIONA OFFLINE&nbsp;&nbsp;✓ ATUALIZAÇÕES
                  GRATUITAS&nbsp;&nbsp;✓ SUPORTE VIP
                </p>
              </div>

          </div>
        </Section>
      </div>

      {/* VOCÊ SE IDENTIFICA? */}
      <Section id="identifica">
        <div className="text-center">
          <span className="font-display inline-block rounded-full bg-destructive px-4 py-1.5 text-xs tracking-widest text-destructive-foreground">
            VOCÊ SE IDENTIFICA?
          </span>
          <h2 className="mt-5 text-3xl leading-[1.05] sm:text-5xl">
            ALGUMA DESSAS SITUAÇÕES
            <br />
            <span className="bg-neon-gradient bg-clip-text text-transparent">
              JÁ ACONTECEU COM VOCÊ?
            </span>
          </h2>
        </div>
        <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-4">
          {PAIN_POINTS.map((item) => (
            <article
              key={item.emoji}
              className="flex items-start gap-4 rounded-xl border border-border bg-card p-5 shadow-card transition-colors hover:border-primary/50"
            >
              <span
                aria-hidden="true"
                className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-xl"
              >
                {item.emoji}
              </span>
              <div>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
        <p className="font-display mt-10 text-center text-lg tracking-wide sm:text-xl">
          👉 SE VOCÊ MARCOU PELO MENOS 1 — ESTE GUIA FOI FEITO PARA VOCÊ.
        </p>
      </Section>


      {/* COMO FUNCIONA O METODO */}
      <Section id="como-funciona" className="bg-surface">
        <SectionTitle>COMO FUNCIONA O METODO</SectionTitle>
        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          {HOW_IT_WORKS.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-border bg-card p-6 shadow-card transition-colors hover:border-primary/50"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-lg bg-violet-gradient">
                <item.icon className="size-5 text-secondary-foreground" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-xl">{item.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* VEJA COMO SÃO OS TÓPICOS POR DENTRO */}
      <Section id="topicos">
        <SectionTitle>VEJA COMO SÃO OS TÓPICOS POR DENTRO:</SectionTitle>
        <div
          className="group relative mt-10 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
          }}
        >
          <div className="flex w-max gap-5 animate-marquee group-hover:[animation-play-state:paused]">
            {[
              topicoDentro2,
              topicoDentro3,
              topicoDentro4,
              topicoDentro5,
              topicoDentro6,
              topicoDentro2,
              topicoDentro3,
              topicoDentro4,
              topicoDentro5,
              topicoDentro6,
            ].map((img, i) => (
              <img
                key={`topico-${i}`}
                src={img.url}
                alt={`Prévia de tópico do método ${String((i % 5) + 2)}`}
                loading="lazy"
                className="w-[280px] shrink-0 rounded-xl border border-border object-cover shadow-card sm:w-[380px]"
              />
            ))}
          </div>
        </div>
      </Section>


      {/* BÔNUS DO PLANO COMPLETO */}
      <Section id="bonus">
        <SectionTitle>4 BÔNUS GRÁTIS SÓ NO PLANO COMPLETO</SectionTitle>
        <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
          Além de todo o conteúdo do método, quem entra no Plano Completo leva 4 bônus de graça:
        </p>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {BONUSES.map((bonus, i) => (
            <article
              key={bonus.title}
              className="relative rounded-xl border border-border bg-card p-6 shadow-card transition-colors hover:border-primary/50"
            >
              <span className="font-display absolute right-5 top-4 text-4xl text-stroke-neon">
                {String(i + 1).padStart(2, "0")}
              </span>
              <img
                src={bonus.image}
                alt={bonus.title}
                loading="lazy"
                className="aspect-square w-full rounded-xl border border-border object-cover"
              />
              <h3 className="mt-4 text-xl">{bonus.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{bonus.text}</p>
            </article>
          ))}
        </div>
      </Section>

      {/* OFERTA */}
      <Section id="oferta" className="bg-surface">
        <SectionTitle>ENRIQUEÇA COM METODO CPA AGORA!</SectionTitle>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          {PLANS.map((plan) => (
            <article
              key={plan.name}
              id={plan.highlight ? "checkout-completo" : "checkout-essencial"}
              className={`flex flex-col rounded-2xl border bg-card p-7 ${
                plan.highlight ? "border-primary shadow-neon" : "border-border shadow-card"
              }`}
            >
              {plan.highlight && (
                <span className="font-display mb-4 w-fit rounded-full bg-neon-gradient px-3 py-1 text-xs tracking-widest text-neon-foreground">
                  MAIS COMPLETO
                </span>
              )}
              <h3 className="text-2xl">{plan.name}</h3>
              <div className="mt-2">
                <span className="font-display block text-xl text-muted-foreground line-through decoration-destructive decoration-2">
                  {plan.oldPrice}
                </span>
                <p className="font-display text-5xl text-primary">{plan.price}</p>
              </div>
              <ul className="mt-6 flex-1 space-y-3">
                {plan.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-card-foreground">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <CTAButton href={plan.href} variant={plan.variant} block className="mt-8">
                {plan.cta}
              </CTAButton>
            </article>
          ))}
        </div>
      </Section>

      {/* DEPOIMENTOS */}
      <Section id="depoimentos" className="bg-surface">
        <SectionTitle>RESULTADOS DE QUEM JÁ USA O MÉTODO</SectionTitle>
        <div
          className="group relative mt-10 overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
            WebkitMaskImage:
              "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
          }}
        >
          <div className="flex w-max gap-5 animate-marquee group-hover:[animation-play-state:paused]">
            {[...TESTIMONIAL_SHOTS, ...TESTIMONIAL_SHOTS, ...TESTIMONIAL_SHOTS].map((t, i) => (
              <img
                key={`depoimento-${i}`}
                src={t.src}
                alt={t.alt}
                loading="lazy"
                className="w-[260px] shrink-0 rounded-xl border border-border bg-card object-cover shadow-card sm:w-[320px]"
              />
            ))}
          </div>
        </div>
      </Section>

      {/* GARANTIA DE 30 DIAS */}
      <Section className="bg-surface">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center sm:flex-row sm:text-left">
          <img
            src={garantia30Dias.url}
            alt="Selo de garantia de 30 dias"
            loading="lazy"
            className="size-40 shrink-0 drop-shadow-[0_0_25px_hsl(var(--primary)/0.35)] sm:size-48"
          />
          <div>
            <SectionTitle>GARANTIA DE 30 DIAS</SectionTitle>
            <p className="mt-4 text-base text-muted-foreground">
              Risco zero para você: se em até 30 dias você achar que o método não é para você, é só
              pedir o reembolso e devolvemos 100% do valor, sem perguntas e sem burocracia.
            </p>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section id="faq">
        <SectionTitle>Perguntas frequentes</SectionTitle>
        <Accordion type="single" collapsible className="mt-8">
          {FAQ.map((item) => (
            <AccordionItem key={item.q} value={item.q} className="border-border">
              <AccordionTrigger className="text-left text-lg text-foreground">
                {item.q}
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>
    </main>

    {/* Rodapé de confiança */}
    <footer className="border-t border-border bg-surface-2/60">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: ShieldCheck,
              title: "Compra 100% segura",
              text: "Pagamento processado em ambiente seguro e criptografado.",
            },
            {
              icon: Zap,
              title: "Acesso imediato",
              text: "O material é liberado automaticamente após a confirmação do pagamento.",
            },
            {
              icon: Mail,
              title: "Acesso no seu e-mail",
              text: "Fique de olho na caixa de entrada e na pasta de spam ou promoções.",
            },
            {
              icon: CheckCircle2,
              title: "Garantia de 30 dias",
              text: "Se não for para você, o reembolso é total, sem burocracia.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-border bg-card/60 p-5 text-center"
            >
              <item.icon
                className="mx-auto size-6 text-primary"
                aria-hidden="true"
              />
              <h3 className="mt-3 text-sm font-semibold uppercase tracking-wide">
                {item.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 space-y-2 text-center text-xs leading-relaxed text-muted-foreground">
          <p>
            O Método CPA Chinês é um produto 100% digital — nada é enviado pelos correios.
          </p>
          <p>
            Este material tem caráter educativo. Os resultados podem variar de pessoa para pessoa e
            dependem da aplicação do método por cada aluno.
          </p>
          <p>
            A venda é realizada de forma independente e não possui vínculo com casas de apostas ou
            plataformas citadas no conteúdo.
          </p>
          <p className="pt-2 font-medium text-foreground/70">
            © {new Date().getFullYear()} Método CPA Chinês. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
