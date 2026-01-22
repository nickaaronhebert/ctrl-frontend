type Props = {
  onClick?: () => void;
};

export function TransmissionFailureHint({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        relative ml-2 inline-flex items-center gap-1.5
        rounded-full px-3 py-1 cursor-pointer
        text-xs font-bold
        text-red-500
        bg-white
        border border-red-400
        overflow-hidden
        group
   
        focus:outline-none focus:ring-2 focus:ring-red-400/50
        transition-all duration-300
      "
    >
      {/* Shimmer effect */}
      <span
        className="
          pointer-events-none absolute inset-0
          bg-gradient-to-r from-transparent via-white/30 to-transparent
          -translate-x-full
          group-hover:translate-x-full
          transition-transform duration-1000
        "
      />

      {/* Pulse ring */}
      <span
        className="
          pointer-events-none absolute inset-0 rounded-full
          border-2 border-white/50
          animate-ping
          motion-reduce:animate-none
        "
      />

      <span className="relative z-10 flex items-center gap-1.5 drop-shadow-md">
        <span>What went wrong?</span>
      </span>
    </button>
  );
}
