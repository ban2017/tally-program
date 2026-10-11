import React, { useMemo, useState } from 'react';
import Header from './components/Header';
import Navbar from './components/Navbar';
import DashboardCards from './components/DashboardCards';
import FormPanel from './components/FormPanel';
import RecordsTable from './components/RecordsTable';
import Footer from './components/Footer';
import { NAV_ITEMS } from './data/pages';
import { defaultRecords } from './data/defaultRecords';
import { formatCurrency } from './utils/formatters';

export default function App() {
  const [activeMenu, setActiveMenu] = useState('company');
  const [activePage, setActivePage] = useState('company-profile');
  const [companyName, setCompanyName] = useState('TALLY ELITE UAE');
  const [formData, setFormData] = useState({});
  const [records, setRecords] = useState(defaultRecords);

  const currentMenu = NAV_ITEMS.find((item) => item.key === activeMenu) || NAV_ITEMS[0];
  const currentPage = currentMenu.pages[activePage] || Object.values(currentMenu.pages)[0];

  const metrics = useMemo(() => {
    const revenue = (records.transaction || []).reduce((sum, item) => sum + Number(item.amount || 0), 0);
    const expenses = revenue * 0.55;
    const profit = revenue - expenses;

    return [
      { label: 'Monthly Revenue', value: formatCurrency(revenue || 120000), trend: '+12.4%' },
      { label: 'Expenses', value: formatCurrency(expenses || 80000), trend: '-4.1%' },
      { label: 'Net Profit', value: formatCurrency(profit || 40000), trend: '+8.7%' },
      { label: 'Records', value: String((records.company || []).length + (records.master || []).length + (records.transaction || []).length), trend: 'Live' },
    ];
  }, [records]);

  const handleFieldChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (key === 'company-name') setCompanyName(value);
  };

  const addRecord = () => {
    setRecords((prev) => ({
      ...prev,
      [activeMenu]: [{ id: Date.now(), name: 'New Record', status: 'Active' }, ...(prev[activeMenu] || [])],
    }));
  };

  const deleteRecord = (id) => {
    setRecords((prev) => ({
      ...prev,
      [activeMenu]: (prev[activeMenu] || []).filter((row) => row.id !== id),
    }));
  };

  return (
    <div className="app-shell">
      <Header companyName={companyName} />
      <Navbar
        items={NAV_ITEMS}
        activeMenu={activeMenu}
        activePage={activePage}
        onMenuChange={(menuKey) => {
          setActiveMenu(menuKey);
          const firstPage = Object.keys(NAV_ITEMS.find((item) => item.key === menuKey)?.pages || {})[0];
          if (firstPage) setActivePage(firstPage);
        }}
        onPageChange={setActivePage}
      />

      <main className="main-layout">
        <div className="page-container">
          <DashboardCards metrics={metrics} />

          <FormPanel
            title={currentPage.title}
            description={currentPage.description}
            fields={currentPage.fields}
            formData={formData}
            onFieldChange={handleFieldChange}
          />

          <RecordsTable
            title={`${currentMenu.label} Records`}
            rows={records[activeMenu] || []}
            onAdd={addRecord}
            onDelete={deleteRecord}
          />
        </div>
      </main>

      <Footer userName="manoj" companyName={companyName} />
    </div>
  );
}