import RevealAnimation from '@/components/animation/RevealAnimation';
import { cn } from '@/utils/cn';
import behance from '@public/images/icons/behance.svg';
import dribbble from '@public/images/icons/dribbble.svg';
import facebook from '@public/images/icons/facebook.svg';
import instagram from '@public/images/icons/instagram.svg';
import linkedin from '@public/images/icons/linkedin.svg';
import youtube from '@public/images/icons/youtube.svg';
import darkLogo from '@public/images/luminous-assets/LuminousLogo.svg';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import ThemeToggle from '@/components/shared/ThemeToggle';
import FooterDivider from './FooterDivider';
import FooterLeftGradient from './FooterLeftGradient';
import FooterRightGradient from './FooterRightGradient';

interface FooterOneProps {
  className?: string;
  defaultTheme?: 'light' | 'dark';
}

const FooterOne: FC<FooterOneProps> = ({ className, defaultTheme }) => {
  return (
    <footer className={cn('bg-secondary dark:bg-background-8 relative overflow-hidden', className)}>
      {/* <!-- right gradient --> */}
      <FooterRightGradient />

      {/* <!-- left gradient --> */}
      <FooterLeftGradient />
      <div className="main-container px-5">
        <div className="grid grid-cols-12 justify-between gap-x-0 gap-y-16 pt-16 pb-12 xl:pt-[90px]">
          <div className="col-span-12 xl:col-span-4">
            <RevealAnimation delay={0.3}>
              <div className="max-w-[306px]">
                <figure className="max-w-[140px] rounded-lg overflow-hidden">
                  <Image src={darkLogo} alt="Luminous Logics Logo" className="w-full h-auto object-cover shrink-0" />
                </figure>
                <p className="text-accent/60 text-tagline-1 mt-4 mb-7 font-normal">
                  Building Digital Products That Drive Growth
                </p>
                <div className="flex items-center gap-3">
                  <Link target="_blank" href="https://www.facebook.com" className="footer-social-link">
                    <span className="sr-only">Facebook</span>
                    <Image className="size-6" src={facebook} alt="Facebook" />
                  </Link>
                  <div className="bg-stroke-1/20 h-6 w-px"></div>
                  <Link target="_blank" href="https://www.instagram.com" className="footer-social-link">
                    <span className="sr-only">Instagram</span>
                    <Image className="size-6" src={instagram} alt="Instagram" />
                  </Link>
                  <div className="bg-stroke-1/20 h-6 w-px"></div>
                  <Link target="_blank" href="https://www.youtube.com" className="footer-social-link">
                    <span className="sr-only">Youtube</span>
                    <Image className="size-6" src={youtube} alt="Youtube" />
                  </Link>
                  <div className="bg-stroke-1/20 h-6 w-px"></div>
                  <Link target="_blank" href="https://www.linkedin.com/company/luminouslogics/" className="footer-social-link">
                    <span className="sr-only">LinkedIn</span>
                    <Image className="size-6" src={linkedin} alt="LinkedIn" />
                  </Link>
                  <div className="bg-stroke-1/20 h-6 w-px"></div>
                  <Link target="_blank" href="https://www.dribbble.com" className="footer-social-link">
                    <span className="sr-only">Dribbble</span>
                    <Image className="size-6" src={dribbble} alt="Dribbble" />
                  </Link>
                  <div className="bg-stroke-1/20 h-6 w-px"></div>
                  <Link target="_blank" href="https://www.behance.net" className="footer-social-link">
                    <span className="sr-only">Behance</span>
                    <Image className="size-6" src={behance} alt="Behance" />
                  </Link>
                </div>
              </div>
            </RevealAnimation>
          </div>
          <div className="col-span-12 grid grid-cols-12 gap-x-0 gap-y-8 xl:col-span-8">
            <div className="col-span-12 md:col-span-6">
              <RevealAnimation delay={0.4}>
                <div className="space-y-8">
                  <p className="sm:text-heading-6 text-tagline-1 text-primary-50 font-normal">Explore</p>
                  <ul className="grid grid-cols-2 gap-y-3 gap-x-8 sm:gap-y-5">
                    <li>
                      <Link href="/about" className="footer-link">
                        About
                      </Link>
                    </li>
                    <li>
                      <Link href="/services" className="footer-link">
                        Services
                      </Link>
                    </li>
                    <li>
                      <Link href="/case-study" className="footer-link">
                        Work
                      </Link>
                    </li>
                    <li>
                      <Link href="/blog" className="footer-link">
                        Blog
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact-us" className="footer-link">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
              </RevealAnimation>
            </div>
            <div className="col-span-12 md:col-span-6">
              <RevealAnimation delay={0.5}>
                <div className="space-y-8">
                  <p className="sm:text-heading-6 text-tagline-1 text-primary-50 font-normal">Legal</p>
                  <ul className="grid grid-cols-2 gap-y-3 gap-x-8 sm:gap-y-5">
                    <li>
                      <Link href="/terms-conditions" className="footer-link">
                        Terms & Conditions
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy" className="footer-link">
                        Privacy Policy
                      </Link>
                    </li>
                  </ul>
                </div>
              </RevealAnimation>
            </div>
          </div>
        </div>
        <div className="relative pt-[26px] pb-[100px] text-center">
          <FooterDivider />
          <RevealAnimation delay={0.7} offset={10} start="top 105%">
            <div className="space-y-4">
              <p className="text-tagline-1 text-primary-50 font-normal">
                © 2025 Luminous Logics Technologies. All Rights Reserved.
              </p>
              <div className="space-y-2">
                <p className="text-tagline-2 text-primary-50/60 font-normal">
                  Building Digital Products That Drive Growth
                </p>
                <p className="text-tagline-2 text-primary-50/60 font-normal">
                  Kochi, India · Kuwait · Canada
                </p>
                <p className="text-tagline-2 text-primary-50/60 font-normal">
                  4/461, 2ND FLOOR, VALAMKOTTIL TOWERS, KAKKANAD, KOCHI, KERALA - 682021
                </p>
                <p className="text-tagline-2 text-primary-50/60 font-normal">
                  contact@luminouslogics.com
                </p>
                <p className="text-tagline-2 text-primary-50/60 font-normal">
                  +91 94478 48040
                </p>
              </div>
            </div>
          </RevealAnimation>
        </div>
      </div>
    </footer>
  );
};

export default FooterOne;
