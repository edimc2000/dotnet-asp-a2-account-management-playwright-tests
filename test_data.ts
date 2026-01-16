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