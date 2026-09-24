export default function manifest() {
  return {
    name: "MARKTECH — Mark Ochieng Oduor",
    short_name: "MARKTECH",
    description: "Full-Stack Software Engineer & Digital Solutions Architect.",
    start_url: "/",
    display: "standalone",
    background_color: "#080808",
    theme_color: "#ff6b1a",
    lang: "en",
    icons: [
      { src: "/photo/favicon.png", sizes: "192x192", type: "image/png" },
      { src: "/photo/favicon.png", sizes: "512x512", type: "image/png" },
    ],
  };
}