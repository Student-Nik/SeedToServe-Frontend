import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function PromoBanner({
  tag,
  tagColor = "bg-red-500",
  title,
  desc,
  ctaText,
  ctaColor = "bg-red-500 hover:bg-red-600",
  bg = "bg-gray-900",
  icon: Icon,
  className = "",
}) {
  const navigate = useNavigate();
  const goToProducts = () => navigate("/dashboard/products");

  return (
    <div
      className={`relative rounded-xl overflow-hidden p-6 sm:p-8 flex flex-col justify-center min-h-[180px] ${bg} ${className}`}
    >
      {/* subtle dot-grid texture, keeps it from reading flat */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />
      <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-red-500/10 blur-2xl pointer-events-none" />

      <div className="relative">
        {tag && (
          <span
            className={`inline-flex items-center gap-1.5 w-fit text-xs font-medium text-white px-3 py-1 rounded-full mb-3 ${tagColor}`}
          >
            {Icon && <Icon size={12} />}
            {tag}
          </span>
        )}

        <h3 className="text-xl sm:text-2xl font-bold text-white max-w-sm leading-snug">
          {title}
        </h3>

        <p className="text-sm text-gray-300 mt-2 max-w-sm leading-relaxed">
          {desc}
        </p>

        {ctaText && (
          <button
            onClick={goToProducts}
            className={`group mt-4 inline-flex items-center gap-1.5 w-fit text-sm font-medium px-5 py-2 rounded-full transition ${ctaColor}`}
          >
            {ctaText}
            <ArrowRight
              size={14}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>
        )}
      </div>
    </div>
  );
}