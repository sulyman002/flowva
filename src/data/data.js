import users_icon from "../assets/users.svg";
import brevo_banner from "../assets/brevo_banner.svg";
import jotform_banner from "../assets/jotform_banner.svg";
import monday_banner from "../assets/monday_banner.svg";
import reclaim_banner from "../assets/reclaim_banner.svg";
import nietz from "../assets/nietz.svg";
import light_box_logo from "../assets/light_box_logo.svg";
import spherule from "../assets/spherule.svg";
import globank from "../assets/gblobank.svg";
import father_dev from "../assets/father_dev.svg";

// How it works icons

import subscribe from "../assets/subscribe.svg";
import launch from "../assets/launch.svg";
import speaker from "../assets/speaker.svg";
import track from "../assets/track.svg";
import crown from "../assets/crown.svg";

export const tabs = [
  { id: 1, icon: users_icon, title: "For users", viewMode: "users" },
  { id: 2, icon: users_icon, title: "For brands", viewMode: "brands" },
];

export const productivityData = [
  {
    value: "10,000+",
    label: "Users",
    description: "Already simplifying their workflow with Flowva",
    type: "users",
    footer: {
      items: [
        "https://i.pravatar.cc/100?img=1",
        "https://i.pravatar.cc/100?img=2",
        "https://i.pravatar.cc/100?img=3",
        "https://i.pravatar.cc/100?img=4",
      ],
      text: "10,000+",
      itemType: "image", // image, icon, text
      className: "rounded-full ring-2 ring-white", // specific styling for items
    },
  },
  {
    value: "200+",
    label: "Tools",
    description: "Curated and organized for you in the library",
    type: "tools",
    footer: {
      items: ["⚛️", "🔷", "🦊", "✅"],
      text: "and many more",
      itemType: "icon",
      className: "rounded", // styling for icon container
      bgColors: [
        "bg-purple-100",
        "bg-blue-100",
        "bg-orange-100",
        "bg-green-100",
      ], // specific for tools
    },
  },
  {
    value: "25+",
    label: "Countries",
    description: "Reviewing tools and building smarter stacks every day",
    type: "countries",
    footer: {
      items: ["🇳🇬", "🇺🇸", "🇮🇳", "🇨🇦", "🇵🇭", "🇰🇪", "🇬🇧"],
      text: null,
      itemType: "text",
      className: "text-xl",
    },
  },
];

// cardsData.js
export const cardsData = [
  {
    name: "Brevo",
    image: brevo_banner,
    link: "https://get.brevo.com/9vml1qjuxigb",
    description: "Email & Marketing Automation",
    bg: "rgb(249, 255, 246)",
    text: "black",
    arrow: "black",
  },
  {
    name: "Jotform",
    image: jotform_banner,
    link: "https://www.jotform.com/ai/agents/?partner=flowvahub-WOAEEuoEob",
    description: "Form Builder Platform",
    bg: "rgb(245, 215, 197)",
    text: "black",
    arrow: "black",
  },
  {
    name: "Monday",
    image: monday_banner,
    link: "https://try.monday.com/b7pem672ddxh",
    description: "Project Management",
    bg: "rgb(184, 184, 250)",
    text: "white",
    arrow: "white",
  },
  {
    name: "Reclaim",
    image: reclaim_banner,
    link: "https://go.reclaim.ai/ur9i6g5eznps",
    description: "Smart Scheduling",
    bg: "#ffffff",
    text: "black",
    arrow: "black",
  },
];

export const logos = [
  {
    id: 1,
    src: light_box_logo,
    alt: "Light Box logo",
  },
  {
    id: 2,
    src: light_box_logo,
    alt: "Light Box logo",
  },
  {
    id: 3,
    src: father_dev,
    alt: "Father Dev logo",
  },
  {
    id: 4,
    src: spherule,
    alt: "Custom logo",
  },
  {
    id: 5,
    src: globank,
    alt: "GloBank logo",
  },
  {
    id: 6,
    src: nietz,
    alt: "Nietz logo",
  },
];

export const howItWorksSteps = [
  {
    id: 1,
    step: "Step 1",
    title: "Subscribe.",
    description: "Choose the plan that fits your feature goals.",
    bg: "#F77A38",
    image: subscribe,
    fullWidth: false,
  },
  {
    id: 2,
    step: "Step 2",
    title: "Launch Features",
    description:
      "Set up actions, schedule them, and reach techies, freelancers, and remote workers where they work.",
    bg: "#BC71FE",
    image: launch,
    fullWidth: false,
  },
  {
    id: 3,
    step: "Step 3",
    title: "Engage Users",
    description: "Offer perks and rewards that drive deeper participation.",
    bg: "#F76593",
    image: speaker,
    fullWidth: false,
  },
  {
    id: 4,
    step: "Step 4",
    title: "Track Results",
    description:
      "Monitor feature performance in real time with actionable analytics.",
    bg: "#008753",
    image: track,
    fullWidth: false,
  },
  {
    id: 5,
    step: "Step 5",
    title: "Optional Premium Support",
    description: "Let the Flowva team run your features for maximum impact.",
    bg: "#159481",
    image: crown,
    fullWidth: true,
  },
];

