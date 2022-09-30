import React from 'react';
import { useSessionContext } from 'supertokens-auth-react/recipe/session';

const AdminDashboard = () => {
  const { userId, accessTokenPayload } = useSessionContext();

  const role = accessTokenPayload.role;
  // console.log('role', role);
  // console.log('all payload', accessTokenPayload);

  return <div>AdminDashboard</div>;
};

export default AdminDashboard;
