import { FC } from "react";
import { observer } from "mobx-react-lite";
// components
import { PagesListView } from "components/pages/pages-list";
// hooks
import { useMobxStore } from "lib/mobx/store-provider";
// ui
import { Loader } from "@plane/ui";

export const FavoritePagesList: FC = observer(() => {
  const {
    page: { favoriteProjectPages },
  } = useMobxStore();

  if (!favoriteProjectPages)
    return (
      <Loader className="space-y-4">
        <Loader.Item height="40px" />
        <Loader.Item height="40px" />
        <Loader.Item height="40px" />
      </Loader>
    );

  return <PagesListView pages={favoriteProjectPages} />;
});
