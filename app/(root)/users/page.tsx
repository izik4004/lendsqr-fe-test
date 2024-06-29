"use client"

import { Person } from '@/Types';
import Table from '@/components/table/Table'
import React, { useEffect, useState } from 'react'
import fakeData from '../../../MOCK_DATA.json';
import Stats from '@/components/stat/Stats';
import userIcon from '../../../public/avatar.png';
import StatCard from '@/components/stat/Stats';
import { User } from "@/Types/index"
import { Column } from 'react-table';

const page = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const apiKey = 'rueutd9zkm0d2jh1rchxkb26h1zf72v6do2mi23c'; // Replace with your actual API key or token
      const response = await fetch('https://api.json-generator.com/templates/gQJiRwCJ5mJk/data', {
        headers: {
          Authorization: `Bearer ${apiKey}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // const handleFilter = (filters: Partial<User>) => {
  //   const filtered = users.filter(item => {
  //     return Object.keys(filters).every(key => {
  //       const filterValue = filters[key as keyof User];
  //       if (!filterValue) return true;
  //       if (key === 'date') {
  //         return item[key as keyof Person] === filterValue;
  //       }
  //       return (item[key as keyof Person] as string).toLowerCase().includes((filterValue as string).toLowerCase());
  //     });
  //   });
  //   setUsers(filtered);
  // };

  const data = React.useMemo(() => fakeData as Person[], []);
  const userCount = 100;

  const columns: Column<User>[] = React.useMemo(() => [
    {
      Header: 'Organization',
      accessor: (row: User) => row.profile.organization,
      id: 'organization',
    },
    {
      Header: 'Name',
      accessor: (row: User) => row.profile.name,
      id: 'name',
    },
    {
      Header: 'Email',
      accessor: (row: User) => row.profile.email,
      id: 'email',
    },
    {
      Header: 'Phone Number',
      accessor: (row: User) => row.profile.phone,
      id: 'phone',
    },
    { Header: 'Date Joined', accessor: 'createdAt' },
    {
      Header: 'Status',
      accessor: (row: User) => row.profile.status,
      id: 'status',
    },
  ],
    []
  )



  return (
    <div>
      <div className="stat-cards">
        <StatCard title="Users" value="1,234" icon="👤" />
        <StatCard title="Revenue" value="$12,345" icon="💰" />
        <StatCard title="Orders" value="567" icon="📦" />
        <StatCard title="Orders" value="567" icon="📦" />
      </div>
      <Table columns={columns} data={users} />
    </div>
  )
}

export default page