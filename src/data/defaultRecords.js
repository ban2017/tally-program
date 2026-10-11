export const defaultRecords = {
  company: [
    { id: 1, name: 'TALLY ELITE UAE', type: 'Company', status: 'Active' },
    { id: 2, name: 'Business Bay Branch', type: 'Branch', status: 'Active' },
    { id: 3, name: 'Dubai Marina Division', type: 'Division', status: 'Active' },
  ],
  master: [
    { id: 1, name: 'Cash', type: 'Asset', balance: '10,000 AED' },
    { id: 2, name: 'Bank Account', type: 'Asset', balance: '25,000 AED' },
    { id: 3, name: 'Accounts Payable', type: 'Liability', balance: '5,000 AED' },
  ],
  transaction: [
    { id: 1, reference: 'INV-2026-0001', customer: 'ABC Company', amount: '5,000 AED', status: 'Pending' },
    { id: 2, reference: 'PO-2026-0001', customer: 'Supplier XYZ', amount: '3,000 AED', status: 'Approved' },
    { id: 3, reference: 'JE-2026-0001', customer: 'General Entry', amount: '2,500 AED', status: 'Posted' },
  ],
  report: [
    { id: 1, name: 'Balance Sheet', value: '500,000 AED', status: 'Updated' },
    { id: 2, name: 'Income Statement', value: '120,000 AED', status: 'Current' },
  ],
  admin: [
    { id: 1, username: 'manoj', email: 'manoj@tally.ae', role: 'Admin', status: 'Active' },
    { id: 2, username: 'ahmed', email: 'ahmed@tally.ae', role: 'Manager', status: 'Active' },
  ],
};
