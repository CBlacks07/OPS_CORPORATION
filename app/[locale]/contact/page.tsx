import { getTranslations } from 'next-intl/server';
import { Mail, MapPin, Phone } from 'lucide-react';
import Reveal from '@/components/motion/Reveal';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/forms/ContactForm';
import { getNav } from '@/lib/nav';
import { getCompanyInfo } from '@/lib/content';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const isFr = locale === 'fr';
  const [t, tCta, tFooter, nav, company] = await Promise.all([
    getTranslations({ locale, namespace: 'contact' }),
    getTranslations({ locale, namespace: 'cta' }),
    getTranslations({ locale, namespace: 'footer' }),
    getNav(locale),
    getCompanyInfo(locale as 'fr' | 'en')
  ]);

  const container = 'mx-auto w-full max-w-screen-xl px-6 md:px-10';

  return (
    <div className="min-h-screen">
      <Header locale={locale} switchHref={isFr ? '/en' : '/fr'} nav={nav} contactLabel={tCta('contact')} />

      <section className="py-20">
        <div className={container}>
          <Reveal>
            <div className="grid md:grid-cols-2 gap-16 lg:gap-24 items-start">
              <div>
                <div className="section-label">{t('label')}</div>
                <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6">{t('title')}</h1>
                <p className="text-slate-600 text-base leading-relaxed mb-10">{t('pitch')}</p>

                {company && (
                  <div className="space-y-4">
                    <a href={`mailto:${company.email}`} className="flex items-center gap-4 text-slate-700 hover:text-cyan-700 transition-colors group">
                      <div className="h-10 w-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-700 shrink-0">
                        <Mail className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">{company.email}</span>
                    </a>
                    <a href={`tel:${company.phone.replace(/\s+/g, '')}`} className="flex items-center gap-4 text-slate-700 hover:text-cyan-700 transition-colors">
                      <div className="h-10 w-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-700 shrink-0">
                        <Phone className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">{company.phone}</span>
                    </a>
                    <div className="flex items-center gap-4 text-slate-600">
                      <div className="h-10 w-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">{company.address}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="card p-8">
                <ContactForm
                  labels={{
                    name: t('formName'),
                    email: t('formEmail'),
                    subject: t('formSubject'),
                    message: t('formMessage'),
                    submit: tCta('sendMessage'),
                    success: t('successMessage'),
                    error: t('errorMessage')
                  }}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer locale={locale} nav={nav} tagline={company?.tagline || ''} copyright={tFooter('copyright', { year: new Date().getFullYear() })} company={company} />
    </div>
  );
}
