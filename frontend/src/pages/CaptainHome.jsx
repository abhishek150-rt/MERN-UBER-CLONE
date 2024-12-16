import React, { useContext } from 'react'
import { CaptainDataContext } from '../context/CaptainContext';

const CaptainHome = () => {
    const { captain, setCaptain } = useContext(CaptainDataContext);
  console.log("captainnnnn", captain);
  return (
    <div>CaptainHome</div>
  )
}

export default CaptainHome