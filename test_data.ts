import { EmailFormat } from "./tests/ApiInterfaces";

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  createdAt: string;
  updatedAt: string | null;
};

export const seedUsers: User[] = [
  {
    "id": 200,
    "firstName": "Evelyn",
    "lastName": "Choi",
    "emailAddress": "e.choi@gmail.com",
    "createdAt": "2026-01-02T00:00:00",
    "updatedAt": null
  },
  {
    "id": 201,
    "firstName": "He",
    "lastName": "Peng",
    "emailAddress": "hp@noemail.com",
    "createdAt": "2026-01-02T00:00:00",
    "updatedAt": null
  },
  {
    "id": 202,
    "firstName": "Kevin",
    "lastName": "Chia",
    "emailAddress": "kchia@singnet.sg",
    "createdAt": "2026-01-02T00:00:00",
    "updatedAt": null
  },
  {
    "id": 203,
    "firstName": "Chelsea",
    "lastName": "Peterson",
    "emailAddress": "cpeters20@gmail.com",
    "createdAt": "2026-01-02T00:00:00",
    "updatedAt": null
  }
];

export const testNonExistentEmails: EmailFormat[] = [
  `ecabangon@prolink2u.com`,
  `alex.miller@innovation-labs.tech`,
  `sarah.connor@future-systems.ai`,
  `mike.jones@digital-workspace.io`,
  `lisa.wang@creative-studio.design`,
  `robert.chen@analytics-hub.data`,
  `emily.davis@learning-academy.edu`,
  `thomas.wilson@secure-network.vpn`,
  `olivia.martin@health-care.med`,
  `daniel.lee@finance-group.bank`
];


export const addNewUniqueUsers = [
  {
    "firstName": "Rodney",
    "lastName": "Cabella",
    "emailAddress": "rc1@noemail.com",
  },
  {
    "firstName": "Martin",
    "lastName": "Suludo",
    "emailAddress": "ms@noemail.com",
  },

  {
    "firstName": "Terry",
    "lastName": "Vizconde",
    "emailAddress": "tv@noemail.com",
  },
]

export const headers = {
  'Content-Type': 'application/json',
}


export const negativeData = [
  {
    "firstName": "",
    "lastName": "Cabella",
    "emailAddress": "rc1@noemail.com",
  },
  {
    "firstName": "Martin",
    "lastName": "",
    "emailAddress": "ms@noemail.com",
  },

  {
    "firstName": "Terry",
    "lastName": "Vizconde",
    "emailAddress": "",
  },

  {
    "firstName": "Solita",
    "lastName": "Kramer",
    "emailAddress": "@gmail.com",
  },


  {
    "firstName": "",
    "lastName": "",
    "emailAddress": "",
  },
]

export const assertCustom400Messages = [
  'Validation failed: The FirstName field is required.',
  'Validation failed: The LastName field is required.',
  'Validation failed: The EmailAddress field is required.',
  'Validation failed: The EmailAddress field is not a valid e-mail address.',
  'Validation failed: The FirstName field is required.; The LastName field is required.; The EmailAddress field is required.'

]


export const negativeMalformed = [
  `{
    "firstName": "",
    "lastName": "Cabella",
    emailAddress": "rc1@noemail.com",
  }`]


export const singleRandom1to50 = () => Math.floor(Math.random() * 50) + 1

const randomNum = singleRandom1to50()
export const updateCombinations = {
  "randomUpdateAll": `{
      "firstName": "firstNameTest${randomNum}",
      "lastName": "lastNameTest${randomNum}",
      "emailAddress": "${randomNum}EmailTest@gmail.com"
       }`,
  "updateMissingEmail": {
    "FirstName": "Miles",
    "LastName": "Morales"
  },
  "updateMissingAllFields": {
  },

  "updateUsingMalformed": `{
      "firstName": "firstNameTest${randomNum}",
      "lastName": "lastNameTest${randomNum}",
      "emailAddress": "${randomNum}EmailTest@gmail.com"
      `,

  "emailRegistredToOthers": `{
      "firstName": "firstNameTest${randomNum}",
      "lastName": "lastNameTest${randomNum}",
      "emailAddress": "e.choi@gmail.com"
    }`,


}

