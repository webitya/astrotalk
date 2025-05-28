import "./globals.css"

export const metadata = {
  title: "AstroConnect - Your Cosmic Journey Awaits",
  description: "Connect with expert astrologers for personalized readings and cosmic guidance",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
      </head>
      <body className="antialiased">{children}</body>
    </html>
  )
}
