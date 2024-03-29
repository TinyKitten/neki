import { gql, useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { Station } from "../models/StationAPI";

const GET_RANDOM_STATION = gql`
  query RandomStationQuery {
    random {
      name
      prefId
      address
      lines {
        id
        name
        lineColorC
        lineSymbols {
          lineSymbol
        }
      }
    }
  }
`;

const useRandomStation = () => {
  const [fetchRandomStation, { called, loading, data, refetch }] =
    useLazyQuery<{ random: Station }>(GET_RANDOM_STATION);

  useEffect(() => {
    fetchRandomStation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    station: data?.random,
    loading: called && loading,
    refetch,
  };
};

export default useRandomStation;
