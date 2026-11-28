"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Clock3,
} from "lucide-react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaWhatsapp,
} from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import {useLayoutData} from '@/context/LayoutContext';


const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "Our Doctors", href: "/doctors" },
  { label: "Treatments", href: "/treatments" },
  { label: "Facilities", href: "/facilities" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQ", href: "/faq" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact Us", href: "/contact" },
];

export function Footer() {
  const [year, setYear] = useState<number | string>(2026);
  const { layoutData } = useLayoutData();
  const contact = layoutData?.contact ?? null;
  const stroke = layoutData?.stroke ?? [];
  const neck = layoutData?.neck ?? [];

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!name.trim() || !phone.trim() || !service.trim()) {
      setStatusMessage({
        type: "error",
        text: "Please enter your name, phone number, and requirement.",
      });
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: name.trim(),
      phone: phone.trim(),
      service,
    };

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");
      if (baseUrl) {
        const response = await fetch(`${baseUrl}/ctaform`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });

        const result = await response.json();
        if (!response.ok || !result.success) {
          throw new Error(result.message || "Unable to send your enquiry.");
        }

        setStatusMessage({
          type: "success",
          text: result.message || "Your enquiry has been sent successfully.",
        });
      } else {
        setStatusMessage({
          type: "success",
          text: "Your enquiry has been recorded.",
        });
      }

      setName("");
      setPhone("");
      setService("");
    } catch (err) {
      setStatusMessage({
        type: "error",
        text:
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contact" className="bg-black text-white">
      {/* 1. Contact / Enquiry Strip: Clean, uncrowded layout */}
      <div className="bg-black">
        <div className="mx-auto max-w-[1440px] px-6 py-12 sm:px-12 sm:py-16 lg:px-20 xl:px-24">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:items-center">
            {/* Left side: Heading & Description */}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-400">
                Contact &amp; Support
              </p>
              <h3 className="mt-2 text-2xl sm:text-3xl lg:text-4xl font-bold text-white font-[family-name:var(--font-heading)] tracking-tight leading-tight">
                Get in touch with our team
              </h3>
              <p className="mt-2.5 text-[13.5px] leading-relaxed text-gray-400">
                Have questions or need to schedule an appointment? Share your details and our care coordinator will reach out to you directly.
              </p>
            </div>

            {/* Right side: Clean Form Inputs without border lines */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  id="f-name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name *"
                  className="w-full rounded-xl bg-white/10 px-4 py-3 text-[13.5px] font-medium text-white outline-none placeholder:text-gray-400 backdrop-blur-xs transition-colors focus:bg-white/15 focus:ring-2 focus:ring-white"
                />

                <input
                  id="f-phone"
                  name="phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone Number *"
                  className="w-full rounded-xl bg-white/10 px-4 py-3 text-[13.5px] font-medium text-white outline-none placeholder:text-gray-400 backdrop-blur-xs transition-colors focus:bg-white/15 focus:ring-2 focus:ring-white"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
                <select
                  id="f-service"
                  name="service"
                  required
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full rounded-xl bg-white/10 px-4 py-3 text-[13.5px] font-medium text-white outline-none backdrop-blur-xs transition-colors focus:bg-white/15 focus:ring-2 focus:ring-white cursor-pointer"
                >
                  <option value="" disabled className="text-gray-400 bg-black">
                    Select requirement...
                  </option>
                  <option value="Stroke & Neuro Rehabilitation" className="bg-black text-white">
                    Stroke &amp; Neuro Rehabilitation
                  </option>
                  <option value="Back & Neck Pain Care" className="bg-black text-white">
                    Back &amp; Neck Pain Care
                  </option>
                  <option value="Physiotherapy" className="bg-black text-white">
                    Physiotherapy
                  </option>
                  <option value="Doctor Consultation" className="bg-black text-white">
                    Doctor Consultation
                  </option>
                  <option value="Other Inquiry" className="bg-black text-white">
                    Other Inquiry
                  </option>
                </select>

                <Button
                  type="submit"
                  variant="white"
                  size="normal"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto h-[46px] px-7 text-[13.5px]"
                >
                  {isSubmitting ? "Sending..." : "Send Enquiry"}
                </Button>
              </div>

              {statusMessage && (
                <p
                  role="status"
                  className={`text-xs font-medium ${
                    statusMessage.type === "success"
                      ? "text-emerald-400"
                      : "text-red-400"
                  }`}
                >
                  {statusMessage.text}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* 2. Main Footer Directory: 4 balanced, spacious columns with clear permanent underlines */}
      <div className="mx-auto max-w-[1440px] px-6 py-12 sm:px-12 sm:py-14 lg:px-20 xl:px-24 bg-black">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-14 items-start">
          {/* Col 1: About Hospital Summary */}
          <div className="space-y-3">
            <h4 className="text-2xl sm:text-3xl font-semibold text-white font-[family-name:var(--font-heading)] tracking-tight">
              Kumar Hospital
            </h4>
            <p className="text-[13px] leading-relaxed text-gray-400">
              Specialist stroke & neurological rehabilitation centre and non-surgical
              back & neck pain clinic in Kochi, Kerala.
            </p>
            <p className="text-[13px] leading-relaxed text-gray-400">
              Dedicated to compassionate, multi-disciplinary restorative care and modern technology.
            </p>

            {/* Social Media Links */}
            <div className="pt-2">
              <span className="block text-[11px] font-semibold uppercase tracking-wider text-gray-400 mb-2.5">
                Connect With Us
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href={contact?.facebook || ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Kumar Hospital on Facebook"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#1877F2] hover:text-white transition-colors"
                >
                  <FaFacebookF size={15} />
                </a>

                <a
                  href={contact?.instagram || ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Kumar Hospital on Instagram"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#E4405F] hover:text-white transition-colors"
                >
                  <FaInstagram size={15} />
                </a>

                <a
                  href={contact?.linkedin || ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Kumar Hospital on LinkedIn"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#0A66C2] hover:text-white transition-colors"
                >
                  <FaLinkedinIn size={15} />
                </a>

                <a
                  href={contact?.youtube || ""}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Visit Kumar Hospital on YouTube"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#FF0000] hover:text-white transition-colors"
                >
                  <FaYoutube size={15} />
                </a>

                <a
                  href={`https://wa.me/${contact?.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with Kumar Hospital on WhatsApp"
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white hover:bg-[#25D366] hover:text-white transition-colors"
                >
                  <FaWhatsapp size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Stroke & Neuro Rehab Sub-services */}
          <div>
            <p className="text-[12px] font-bold uppercase tracking-wider text-white">
              Stroke & Neuro Rehab
            </p>
            <ul className="mt-3.5 space-y-2 text-[13px] text-gray-300">
              {stroke.map((service,idx) => (
                <li key={idx}>
                  <a
                    href={service.slug}
                    className="hover:text-white !underline [text-decoration:underline] underline-offset-4 decoration-1 decoration-white/25 hover:decoration-white transition-colors block"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Back & Neck Pain Sub-services */}
          <div>
            <p className="text-[12px] font-bold uppercase tracking-wider text-white">
              Back & Neck Pain Care
            </p>
            <ul className="mt-3.5 space-y-2 text-[13px] text-gray-300">
              {neck.map((service,idx) => (
                <li key={idx}>
                  <a
                    href={service.slug}
                    className="hover:text-white !underline [text-decoration:underline] underline-offset-4 decoration-1 decoration-white/25 hover:decoration-white transition-colors block"
                  >
                    {service.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Contact Details & Embedded Map */}
          <div className="space-y-3.5">
            <p className="text-[12px] font-bold uppercase tracking-wider text-white">
              Location & Details
            </p>

            <div className="space-y-2.5 text-[13px] text-gray-300">
              <div className="flex items-start gap-2.5">
                <MapPin size={15} className="mt-0.5 shrink-0 text-white" />
                <div className="leading-snug text-gray-300"dangerouslySetInnerHTML={{__html:contact?.address ?? ""}}/>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone size={15} className="shrink-0 text-white" />
                <a
                  href={`tel:${contact?.phone}`}
                  className="text-white font-medium !underline [text-decoration:underline] underline-offset-4 decoration-1 decoration-white/35 hover:decoration-white transition-colors"
                >{contact?.phone}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock3 size={15} className="shrink-0 text-white" />
                <span className="text-gray-300">All days:{contact?.open}</span>
              </div>
            </div>

            {/* Map Embed */}
            <div className="relative h-[120px] w-full overflow-hidden rounded-xl bg-white/10 shadow-sm mt-3">
              <iframe
                title="Kumar Hospital Map"
                src={ contact?.map ||"https://maps.google.com/maps?q=Thammanam,%20Kochi,%20Kerala&t=&z=14&ie=UTF8&iwloc=&output=embed"}
                className="h-full w-full border-0 opacity-90 hover:opacity-100 transition-opacity"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2.5 Horizontal Quick Links Bar right above bottom bar */}
      <div className="mx-auto max-w-[1440px] px-6 pb-10 sm:px-12 lg:px-20 xl:px-24 bg-black">
        <div className="flex flex-wrap items-center justify-start sm:justify-center gap-x-6 gap-y-2.5 text-[13px] text-gray-300">
          <span className="text-[11px] font-bold uppercase tracking-wider text-white mr-1">
            Quick Links:
          </span>
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-white !underline [text-decoration:underline] underline-offset-4 decoration-1 decoration-white/25 hover:decoration-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* 3. Bottom Bar: Pure black tone, crisp text, no border lines */}
      <div className="bg-black pb-8 pt-2">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-6 sm:px-12 lg:px-20 xl:px-24 sm:flex-row sm:items-center sm:justify-between text-[12.5px] text-gray-400">
          <p>© {year} Kumar Hospital. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5">
            <a href="#about" className="hover:text-white !underline [text-decoration:underline] underline-offset-4 decoration-1 decoration-white/25 hover:decoration-white transition-colors">Privacy Policy</a>
            <a href="#about" className="hover:text-white !underline [text-decoration:underline] underline-offset-4 decoration-1 decoration-white/25 hover:decoration-white transition-colors">Terms of Care</a>
            <a href="#faq" className="hover:text-white !underline [text-decoration:underline] underline-offset-4 decoration-1 decoration-white/25 hover:decoration-white transition-colors">Patient FAQs</a>
            <a
              href="https://www.techsoftweb.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-normal transition-colors hover:text-white !underline [text-decoration:underline] underline-offset-4 decoration-1 decoration-white/25 hover:decoration-white"
            >
              Web Design Company in Kochi Techsoft
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
