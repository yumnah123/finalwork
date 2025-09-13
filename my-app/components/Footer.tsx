import Image from "next/image";
import logo from "../public/Logo.svg";
import footer from "../public/assets1/banner7.jpg";

export default function Footer() {
  return (
    <footer
      className="bg-black text-white bg-cover bg-center pt-24"
      style={{
        backgroundImage: `url(${footer.src})`,
      }}
    >
      <div className="container mx-auto px-4 max-w-[1240px]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
            <p className="text-gray-400 text-sm text-left leading-relaxed mb-4">
              An executive car and chauffeur service covering Surrey, London
              and the Home Counties.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">LINKS</h3>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/services" className="hover:text-white transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="/fleet" className="hover:text-white transition-colors">
                  Our Fleet
                </a>
              </li>
              <li>
                <a href="/feedback" className="hover:text-white transition-colors">
                  Feedback
                </a>
              </li>
              <li>
                <a href="/corporate" className="hover:text-white transition-colors">
                  Corporate Account
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-white transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">ADDRESS</h3>
            <div className="text-sm text-gray-400 space-y-2">
              <p>Goldstar Executive Ltd</p>
              <p>2000 Cathedral Hill</p>
              <p>Guildford</p>
              <p>Surrey</p>
              <p>United Kingdom</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-primary">CONTACT US</h3>
            <div className="text-sm text-gray-400 space-y-2">
              <p>+44 (0) 203 858 786</p>
              <p>booking@goldstarexecutive.com</p>
              <p>www.goldstarexecutive.com</p>
              <div className="mt-4">
                <p>Terms & Conditions</p>
                <p>Privacy Policy</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-sm text-gray-400">
          <p>Copyright © 2023 Gold Star Executive. All Rights Reserved.</p>
          <p className="mt-2">Web Design UK by myteamscot.</p>
        </div>
      </div>
    </footer>
  );
}