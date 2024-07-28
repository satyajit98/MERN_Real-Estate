import { useSelector } from "react-redux";

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <img
          src={currentUser.photo}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2"
        />
        <input
          type="text"
          placeholder="username"
          className="rounded-lg p-3 border"
          id="username"
        />
        <input
          type="email"
          placeholder="email"
          className="rounded-lg p-3 border"
          id="email"
        />
        <input
          type="password"
          placeholder="password"
          className="rounded-lg p-3 border"
          id="password"
        />
        <button className="bg-slate-600 text-white rounded-lg p-3 uppercase hover:opacity-85 disabled:opacity-95">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
