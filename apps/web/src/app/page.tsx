const CONTACT_EMAIL = "jcvdevelop@icloud.com";

const services = [
  {
    title: "Orquestração de projetos",
    description:
      "Coordenamos entregas, prazos e times para que múltiplos projetos avancem em paralelo sem travar.",
  },
  {
    title: "Produtos SaaS",
    description:
      "Desenhamos e construímos software sob medida, do primeiro MVP até a versão em produção.",
  },
  {
    title: "Sites",
    description:
      "Sites e landing pages rápidos, bem desenhados e fáceis de manter — para apresentar ou vender.",
  },
  {
    title: "Conteúdo para redes sociais",
    description:
      "Pipeline de conteúdo para manter sua marca presente e consistente nas redes.",
  },
];

const steps = [
  {
    title: "Diagnóstico",
    description: "Entendemos o objetivo, o prazo e o que já existe antes de propor qualquer coisa.",
  },
  {
    title: "Execução",
    description: "Construímos em ciclos curtos, com algo demonstrável desde a primeira entrega.",
  },
  {
    title: "Acompanhamento",
    description: "Reportamos progresso com clareza: o que foi feito, o que falta, o que decidir.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-white dark:bg-black">
      <header className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 py-6 sm:px-8">
        <span className="text-sm font-semibold tracking-tight text-black dark:text-zinc-50">
          Projetos Orquestration
        </span>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="rounded-full border border-black/10 px-4 py-1.5 text-sm font-medium text-black transition hover:border-black/30 dark:border-white/15 dark:text-zinc-50 dark:hover:border-white/30"
        >
          Fale conosco
        </a>
      </header>

      <main className="flex-1">
        <section className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-20 sm:px-8 sm:py-28">
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight text-black dark:text-zinc-50 sm:text-5xl">
            Orquestramos projetos, construímos SaaS, sites e conteúdo.
          </h1>
          <p className="max-w-xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Uma equipe enxuta que tira sua ideia do papel e mantém tudo em movimento
            — do primeiro rascunho à entrega em produção.
          </p>
          <div>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-block rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              Iniciar uma conversa
            </a>
          </div>
        </section>

        <section className="border-t border-black/5 dark:border-white/10">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              O que fazemos
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {services.map((service) => (
                <div key={service.title}>
                  <h3 className="text-lg font-semibold text-black dark:text-zinc-50">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-black/5 dark:border-white/10">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Como trabalhamos
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
              {steps.map((step, index) => (
                <div key={step.title}>
                  <span className="text-sm font-mono text-zinc-400 dark:text-zinc-600">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-black dark:text-zinc-50">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-base leading-7 text-zinc-600 dark:text-zinc-400">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="contato" className="border-t border-black/5 dark:border-white/10">
          <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20">
            <h2 className="text-3xl font-semibold tracking-tight text-black dark:text-zinc-50">
              Vamos conversar sobre o seu projeto.
            </h2>
            <p className="mt-3 max-w-md text-base leading-7 text-zinc-600 dark:text-zinc-400">
              Conte o que você precisa construir. Respondemos por e-mail.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-6 inline-block rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </section>
      </main>

      <footer className="border-t border-black/5 px-6 py-8 text-sm text-zinc-500 dark:border-white/10 dark:text-zinc-400 sm:px-8">
        <div className="mx-auto max-w-5xl">
          © {new Date().getFullYear()} Projetos Orquestration.
        </div>
      </footer>
    </div>
  );
}
