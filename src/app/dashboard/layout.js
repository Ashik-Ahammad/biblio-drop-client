export default function RootLayout({ children }) {
  return (
<html lang="en" className={`${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <main className="flex-1">{children}</main>

      </body>
    </html>
  )
}