import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/config/site.config";
import ContactForm from "./ContactForm";

export default function Contact() {
  const { heading, subheading } = siteConfig.contact;
  const { address, email, phone } = siteConfig.business;

  return (
    <section id="contacto" className="bg-background py-24">
      <div className="mx-auto max-w-container px-6 md:px-10">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <h2 className="font-heading text-3xl font-semibold text-ink md:text-4xl">{heading}</h2>
            <p className="mt-6 font-body text-lg text-ink-soft">{subheading}</p>

            <div className="mt-12 space-y-6">
              <InfoRow icon={<MapPin size={20} />} label="Address" value={address} />
              <InfoRow icon={<Mail size={20} />} label="Email" value={email} />
              <InfoRow icon={<Phone size={20} />} label="Phone" value={phone} />
            </div>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  );
}

function InfoRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="text-accent">{icon}</span>
      <div>
        <p className="font-body text-xs uppercase tracking-widest text-ink-soft">{label}</p>
        <p className="font-body text-ink">{value}</p>
      </div>
    </div>
  );
}
