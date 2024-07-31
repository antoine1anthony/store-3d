import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Music Player</title>
      </head>
      <body>{children}</body>
    </html>
  );
}
