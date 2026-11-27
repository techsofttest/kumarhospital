"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Stethoscope,
  Activity,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { useLayoutData } from "@/context/LayoutContext";

interface DoctorOption {
  id: string;
  name: string;
  timing: string;
}

interface PrimaryServiceOption {
  id: string;
  title: string;
  image: string;
  subservices: string[];
}

const fallbackDoctors: DoctorOption[] = [
  { id: "any", name: "Any Available Specialist", timing: "08:00 – 17:00 hrs" },
  {
    id: "dr-sasikumar",
    name: "Dr. Sasikumar (Physical Medicine & Rehabilitation)",
    timing: "08:00 – 13:00 hrs",
  },
  {
    id: "dr-malini",
    name: "Dr. Malini Sasikumar (Specialist Consultant)",
    timing: "08:00 – 13:00 hrs",
  },
  {
    id: "dr-sruthi",
    name: "Dr. Sruthi Sasikumar (Neurologist & Pain Specialist)",
    timing: "08:00 – 13:00 hrs",
  },
  {
    id: "dr-sreenath",
    name: "Dr. Sreenath P R (Specialist Consultant)",
    timing: "15:00 – 17:00 hrs (Wed, Fri)",
  },
];

const fallbackPrimaryServices: PrimaryServiceOption[] = [
  {
    id: "stroke-neuro-rehabilitation",
    title: "Stroke & Neuro Rehabilitation",
    image: "/categories/appoinment-boking/Neural Pathways in Focus.png",
    subservices: [
      "Stroke Recovery Program",
      "Neurological Assessment",
      "Robotic Gait Training",
      "Physiotherapy & Mobility",
    ],
  },
  {
    id: "back-neck-pain",
    title: "Back & Neck Pain",
    image: "/categories/appoinment-boking/neck-back-bones.jpg",
    subservices: [
      "Non-Surgical Spine Care",
      "IDD Spinal Decompression Therapy",
    ],
  },
];

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export function AppointmentBooking() {
  const { layoutData } = useLayoutData();

  const doctorsList = useMemo<DoctorOption[]>(() => {
    const apiDoctors = layoutData?.doctor ?? [];
    if (!apiDoctors.length) {
      return fallbackDoctors;
    }

    const mapped = apiDoctors.map((doc) => ({
      id: String(doc.id),
      name: doc.role ? `${doc.name} (${doc.role})` : doc.name,
      timing: doc.time || "Available on request",
    }));

    return [
      { id: "any", name: "Any Available Specialist", timing: "08:00 – 17:00 hrs" },
      ...mapped,
    ];
  }, [layoutData?.doctor]);

  const primaryServices = useMemo<PrimaryServiceOption[]>(() => {
    const menuCategories = layoutData?.menu ?? [];
    if (!menuCategories.length) {
      return fallbackPrimaryServices;
    }

    return menuCategories.map((cat, index) => {
      const subservices = (cat.items ?? [])
        .map((item) => item.label?.trim())
        .filter((label): label is string => Boolean(label));

      const fallbackImage =
        fallbackPrimaryServices[index]?.image ??
        fallbackPrimaryServices[0].image;

      return {
        id: `${cat.label.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${index}`,
        title: cat.label,
        image: cat.image || fallbackImage,
        subservices: subservices.length ? subservices : [cat.label],
      };
    });
  }, [layoutData?.menu]);

  const [selectedDoctor, setSelectedDoctor] = useState<string>("any");
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    fallbackPrimaryServices[0].id
  );
  const [selectedSubService, setSelectedSubService] = useState<string>(
    fallbackPrimaryServices[0].subservices[0]
  );

  const [currentMonth, setCurrentMonth] = useState(10);
  const [currentYear, setCurrentYear] = useState(2026);
  const [selectedDay, setSelectedDay] = useState<number | null>(15);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientNotes, setPatientNotes] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  useEffect(() => {
    const today = new Date();
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedDay(today.getDate() + 1);
  }, []);

  useEffect(() => {
    if (!doctorsList.some((d) => d.id === selectedDoctor)) {
      setSelectedDoctor(doctorsList[0]?.id ?? "any");
    }
  }, [doctorsList, selectedDoctor]);

  useEffect(() => {
    const matchedService = primaryServices.find((s) => s.id === selectedServiceId);
    const active = matchedService ?? primaryServices[0];

    if (!matchedService && active) {
      setSelectedServiceId(active.id);
    }

    if (active?.subservices.length && !active.subservices.includes(selectedSubService)) {
      setSelectedSubService(active.subservices[0]);
    }
  }, [primaryServices, selectedServiceId, selectedSubService]);

  const handleServiceChange = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    const service = primaryServices.find((s) => s.id === serviceId);
    if (service && service.subservices.length > 0) {
      setSelectedSubService(service.subservices[0]);
    }
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((y) => y - 1);
    } else {
      setCurrentMonth((m) => m - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((y) => y + 1);
    } else {
      setCurrentMonth((m) => m + 1);
    }
  };

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay();

  const activeService =
    primaryServices.find((s) => s.id === selectedServiceId) ?? primaryServices[0];
  const activeDoc =
    doctorsList.find((d) => d.id === selectedDoctor) ?? doctorsList[0];
  const formattedDate = selectedDay
    ? `${selectedDay} ${monthNames[currentMonth]} ${currentYear}`
    : "";

  const openBookingModal = () => {
    setSubmitError("");
    setSubmitSuccess("");
    setIsModalOpen(true);
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDay) return;

    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess("");

    const payload = {
      name: patientName.trim(),
      phone: patientPhone.trim(),
      email: patientEmail.trim() || undefined,
      doctor: activeDoc.name,
      doctor_timing: activeDoc.timing,
      service: activeService.title,
      sub_service: selectedSubService,
      appointment_date: formattedDate,
      message: patientNotes.trim() || undefined,
    };

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace(/\/+$/, "");
      if (baseUrl) {
        const response = await fetch(`${baseUrl}/appointment`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });

        const result = await response.json();
        if (!response.ok || !result.success) {
          throw new Error(result.message || "Unable to book your appointment.");
        }

        setSubmitSuccess(
          result.message || "Your appointment request has been sent successfully."
        );
      } else {
        await new Promise((resolve) => setTimeout(resolve, 700));
        setSubmitSuccess("Your appointment request has been recorded.");
      }

      setPatientName("");
      setPatientPhone("");
      setPatientEmail("");
      setPatientNotes("");
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="appointment"
      className="py-12 sm:py-16 bg-white border-b border-gray-200"
    >
      <div className="mx-auto max-w-[1440px] px-6 sm:px-12 lg:px-20 xl:px-24">
        <ScrollReveal
          direction="up"
          distance={20}
          duration={600}
          className="mx-auto mb-8 sm:mb-10 max-w-[760px] text-center flex flex-col items-center"
        >
          <h2 className="mt-2 text-2xl font-medium font-[family-name:var(--font-heading)] sm:text-3xl lg:text-4xl tracking-[-0.03em] text-[#061627] leading-tight">
            Select your doctor, service &amp; date.
          </h2>
        </ScrollReveal>

        <div className="mx-auto max-w-[1340px] rounded-[28px] bg-[#061627] p-6 sm:p-8 lg:p-10 shadow-2xl text-white">
          <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14 items-start">
            {/* Left Column */}
            <div className="space-y-7">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                  1. Select Doctor / Consultant
                </label>
                <div className="relative">
                  <Stethoscope
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                  <select
                    value={selectedDoctor}
                    onChange={(e) => setSelectedDoctor(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-white/15 bg-[#10243C] py-3.5 pl-11 pr-10 text-[14.5px] font-semibold text-white focus:border-[#CD9E57] focus:outline-none transition-colors cursor-pointer shadow-xs"
                  >
                    {doctorsList.map((doc) => (
                      <option
                        key={doc.id}
                        value={doc.id}
                        className="bg-[#061627] text-white"
                      >
                        {doc.name} ({doc.timing})
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                  2. Choose Primary Service
                </label>
                <div className="grid gap-4 sm:grid-cols-2">
                  {primaryServices.map((service) => {
                    const isSelected = activeService.id === service.id;

                    return (
                      <div
                        key={service.id}
                        onClick={() => handleServiceChange(service.id)}
                        className={`group relative flex flex-col justify-between rounded-2xl p-4 cursor-pointer border-2 transition-all duration-200 select-none ${
                          isSelected
                            ? "border-[#CD9E57] bg-[#10243C] shadow-lg"
                            : "border-white/10 bg-[#0E1F35] hover:border-white/20 hover:bg-[#10243C]"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-black/40 border border-white/10 shadow-xs">
                            <Image
                              src={service.image}
                              alt={service.title}
                              fill
                              unoptimized
                              className="object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>

                          <div
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-all ${
                              isSelected
                                ? "border-[#CD9E57] bg-[#CD9E57]"
                                : "border-white/30 bg-transparent"
                            }`}
                          >
                            {isSelected && (
                              <div className="h-2 w-2 rounded-full bg-[#061627]" />
                            )}
                          </div>
                        </div>

                        <div className="mt-4">
                          <span className="text-[15px] font-semibold text-white leading-snug">
                            {service.title}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-300 mb-2">
                  3. Select Specific Treatment / Sub-Service
                </label>
                <div className="relative">
                  <Activity
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                  <select
                    value={selectedSubService}
                    onChange={(e) => setSelectedSubService(e.target.value)}
                    className="w-full appearance-none rounded-xl border border-white/15 bg-[#10243C] py-3.5 pl-11 pr-10 text-[14.5px] font-semibold text-white focus:border-[#CD9E57] focus:outline-none transition-colors cursor-pointer shadow-xs"
                  >
                    {activeService.subservices.map((sub) => (
                      <option
                        key={sub}
                        value={sub}
                        className="bg-[#061627] text-white"
                      >
                        {sub}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>
            </div>

            {/* Right Column: Calendar & Book Button */}
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl bg-[#10243C] border border-white/10 p-6 sm:p-7 shadow-lg">
                <div className="flex items-center justify-between py-2 border-b border-white/10">
                  <span className="text-[15px] font-bold text-white">
                    {monthNames[currentMonth]} {currentYear}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={prevMonth}
                      aria-label="Previous month"
                      className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-white/10 text-white transition-colors cursor-pointer"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={nextMonth}
                      aria-label="Next month"
                      className="flex h-7 w-7 items-center justify-center rounded-md hover:bg-white/10 text-white transition-colors cursor-pointer"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-gray-400">
                  {dayNames.map((d) => (
                    <div key={d} className="py-1">
                      {d}
                    </div>
                  ))}
                </div>

                <div className="mt-1 grid grid-cols-7 gap-1">
                  {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                    <div key={`empty-${i}`} className="h-8" />
                  ))}

                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const dayNum = i + 1;
                    const isSelected = selectedDay === dayNum;
                    const dayOfWeek = (firstDayOfWeek + i) % 7;
                    const isSunday = dayOfWeek === 0;

                    return (
                      <button
                        key={dayNum}
                        type="button"
                        disabled={isSunday}
                        onClick={() => setSelectedDay(dayNum)}
                        className={`flex h-8 w-full items-center justify-center rounded-md text-xs font-semibold transition-all ${
                          isSunday
                            ? "text-gray-600 cursor-not-allowed"
                            : isSelected
                              ? "bg-[#CD9E57] text-[#061627] font-bold shadow-sm"
                              : "text-white hover:bg-white/10 cursor-pointer"
                        }`}
                      >
                        {dayNum}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 border-t border-white/10 pt-3 text-center text-xs text-gray-300">
                  Selected Date:{" "}
                  <strong className="text-white font-semibold">
                    {selectedDay ? formattedDate : "None"}
                  </strong>
                </div>
              </div>

              <Button
                type="button"
                variant="primary"
                size="normal"
                disabled={!selectedDay}
                onClick={openBookingModal}
                className="w-full justify-center h-12 text-[14.5px]"
              >
                Book Appointment
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Patient Details Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl border border-white/15 bg-[#061627] p-6 text-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-lg font-semibold">Complete Appointment Request</h3>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="rounded-lg p-1 text-gray-400 hover:bg-white/10 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-3 rounded-xl bg-[#10243C] p-3 text-xs text-gray-300 space-y-1">
              <p>
                <strong className="text-white">Specialist:</strong> {activeDoc.name}
              </p>
              <p>
                <strong className="text-white">Service:</strong> {activeService.title} —{" "}
                {selectedSubService}
              </p>
              <p>
                <strong className="text-white">Date:</strong> {formattedDate}
              </p>
            </div>

            {submitSuccess ? (
              <div className="mt-4 space-y-4">
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-sm text-emerald-200">
                  {submitSuccess}
                </div>
                <Button
                  type="button"
                  variant="primary"
                  size="normal"
                  onClick={() => setIsModalOpen(false)}
                  className="w-full justify-center"
                >
                  Done
                </Button>
              </div>
            ) : (
              <form onSubmit={handleConfirmBooking} className="mt-4 space-y-3.5">
                {submitError && (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-200">
                    {submitError}
                  </div>
                )}

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Enter patient name"
                    className="w-full rounded-xl border border-white/15 bg-[#10243C] px-3.5 py-2.5 text-sm text-white placeholder-gray-400 focus:border-[#CD9E57] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="Enter phone number"
                    className="w-full rounded-xl border border-white/15 bg-[#10243C] px-3.5 py-2.5 text-sm text-white placeholder-gray-400 focus:border-[#CD9E57] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Email (Optional)
                  </label>
                  <input
                    type="email"
                    value={patientEmail}
                    onChange={(e) => setPatientEmail(e.target.value)}
                    placeholder="Enter email address"
                    className="w-full rounded-xl border border-white/15 bg-[#10243C] px-3.5 py-2.5 text-sm text-white placeholder-gray-400 focus:border-[#CD9E57] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={patientNotes}
                    onChange={(e) => setPatientNotes(e.target.value)}
                    placeholder="Any symptoms or preferred time..."
                    className="w-full rounded-xl border border-white/15 bg-[#10243C] px-3.5 py-2 text-sm text-white placeholder-gray-400 focus:border-[#CD9E57] focus:outline-none"
                  />
                </div>

                <div className="pt-2 flex gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="w-1/3 rounded-xl border border-white/15 px-4 py-2.5 text-xs font-semibold text-gray-300 hover:bg-white/10"
                  >
                    Cancel
                  </button>
                  <Button
                    type="submit"
                    variant="primary"
                    size="normal"
                    disabled={isSubmitting}
                    className="w-2/3 justify-center"
                  >
                    {isSubmitting ? "Sending..." : "Confirm Booking"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}