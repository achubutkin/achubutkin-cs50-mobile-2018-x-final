import { createStore } from 'redux';

const updateOrders = (state, action) => {
  return { defaultOrder: { ...action.payload } };
};

export default createStore(updateOrders);
