export interface UserFormData {
  fullName: string;
  zipCode: string;
  age: string;
  gender: "male" | "female" | "";
  profession: string;
  income: string;
  homeOwnershipStatus: HomeOwnershipStatus;
  passionateIssues: string[];
  message: string;
}

export type HomeOwnershipStatus =
  | "currentHomeowner"
  | "aspiringHomeowner"
  | "renter"
  | "previouslyOwned"
  | "livingWithOthers"
  | "houseless"
  | "";

export type PassionateIssue =
  | "zoningReform"
  | "affordableHousingFunding"
  | "investorRestrictions"
  | "taxIncentives"
  | "tenantProtections"
  | "foreignInvestment"
  | "nimbyism"
  | "";

export const HOME_OWNERSHIP_OPTIONS = {
  currentHomeowner: {
    label: "Current Homeowner",
    description: "I currently own my home.",
  },
  aspiringHomeowner: {
    label: "Aspiring Homeowner",
    description:
      "I want to own a home but face barriers, such as high prices or mortgage challenges.",
  },
  renter: {
    label: "Renter",
    description:
      "I rent my residence and am impacted by rising rents, tenant protections, or availability of affordable rentals.",
  },
  previouslyOwned: {
    label: "Previously Owned a Home",
    description:
      "I used to own a home but am no longer a homeowner due to economic or personal reasons.",
  },
  livingWithOthers: {
    label: "Living with Family or Friends",
    description:
      "I live with family or friends due to financial constraints or a lack of affordable housing options.",
  },
  houseless: {
    label: "Houseless or Housing Insecure",
    description:
      "I am currently without a stable home or face frequent moves and instability in housing.",
  },
} as const;

export const PASSIONATE_ISSUES = {
  zoningReform: {
    label: "Reforming Zoning and Land Use Laws",
    description:
      "Advocate for zoning changes to allow more housing options, such as multi-family units, in high-demand areas.",
  },
  affordableHousingFunding: {
    label: "Increasing Affordable Housing Funding",
    description:
      "Support increased federal and state funding for affordable housing projects and initiatives to make housing more accessible.",
  },
  investorRestrictions: {
    label: "Restricting Large Investor Purchases",
    description:
      "Push for regulations to limit bulk home purchases by large corporations and institutional investors, which drive up prices.",
  },
  taxIncentives: {
    label: "Encouraging Tax Incentives for Affordable Development",
    description:
      "Promote tax incentives for private developers who commit to building affordable housing, making development more feasible.",
  },
  tenantProtections: {
    label: "Implementing Tenant Protections and Rent Control",
    description:
      "Call for policies to protect renters, including rent control and protections against sudden rent increases and displacement.",
  },
  foreignInvestment: {
    label: "Restricting Foreign Investment in Housing",
    description:
      "Advocate for policies to limit foreign investment in residential real estate, helping to maintain affordability for local residents.",
  },
  nimbyism: {
    label: "Combating NIMBYism in Housing Policies",
    description:
      "Support policies that reduce community resistance to affordable housing projects, especially in areas with strong job opportunities.",
  },
} as const;