export const testimonials = [
  {
    id: 1,
    text: "Flowvahub makes finding tools effortless. Instead of wasting hours jumping between sites, I just open Discover Tools everything’s clear, organized, and right there. Feels less like searching, more like unlocking possibilities.",
    name: "Ummaratu M.",
    role: "Freelancer & Virtual Assistant",
    color: "bg-[#60CFFF]", // Blue
    emoji: "☕💜",
  },
  {
    id: 2,
    text: "Flowvahub is my new sidekick. It keeps my apps in line, my subs in check, and still finds a way to pay me in rewards. If it could make coffee, I’d marry it.",
    name: "Adewale O.",
    role: "Freelancer & Digital Creator",
    color: "bg-[#FBFF64]", // Yellow
    emoji: "",
  },
  {
    id: 3,
    text: "Didn’t even realise how much I was drowning in scattered tools until I saw Flowvahub. The idea of getting rewarded just for organizing my stack? That’s the kind of motivation I need.",
    name: "Lois E.",
    role: "Social media manager",
    color: "bg-[#EE7DF9]", // Pink
    emoji: "",
  },
  {
    id: 4,
    text: "The community aspect is what sold me. Seeing what tools other creators are using has saved me so much trial and error. It's properly curated.",
    name: "Sarah J.",
    role: "Product Designer",
    color: "bg-[#A7F3D0]", // Green
    emoji: "🚀",
  },
  {
    id: 5,
    text: "Finally a platform that gives back. I've discovered amazing tools I use daily now, and the rewards are just the cherry on top.",
    name: "Michael R.",
    role: "Indie Hacker",
    color: "bg-[#FED7AA]", // Orange
    emoji: "🔥",
  },
];

export const rewardsData = [
  {
    id: 1,
    title: "$5 Bank Transfer",
    description: "The $5 equivalent will be transferred to your bank account.",
    icon: "💸",
    points: 5000,
    status: "Locked",
  },
  {
    id: 2,
    title: "$5 PayPal International",
    description:
      "Receive a $5 PayPal balance transfer directly to your PayPal account email.",
    icon: "💸",
    points: 5000,
    status: "Locked",
  },
  {
    id: 3,
    title: "$5 Virtual Visa Card",
    description:
      "Use your $5 prepaid card to shop anywhere Visa is accepted online.",
    icon: "🎁",
    points: 5000,
    status: "Locked",
  },
  {
    id: 4,
    title: "$5 Apple Gift Card",
    description:
      "Redeem this $5 Apple Gift Card for apps, games, music, movies, and more on the App Store and iTunes.",
    icon: "🎁",
    points: 5000,
    status: "Locked",
  },
  {
    id: 5,
    title: "$5 Google Play Card",
    description:
      "Use this $5 Google Play Gift Card to purchase apps, games, movies, books, and more on the Google Play Store.",
    icon: "🎁",
    points: 5000,
    status: "Locked",
  },
  {
    id: 6,
    title: "$5 Amazon Gift Card",
    description:
      "Get a $5 digital gift card to spend on your favorite tools or platforms.",
    icon: "🎁",
    points: 5000,
    status: "Locked",
  },
  {
    id: 7,
    title: "$10 Amazon Gift Card",
    description:
      "Get a $10 digital gift card to spend on your favorite tools or platforms.",
    icon: "🎁",
    points: 10000,
    status: "Locked",
  },
  {
    id: 8,
    title: "Free Udemy Course",
    description: "Coming Soon!",
    icon: "📚",
    points: 0,
    status: "Coming Soon",
  },
];


export const navLinks = [
    {
      name: "Hub",
      hasDropdown: true,
      items: [
        {
          title: "DISCOVER",
          icon: <Compass className="w-12 h-12 text-white" />,
          color: "bg-gradient-to-br from-blue-400 to-blue-600",
        },
        {
          title: "LIBRARY",
          icon: <FileText className="w-12 h-12 text-white" />,
          color: "bg-gradient-to-br from-blue-300 to-purple-400",
        },
        {
          title: "REWARD",
          icon: <Coins className="w-12 h-12 text-white" />,
          color: "bg-gradient-to-br from-pink-300 to-pink-500",
        },
      ],
    },
    {
      name: "Company",
      hasDropdown: true,
      items: [
        {
          title: "ABOUT US",
          icon: <Info className="w-12 h-12 text-white" />,
          color: "bg-gradient-to-br from-purple-500 to-indigo-600",
        },
        {
          title: "BLOG",
          icon: <MessageSquare className="w-12 h-12 text-white" />,
          color: "bg-gradient-to-br from-orange-300 to-purple-400",
        },
      ],
    },
    {
      name: "Support",
      hasDropdown: true,
      items: [
        {
          title: "FAQ",
          icon: <HelpCircle className="w-12 h-12 text-white" />,
          color: "bg-gradient-to-br from-pink-200 to-purple-300",
        },
        {
          title: "CONTACT US",
          icon: <Mail className="w-12 h-12 text-white" />,
          color: "bg-gradient-to-br from-purple-300 to-blue-300",
        },
      ],
    },
    {
      name: "Community",
      hasDropdown: true,
      items: [
        {
          title: "AFFILIATE",
          icon: <Handshake className="w-12 h-12 text-white" />,
          color: "bg-gradient-to-br from-teal-300 to-blue-400",
        },
        {
          title: "INFLUENCER",
          icon: <Camera className="w-12 h-12 text-white" />,
          color: "bg-gradient-to-br from-gray-300 to-gray-500",
        },
        {
          title: "REFER TO EARN",
          icon: <Share2 className="w-12 h-12 text-white" />,
          color: "bg-gradient-to-br from-purple-400 to-pink-400",
        },
      ],
    },
  ];