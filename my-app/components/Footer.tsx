import Image from "next/image";
import logo from "../public/Logo.svg";
import footer from "../public/assets1/banner7.jpg";
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
      className="bg-black text-gray-300 bg-cover bg-center lg:h-[485px] pt-24 px-6 pb-4 md:pb-8 2xl:pb-0 2xl:px-0"
      style={{
        backgroundImage: `url(${footer.src})`,
      }}
    >
      <div className="container mx-auto max-w-[1170px] lg:gap-16 flex flex-col justify-between">
        <div className="flex flex-col lg:flex-row mt-4 lg:mx-6 mb-12 lg:mb-0 gap-24">
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
            <p className="text-gray-300 2xl:text-lg text-left leading-relaxed mb-4">
              An executive car and chauffeur service covering Surrey, London and
              the Home Counties.
            </p>
            <div className="flex gap-4">
              <div className="bg-primary w-[32px] h-[32px] flex justify-center items-center">
                <Image src={facebook} alt="twitter" />
              </div>
              <div className="bg-primary w-[32px] h-[32px] flex justify-center items-center">
                <Image src={twitter} alt="twitter" />
              </div>
              <div className="bg-primary w-[32px] h-[32px] flex justify-center items-center">
                <Image src={linkedln} alt="twitter" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">LINKS</h3>
            <ul className="space-y-2 text-lg text-gray-300">
              <li>
                <a
                  href="/"
                  className="hover:text-white flex gap-2 transition-colors"
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
                  className="hover:text-white flex gap-2 transition-colors"
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
                  className="hover:text-white flex gap-2 transition-colors"
                >
                  <div className="flex items-center">
                    <Image src={dot} alt="dot" />
                  </div>
                  <span>Our Fleet</span>
                </a>
              </li>
              <li>
                <a
                  href="/feedback"
                  className="hover:text-white flex gap-2 transition-colors"
                >
                  <div className="flex items-center">
                    <Image src={dot} alt="dot" />
                  </div>
                  <span>Feedback</span>
                </a>
              </li>
              <li>
                <a
                  href="/corporate"
                  className="hover:text-white flex gap-2 transition-colors"
                >
                  <div className="flex items-center">
                    <Image src={dot} alt="dot" />
                  </div>
                  <span>Corporate Account</span>
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="hover:text-white flex gap-2 transition-colors"
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
            <h3 className="text-lg font-bold mb-4 text-primary">ADDRESS</h3>
            <div className="text-lg text-gray-300 space-y-2">
              <div className="relative">
                <div className="absolute -left-4.5 top-2">
                  <Image src={adress} alt="adress" />
                </div>
                <p>Goldstar Executive Ltd</p>
              </div>
              <p>3000 Cathedral Hill,</p>
              <p>Guildford,</p>
              <p>GU2 7YB</p>
              <p>United Kingdom</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">CONTACT US</h3>
            <div className="text-lg text-gray-300 space-y-2">
              <div className="flex gap-2">
                <div className="flex items-center">
                  <Image src={contact} alt="contact" />
                </div>
                <p>+44 (0) 1483 765 765</p>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center">
                  <Image src={email} alt="contact" />
                </div>
                <p>bookings@goldstarexecutive.com</p>
              </div>
              <div className="flex gap-2">
                <div className="flex items-center">
                  <Image src={world} alt="contact" />
                </div>
                <p>www.goldstarexecutive.com</p>
              </div>
              <div className="mt-4 flex flex-col gap-1.5">
                <div className="flex gap-2">
                  <div className="flex items-center">
                    <Image src={dot} alt="contact" />
                  </div>
                  <p>Terms & Conditions</p>
                </div>
                <div className="flex gap-2">
                  <div className="flex items-center">
                    <Image src={dot} alt="contact" />
                  </div>
                  <p>Privacy Policy</p>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>

        <div className="flex md:flex-row flex-col justify-between text-center text-gray-300">
          <p>Copyright © 2025 Gold Star Executive. All Rights Reserved.</p>
          <p>Web Design UK by myteamscot.</p>
        </div>
      </div>
    </footer>
  );
}
