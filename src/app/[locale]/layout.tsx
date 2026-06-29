import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import SmoothScroll from "@/components/SmoothScroll";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<Props, "children">) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });

  return {
    title: `Vantage Group | ${t("titleAccent")}`,
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const messages = await getMessages();
  const dir = locale === "ar" ? "rtl" : "ltr";

  return (
    <NextIntlClientProvider messages={messages}>
      <div dir={dir} className="flex flex-col min-h-full" data-locale={locale}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </div>
    </NextIntlClientProvider>
  );
}
