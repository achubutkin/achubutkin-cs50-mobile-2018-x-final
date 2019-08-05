const databaseUrl = 'https://justorderpizza-50af8.firebaseio.com/';

export function getAllOrders() {
  return fetch(databaseUrl + '/orders.json', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
}

export function postOrder(order) {
  return fetch(databaseUrl + '/orders.json', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(order),
  });
}
