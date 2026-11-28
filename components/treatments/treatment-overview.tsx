import Image from "next/image";
export interface ProtocolStep {
  step: string;
  title: string;
  desc: string;
}

export interface ServiceDetailData {
  overview?: string | string[];
  clinicalHighlights?: string[];
  indications?: string[];
  recoveryGoals?: string[];
  protocolSteps?: ProtocolStep[];
}
interface TreatmentOverviewProps {
  treatment: ServiceDetailData;
  hero:{    title: string;
    category: string | number;
    tagline: string;
    content?: string | null;
    image: string;}
}

export function TreatmentOverview({ treatment ,hero}: TreatmentOverviewProps) {
    const youtubeMatch = hero.content?.match(
  /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/
);
const youtubeId = youtubeMatch?.[1];
  return (
    <div className="space-y-12">

      {/* Clinical Overview Paragraphs */}
      <div>
        {/* <h2 className="text-2xl font-semibold font-[family-name:var(--font-heading)] text-[#061627] tracking-tight mb-4">
          Clinical Overview & Methodology
        </h2> */}
        <div className="[&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:font-[family-name:var(--font-heading)] [&_h2]:text-[#061627] [&_h2]:tracking-tight [&_h2]:mb-4 [&_p]:space-y-3.5 [&_p]:text-sm sm:[&_p]:text-base [&_p]:text-gray-700 [&_p]:leading-relaxed [&_ul]:mt-6 [&_ul]:space-y-2.5 [&_ul_li]:flex [&_li]:items-start [&_li]:gap-3 [&_li]:text-sm [&_li]:text-[#061627]
                                 [&_ol]:my-6 [&_ol]:list-decimal [&_ol]:pl-6
                [&_ol]:space-y-3
                [&_ol>li]:pl-2 [&_ol>li]:text-base [&_ol>li]:leading-relaxed
                [&_ol>li]:text-[#3d3a34] sm:[&_ol>li]:text-lg
                [&_ol>li::marker]:font-semibold [&_ol>li::marker]:text-[#a43a32] [&_li]:flex [&_li]:items-start [&_li]:gap-3 [&_li]:text-sm [&_li]:text-[#061627] [&_li]:before:content-['✓'] [&_li]:before:flex [&_li]:before:items-center [&_li]:before:justify-center [&_li]:before:mt-0.5 [&_li]:before:h-[18px] [&_li]:before:w-[18px] [&_li]:before:shrink-0 [&_li]:before:rounded-full [&_li]:before:bg-[#CD9E57]/15 [&_li]:before:text-[#CD9E57] [&_li]:before:text-[10px] [&_li]:before:font-bold [&_hr]:my-8 [&_hr]:border-[#171715]/15
                [&_figure]:my-8 [&_figure]:overflow-hidden
                [&_figure]:bg-[#e9e3d7]
                [&>a]:text-[#a43a32] [&>a]:underline [&>a]:underline-offset-4
                [&_figure_img]:h-auto [&_figure_img]:w-full
                [&_figure_img]:object-cover
                " dangerouslySetInnerHTML={{__html:hero.content??""}} />
      </div>
      {youtubeId && (
  <div className="overflow-hidden rounded-2xl border border-gray-200 bg-black shadow-sm">
    <div className="relative aspect-video w-full">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${youtubeId}`}
        title={`${hero.title} video`}
        className="absolute inset-0 h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  </div>
)}
      {/* Featured Visual */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gray-100 border border-gray-200">
        <Image
          src={hero.image}
          alt={hero.title}
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Key Clinical Modalities */}
     {treatment.clinicalHighlights&&( <div className="rounded-2xl bg-[#F4F5F7] border border-gray-200 p-6 sm:p-8">
        <h3 className="text-lg font-semibold font-[family-name:var(--font-heading)] text-[#061627] tracking-tight mb-4">
          Clinical Modalities & Technology
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {treatment.clinicalHighlights?.map((highlight, i) => (
            <div
              key={i}
              className="flex items-start gap-2.5 rounded-xl bg-white border border-gray-200 p-3.5"
            >
              <span className="text-[#CD9E57] font-semibold">•</span>
              <span className="text-xs sm:text-sm font-medium text-[#061627]">
                {highlight}
              </span>
            </div>
          ))}
        </div>
      </div>)}

      {/* Step-by-Step Clinical Protocol Pathway */}
      {treatment.protocolSteps && (<div>
        <h2 className="text-2xl font-semibold font-[family-name:var(--font-heading)] text-[#061627] tracking-tight mb-6">
          Structured Treatment Pathway
        </h2>
        <div className="space-y-4">
          {treatment.protocolSteps?.map((step) => (
            <div
              key={step.step}
              className="flex items-start gap-5 rounded-2xl border border-gray-200 p-5 sm:p-6 bg-white"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#061627] text-white text-sm font-semibold">
                {step.step}
              </span>
              <div>
                <h4 className="text-base font-semibold text-[#061627]">
                  {step.title}
                </h4>
                <p className="mt-1 text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>)}

      {/* Indications & Recovery Milestones */}
      <div className="grid gap-6 sm:grid-cols-2">
        {treatment.indications&&(<div className="rounded-2xl border border-gray-200 p-6 bg-white">
          <h3 className="text-base font-semibold font-[family-name:var(--font-heading)] text-[#061627] tracking-tight mb-3">
            Who Is This For? (Indications)
          </h3>
          <ul className="space-y-2">
            {treatment.indications?.map((ind, i) => (
              <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                <span className="text-emerald-600 font-semibold">✓</span>
                <span>{ind}</span>
              </li>
            ))}
          </ul>
        </div>)}

         {treatment.recoveryGoals &&(<div className="rounded-2xl border border-gray-200 p-6 bg-white">
          <h3 className="text-base font-semibold font-[family-name:var(--font-heading)] text-[#061627] tracking-tight mb-3">
            Key Recovery Milestones
          </h3>
          <ul className="space-y-2">
            {treatment.recoveryGoals?.map((goal, i) => (
              <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                <span className="text-[#CD9E57] font-semibold">★</span>
                <span>{goal}</span>
              </li>
            ))}
          </ul>
        </div>)}
      </div>
    </div>
  );
}

