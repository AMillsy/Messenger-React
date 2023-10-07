import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/query";
import Loading from "../components/Loading";
import InfiniteCarousel from "../components/InfiniteCarousel";

const PersonalHome = () => {
  const { data: ME_DATA, loading: ME_LOAD } = useQuery(QUERY_ME);

  if (ME_LOAD) return <Loading fontSize={"150%"} progressSize={"3rem"} />;

  const me = ME_DATA?.me;
  return (
    <>
      <InfiniteCarousel />
    </>
  );
};

export default PersonalHome;
