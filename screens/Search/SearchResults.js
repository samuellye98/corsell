import React from "react";
import { ItemCards } from "../../components/Layout/ItemCards";

export const SearchResults = props => {
  const { navigate } = props.navigation;
  return <ItemCards navigate={navigate} />;
};
