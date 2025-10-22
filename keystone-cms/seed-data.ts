import { KeystoneContext } from '@keystone-6/core/types';

export async function insertDefaultData(context: KeystoneContext) {
  // Check if FAQs already exist
  const existingFAQs = await context.db.FAQ.findMany({});
  if (existingFAQs.length === 0) {
   

    await context.db.FAQ.createMany({
      data: [
        {
          question: 'How far in advance should I book?',
          answer: 'We recommend booking at least 24 hours in advance for regular services. However, we can accommodate same-day bookings subject to availability. For airport transfers, we suggest booking as soon as you have your flight details.',
          order: 0,
        },
        {
          question: 'What payment methods do you accept?',
          answer: 'We accept all major credit cards, bank transfers, cash, and for corporate accounts, we offer monthly invoicing with 30-day payment terms.',
          order: 1,
        },
        {
          question: 'Do you provide child seats?',
          answer: 'Yes, we can provide child seats and booster seats upon request. Please specify the age and weight of children when booking to ensure we have the appropriate safety equipment.',
          order: 2,
        },
          {
          question: 'What areas do you cover?',
          answer: 'We primarily cover Surrey, London, and the Home Counties. For destinations outside these areas, please contact us to discuss your requirements and any additional charges that may apply.',
         order: 3,
        },
          {
          question: 'What is your cancellation policy?',
          answer: 'Free cancellation up to 2 hours before the scheduled pickup time. Cancellations within 2 hours may incur charges. No-shows will be charged the full fare. Corporate accounts may have different terms.',
         order: 4
        },
      ],
    });

  } else {
    console.log(' FAQs already exist, skipping seeding.');
  }
}