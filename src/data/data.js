import users_icon from "../assets/users.svg";

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
