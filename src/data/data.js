import users_icon from "../assets/users.svg";
import brevo_banner from "../assets/brevo_banner.svg"
import jotform_banner from "../assets/jotform_banner.svg"
import monday_banner from "../assets/monday_banner.svg"
import reclaim_banner from "../assets/reclaim_banner.svg"
import nietz from "../assets/nietz.svg"
import light_box_logo from "../assets/light_box_logo.svg"
import spherule from "../assets/spherule.svg"
import globank from "../assets/gblobank.svg"
import father_dev from "../assets/father_dev.svg"



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
