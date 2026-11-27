"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export function ContactForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    department: "Stroke & Neuro Rehabilitation",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      if (!API_URL) {
        throw new Error("API URL is not configured. Please try again later.");
      }

      const response = await fetch(`${API_URL}/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email || null,
          service: formData.department,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        if (response.status === 422 && result.errors) {
          const firstError = Object.values(result.errors)
            .flat()
            .find((error) => typeof error === "string");

          throw new Error(
            firstError || "Please check your form details and try again."
          );
        }

        throw new Error(
          result.message || "Unable to send your message. Please try again."
        );
      }

      if (result.success) {
        setFormSubmitted(true);
      } else {
        throw new Error(
          result.message || "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="sticky top-28 z-20">
      <div className="rounded-[28px] border border-white/5 bg-[#061627] p-8 text-white shadow-xl sm:p-10">
        <div className="mb-6">
          <h3 className="mt-1 font-[family-name:var(--font-heading)] text-2xl font-semibold text-white">
            Send a Message to Our Medical Desk
          </h3>
        </div>

        {formSubmitted ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
              <CheckCircle2 size={32} />
            </div>

            <h4 className="mt-4 text-xl font-semibold text-white">
              Thank You!
            </h4>

            <p className="mt-1 max-w-sm text-xs text-gray-300">
              Your enquiry has been securely received by Kumar Hospital. Our patient
              care officer will call you shortly.
            </p>

            <button
              type="button"
              onClick={() => {
                setFormSubmitted(false);
                setFormData({
                  name: "",
                  phone: "",
                  email: "",
                  department: "Stroke & Neuro Rehabilitation",
                  message: "",
                });
                setErrorMessage("");
              }}
              className="mt-6 cursor-pointer text-xs font-semibold uppercase tracking-wider text-[#CD9E57] hover:underline"
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-300">
                Full Name *
              </label>

              <input
                type="text"
                required
                maxLength={150}
                autoComplete="name"
                placeholder="e.g. Anand Menon"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full rounded-xl border border-white/15 bg-[#10243C] px-4 py-3 text-sm font-medium text-white transition-colors placeholder-gray-400 focus:border-[#CD9E57] focus:outline-none"
              />
            </div>

            {/* Phone & Department */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-300">
                  Phone Number *
                </label>

                <input
                  type="tel"
                  required
                  maxLength={30}
                  autoComplete="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full rounded-xl border border-white/15 bg-[#10243C] px-4 py-3 text-sm font-medium text-white transition-colors placeholder-gray-400 focus:border-[#CD9E57] focus:outline-none"
                />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-300">
                  Department
                </label>

                <select
                  value={formData.department}
                  onChange={(e) =>
                    setFormData({ ...formData, department: e.target.value })
                  }
                  className="w-full cursor-pointer rounded-xl border border-white/15 bg-[#10243C] px-4 py-3 text-sm font-medium text-white focus:border-[#CD9E57] focus:outline-none"
                >
                  <option
                    value="Stroke & Neuro Rehabilitation"
                    className="bg-[#061627]"
                  >
                    Stroke & Neuro Rehab
                  </option>

                  <option
                    value="Back & Neck Pain Care"
                    className="bg-[#061627]"
                  >
                    Back & Neck Pain Care
                  </option>

                  <option
                    value="Robotic Gait Training"
                    className="bg-[#061627]"
                  >
                    Robotic Gait Training
                  </option>

                  <option
                    value="IDD Decompression Therapy"
                    className="bg-[#061627]"
                  >
                    IDD Decompression
                  </option>

                  <option
                    value="Inpatient Admission"
                    className="bg-[#061627]"
                  >
                    Inpatient Admission
                  </option>

                  <option
                    value="Other Consultation"
                    className="bg-[#061627]"
                  >
                    Other Inquiries
                  </option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-gray-300">
                Patient Condition / Message
              </label>

              <textarea
                rows={4}
                maxLength={5000}
                placeholder="Please describe symptoms, prior diagnosis, or appointment preferences..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                className="w-full resize-y rounded-xl border border-white/15 bg-[#10243C] px-4 py-3 text-sm font-medium text-white transition-colors placeholder-gray-400 focus:border-[#CD9E57] focus:outline-none"
              />
            </div>

            {/* Error */}
            {errorMessage && (
              <div
                role="alert"
                className="rounded-xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
              >
                {errorMessage}
              </div>
            )}

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              size="normal"
              disabled={isSubmitting}
              className="h-12 w-full justify-center text-sm disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? "Sending Message..."
                : "Send Message"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
