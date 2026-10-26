export const metadata = {
  title: "Welcome by FillSeats AI",
  description: "Voice-first, multilingual enrollment concierge for Minnesota childcare providers. Hackathon demo, synthetic data only.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "system-ui, sans-serif", margin: 0, padding: 24 }}>
        {children}
      </body>
    </html>
  );
}
