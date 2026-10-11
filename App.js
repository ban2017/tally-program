import React, { useEffect, useMemo, useState } from 'react';
import './App.css';

const defaultRecords = {
  company: [
    { id: 1, name: 'TALLY ELITE UAE', type: 'Company', status: 'Active' },
    { id: 2, name: 'Business Bay Branch', type: 'Address', status: 'Active' },
    { id: 3, name: 'Finance Team', type: 'Department', status: 'Active' },
  ],
  master: [
    { id: 1, name: 'Cash', type: 'Asset', balance: 10000 },
    { id: 2, name: 'Bank', type: 'Asset', balance: 25000 },
    { id: 3, name: 'Accounts Receivable', type: 'Asset', balance: 8500 },
  ],
  transaction: [
    { id: 1, reference: 'INV-2026-0001', customer: 'ABC Company', amount: 5000, status: 'Pending' },
    { id: 2, reference: 'PO-2026-0001', customer: 'Supplier XYZ', amount: 3000, status: 'Approved' },
    { id: 3, reference: 'JE-001', customer: 'Internal', amount: 1200, status: 'Completed' },
  ],
  report: [
    { id: 1, name: 'Balance Sheet', value: 'AED 500000', status: 'Updated' },
    { id: 2, name: 'Profit & Loss', value: 'AED 40000', status: 'Updated' },
    { id: 3, name: 'Tax Report', value: 'AED 5000', status: 'Pending' },
  ],
  admin: [
    { id: 1, username: 'manoj', role: 'Admin', status: 'Active' },
    { id: 2, username: 'sara', role: 'Accountant', status: 'Active' },
    { id: 3, username: 'ali', role: 'Manager', status: 'Inactive' },
  ],
};

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeMenu, setActiveMenu] = useState('company');
  const [activePage, setActivePage] = useState('company-profile');
  const [currentUser, setCurrentUser] = useState('manoj');
  const [companyName, setCompanyName] = useState('TALLY ELITE UAE');
  const [theme, setTheme] = useState('Green');
  const [language, setLanguage] = useState('English');
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  const [formData, setFormData] = useState({});
  const [lastSavedAt, setLastSavedAt] = useState('');
  const [records, setRecords] = useState(defaultRecords);

  const toCurrency = (value) => {
    const safeValue = Number(value) || 0;
    return new Intl.NumberFormat('en-AE', {
      style: 'currency',
      currency: 'AED',
      maximumFractionDigits: 2,
    }).format(safeValue);
  };

  const formatDate = (value) => {
    if (!value) return 'N/A';
    try {
      return new Date(value).toLocaleDateString();
    } catch {
      return value;
    }
  };

  const pages = {
    company: {
      title: 'Company',
      icon: '🏢',
      submenus: [
        { id: 'company-profile', label: 'Company Profile' },
        { id: 'company-info', label: 'Company Info' },
        { id: 'addresses', label: 'Addresses' },
        { id: 'contacts', label: 'Contacts' },
        { id: 'dashboard', label: 'Dashboard' },
      ],
      sections: {
        'company-profile': {
          title: 'Company Profile',
          desc: 'Edit company information and settings',
          fields: [
            { label: 'Company Name', type: 'text', defaultValue: 'TALLY ELITE UAE' },
            { label: 'Trade License', type: 'text', defaultValue: 'TRD-2026-0001' },
            { label: 'Registration', type: 'text', defaultValue: '1234567890' },
            { label: 'VAT ID', type: 'text', defaultValue: '123-456-789' },
            { label: 'Currency', type: 'select', options: ['AED', 'USD', 'EUR'], defaultValue: 'AED' },
            { label: 'Financial Year Start', type: 'date', defaultValue: '2026-01-01' },
            { label: 'Business Registration', type: 'text', defaultValue: 'BR-2020-001' },
            { label: 'Tax Certificate', type: 'text', defaultValue: 'TC-2026-0001' },
            { label: 'Industry Type', type: 'text', defaultValue: 'Accounting Services' },
          ],
        },
        'company-info': {
          title: 'Company Information',
          desc: 'General company details',
          fields: [
            { label: 'Legal Name', type: 'text', defaultValue: 'Tally Elite UAE LLC' },
            { label: 'Business Type', type: 'text', defaultValue: 'Accounting Services' },
            { label: 'Year Established', type: 'number', defaultValue: '2020' },
            { label: 'Employees', type: 'number', defaultValue: '50' },
            { label: 'Annual Revenue', type: 'number', defaultValue: '5000000' },
            { label: 'Business License', type: 'text', defaultValue: 'BL-2020-123' },
            { label: 'Registered Capital', type: 'number', defaultValue: '1000000' },
          ],
        },
        addresses: {
          title: 'Company Addresses',
          desc: 'Head office and branch addresses',
          fields: [
            { label: 'Head Office', type: 'text', defaultValue: 'Dubai, UAE' },
            { label: 'Branch Office', type: 'text', defaultValue: 'Abu Dhabi, UAE' },
            { label: 'Postal Code', type: 'text', defaultValue: '00971' },
            { label: 'Street Address', type: 'text', defaultValue: 'Business Bay, Dubai' },
            { label: 'Building Name', type: 'text', defaultValue: 'Business Tower' },
            { label: 'Floor Number', type: 'text', defaultValue: '5' },
          ],
        },
        contacts: {
          title: 'Company Contacts',
          desc: 'Communication channels',
          fields: [
            { label: 'Phone', type: 'tel', defaultValue: '+971 4 XXX XXXX' },
            { label: 'Email', type: 'email', defaultValue: 'info@tallyeliteuae.com' },
            { label: 'Website', type: 'url', defaultValue: 'www.tallyeliteuae.com' },
            { label: 'WhatsApp', type: 'tel', defaultValue: '+971 50 XXX XXXX' },
            { label: 'Support Email', type: 'email', defaultValue: 'support@tallyeliteuae.com' },
            { label: 'Fax', type: 'tel', defaultValue: '+971 4 XXX YYYY' },
          ],
        },
        dashboard: {
          title: 'Dashboard Overview',
          desc: 'Quick financial summary and activity overview',
          fields: [
            { label: 'Monthly Revenue', type: 'number', defaultValue: '120000', readonly: true },
            { label: 'Operating Cost', type: 'number', defaultValue: '80000', readonly: true },
            { label: 'Net Profit', type: 'number', defaultValue: '40000', readonly: true },
            { label: 'Outstanding Invoices', type: 'number', defaultValue: '15000', readonly: true },
            { label: 'Tax Due', type: 'number', defaultValue: '6000', readonly: true },
            { label: 'Cash Balance', type: 'number', defaultValue: '350000', readonly: true },
          ],
        },
      },
    },
    master: {
      title: 'Master',
      icon: '📚',
      submenus: [
        { id: 'accounts', label: 'Chart of Accounts' },
        { id: 'inventory', label: 'Inventory' },
        { id: 'payroll', label: 'Payroll' },
        { id: 'admin-master', label: 'Admin Master' },
      ],
      sections: {
        accounts: {
          title: 'Chart of Accounts',
          desc: 'Create and manage accounting ledgers',
          fields: [
            { label: 'Account Code', type: 'text', defaultValue: '10001' },
            { label: 'Account Name', type: 'text', defaultValue: 'Cash' },
            { label: 'Account Type', type: 'select', options: ['Asset', 'Liability', 'Equity', 'Income', 'Expense'], defaultValue: 'Asset' },
            { label: 'Opening Balance', type: 'number', defaultValue: '10000' },
            { label: 'Account Description', type: 'text', defaultValue: 'Main Cash Account' },
            { label: 'GL Code', type: 'text', defaultValue: 'GL-001' },
            { label: 'Sub Account', type: 'text', defaultValue: 'N/A' },
          ],
        },
        inventory: {
          title: 'Inventory Management',
          desc: 'Manage products and stock items',
          fields: [
            { label: 'Item Code', type: 'text', defaultValue: 'SKU-001' },
            { label: 'Item Name', type: 'text', defaultValue: 'Product Name' },
            { label: 'Unit', type: 'select', options: ['PCS', 'KG', 'LTR'], defaultValue: 'PCS' },
            { label: 'Opening Stock', type: 'number', defaultValue: '100' },
            { label: 'Reorder Level', type: 'number', defaultValue: '20' },
            { label: 'Unit Price', type: 'number', defaultValue: '150' },
            { label: 'Supplier', type: 'text', defaultValue: 'Supplier Name' },
            { label: 'Category', type: 'text', defaultValue: 'Electronics' },
          ],
        },
        payroll: {
          title: 'Payroll Master',
          desc: 'Employee and payslip management',
          fields: [
            { label: 'Employee ID', type: 'text', defaultValue: 'EMP-001' },
            { label: 'Employee Name', type: 'text', defaultValue: 'John Doe' },
            { label: 'Designation', type: 'text', defaultValue: 'Manager' },
            { label: 'Basic Salary', type: 'number', defaultValue: '5000' },
            { label: 'Department', type: 'text', defaultValue: 'Finance' },
            { label: 'Email', type: 'email', defaultValue: 'john@example.com' },
            { label: 'Contact Number', type: 'tel', defaultValue: '+971 50 XXX XXXX' },
          ],
        },
        'admin-master': {
          title: 'Admin Master',
          desc: 'Administrative master data',
          fields: [
            { label: 'Cost Center', type: 'text', defaultValue: 'CC-001' },
            { label: 'Department', type: 'text', defaultValue: 'Finance' },
            { label: 'Location', type: 'text', defaultValue: 'Dubai' },
            { label: 'Manager', type: 'text', defaultValue: 'Admin Name' },
            { label: 'Budget Allocation', type: 'number', defaultValue: '100000' },
          ],
        },
      },
    },
    transaction: {
      title: 'Transaction',
      icon: '💳',
      submenus: [
        { id: 'journal', label: 'Journal Entry' },
        { id: 'invoice', label: 'Invoice' },
        { id: 'purchase', label: 'Purchase Order' },
        { id: 'payment', label: 'Payment' },
      ],
      sections: {
        journal: {
          title: 'Journal Entry',
          desc: 'Book accounting journal entries',
          fields: [
            { label: 'Entry Date', type: 'date', defaultValue: '2026-10-10' },
            { label: 'Reference No', type: 'text', defaultValue: 'JE-001' },
            { label: 'Narration', type: 'text', defaultValue: 'Monthly expenses' },
            { label: 'Debit Account', type: 'select', options: ['Cash', 'Bank', 'Expense'], defaultValue: 'Expense' },
            { label: 'Credit Account', type: 'select', options: ['Cash', 'Bank', 'Income'], defaultValue: 'Cash' },
            { label: 'Amount', type: 'number', defaultValue: '1000' },
            { label: 'Approval Status', type: 'select', options: ['Pending', 'Approved', 'Rejected'], defaultValue: 'Pending' },
          ],
        },
        invoice: {
          title: 'Sales Invoice',
          desc: 'Create and manage sales invoices',
          fields: [
            { label: 'Invoice Number', type: 'text', defaultValue: 'INV-2026-0001' },
            { label: 'Invoice Date', type: 'date', defaultValue: '2026-10-10' },
            { label: 'Customer Name', type: 'text', defaultValue: 'ABC Company' },
            { label: 'Amount', type: 'number', defaultValue: '5000' },
            { label: 'Tax %', type: 'number', defaultValue: '5' },
            { label: 'Due Date', type: 'date', defaultValue: '2026-11-10' },
            { label: 'Payment Status', type: 'select', options: ['Paid', 'Pending', 'Overdue'], defaultValue: 'Pending' },
          ],
        },
        purchase: {
          title: 'Purchase Order',
          desc: 'Create and track purchase orders',
          fields: [
            { label: 'PO Number', type: 'text', defaultValue: 'PO-2026-0001' },
            { label: 'PO Date', type: 'date', defaultValue: '2026-10-10' },
            { label: 'Vendor Name', type: 'text', defaultValue: 'Supplier XYZ' },
            { label: 'Item', type: 'text', defaultValue: 'Product Name' },
            { label: 'Quantity', type: 'number', defaultValue: '50' },
            { label: 'Unit Price', type: 'number', defaultValue: '100' },
            { label: 'Delivery Date', type: 'date', defaultValue: '2026-10-20' },
          ],
        },
        payment: {
          title: 'Payment Entry',
          desc: 'Record payments and receipts',
          fields: [
            { label: 'Payment Date', type: 'date', defaultValue: '2026-10-10' },
            { label: 'Payment Mode', type: 'select', options: ['Cash', 'Cheque', 'Bank Transfer', 'Card'], defaultValue: 'Bank Transfer' },
            { label: 'Amount', type: 'number', defaultValue: '2500' },
            { label: 'From Account', type: 'text', defaultValue: 'Cash' },
            { label: 'To Account', type: 'text', defaultValue: 'Bank' },
            { label: 'Reference', type: 'text', defaultValue: 'Payment Ref #123' },
            { label: 'Payment Status', type: 'select', options: ['Processed', 'Pending', 'Failed'], defaultValue: 'Processed' },
          ],
        },
      },
    },
    report: {
      title: 'Report',
      icon: '📈',
      submenus: [
        { id: 'balance-sheet', label: 'Balance Sheet' },
        { id: 'profit-loss', label: 'Profit & Loss' },
        { id: 'trial-balance', label: 'Trial Balance' },
        { id: 'tax-report', label: 'Tax Report' },
      ],
      sections: {
        'balance-sheet': {
          title: 'Balance Sheet',
          desc: 'Financial position - Assets, Liabilities, Equity',
          fields: [
            { label: 'As on Date', type: 'date', defaultValue: '2026-10-10' },
            { label: 'Total Assets', type: 'number', defaultValue: '500000', readonly: true },
            { label: 'Total Liabilities', type: 'number', defaultValue: '200000', readonly: true },
            { label: 'Total Equity', type: 'number', defaultValue: '300000', readonly: true },
            { label: 'Current Assets', type: 'number', defaultValue: '250000', readonly: true },
            { label: 'Fixed Assets', type: 'number', defaultValue: '250000', readonly: true },
          ],
        },
        'profit-loss': {
          title: 'Profit & Loss Statement',
          desc: 'Revenue and expenses analysis',
          fields: [
            { label: 'Period From', type: 'date', defaultValue: '2026-01-01' },
            { label: 'Period To', type: 'date', defaultValue: '2026-10-10' },
            { label: 'Total Income', type: 'number', defaultValue: '100000', readonly: true },
            { label: 'Total Expenses', type: 'number', defaultValue: '60000', readonly: true },
            { label: 'Net Profit', type: 'number', defaultValue: '40000', readonly: true },
            { label: 'Operating Profit', type: 'number', defaultValue: '35000', readonly: true },
          ],
        },
        'trial-balance': {
          title: 'Trial Balance',
          desc: 'Summary of all ledger balances',
          fields: [
            { label: 'As on Date', type: 'date', defaultValue: '2026-10-10' },
            { label: 'Total Debits', type: 'number', defaultValue: '500000', readonly: true },
            { label: 'Total Credits', type: 'number', defaultValue: '500000', readonly: true },
            { label: 'Status', type: 'text', defaultValue: 'Balanced', readonly: true },
            { label: 'Variance', type: 'number', defaultValue: '0', readonly: true },
          ],
        },
        'tax-report': {
          title: 'Tax & GST Report',
          desc: 'Tax compliance and VAT reporting',
          fields: [
            { label: 'Report Period', type: 'text', defaultValue: 'Q4 2026' },
            { label: 'Taxable Income', type: 'number', defaultValue: '100000' },
            { label: 'Tax Rate %', type: 'number', defaultValue: '5' },
            { label: 'Tax Amount', type: 'number', defaultValue: '5000', readonly: true },
            { label: 'Tax Paid', type: 'number', defaultValue: '4500' },
            { label: 'Tax Due', type: 'number', defaultValue: '500', readonly: true },
          ],
        },
      },
    },
    admin: {
      title: 'Admin',
      icon: '🔐',
      submenus: [
        { id: 'users', label: 'Users' },
        { id: 'roles', label: 'Roles & Permissions' },
        { id: 'settings', label: 'System Settings' },
        { id: 'backups', label: 'Backups' },
      ],
      sections: {
        users: {
          title: 'User Management',
          desc: 'Create and manage system users',
          fields: [
            { label: 'Username', type: 'text', defaultValue: 'manoj' },
            { label: 'Email', type: 'email', defaultValue: 'manoj@example.com' },
            { label: 'Full Name', type: 'text', defaultValue: 'Manoj Kumar' },
            { label: 'Role', type: 'select', options: ['Admin', 'Manager', 'Accountant', 'Viewer'], defaultValue: 'Admin' },
            { label: 'Status', type: 'select', options: ['Active', 'Inactive'], defaultValue: 'Active' },
            { label: 'Department', type: 'text', defaultValue: 'Finance' },
            { label: 'Mobile Number', type: 'tel', defaultValue: '+971 50 XXX XXXX' },
          ],
        },
        roles: {
          title: 'Roles & Permissions',
          desc: 'Define user roles and access rights',
          fields: [
            { label: 'Role Name', type: 'text', defaultValue: 'Admin' },
            { label: 'Description', type: 'text', defaultValue: 'Full system access' },
            { label: 'Permissions', type: 'text', defaultValue: 'All' },
            { label: 'Access Level', type: 'select', options: ['Super Admin', 'Admin', 'User', 'Guest'], defaultValue: 'Super Admin' },
          ],
        },
        settings: {
          title: 'System Settings',
          desc: 'App configuration and preferences',
          fields: [
            { label: 'Theme', type: 'select', options: ['Light', 'Dark', 'Green'], defaultValue: 'Green' },
            { label: 'Date Format', type: 'select', options: ['DD/MM/YYYY', 'MM/DD/YYYY'], defaultValue: 'DD/MM/YYYY' },
            { label: 'Language', type: 'select', options: ['English', 'Arabic'], defaultValue: 'English' },
            { label: 'Decimal Places', type: 'number', defaultValue: '2' },
            { label: 'Currency Symbol', type: 'text', defaultValue: 'AED' },
            { label: 'Timezone', type: 'select', options: ['UTC+4', 'UTC+3', 'UTC+5'], defaultValue: 'UTC+4' },
          ],
        },
        backups: {
          title: 'Data Backups',
          desc: 'Backup and restore database',
          fields: [
            { label: 'Last Backup', type: 'text', defaultValue: lastSavedAt ? formatDate(lastSavedAt) : 'Not saved yet', readonly: true },
            { label: 'Backup Location', type: 'text', defaultValue: 'local-storage', readonly: true },
            { label: 'Backup Frequency', type: 'select', options: ['Daily', 'Weekly', 'Monthly'], defaultValue: 'Daily' },
            { label: 'Next Backup', type: 'text', defaultValue: '2026-10-11 02:00', readonly: true },
            { label: 'Backup Size (MB)', type: 'number', defaultValue: '1250', readonly: true },
          ],
        },
      },
    },
  };

  const menuKeys = Object.keys(pages);
  const currentMenuConfig = pages[activeMenu] || pages.company;
  const currentSection = currentMenuConfig.sections[activePage] || currentMenuConfig.sections[Object.keys(currentMenuConfig.sections)[0]];

  const summaryMetrics = useMemo(() => {
    const revenue = (records.transaction || []).reduce((sum, item) => sum + Number(item.amount || 0), 0);
    const expenses = revenue * 0.55;
    const profit = revenue - expenses;
    return {
      revenue,
      expenses,
      profit,
      totalRecords: (records.transaction || []).length + (records.master || []).length + (records.admin || []).length,
    };
  }, [records]);

  const dashboardCards = [
    { title: 'Monthly Revenue', value: toCurrency(summaryMetrics.revenue || 120000), icon: '💰', trend: '+12.4%' },
    { title: 'Expenses', value: toCurrency(summaryMetrics.expenses || 80000), icon: '📉', trend: '-4.1%' },
    { title: 'Net Profit', value: toCurrency(summaryMetrics.profit || 40000), icon: '📈', trend: '+8.7%' },
    { title: 'Records', value: String(summaryMetrics.totalRecords || 0), icon: '🧾', trend: 'Live' },
  ];

  const activityList = [
    `Revenue tracked: ${toCurrency(summaryMetrics.revenue)}`,
    `Current transaction count: ${records.transaction.length}`,
    `Master records count: ${records.master.length}`,
    `User access level: ${currentUser}`,
  ];

  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('appSettings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        setCompanyName(settings.companyName || 'TALLY ELITE UAE');
        setTheme(settings.theme || 'Green');
        setLanguage(settings.language || 'English');
        setDateFormat(settings.dateFormat || 'DD/MM/YYYY');
        setCurrentUser(settings.currentUser || 'manoj');
      }

      const savedForm = localStorage.getItem('formData');
      if (savedForm) setFormData(JSON.parse(savedForm));

      const savedRecords = localStorage.getItem('appRecords');
      if (savedRecords) setRecords(JSON.parse(savedRecords));

      const savedStamp = localStorage.getItem('lastSavedAt');
      if (savedStamp) setLastSavedAt(savedStamp);
    } catch (error) {
      console.error('Could not load saved app data', error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('appSettings', JSON.stringify({ companyName, theme, language, dateFormat, currentUser }));
  }, [companyName, theme, language, dateFormat, currentUser]);

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('appRecords', JSON.stringify(records));
  }, [records]);

  const handleFieldChange = (fieldLabel, value) => {
    setFormData((prev) => ({ ...prev, [fieldLabel]: value }));

    if (fieldLabel === 'Company Name') setCompanyName(value);
    if (fieldLabel === 'Username') setCurrentUser(value);
    if (fieldLabel === 'Theme') setTheme(value);
    if (fieldLabel === 'Language') setLanguage(value);
    if (fieldLabel === 'Date Format') setDateFormat(value);
  };

  const saveNow = () => {
    const stamp = new Date().toISOString();
    setLastSavedAt(stamp);
    localStorage.setItem('lastSavedAt', stamp);
  };

  const exportData = () => {
    const payload = {
      exportedAt: new Date().toISOString(),
      settings: { companyName, theme, language, dateFormat, currentUser },
      formData,
      records,
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'tally-elite-backup.json';
    link.click();
    URL.revokeObjectURL(url);
    alert('✅ Backup exported successfully.');
  };

  const importData = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (imported.settings) {
          setCompanyName(imported.settings.companyName || companyName);
          setTheme(imported.settings.theme || theme);
          setLanguage(imported.settings.language || language);
          setDateFormat(imported.settings.dateFormat || dateFormat);
          setCurrentUser(imported.settings.currentUser || currentUser);
        }
        if (imported.formData) setFormData(imported.formData);
        if (imported.records) setRecords(imported.records);

        const stamp = new Date().toISOString();
        setLastSavedAt(stamp);
        localStorage.setItem('lastSavedAt', stamp);
        alert('✅ Backup imported successfully.');
      } catch {
        alert('❌ Invalid backup file. Please select a valid Tally Elite backup.');
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  const resetAll = () => {
    if (!window.confirm('Reset all saved app data and settings?')) return;

    localStorage.removeItem('appSettings');
    localStorage.removeItem('formData');
    localStorage.removeItem('appRecords');
    localStorage.removeItem('lastSavedAt');

    setCompanyName('TALLY ELITE UAE');
    setTheme('Green');
    setLanguage('English');
    setDateFormat('DD/MM/YYYY');
    setCurrentUser('manoj');
    setFormData({});
    setRecords(defaultRecords);
    setLastSavedAt('');
    setLoggedIn(false);
    setActiveMenu('company');
    setActivePage('company-profile');
  };

  const addRecord = () => {
    const item = (() => {
      if (activeMenu === 'company') return { id: Date.now(), name: 'New Company Unit', type: 'Branch', status: 'Active' };
      if (activeMenu === 'master') return { id: Date.now(), name: 'New Master Item', type: 'Asset', balance: 0 };
      if (activeMenu === 'transaction') return { id: Date.now(), reference: `NEW-${Date.now()}`, customer: 'New Client', amount: 0, status: 'Pending' };
      if (activeMenu === 'report') return { id: Date.now(), name: 'New Summary', value: 'AED 0', status: 'Draft' };
      return { id: Date.now(), username: 'newuser', role: 'Viewer', status: 'Active' };
    })();

    setRecords((prev) => ({
      ...prev,
      [activeMenu]: [item, ...(prev[activeMenu] || [])],
    }));
  };

  const deleteRecord = (recordId) => {
    setRecords((prev) => ({
      ...prev,
      [activeMenu]: (prev[activeMenu] || []).filter((item) => item.id !== recordId),
    }));
  };

  const currentRecords = records[activeMenu] || [];
  const tableHeaders = currentRecords.length ? Object.keys(currentRecords[0]).filter((key) => key !== 'id') : [];

  if (!loggedIn) {
    return (
      <div className="login-screen">
        <div className="login-watermark">TALLY ELITE</div>
        <div className="login-container">
          <div className="login-box">
            <div className="login-header">
              <h1>LOGIN</h1>
              <p className="login-subtitle">TALLY ELITE UAE</p>
            </div>

            <form
              className="login-form"
              onSubmit={(e) => {
                e.preventDefault();
                const username = e.target.elements[0].value.trim();
                const password = e.target.elements[1].value.trim();

                if (!username || !password) {
                  alert('Please enter username and password');
                  return;
                }

                setCurrentUser(username);
                setLoggedIn(true);
              }}
            >
              <div className="form-field">
                <label>Username</label>
                <input type="text" placeholder="Enter username" defaultValue="manoj" required />
              </div>

              <div className="form-field">
                <label>Password</label>
                <input type="password" placeholder="Enter password" defaultValue="123456" required />
              </div>

              <button type="submit" className="login-button">LOGIN</button>

              <div className="login-footer">
                <small>© 2026 Tally Elite UAE - Accounting & ERP System</small>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-container">
      <header className="navbar">
        <nav className="nav-menu">
          {menuKeys.map((key) => (
            <button
              key={key}
              className={`nav-item ${activeMenu === key ? 'active' : ''}`}
              onClick={() => {
                setActiveMenu(key);
                const firstSection = Object.keys(pages[key].sections)[0];
                setActivePage(firstSection);
              }}
            >
              <span className="nav-label">{pages[key].title}</span>
              <span className="nav-arrow">▼</span>
            </button>
          ))}
          <button
            className="nav-item exit-btn"
            onClick={() => {
              if (window.confirm('Are you sure you want to exit?')) {
                setLoggedIn(false);
                setActiveMenu('company');
                setActivePage('company-profile');
              }
            }}
          >
            <span className="nav-label">Exit</span>
          </button>
        </nav>
      </header>

      <div className="dropdown-area">
        <div className="dropdown-content">
          {currentMenuConfig.submenus.map((submenu) => (
            <button
              key={submenu.id}
              className={`dropdown-item ${activePage === submenu.id ? 'active' : ''}`}
              onClick={() => setActivePage(submenu.id)}
            >
              {submenu.label}
            </button>
          ))}
        </div>
      </div>

      <main className="main-content">
        <div className="page-container">
          <div className="page-header">
            <div className="header-left">
              <span className="page-icon">{currentMenuConfig.icon}</span>
              <div>
                <h1 className="page-title">{currentSection.title}</h1>
                <p className="page-breadcrumb">{currentMenuConfig.title} → {currentSection.title}</p>
              </div>
            </div>
            <div className="company-badge">
              <span className="badge-icon">🏢</span>
              <span>{companyName}</span>
            </div>
          </div>

          <div className="dashboard-strip">
            {dashboardCards.map((card) => (
              <div key={card.title} className="dashboard-card">
                <div className="dashboard-card__top">
                  <span className="dashboard-card__icon">{card.icon}</span>
                  <span className="dashboard-card__trend">{card.trend}</span>
                </div>
                <p className="dashboard-card__label">{card.title}</p>
                <h3>{card.value}</h3>
              </div>
            ))}
          </div>

          <div className="page-body">
            <div className="dashboard-panel">
              <div className="summary-box">
                <h3>Quick Actions</h3>
                <div className="action-buttons">
                  <button className="action-btn primary" onClick={exportData}>Export Data</button>
                  <label className="action-btn secondary upload-label">
                    Import Data
                    <input type="file" accept="application/json" onChange={importData} />
                  </label>
                  <button className="action-btn danger" onClick={resetAll}>Reset</button>
                </div>
              </div>

              <div className="summary-box">
                <h3>Recent Activity</h3>
                <ul className="activity-list">
                  {activityList.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>

            <section className="form-section">
              <h2 className="section-title">{currentSection.title}</h2>
              <p className="section-desc">{currentSection.desc}</p>

              <form
                className="data-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  saveNow();
                  alert('✅ Data saved successfully!');
                }}
              >
                <div className="form-grid">
                  {currentSection.fields.map((field, idx) => {
                    const fieldKey = `${activeMenu}-${activePage}-${field.label}`;
                    const value = formData[fieldKey] ?? field.defaultValue;

                    return (
                      <div key={idx} className="form-group">
                        <label>{field.label}</label>
                        {field.type === 'select' ? (
                          <select
                            className="form-control"
                            value={value}
                            onChange={(e) => handleFieldChange(fieldKey, e.target.value)}
                            disabled={field.readonly}
                          >
                            {field.options.map((opt) => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={field.type}
                            className="form-control"
                            value={value}
                            onChange={(e) => handleFieldChange(fieldKey, e.target.value)}
                            disabled={field.readonly}
                            placeholder={field.label}
                          />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary">💾 Save Changes</button>
                  <button type="button" className="btn btn-secondary" onClick={() => alert('🔄 Form values remain in the current session.')}>🔄 Reset</button>
                </div>
              </form>
            </section>

            <section className="records-panel">
              <div className="records-header">
                <h3>📋 {currentMenuConfig.title} Records</h3>
                <button type="button" className="add-record-btn" onClick={addRecord}>+ Add Record</button>
              </div>

              {currentRecords.length > 0 ? (
                <div className="records-table-wrap">
                  <table className="records-table">
                    <thead>
                      <tr>
                        {tableHeaders.map((header) => (
                          <th key={header}>{header}</th>
                        ))}
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentRecords.map((item) => (
                        <tr key={item.id}>
                          {tableHeaders.map((header) => (
                            <td key={`${item.id}-${header}`}>{String(item[header] ?? '-')}</td>
                          ))}
                          <td>
                            <button type="button" className="delete-row-btn" onClick={() => deleteRecord(item.id)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="empty-records">No records available for this section.</p>
              )}
            </section>
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <div className="footer-left">
          <span>User: <strong>{currentUser}</strong></span>
          <span>Company: <strong>{companyName}</strong></span>
        </div>
        <div className="footer-right">
          <span>Date: <strong>{new Date().toLocaleDateString()}</strong></span>
          <span>Theme: <strong>{theme}</strong></span>
        </div>
      </footer>
    </div>
  );
};

export default App;
