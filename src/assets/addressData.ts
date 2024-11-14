// addressData.ts
export type Address = {
    id: number;
    name: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    isDefault: boolean; // Flag to indicate the default address
  };
  
  export const addresses: Address[] = [
    {
      id: 1,
      name: "Elegant Pvt Ltd",
      street: "Address: 302, Lotus corporate park, western express highway",
      city: "Mumbai",
      state: "Maharashtra",
      zip: "400063",
      phone: "+912267891234",
      isDefault: true, // Set this address as default
    },
    {
      id: 2,
      name: "Jane Smith",
      street: "456 Side Ave",
      city: "Another City",
      state: "State",
      zip: "67890",
      phone: "+1 987 654 321",
      isDefault: false, // Not default
    },
  ];
  