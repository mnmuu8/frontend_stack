import React, { FC } from 'react'
import { useUser } from '@auth0/nextjs-auth0/client';

import { UserAuthenticationProps, UserProps } from '@/types/types';

const UserAuthentication: FC<UserAuthenticationProps> = ({ children }) => {
  // NOTE: アクセス制限があるため一旦コメントアウト
  // const { user, error, isLoading } = useUser();
  const user = {
    "given_name": "裕也",
    "family_name": "南",
    "nickname": "mnm.uu8",
    "name": "南裕也",
    "picture": "https://lh3.googleusercontent.com/a/AAcHTtdkm-fb3SxuzwiRZIVuhQizQQLdYVhIgehAfQ3wyDL_ow=s96-c",
    "locale": "ja",
    "updated_at": "2023-08-13T06:27:09.196Z",
    "email": "mnm.uu8@gmail.com",
    "email_verified": true,
    "sub": "google-oauth2|114610925753457562952",
    "sid": "adsct_h4CW-x38wgXDXaDXrs4fTHYdRG"
  }

  // NOTE: アクセス制限があるため一旦コメントアウト
  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>{error.message}</div>;

  const childrenWithUser = React.Children.map(children, (child) => {
    if (React.isValidElement<UserProps>(child)) {
      return React.cloneElement(child, { user });
    }
    return child;
  });

  if (user) {
    return (
      <>{childrenWithUser}</>
    );
  }

  return (
    <div>ログインしてください...</div>
  );
}

export default UserAuthentication
