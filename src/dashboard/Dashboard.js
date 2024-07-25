import React from 'react'

function Dashboard() {
  React.useEffect(()=>{
    localStorage.setItem('displayname','Dashboard')
  },[])
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard