import { FaEnvelope, FaAmazon, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';
import { TbBrandThreads } from 'react-icons/tb';

const ICONS = {
  twitter: FaTwitter,
  youtube: FaYoutube,
  threads: TbBrandThreads,
  amazon: FaAmazon,
  instagram: FaInstagram,
};

export default function ContactSection({ data }) {
  const contact = data.contact;
  const EmailIcon = FaEnvelope;
  return (
    <section id={contact.id} className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{contact.heading}</h2>
          <div className="w-20 h-1 bg-pink-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700">{contact.intro}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-8 justify-center mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center transition-transform hover:scale-105">
            <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <EmailIcon className="text-pink-600" size={24} />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{contact.email.label}</h3>
            <a href={`mailto:${contact.email.value}`} className="text-pink-600 hover:text-pink-800 transition-colors">
              {contact.email.value}
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 justify-center">
          {contact.socials.map((social) => {
            const Icon = ICONS[social.icon];
            return (
              <div key={social.name} className="bg-white p-4 rounded-lg shadow-sm text-center transition-transform hover:scale-105">
                <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Icon className="text-pink-600" size={20} />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 mb-1">{social.name}</h3>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:text-pink-800 transition-colors text-sm"
                >
                  {social.handle}
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
