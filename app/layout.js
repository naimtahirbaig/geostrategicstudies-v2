import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';

export const metadata = {
  title: 'Geo-Strategic Studies Organisation — Policy · Research · Analysis',
  description: 'Independent think-tank and online research journal dedicated to international relations, strategic studies, nuclear deterrence, geopolitics, and peace.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-sans bg-[#faf9f6] text-gray-600">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
