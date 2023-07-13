import CredentialSignUp from "./CredentialSignUp";

interface IProps {}

const SignUpPage: React.FC<IProps> = async (props) => {
  return (
    <section className="h-screen">
      <div className="form-container">
        <div className="card">
          <div className="form-header">Sign up</div>
          <CredentialSignUp />
        </div>
      </div>
    </section>
  );
};

export default SignUpPage;
