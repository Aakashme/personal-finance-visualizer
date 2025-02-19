import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import BudgetForm from '../../components/BudgetForm';

export default function EditBudget() {
  const router = useRouter();
  const { id } = router.query;
  const [budget, setBudget] = useState(null);

  useEffect(() => {
    const fetchBudget = async () => {
      const res = await fetch(`/api/budgets/${id}`);
      const data = await res.json();
      setBudget(data);
    };

    if (id) {
      fetchBudget();
    }
  }, [id]);

  if (!budget) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Budget</h1>
      <BudgetForm budget={budget} refreshData={() => router.push('/')} />
    </div>
  );
}