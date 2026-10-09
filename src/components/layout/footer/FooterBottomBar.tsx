import Link from 'next/link';
import { formatCurrentYear } from '@/utils/date';

export default function FooterBottomBar() {
  return (
    <div className="border-t border-indigo-500/20 pt-8">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-blue-100/60 text-sm">
          © {formatCurrentYear()} fanaticCoders. All rights reserved.
        </div>
        <div className="flex gap-6 text-sm">
          <Link
            href="/terms"
            className="text-blue-100/60 hover:text-white transition-colors no-underline py-1"
          >
            Terms of Service
          </Link>
          <Link
            href="/privacy"
            className="text-blue-100/60 hover:text-white transition-colors no-underline py-1"
          >
            Privacy Policy
          </Link>
          <Link
            href="/cookies"
            className="text-blue-100/60 hover:text-white transition-colors no-underline py-1"
          >
            Cookie Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
