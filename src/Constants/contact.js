import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
  faWhatsapp,
} from '@fortawesome/free-brands-svg-icons';
export const contacts = {
  personalContact: {
    name: 'Prabin',
    email: 'nepalfloodrelief@gmail.com',
    phone: '+61473654956',
    linkedin:
      'https://www.linkedin.com/in/experiencedfullstackdeveoperprabinkc/',
  },
  shareLink: 'https://nepal-flood-support.vercel.app/', // Replace with your actual link
  shareMessage:
    'Join us in our mission! Help raise funds by sharing this link!',
  socialPlatforms: {
    facebook: {
      name: 'Facebook',
      url: link =>
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          link
        )}`,
      icon: faFacebook,
    },
    twitter: {
      name: 'Twitter',
      url: (link, message) =>
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          message
        )}&url=${encodeURIComponent(link)}`,
      icon: faTwitter,
    },
    linkedin: {
      name: 'LinkedIn',
      url: link =>
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          link
        )}`,
      icon: faLinkedin,
    },
    whatsapp: {
      name: 'WhatsApp',
      url: (link, message) =>
        `https://api.whatsapp.com/send?text=${encodeURIComponent(
          `${message} ${link}`
        )}`,
      icon: faWhatsapp,
    },
    instagram: {
      name: 'Instagram',
      alertMessage:
        'Instagram does not support direct sharing via URL. Please copy the link manually.',
      icon: faInstagram,
    },
  },
};
