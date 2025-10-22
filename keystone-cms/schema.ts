import { list } from '@keystone-6/core';
import { text, integer, password, relationship,file } from '@keystone-6/core/fields';
export const lists = {
  Admin: list({
    access: {
      operation: {
        query: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
      },
    },
    fields: {
      name: text({ validation: { isRequired: true } }),
      email: text({ validation: { isRequired: true }, isIndexed: 'unique' }),
      password: password(),
    },
  }),

  
  ContactPage: list({
    access: {
      operation: {
        query: () => true,
        create: () => false,
        
        update: () => true,
        delete: () => true,
      },
    },
    fields: {
      bookingService: text({ 
        label: 'Booking Service', 
        defaultValue: '24/7 Available' 
      }),
      phoneSupport: text({ 
        label: 'Phone Support', 
        defaultValue: '24/7 Available' 
      }),
      officeHours: text({ 
        label: 'Office Hours', 
        defaultValue: 'Mon-Fri: 8:00-18:00' 
      }),
      weekendOffice: text({ 
        label: 'Weekend Office', 
        defaultValue: 'Sat-Sun: 9:00-17:00' 
      }),
      emergencyService: text({ 
        label: 'Emergency Service', 
        defaultValue: '24/7 Available' 
      }),
      note: text({
        ui: { displayMode: 'textarea' },
        defaultValue:
          'Our vehicles operate 24/7, including weekends and holidays. Emergency bookings and urgent requests are always accommodated.',
      }),
     

      // Relationship to FAQs 
      faqs: relationship({
        ref: 'FAQ.contactPage',
        many: true,
        ui: {
          displayMode: 'cards',
          cardFields: ['question', 'order'],
          inlineCreate: { fields: ['question', 'answer', 'order'] },
          inlineEdit: { fields: ['question', 'answer', 'order'] },
          linkToItem: true,
          inlineConnect: true,
        },
      }),
    },
     ui:{
        hideCreate: true,
      }
  }),

 
  FAQ: list({
    access: {
      operation: {
        query: () => true,
        create: () => true,
        update: () => true,
        delete: () => true,
      },
    },
    fields: {
      question: text({ 
        validation: { isRequired: true },
        label: 'Question',
      }),
      answer: text({ 
        validation: { isRequired: true },
        ui: { displayMode: 'textarea' },
        label: 'Answer',
      }),
      order: integer({
        defaultValue: 0,
        label: 'Display Order',
        ui: {
          description: 'Lower numbers appear first (0, 1, 2, ...)',
        },
      }),
      contactPage: relationship({
        ref: 'ContactPage.faqs',
        many: false,
      }),
    },
    ui: {
      listView: {
        initialColumns: ['question', 'order'],
        initialSort: { field: 'order', direction: 'ASC' },
      },
      labelField: 'question',
    },
  }),

  SiteSetting: list({
    access: {
      operation: {
        query: () => true,
        create: () => false,
        update: () => true,
        delete: () => false,
      },
    },
    fields: {
      // Identifier (only one settings entry should exist)
      siteName: text({ 
        validation: { isRequired: true },
        defaultValue: 'Gold Star Executive',
        label: 'Site Name',
        isIndexed: 'unique',
      }),

      // Header Settings
      logo: file({
        storage: 'my_local_files',
        label: 'Site Logo',
        ui: {
          description: 'Upload PNG, or JPG logo file',
        },
      }),
      
      phoneNumber: text({ 
        validation: { isRequired: true },
        defaultValue: '+44 (0) 203 858 786',
        label: 'Phone Number',
        ui: {
          description: 'Format: +44 (0) 203 858 786',
        },
      }),

      phoneNumberRaw: text({ 
        validation: { isRequired: true },
        defaultValue: '+442038587786',
        label: 'Phone Number (for tel: link)',
        ui: {
          description: 'No spaces or special characters: +442038587786',
        },
      }),

      // Footer Content
      companyDescription: text({
        ui: { displayMode: 'textarea' },
        defaultValue: 'An executive car and chauffeur service covering Surrey, London and the Home Counties.',
        label: 'Company Description',
      }),

      // Address
      addressLine1: text({ 
        defaultValue: 'Goldstar Executive Ltd',
        label: 'Address Line 1',
      }),
      addressLine2: text({ 
        defaultValue: '3000 Cathedral Hill,',
        label: 'Address Line 2',
      }),
      city: text({ 
        defaultValue: 'Guildford,',
        label: 'City',
      }),
      postalCode: text({ 
        defaultValue: 'GU2 7YB',
        label: 'Postal Code',
      }),
      country: text({ 
        defaultValue: 'United Kingdom',
        label: 'Country',
      }),

      // Google Maps Link
      googleMapsUrl: text({
        defaultValue: 'https://maps.google.com/?q=Goldstar+Executive+Ltd,+3000+Cathedral+Hill,+Guildford,+GU2+7YB,+United+Kingdom',
        label: 'Google Maps URL',
        ui: {
          description: 'Full Google Maps link for the address',
        },
      }),

      // Contact Information
      email: text({ 
        validation: { isRequired: true },
        defaultValue: 'bookings@goldstarexecutive.com',
        label: 'Email Address',
      }),

      website: text({ 
        defaultValue: 'www.goldstarexecutive.com',
        label: 'Website URL (display)',
      }),

      websiteUrl: text({ 
        defaultValue: 'https://www.goldstarexecutive.co.uk',
        label: 'Website URL (full link)',
      }),

      // Social Media Links
      facebookUrl: text({ 
        defaultValue: 'https://facebook.com',
        label: 'Facebook URL',
      }),

      twitterUrl: text({ 
        defaultValue: 'https://twitter.com',
        label: 'Twitter URL',
      }),

      linkedinUrl: text({ 
        defaultValue: 'https://www.linkedin.com/',
        label: 'LinkedIn URL',
      }),

      // Copyright
      copyrightText: text({
        defaultValue: 'Copyright © 2025 Gold Star Executive. All Rights Reserved.',
        label: 'Copyright Text',
      }),

      designerCredit: text({
        defaultValue: 'Web Design UK by myteamscot.',
        label: 'Designer Credit',
      }),
    },
    ui: {
      hideCreate: true,
      labelField: 'siteName',
      description: 'Manage site-wide settings for header and footer',
    },
  }),
};