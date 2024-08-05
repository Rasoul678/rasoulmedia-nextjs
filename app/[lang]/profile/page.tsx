import MyProfile from "./MyProfile";

const ProfilePage = async () => {
  return (
    <div>
      <main className="md:p-14 mt-[7rem] md:mt-[3rem]">
        <section className="px-3 bg-gray-900 rounded-xl">
          <MyProfile />
        </section>
      </main>
    </div>
  );
};

export default ProfilePage;
