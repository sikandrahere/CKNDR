export const footerItems = [
    {
      name: "Products",
      active: true,
      subItems: [
        { name: "Casual sneakers", slug: "/explore" },
        { name: "Designer sneakers", slug: "/explore" },
        { name: "Athletic sneakers", slug: "/explore" },
        { name: "Canvas sneakers", slug: "/explore" },
        { name: "High top sneakers", slug: "/explore" },
      ],
    },
    {
      name: "Support",
      active: true,
      subItems: [
        { name: "Payment related", slug: "/" },
        { name: "Order related", slug: "/" },
        { name: "Customer support", slug: "/" },
        { name: "Message us", slug: "/" },
        { name: "Write us", slug: "/" },
      ],
    },
    {
      name: "Info",
      active: true,
      subItems: [
        { name: "About us", slug: "/" },
        { name: "Careers", slug: "/" },
        { name: "Press", slug: "/" },
        { name: "Affiliates", slug: "/" },
        { name: "Sustainability", slug: "/" },
      ],
    },
    {
      name: "Contact Us",
      active: true,
      contact: {
        email: "ckndr@shoe.com",
        phone: "6378148243",
      },
    },
  ];

 export const menuItems = [
  {
    name: 'MEN',
    path: '/products/category?category=men',
  },
  {
    name: 'WOMEN',
    path: '/products/category?category=women',
  },
  {
    name: 'KIDS',
    path: '/products/category?category=kids',
  },
  {
    name: 'EXPLORE',
    subItems: [
      { name: 'Casual', path: '/products/explore?explore=casual' },
      { name: 'Designer', path: '/products/explore?explore=designer' },
      { name: 'Athletic', path: '/products/explore?explore=athletic' },
      { name: 'Canvas', path: '/products/explore?explore=canvas' },
      { name: 'High Top', path: '/products/explore?explore=high-top' },
    ],
  },
];

export const size=[
  
  "6",
  "7",
  "8",
  "9",
]
