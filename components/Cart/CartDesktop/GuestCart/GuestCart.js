import React from 'react';
import GuestCartContainer from './GuestCartContainer';
import GuestCartRightSide from './GuestCartRightSide';

export default function GuestCart({ setCheckOutModalOpen }) {
  return (
    <div className="cart-main-grid">
      <GuestCartContainer />
      <GuestCartRightSide setCheckOutModalOpen={setCheckOutModalOpen} />
    </div>
  );
}
