export const siteConfig = {
  title: "John Mark & Sandra",

  projectName: "Project Reverie",

  tagline: "Two hearts, one beautiful beginning",

  wedding: {
    date: new Date("2028-02-10T14:00:00+08:00"),
    dateFormatted: "February 10, 2028",
    ceremony: {
      venue: "Don Bosco Chapel on the Hill",
      address: "Tagaytay City, Cavite",
      time: "2:00 PM",
      mapsUrl:
        "https://maps.google.com/?q=Don+Bosco+Chapel+on+the+Hill+Tagaytay",
    },
    reception: {
      venue: "Narra Hill",
      address: "Tagaytay City, Cavite",
      time: "5:00 PM",
      mapsUrl: "https://maps.google.com/?q=Narra+Hill+Tagaytay",
    },
  },

  rsvp: {
    url: "https://forms.google.com/",
    deadline: "January 15, 2028",
    message: "We can't wait to celebrate with you. Please let us know if you'll be joining us.",
  },

  faq: [
    {
      question: "What is the dress code?",
      answer:
        "Our only rule is that you wear wedding-appropriate attire. Guests can come in any color as long as no shorts, no slippers, no jeans and no white for ladies.",
    },
    {
      question: "Can I bring a plus-one or my children?",
      answer:
        "The invitation will indicate if a plus-one or children are included. If you’re unsure, contact us. Please note that our wedding will be an adults-only event, except for children who are part of our entourage and immediate family.",
    },
    {
      question: "Is there parking available?",
      answer:
        "Yes, complimentary parking is available at both the chapel and reception venue. Valet service will be provided at Narra Hill.",
    },
    {
      question: "Can I bring a plus-one?",
      answer:
        "Due to venue capacity, we can only accommodate guests formally invited on your invitation. Please refer to your RSVP for the number of seats reserved.",
    },
    {
      question: "Where should we stay?",
      answer:
        "Tagaytay has many wonderful hotels and bed-and-breakfasts. We recommend booking early, especially for the weekend of our wedding.",
    },
    {
      question: "Do you have a gift registry?",
      answer:
        "Your presence is the greatest gift. If you wish to give something more, a contribution to our honeymoon fund would be deeply appreciated.",
    },
  ],

  theme: {
    watercolor: true,
    paperTexture: true,
  },
} as const;
