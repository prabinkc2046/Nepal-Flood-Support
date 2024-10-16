import { scrollToSection } from '../components/utils/scrollToSection';
export const faqs = [
  {
    question: 'What is the purpose of this fundraising project?',
    answer:
      'The purpose of this fundraising project is to support families in Nepal affected by recent floods. We aim to provide essential life-sustaining resources, such as food and clean water. As winter approaches, we also plan to distribute blankets, and if sufficient funds are raised, we hope to assist in rebuilding homes.',
  },
  {
    question: 'How can I contribute to this project?',
    answer:
      'You can contribute by donating directly and sharing our donation link with your friends, family, and social networks to spread the word and maximize our impact.',
  },
  {
    question: 'Is my donation tax-deductible?',
    answer: (
      <>
        No, donations to this project are not tax-deductible. For any further
        questions, feel free to contact us.{' '}
        <button onClick={() => scrollToSection('contact')}>Contact</button>
      </>
    ),
  },
  {
    question: 'How is the raised money being used?',
    answer: (
      <>
        The funds will be used to meet immediate needs such as food, water, and
        blankets for displaced families. Depending on the amount raised, we may
        also contribute towards rebuilding homes for those affected by the
        floods. To know more, please visit this section{' '}
        <button onClick={() => scrollToSection('transparency')}>
          Transparency
        </button>
      </>
    ),
  },
  {
    question: 'Why is a commercial fundraising platform not being used?',
    answer:
      'Commercial fundraising platforms often charge transaction fees. To maximize the impact of every donation, we built this website and are hosting it for free to ensure that all contributions directly benefit those in need.',
  },
  {
    question:
      'How can I be sure that the fund is not a scam or used for personal purposes?',
    answer:
      'We will provide bills and receipts for every purchase made to ensure full transparency and demonstrate that the funds are used to help those in need.',
  },
  {
    question: 'Will I receive updates via email on how the funds are used?',
    answer: (
      <>
        Yes, we will send you an email with links to our website, where you can
        view detailed updates on how the funds are being utilized. Please visit
        this page{' '}
        <button onClick={() => scrollToSection('updates')}>Updates</button>
      </>
    ),
  },
  {
    question: 'How can I share the donation link?',
    answer: (
      <>
        Visit the{' '}
        <button onClick={() => scrollToSection('involved')}>
          Get Involved
        </button>
        section on our website, where you can copy the donation link to share.
        You can also post it on any popular platform like Facebook, LinkedIn, or
        WhatsApp to help us reach more people.
      </>
    ),
  },
  {
    question:
      'Who is volunteering in Nepal to organize this fund? Can I know more about them?',
    answer: (
      <>
        Yes, we are working closely with{' '}
        <a
          href="https://beershebaschool.edu.np/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Beersheba National Higher Secondary School
        </a>{' '}
        in Nepal. Beersheba School has a strong reputation for community
        service, having built homes and supported families in need.
      </>
    ),
  },
  {
    question: 'Who can I contact for more information?',
    answer: (
      <>
        Please visit{' '}
        <button onClick={() => scrollToSection('contact')}>Contact</button> to
        contact us.
      </>
    ),
  },
];
