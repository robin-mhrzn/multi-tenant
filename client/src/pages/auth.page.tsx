import LoginComponent from "@app/components/auth/login.component";
import SignUpComponent from "@app/components/auth/signup.component";
import { isSubDomain } from "@app/helpers/common/commonHelper";
import { useState } from "react";

const AuthPage = () => {
  const [subdomain] = useState<boolean>(isSubDomain());
  return <>{subdomain ? <LoginComponent /> : <SignUpComponent />}</>;
};

export default AuthPage;
