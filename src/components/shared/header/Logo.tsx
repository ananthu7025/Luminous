import customLogo from '@public/images/luminous-assets/LuminousLogo.svg';
import Image from 'next/image';
import Link from 'next/link';

const Logo = () => {
  return (
    <div className="flex items-center">
      <Link href="/" className="flex items-center gap-3 group">
        <span className="sr-only">Luminous Logics</span>
        {/* logo icon */}
        <figure className="max-w-[120px] md:max-w-[160px] transition-transform duration-300 group-hover:scale-105 overflow-hidden">
          <Image src={customLogo} alt="Luminous Logics Logo" className="w-full h-auto object-contain" />
        </figure>
      </Link>
    </div>
  );
};

export default Logo;
