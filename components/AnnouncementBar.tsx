// Configurable announcement bar — change the message & link here
const CONFIG = {
  message: "FREE SHIPPING ON ORDERS ABOVE ₹999",
  link: "/shop",
  linkLabel: "Shop Now →",
};

export default function AnnouncementBar() {
  return (
    <div className="bg-zinc-950 text-white text-center py-2.5 px-4 text-xs sm:text-sm font-medium tracking-widest z-40 relative">
      {CONFIG.message}&nbsp;&nbsp;
      <a
        href={CONFIG.link}
        className="underline underline-offset-2 hover:opacity-75 transition-opacity"
      >
        {CONFIG.linkLabel}
      </a>
    </div>
  );
}
