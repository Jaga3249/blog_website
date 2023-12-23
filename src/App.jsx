import { AuthService } from "./appwrite/auth";

function App() {
  // console.log(import.meta.env.VITE_APPWRITE_URL);

  console.log(AuthService);

  return (
    <>
      <div className="bg-red-700">{AuthService} </div>
    </>
  );
}

export default App;
