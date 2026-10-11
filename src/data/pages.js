export const NAV_ITEMS = [
  {
    key: 'company',
    label: 'Company',
    icon: '🏢',
    pages: {
      'company-profile': {
        title: 'Company Profile',
        description: 'Manage company details and general business settings.',
        fields: [
          { key: 'company-name', label: 'Company Name', type: 'text', defaultValue: 'TALLY ELITE UAE' },
          { key: 'trade-license', label: 'Trade License', type: 'text', defaultValue: 'TRD-2026-0001' },
          { key: 'currency', label: 'Currency', type: 'select', options: ['AED', 'USD', 'EUR'], defaultValue: 'AED' },
          { key: 'year-start', label: 'Financial Year Start', type: 'date', defaultValue: '2026-01-01' },
        ],
      },
      'company-info': {
        title: 'Company Info',
        description: 'General company business profile and overview.',
        fields: [
          { key: 'legal-name', label: 'Legal Name', type: 'text', defaultValue: 'Tally Elite UAE LLC' },
          { key: 'industry', label: 'Industry Type', type: 'text', defaultValue: 'Accounting Services' },
          { key: 'employees', label: 'Employees', type: 'number', defaultValue: '50' },
        ],
      },
    },
  },
  {
    key: 'master',
    label: 'Master',
    icon: '📚',
    pages: {
      accounts: {
        title: 'Chart of Accounts',
        description: 'Manage master records and account structure.',
        fields: [
          { key: 'account-name', label: 'Account Name', type: 'text', defaultValue: 'Cash' },
          { key: 'account-type', label: 'Account Type', type: 'select', options: ['Asset', 'Liability', 'Equity', 'Income', 'Expense'], defaultValue: 'Asset' },
          { key: 'opening-balance', label: 'Opening Balance', type: 'number', defaultValue: '10000' },
        ],
      },
      customers: {
        title: 'Customers',
        description: 'Manage customer master data.',
        fields: [
          { key: 'customer-name', label: 'Customer Name', type: 'text', defaultValue: 'ABC Trading' },
          { key: 'email', label: 'Email', type: 'email', defaultValue: 'abc@trading.ae' },
          { key: 'phone', label: 'Phone', type: 'tel', defaultValue: '+971-50-1234567' },
        ],
      },
    },
  },
  {
    key: 'transaction',
    label: 'Transaction',
    icon: '💳',
    pages: {
      journal: {
        title: 'Journal Entry',
        description: 'Record debits and credits for transactions.',
        fields: [
          { key: 'entry-date', label: 'Entry Date', type: 'date', defaultValue: '2026-10-10' },
          { key: 'reference-no', label: 'Reference No', type: 'text', defaultValue: 'JE-001' },
          { key: 'amount', label: 'Amount', type: 'number', defaultValue: '1000' },
          { key: 'description', label: 'Description', type: 'text', defaultValue: 'Journal Entry' },
        ],
      },
      invoice: {
        title: 'Sales Invoice',
        description: 'Create and manage invoices.',
        fields: [
          { key: 'invoice-no', label: 'Invoice No', type: 'text', defaultValue: 'INV-2026-0001' },
          { key: 'customer', label: 'Customer', type: 'text', defaultValue: 'ABC Company' },
          { key: 'amount', label: 'Amount', type: 'number', defaultValue: '5000' },
        ],
      },
    },
  },
  {
    key: 'report',
    label: 'Report',
    icon: '📈',
    pages: {
      balance: {
        title: 'Balance Sheet',
        description: 'Monitor the company financial position.',
        fields: [
          { key: 'as-of-date', label: 'As on Date', type: 'date', defaultValue: '2026-10-10' },
          { key: 'total-assets', label: 'Total Assets', type: 'number', defaultValue: '500000' },
          { key: 'net-profit', label: 'Net Profit', type: 'number', defaultValue: '40000' },
        ],
      },
      income: {
        title: 'Income Statement',
        description: 'Review revenue and expenses.',
        fields: [
          { key: 'period', label: 'Period', type: 'text', defaultValue: 'January 2026' },
          { key: 'revenue', label: 'Total Revenue', type: 'number', defaultValue: '120000' },
          { key: 'expenses', label: 'Total Expenses', type: 'number', defaultValue: '80000' },
        ],
      },
    },
  },
  {
    key: 'admin',
    label: 'Admin',
    icon: '🔐',
    pages: {
      users: {
        title: 'User Management',
        description: 'Control user access and roles.',
        fields: [
          { key: 'username', label: 'Username', type: 'text', defaultValue: 'manoj' },
          { key: 'email', label: 'Email', type: 'email', defaultValue: 'manoj@tally.ae' },
          { key: 'role', label: 'Role', type: 'select', options: ['Admin', 'Manager', 'Accountant', 'Viewer'], defaultValue: 'Admin' },
          { key: 'status', label: 'Status', type: 'select', options: ['Active', 'Inactive'], defaultValue: 'Active' },
        ],
      },
      settings: {
        title: 'System Settings',
        description: 'Configure application settings.',
        fields: [
          { key: 'theme', label: 'Theme', type: 'select', options: ['Light', 'Dark'], defaultValue: 'Light' },
          { key: 'language', label: 'Language', type: 'select', options: ['English', 'Arabic'], defaultValue: 'English' },
          { key: 'backup-enabled', label: 'Auto Backup', type: 'select', options: ['Yes', 'No'], defaultValue: 'Yes' },
        ],
      },
    },
  },
];
