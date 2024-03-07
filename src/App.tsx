import React, { FormEventHandler } from "react";
import { useAuthContext } from "./context/AuthContext";
import classNames from "classnames";
import Input from "./component/common/field/Input";

function App() {
  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");

  const { isSignedIn, signIn, signOut } = useAuthContext();

  const onSignIn: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    await signIn(username, password);
  };

  if (!isSignedIn) {
    return (
      <div
        className={classNames(
          "flex items-center justify-center",
          "w-screen, h-screen",
        )}
      >
        <form
          onSubmit={onSignIn}
          className={classNames("shadow-2xl", "rounded-xl", "overflow-hidden")}
        >
          <div
            className={classNames("py-3", "w-full", "border-b border-gray-300")}
          >
            <h1 className={classNames("text-center font-semibold")}>Sign In</h1>
          </div>
          <div className={classNames("py-6 px-14", "space-y-2")}>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={"Username"}
            />
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={"Password"}
              type={"password"}
            />
          </div>
          <button
            className={classNames(
              "w-full",
              "py-3",
              "text-white font-bold bg-blue-400",
            )}
          >
            Sign In
          </button>
        </form>
      </div>
    );
  }

  return (
    <div
      className={classNames(
        "flex flex-col items-center justify-center",
        "w-screen, h-screen",
      )}
    >
      <h1 className={classNames("mb-6", "text-5xl font-bold text-teal-300")}>
        Home Sweet Home
      </h1>
      <button
        type={"button"}
        onClick={signOut}
        className={classNames(
          "py-3 px-36",
          "rounded-xl",
          "text-white font-bold bg-amber-400",
        )}
      >
        Leave Sweet Home
      </button>
    </div>
  );
}

export default App;
