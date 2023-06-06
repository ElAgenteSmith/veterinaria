import React from 'react'
import Table from 'components/table/Table'

const Users = () => {
  //replace data from redux store call
  const users = [
    {
      id: 1,
      name: 'John Doe',
      identification: '123456789',
      dateOfAdmission: new Date('2022-01-01'),
      direction: '123 Main Street',
    },
    {
      id: 2,
      name: 'Jane Smith',
      identification: '987654321',
      dateOfAdmission: new Date('2021-12-15'),
      direction: '456 Elm Avenue',
    },
    {
      id: 3,
      name: 'Robert Johnson',
      identification: '555555555',
      dateOfAdmission: new Date('2023-1-30'),
      direction: '789 Oak Road',
    },
  ]

  const onHandleDelete = (id: number) => {
    //redux thunk action
    console.log(`Delete user with id: ${id}`)
  }

  return (
    <div className="p-20 flex flex-col justify-center align-center gap-10">
      <h1 className="text-4xl font-bold mb-4 text-center">Users</h1>
      <div className="mt-20">
        <Table
          records={users}
          type="user"
          onDelete={(id) => onHandleDelete(id)}
        />
      </div>
    </div>
  )
}

export default Users
