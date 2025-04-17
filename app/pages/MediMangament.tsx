'use client';

import React, { useState } from 'react';
import MedicineTable from '@/components/MediList';
import DrugModal from '@/components/MediModal';
import Nav from '@/components/Nav';

interface Medicine {
  id: number;
  name: string;
  type: string;
  count: number;
  body_system: string | null;
}

export default function DrugManagementPage() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editData, setEditData] = useState<Medicine | null>(null);

  return (
    <>
      <Nav />
      <MedicineTable
        onAdd={() => setIsAddOpen(true)}
        onEdit={(data) => setEditData(data)}
      />
      {isAddOpen && <DrugModal onClose={() => setIsAddOpen(false)} />}
      {editData && (
        <DrugModal
          initialData={editData}
          onClose={() => setEditData(null)}
        />
      )}
    </>
  );
}
