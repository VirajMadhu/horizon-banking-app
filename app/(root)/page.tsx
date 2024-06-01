import HeaderBox from '@/components/HeaderBox'
import RightSideBar from '@/components/RightSideBar'
import TotalBalanceBox from '@/components/TotalBalanceBox'
import { getLoggedInUser } from '@/lib/actions/user.actions'
import React from 'react'

const Home = async () => {

  // const loggedIn = { firstName: 'Viraj', lastName: 'Madhushan', name: 'Name', email: 'email' }
  const loggedIn = await getLoggedInUser();

  return (
    <section className='home'>
      <div className='home-content'>
        <header className='home-header'>
          <HeaderBox
            type="greeting"
            title="Welcome"
            user={loggedIn?.name || 'Guest'}
            subtext="Access and manage your account and transaction efficiently"
          />

          <TotalBalanceBox
            accounts={[]}
            totalBanks={1}
            totalCurrentBalance={1250.35}
          />
        </header>

        RECENT TRANACTIONS
      </div>

      <RightSideBar
        user={loggedIn}
        transactions={[]}
        banks={[
          { currentBalance: 200.35, mask: 1234 },
          { currentBalance: 150.00, mask: 2345 }
        ]}
      />
    </section>
  )
}

export default Home