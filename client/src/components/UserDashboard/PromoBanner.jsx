import { useNavigate } from "react-router-dom";

export default function PromoBanner({
  tag,
  tagColor = "bg-red-500",
  title,
  desc,
  ctaText,
  ctaColor = "bg-red-500 hover:bg-red-600",
  bg = "bg-gray-900",
  className = "",
}) {
  const navigate = useNavigate();

  const goToProducts = () => {
    navigate("/dashboard/products");
  };

  return (
    <div
      className={`relative rounded-xl overflow-hidden p-6 sm:p-8 flex flex-col justify-center min-h-[180px] ${bg} ${className}`}
    >
      {tag && (
        <span
          className={`inline-block w-fit text-xs font-medium text-white px-3 py-1 rounded-full mb-3 ${tagColor}`}
        >
          {tag}
        </span>
      )}

      <h3 className="text-xl sm:text-2xl font-bold text-white max-w-sm">
        {title}
      </h3>

      <p className="text-sm text-gray-300 mt-2 max-w-sm">
        {desc}
      </p>

      {ctaText && (
        <button
          onClick={goToProducts}
          className={`mt-4 w-fit text-sm font-medium px-5 py-2 rounded-full transition ${ctaColor}`}
        >
          {ctaText}
        </button>
      )}
    </div>
  );
}