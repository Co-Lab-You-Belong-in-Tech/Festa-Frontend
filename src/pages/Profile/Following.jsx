import { useSelector } from "react-redux";
const Following = () => {
  const account = useSelector((state) => state.account);
  const favorites = account?.favorites;
  console.log(favorites);
  return (
    <div>
      Favorites
      {/* {favorites.map((favorite) => {
        <div>{favorite.id}</div>;
      })} */}
    </div>
  );
};

export default Following;
