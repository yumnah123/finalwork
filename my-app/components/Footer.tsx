import Image from "next/image";
import logo from "../public/Logo.svg";
import footer from "../public/assets1/banner7.webp";
import twitter from "../public/assets1/twitter.png";
import facebook from "../public/assets1/facebook.png";
import linkedln from "../public/assets1/linkdln.png";
import dot from "../public/assets1/dot.png";
import adress from "../public/assets1/adress.png";
import contact from "../public/assets1/contact.png";
import email from "../public/assets1/email.png";
import world from "../public/assets1/world.png";

export default function Footer() {
  return (
    <footer
      className="bg-black text-gray-300 bg-cover bg-center lg:h-[485px] pt-12 xl:pt-24 pb-4 lg:px-6 md:pb-8 2xl:pb-0 2xl:px-0"
      style={{
        backgroundImage: `url(${footer.src})`,
      }}
    >
      <div className="container mx-auto max-w-[1170px] lg:gap-16 flex flex-col justify-between">
        <div className="flex flex-col items-center lg:items-start lg:flex-row mt-4 xl:mx-6 mb-10 lg:mb-0 gap-8 xl:gap-24">
          <div className="max-w-[280px] flex flex-col justify-start items-start gap-5">
            <div className="flex items-center">
              <Image
                src={logo}
                alt="GoldStar Logo"
                width={280}
                height={95}
                priority
              />
            </div>
            <p className="text-gray-300 2xl:text-lg text-center lg:text-left leading-relaxed lg:mb-4">
              An executive car and chauffeur service covering Surrey, London and
              the Home Counties.
            </p>
            <div className="gap-4 hidden lg:flex">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary w-[32px] h-[32px] flex justify-center items-center hover:bg-opacity-80 transition-all cursor-pointer"
              >
                <Image src={facebook} alt="facebook" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary w-[32px] h-[32px] flex justify-center items-center hover:bg-opacity-80 transition-all cursor-pointer"
              >
                <Image src={twitter} alt="twitter" />
              </a>
              <a
                href="https://www.linkedin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary w-[32px] h-[32px] flex justify-center items-center hover:bg-opacity-80 transition-all cursor-pointer"
              >
                <Image src={linkedln} alt="linkedin" />
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-0 xl:gap-8">
            <div className="lg:w-[140px]">
              <h3 className="text-lg font-bold mb-4 text-center lg:text-left text-primary">
                LINKS
              </h3>
              <ul className="space-y-2 xl:text-lg text-gray-300 ">
                <li>
                  <a
                    href="/"
                    className="hover:text-primary lg:justify-normal justify-center flex gap-2 transition-colors"
                  >
                    <div className="flex items-center">
                      <Image src={dot} alt="dot" />
                    </div>
                    <span>Home</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/services"
                    className="hover:text-primary flex gap-2 lg:justify-normal justify-center transition-colors"
                  >
                    <div className="flex items-center">
                      <Image src={dot} alt="dot" />
                    </div>
                    <span>Services</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/fleet"
                    className="hover:text-primary flex lg:justify-normal justify-center gap-2 transition-colors"
                  >
                    <div className="flex items-center">
                      <Image src={dot} alt="dot" />
                    </div>
                    <span>Our Fleet</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="hover:text-primary flex lg:justify-normal justify-center gap-2 transition-colors"
                  >
                    <div className="flex items-center">
                      <Image src={dot} alt="dot" />
                    </div>
                    <span>Contact</span>
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 text-primary text-center lg:text-left">
                ADDRESS
              </h3>
              <a
                href="https://maps.google.com/?q=Goldstar+Executive+Ltd,+3000+Cathedral+Hill,+Guildford,+GU2+7YB,+United+Kingdom"
                target="_blank"
                rel="noopener noreferrer"
                className="xl:text-lg text-gray-300 lg:text-left text-center space-y-2 ml-4 hover:text-primary transition-colors cursor-pointer block"
              >
                <div className="relative">
                  <div className="absolute left-6 lg:-left-4.5 top-2">
                    <Image src={adress} alt="adress" />
                  </div>
                  <p>Goldstar Executive Ltd</p>
                </div>
                <p>3000 Cathedral Hill,</p>
                <p>Guildford,</p>
                <p>GU2 7YB</p>
                <p>United Kingdom</p>
              </a>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 text-primary text-center lg:text-left">
                CONTACT US
              </h3>
              <div className="xl:text-lg text-gray-300 space-y-2">
                <a
                  href="tel:+442038587786"
                  className="flex gap-2 lg:justify-normal justify-center hover:text-primary"
                >
                  <div className="flex items-center">
                    <Image src={contact} alt="contact" />
                  </div>
                  <p>+44 (0) 1483 765 765</p>
                </a>
                <a
                  href="mailto:bookings@goldstarexecutive.com"
                  className="flex gap-2 hover:text-primary lg:justify-normal justify-center transition-colors cursor-pointer"
                >
                  <div className="flex items-center">
                    <Image src={email} alt="contact" />
                  </div>
                  <p>bookings@goldstarexecutive.com</p>
                </a>
                <a
                  href="https://www.goldstarexecutive.co.uk"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex gap-2 hover:text-primary lg:justify-normal justify-center        
     transition-colors cursor-pointer"
                >
                  <div className="flex items-center">
                    <Image src={world} alt="contact" />
                  </div>
                  <p>www.goldstarexecutive.com</p>
                </a>
                {/* <div className="mt-4 flex flex-col gap-1.5">
                <a href="/terms" className="flex gap-2 hover:text-white transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <Image src={dot} alt="contact" />
                  </div>
                  <p>Terms & Conditions</p>
                </a>
                <a href="/privacy" className="flex gap-2 hover:text-white transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <Image src={dot} alt="contact" />
                  </div>
                  <p>Privacy Policy</p>
                </a>
              </div> */}
              </div>
            </div>
          </div>
        </div>

        <div className="gap-4 flex justify-center mb-10 lg:hidden">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary w-[32px] h-[32px] flex lg:justify-normal justify-center items-center hover:bg-opacity-80 transition-all cursor-pointer"
          >
            <Image src={facebook} alt="facebook" />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary w-[32px] h-[32px] flex lg:justify-normal justify-center items-center hover:bg-opacity-80 transition-all cursor-pointer"
          >
            <Image src={twitter} alt="twitter" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary w-[32px] h-[32px] flex lg:justify-normal justify-center items-center hover:bg-opacity-80 transition-all cursor-pointer"
          >
            <Image src={linkedln} alt="linkedin" />
          </a>
        </div>

        <div className="flex lg:flex-row flex-col gap-4 justify-between text-center text-gray-300">
          <p>Copyright © 2025 Gold Star Executive. All Rights Reserved.</p>
          <p>Web Design UK by myteamscot.</p>
        </div>
      </div>
    </footer>
  );
}
